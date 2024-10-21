<?php

// Import your db_connection.php file
require_once("./../conn.php");

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Create a PDO instance
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Function to handle errors
function handleError($message) {
    http_response_code(500);
    echo json_encode(['error' => $message]);
    exit;
}

// Switch statement to handle different request methods
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Check if the 'tutor_id' and 'student_id' are set
        if (isset($_GET['tutor_id']) && isset($_GET['student_id'])) {
            fetchMessagesBetweenTutorAndStudent($_GET['tutor_id'], $_GET['student_id'], $pdo);
        } elseif (isset($_GET['tutor_id'])) {
            fetchMessagesByTutor($_GET['tutor_id'], $pdo);
        } else {
            handleError("Missing tutor_id or student_id in GET request.");
        }
        break;
        
    // You can add more cases here for POST, PUT, DELETE if needed

    default:
        handleError("Invalid request method.");
        break;
}

// Function to fetch messages between a tutor and a specific student
function fetchMessagesBetweenTutorAndStudent($tutorId, $studentId, $pdo) {
    try {
        // Get the student's name
        $studentStmt = $pdo->prepare("SELECT name FROM students WHERE student_id = :student_id");
        $studentStmt->execute([':student_id' => $studentId]);
        $studentName = $studentStmt->fetchColumn();

        if (!$studentName) {
            handleError("Student not found.");
        }

        // Get messages between the tutor and the specific student
        $messageStmt = $pdo->prepare("SELECT * FROM messages WHERE (sender_id = :tutor_id AND receiver_id = :student_id) OR (sender_id = :student_id AND receiver_id = :tutor_id) ORDER BY sent_at DESC");
        $messageStmt->execute([':tutor_id' => $tutorId, ':student_id' => $studentId]);
        $messages = $messageStmt->fetchAll(PDO::FETCH_ASSOC);

        // Add the student name to each message
        foreach ($messages as &$message) {
            $message['student_name'] = $studentName;
        }

        // Return the messages
        http_response_code(200);
        echo json_encode($messages);
    } catch (PDOException $e) {
        handleError("Database error: " . $e->getMessage());
    }
}

// Function to fetch messages for all students of a specific tutor
function fetchMessagesByTutor($tutorId, $pdo) {
    try {
        // First, get all student IDs for the tutor
        $stmt = $pdo->prepare("SELECT receiver_id FROM messages WHERE sender_id = :tutor_id");
        $stmt->execute([':tutor_id' => $tutorId]);
        $studentIds = $stmt->fetchAll(PDO::FETCH_COLUMN);

        if (!$studentIds) {
            handleError("No students found for this tutor.");
        }

        // Initialize an array to store the results
        $messages = [];

        // Loop through each student ID
        foreach ($studentIds as $studentId) {
            // Get the student's name
            $studentStmt = $pdo->prepare("SELECT name FROM students WHERE student_id = :student_id");
            $studentStmt->execute([':student_id' => $studentId]);
            $studentName = $studentStmt->fetchColumn();

            // Get messages between the tutor and this student
            $messageStmt = $pdo->prepare("SELECT * FROM messages WHERE (sender_id = :tutor_id AND receiver_id = :student_id) OR (sender_id = :student_id AND receiver_id = :tutor_id) ORDER BY sent_at DESC");
            $messageStmt->execute([':tutor_id' => $tutorId, ':student_id' => $studentId]);
            $studentMessages = $messageStmt->fetchAll(PDO::FETCH_ASSOC);

            // Combine the student name with their messages
            foreach ($studentMessages as &$message) {
                $message['student_name'] = $studentName;
            }

            // Add these messages to the main array
            $messages = array_merge($messages, $studentMessages);
        }

        // Sort the messages by sent_at in descending order
        usort($messages, function ($a, $b) {
            return strtotime($b['sent_at']) - strtotime($a['sent_at']);
        });

        http_response_code(200);
        echo json_encode($messages);
    } catch (PDOException $e) {
        handleError("Database error: " . $e->getMessage());
    }
}

?>
