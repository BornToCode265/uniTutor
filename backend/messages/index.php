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

// Get the request method
$method = $_SERVER['REQUEST_METHOD'];

// Switch to handle different request methods
switch ($method) {
    
    // POST request handler for creating a new message
    case 'POST':

    // GET request handler
    case 'GET':
        if (isset($_GET['student_id'])) {
        } elseif (isset($_GET['tutor_id'])) {
            // Fetch single message by ID with sender's and receiver's names
            try {
            } catch (PDOException $e) {
                handleError("Database error: " . $e->getMessage());
            }
        } else {
            // Fetch only the most recent message from each sender
            try {
                $stmt = $pdo->query("
                    SELECT 
                        m.*, 
                        t.name AS sender_name, 
                        s.name AS receiver_name 
                    FROM messages m
                    JOIN students s ON m.receiver_id = s.student_id
                    JOIN tutors t ON m.sender_id = t.tutor_id
                    GROUP BY m.sender_id
                    ORDER BY m.sent_at DESC
                ");
                $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
                http_response_code(200);
                echo json_encode($messages);
            } catch (PDOException $e) {
                handleError("Database error: " . $e->getMessage());
            }
        }
        break;

    // PUT request handler for updating a message
    case 'PUT':
        if (isset($_GET['id'])) {
            $data = json_decode(file_get_contents('php://input'), true);
            if (!isset($data['sender_id']) || !isset($data['receiver_id']) || !isset($data['message_content']) || !isset($data['sent_at'])) {
                handleError("Missing required fields: sender_id, receiver_id, message_content, sent_at");
            }
            try {
                $id = $_GET['id'];
                $stmt = $pdo->prepare("
                    UPDATE messages 
                    SET sender_id = :sender_id, receiver_id = :receiver_id, message_content = :message_content, sent_at = :sent_at 
                    WHERE id = :id
                ");
                $stmt->execute([
                    ':id' => $id,
                    ':sender_id' => $data['sender_id'],
                    ':receiver_id' => $data['receiver_id'],
                    ':message_content' => $data['message_content'],
                    ':sent_at' => $data['sent_at']
                ]);
                if ($stmt->rowCount() > 0) {
                    http_response_code(200);
                    echo json_encode(['message' => 'Message updated successfully']);
                } else {
                    handleError("Failed to update message");
                }
            } catch (PDOException $e) {
                handleError("Database error: " . $e->getMessage());
            }
        } else {
            handleError("Missing required parameter: id");
        }
        break;

    // DELETE request handler for deleting a message
    case 'DELETE':
        if (isset($_GET['id'])) {
            try {
                $id = $_GET['id'];
                $stmt = $pdo->prepare("DELETE FROM messages WHERE id = :id");
                $stmt->execute([':id' => $id]);
                if ($stmt->rowCount() > 0) {
                    http_response_code(200);
                    echo json_encode(['message' => 'Message deleted successfully']);
                } else {
                    http_response_code(404);
                    echo json_encode(['message' => 'Message not found']);
                }
            } catch (PDOException $e) {
                handleError("Database error: " . $e->getMessage());
            }
        } else {
            handleError("Missing required parameter: id");
        }
        break;

    // Default case for unsupported methods
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

// Close the PDO connection
$pdo = null;

?>
