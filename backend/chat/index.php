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

// GET request handler for fetching messages between a tutor and their students
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['tutor_id'])) {
    try {
        $tutorId = $_GET['tutor_id'];
        
        // First, get all student IDs for the tutor
        $stmt = $pdo->prepare("SELECT receiver_id FROM messages WHERE sender_id = :tutor_id");
        $stmt->execute([':tutor_id' => $tutorId]);
        $studentIds = $stmt->fetchAll(PDO::FETCH_COLUMN);

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
        usort($messages, function($a, $b) {
            return strtotime($b['sent_at']) - strtotime($a['sent_at']);
        });

        http_response_code(200);
        echo json_encode($messages);
    } catch (PDOException $e) {
        handleError("Database error: " . $e->getMessage());
    }

    // Close the PDO connection
    $pdo = null;
}

// Other request handlers remain the same...

?>