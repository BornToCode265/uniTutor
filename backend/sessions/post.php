<?php

// Import your db_connection.php file
require_once("./../conn.php");

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Create a PDO instance and set error mode
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Function to handle errors
function handleError($message, $code = 500) {
    http_response_code($code);
    echo json_encode(['error' => $message]);
    exit;
}

// Validate input data
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    handleError("Invalid JSON payload", 400);
}

$requiredFields = ['tutor_id', 'student_id', 'subject_id', 'session_date', 'session_time'];
foreach ($requiredFields as $field) {
    if (!isset($data[$field])) {
        handleError("Missing required field: $field", 400);
    }
}

try {
    // Start a transaction to ensure atomicity
    $pdo->beginTransaction();

    // Insert the session
    $stmt = $pdo->prepare("INSERT INTO sessions (tutor_id, student_id, subject_id, session_date, session_time, status, feedback_id)
                           VALUES (:tutor_id, :student_id, :subject_id, :session_date, :session_time, :status, :feedback_id)");

    $result = $stmt->execute([
        ':tutor_id' => $data['tutor_id'],
        ':student_id' => $data['student_id'],
        ':subject_id' => $data['subject_id'],
        ':session_date' => $data['session_date'],
        ':session_time' => $data['session_time'],
        ':status' => isset($data['status']) ? $data['status'] : 1,
        ':feedback_id' => isset($data['Feedback_id']) ? $data['Feedback_id'] : 1
    ]);

    if (!$result) {
        throw new Exception("Failed to insert session");
    }

    // Update the tutor's availability to "Unavailable"
    $updateTutor = $pdo->prepare("UPDATE availability SET status = 'Booked' WHERE availability_id = :availability_id");
    $updateResult = $updateTutor->execute([':availability_id' => $data['availability_id']]);

    if (!$updateResult) {
        throw new Exception("Failed to update tutor availability");
    }

    // Commit the transaction
    $pdo->commit();
    http_response_code(201);
    echo json_encode(['message' => 'Session booked and tutor availability updated successfully']);
} catch (PDOException $e) {
    // Rollback in case of error
    $pdo->rollBack();
    handleError("Database error: " . $e->getMessage(), 500);
} catch (Exception $e) {
    // Rollback in case of error
    $pdo->rollBack();
    handleError($e->getMessage(), 500);
} finally {
    // Close the PDO connection
    $pdo = null;
}

?>