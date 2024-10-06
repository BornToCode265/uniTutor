<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");  // Set proper content type
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

require_once("./../../conn.php");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
    if (isset($_GET['email']) && isset($_GET['password'])) {
        $email = $_GET['email'];
        $password = $_GET['password'];

        $stmt = $pdo->prepare("SELECT * FROM admins WHERE email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        $admin = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (count($admin) > 0) {
            $result = $admin[0];
            
            if ($password == $result['password_hash']) {
                echo json_encode(true);
            } else {
                http_response_code(401); // Unauthorized
                echo json_encode(['error' => 'Invalid password']);
            }
        } else {
            http_response_code(401); // Unauthorized
            echo json_encode(['error' => 'Invalid email or password']);
        }
    } else {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'No data passed']);
    } break;

    default:
        http_response_code(405); // Method Not Allowed
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
