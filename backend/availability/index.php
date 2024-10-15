<?php

require_once("./../conn.php");

$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

function handleError($message) {
    http_response_code(500);
    echo json_encode(['error' => $message]);
    exit;
}

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);


        echo json_encode(['message'=> $data['tutor_id']]);
        die();

        if (!isset($data['tutor_id']) || !isset($data['available_date']) || !isset($data['available_time']) || !isset($data['available_up_to'])|| !isset($data['status'])) {
            handleError("Missing required fields: tutor_id, available_date, available_time,available_up_to, status");
        }

        try {
            $stmt = $pdo->prepare("INSERT INTO availability (tutor_id, available_date, available_time,available_up_to, status) VALUES (:tutor_id, :available_date, :available_time,:available_up_to, :status)");
            
            $stmt->execute([
                ':tutor_id' => $data['tutor_id'],
                ':available_date' => $data['available_date'],
                ':available_time' => $data['available_time'],
                ':available_up_to'=> $data['available_up_to'],
                ':status' => 'Available'
            ]);

            if ($stmt->rowCount() > 0) {
                http_response_code(201);
                echo json_encode(['message' => 'Availability inserted successfully']);
            } else {
                handleError("Failed to insert availability");
            }
        } catch (PDOException $e) {
            handleError("Database error: " . $e->getMessage());
        }
        
        break;

    case 'GET':
        if (isset($_GET['tutor_id']) && isset($_GET['available_date'])) {
            try {
                $tutorId = $_GET['tutor_id'];
                $availableDate = $_GET['available_date'];
                $stmt = $pdo->prepare("SELECT * FROM availability WHERE tutor_id = :tutor_id AND available_date = :available_date ORDER BY available_time ASC");
                $stmt->execute([':tutor_id' => $tutorId, ':available_date' => $availableDate]);
                
                $availability = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($availability) {
                    http_response_code(200);
                    echo json_encode($availability);
                } else {
                    http_response_code(404);
                    echo json_encode(['message' => 'Availability not found']);
                }
            } catch (PDOException $e) {
                handleError("Database error: " . $e->getMessage());
            }
        } else {
            try {
                $stmt = $pdo->query("SELECT * FROM availability ORDER BY tutor_id ASC, available_date ASC, available_time ASC");
                
                $availabilities = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                http_response_code(200);
                echo json_encode($availabilities);
            } catch (PDOException $e) {
                handleError("Database error: " . $e->getMessage());
            }
        }
        
        break;

    case 'PUT':
        if (!isset($_GET['tutor_id']) || !isset($_GET['available_date'])) {
            handleError("Missing tutor_id and available_date parameters");
        }

        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['available_time']) || !isset($data['status'])) {
            handleError("Missing required fields: available_time, status");
        }

        try {
            $tutorId = $_GET['tutor_id'];
            $availableDate = $_GET['available_date'];
            $stmt = $pdo->prepare("UPDATE availability SET available_time = :available_time, status = :status WHERE tutor_id = :tutor_id AND available_date = :available_date");
            
            $stmt->execute([
                ':tutor_id' => $tutorId,
                ':available_date' => $availableDate,
                ':available_time' => $data['available_time'],
                ':status' => $data['status']
            ]);

            if ($stmt->rowCount() > 0) {
                http_response_code(200);
                echo json_encode(['message' => 'Availability updated successfully']);
            } else {
                handleError("Failed to update availability");
            }
        } catch (PDOException $e) {
            handleError("Database error: " . $e->getMessage());
        }
        
        break;

    case 'DELETE':
        if (!isset($_GET['tutor_id']) || !isset($_GET['available_date'])) {
            handleError("Missing tutor_id and available_date parameters");
        }

        try {
            $tutorId = $_GET['tutor_id'];
            $availableDate = $_GET['available_date'];
            $stmt = $pdo->prepare("DELETE FROM availability WHERE tutor_id = :tutor_id AND available_date = :available_date");
            $stmt->execute([':tutor_id' => $tutorId, ':available_date' => $availableDate]);

            if ($stmt->rowCount() > 0) {
                http_response_code(200);
                echo json_encode(['message' => 'Availability deleted successfully']);
            } else {
                http_response_code(404);
                echo json_encode(['message' => 'Availability not found']);
            }
        } catch (PDOException $e) {
            handleError("Database error: " . $e->getMessage());
        }
        
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method Not Allowed']);
        break;
}

$pdo = null;
?>