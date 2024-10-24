<?php
// Import your db_connection.php file
require_once("./../conn.php");


header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($method) {
    case 'POST':
        switch ($action) {
            case 'start_conversation':
                startConversation();
                break;
            case 'send_message':
                sendMessage();
                break;
            default:
                echo json_encode(['error' => 'Invalid action']);
                break;
        }
        break;

    case 'GET':
        switch ($action) {
            case 'start_conversation':
                startConversation();
                break;
            case 'send_message':
                sendMessage();
                break;
            case 'get_conversations':
                getConversations();
                break;
            case 'get_messages':
                getMessages();
                break;
            default:
                echo json_encode(['error' => 'Invalid action']);
                break;
        }
        break;

    default:
        echo json_encode(['error' => 'Invalid request method']);
        break;
}

// Start new conversation
function startConversation() {
    $pdo = getConnection();
    $data = json_decode(file_get_contents('php://input'), true);

    $subject = $data['subject'];
    $participants = $data['participants']; // Array of participants ['tutor_id' => 1, 'student_id' => 2]

    try {
        $pdo->beginTransaction();

        // Create a new conversation
        $stmt = $pdo->prepare('INSERT INTO Conversations (subject, started_at) VALUES (?, NOW())');
        $stmt->execute([$subject]);
        $conversation_id = $pdo->lastInsertId();

        // Add participants (both tutor and student)
        foreach ($participants as $role => $id) {
            $stmt = $pdo->prepare('INSERT INTO Participants (conversation_id, participant_id, role) VALUES (?, ?, ?)');
            $stmt->execute([$conversation_id, $id, $role]);
        }

        $pdo->commit();

        echo json_encode(['message' => 'Conversation started', 'conversation_id' => $conversation_id]);
    } catch (Exception $e) {
        $pdo->rollBack();
        echo json_encode(['error' => $e->getMessage()]);
    }
}

// Retrieve current chats (conversations) for a participant
function getConversations() {
    $pdo = getConnection();
    $role = $_GET['role']; // 'tutor' or 'student'
    $id = $_GET['id'];     // tutor_id or student_id

    try {
        $stmt = $pdo->prepare("SELECT c.conversation_id, c.subject, c.started_at 
                               FROM Conversations c
                               JOIN Participants p ON c.conversation_id = p.conversation_id
                               WHERE p.participant_id = ? AND p.role = ?");
        $stmt->execute([$id, $role]);
        $conversations = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($conversations);
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
}

// Retrieve recent messages in a conversation
function getMessages() {
    $pdo = getConnection();
    $conversation_id = $_GET['conversation_id'];

    try {
        $stmt = $pdo->prepare("SELECT m.message_id, m.sender_role, m.sender_id, m.message_content, m.sent_at 
                               FROM Messages m
                               WHERE m.conversation_id = ?
                               ORDER BY m.sent_at DESC");
        $stmt->execute([$conversation_id]);
        $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($messages);
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
}

// Send message in new or existing conversation
function sendMessage() {
    $pdo = getConnection();
    $data = json_decode(file_get_contents('php://input'), true);

    $conversation_id = $data['conversation_id'];
    $sender_id = $data['sender_id'];
    $sender_role = $data['sender_role'];  // 'tutor' or 'student'
    $message_content = $data['message_content'];

    try {
        // Insert the message
        $stmt = $pdo->prepare('INSERT INTO Messages (conversation_id, sender_id, sender_role, message_content, sent_at) 
                               VALUES (?, ?, ?, ?, NOW())');
        $stmt->execute([$conversation_id, $sender_id, $sender_role, $message_content]);

        // Update last message time in Conversations
        $stmt = $pdo->prepare('UPDATE Conversations SET last_message_at = NOW() WHERE conversation_id = ?');
        $stmt->execute([$conversation_id]);

        echo json_encode(['message' => 'Message sent successfully']);
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>
