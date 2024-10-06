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

// POST request handler for creating a new session
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['tutor_id']) || !isset($data['student_id']) || !isset($data['subject_id']) ||
        !isset($data['session_date']) || !isset($data['session_time']) || !isset($data['status']) ||
        !isset($data['feedback_id']) || !isset($data['created_at'])) {
        handleError("Missing required fields");
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO sessions (tutor_id, student_id, subject_id, session_date, session_time, status, feedback_id, created_at)
                                VALUES (:tutor_id, :student_id, :subject_id, :session_date, :session_time, :status, :feedback_id, :created_at)");
        
        $stmt->execute([
            ':tutor_id' => $data['tutor_id'],
            ':student_id' => $data['student_id'],
            ':subject_id' => $data['subject_id'],
            ':session_date' => $data['session_date'],
            ':session_time' => $data['session_time'],
            ':status' => $data['status'],
            ':feedback_id' => $data['feedback_id'],
            ':created_at' => $data['created_at']
        ]);

        if ($stmt->rowCount() > 0) {
            http_response_code(201);
            echo json_encode(['message' => 'Session inserted successfully']);
        } else {
            handleError("Failed to insert session");
        }
    } catch (PDOException $e) {
        handleError("Database error: " . $e->getMessage());
    }

    // Close the PDO connection
    $pdo = null;
}

// GET request handler for fetching all sessions
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $pdo->query("SELECT * FROM sessions ORDER BY created_at DESC");
        
        $sessions = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        http_response_code(200);
        echo json_encode($sessions);
    } catch (PDOException $e) {
        handleError("Database error: " . $e->getMessage());
    }

    // Close the PDO connection
    $pdo = null;
}

// GET request handler for fetching a single session by tutor_id and student_id
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['tutor_id']) && isset($_GET['student_id'])) {
    try {
        $tutorId = $_GET['tutor_id'];
        $studentId = $_GET['student_id'];
        $stmt = $pdo->prepare("SELECT * FROM sessions WHERE tutor_id = :tutor_id AND student_id = :student_id");
        $stmt->execute([':tutor_id' => $tutorId, ':student_id' => $studentId]);
        
        $session = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($session) {
            http_response_code(200);
            echo json_encode($session);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Session not found']);
        }
    } catch (PDOException $e) {
        handleError("Database error: " . $e->getMessage());
    }

    // Close the PDO connection
    $pdo = null;
}

// PUT request handler for updating a session
if ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['tutor_id']) && isset($_GET['student_id'])) {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['tutor_id']) || !isset($data['student_id']) || !isset($data['subject_id']) ||
        !isset($data['session_date']) || !isset($data['session_time']) || !isset($data['status']) ||
        !isset($data['feedback_id']) || !isset($data['created_at'])) {
        handleError("Missing required fields");
    }

    try {
        $tutorId = $_GET['tutor_id'];
        $studentId = $_GET['student_id'];
        $stmt = $pdo->prepare("UPDATE sessions SET tutor_id = :tutor_id, student_id = :student_id, subject_id = :subject_id, 
                                session_date = :session_date, session_time = :session_time, status = :status, feedback_id = :feedback_id, 
                                created_at = :created_at 
                                WHERE tutor_id = :old_tutor_id AND student_id = :old_student_id");
        
        $stmt->execute([
            ':tutor_id' => $data['tutor_id'],
            ':student_id' => $data['student_id'],
            ':subject_id' => $data['subject_id'],
            ':session_date' => $data['session_date'],
            ':session_time' => $data['session_time'],
            ':status' => $data['status'],
            ':feedback_id' => $data['feedback_id'],
            ':created_at' => $data['created_at'],
            ':old_tutor_id' => $tutorId,
            ':old_student_id' => $studentId
        ]);

        if ($stmt->rowCount() > 0) {
            http_response_code(200);
            echo json_encode(['message' => 'Session updated successfully']);
        } else {
            handleError("Failed to update session");
        }
    } catch (PDOException $e) {
        handleError("Database error: " . $e->getMessage());
    }

    // Close the PDO connection
    $pdo = null;
}

// DELETE request handler for deleting a session
if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['tutor_id']) && isset($_GET['student_id'])) {
    try {
        $tutorId = $_GET['tutor_id'];
        $studentId = $_GET['student_id'];
        $stmt = $pdo->prepare("DELETE FROM sessions WHERE tutor_id = :tutor_id AND student_id = :student_id");
        $stmt->execute([':tutor_id' => $tutorId, ':student_id' => $studentId]);

        if ($stmt->rowCount() > 0) {
            http_response_code(200);
            echo json_encode(['message' => 'Session deleted successfully']);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Session not found']);
        }
    } catch (PDOException $e) {
        handleError("Database error: " . $e->getMessage());
    }

    // Close the PDO connection
    $pdo = null;
}

?>