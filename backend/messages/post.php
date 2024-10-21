<?php
// Import your db_connection.php file
require_once("./../conn.php");

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Create a PDO instance
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Function to handle errors
function handleError($message) {
    http_response_code(400);
    echo json_encode(['error' => $message]);
    exit;
}

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['sender_id']) || !isset($data['receiver_id']) || !isset($data['message_content']) || !isset($data['sent_at'])) {
        handleError("Missing required fields: sender_id, receiver_id, message_content, sent_at");
    }

    $stmt = $pdo->prepare("INSERT INTO messages (sender_id, receiver_id, message_content, sent_at) VALUES (:sender_id, :receiver_id, :message_content, :sent_at)");
    $stmt->execute([
        ':sender_id' => $data['sender_id'],
        ':receiver_id' => $data['receiver_id'],
        ':message_content' => $data['message_content'],
        ':sent_at' => $data['sent_at']
    ]);

    if ($stmt->rowCount() > 0) {
        http_response_code(201);
        echo json_encode(['message' => 'Message inserted successfully']);
    } else {
        handleError("Failed to insert message");
    }
} catch (PDOException $e) {
    handleError("Database error: " . $e->getMessage());
}