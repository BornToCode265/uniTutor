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

// POST request handler for creating a new student
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['registration_number']) || !isset($data['name']) ||
        !isset($data['email']) || !isset($data['phone_number']) ||
        !isset($data['program_id']) || !isset($data['password'])) {
        handleError("Missing required fields");
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO students (registration_number, name, email, phone_number, program_id, password)
                                VALUES (:registration_number, :name, :email, :phone_number, :program_id, :password)");
        
        $stmt->execute([
            ':registration_number' => $data['registration_number'],
            ':name' => $data['name'],
            ':email' => $data['email'],
            ':phone_number' => $data['phone_number'],
            ':program_id' => $data['program_id'],
            ':password' => password_hash($data['password'], PASSWORD_DEFAULT)
        ]);

        if ($stmt->rowCount() > 0) {
            http_response_code(201);
            echo json_encode(['message' => 'Student inserted successfully']);
        } else {
            handleError("Failed to insert student");
        }
    } catch (PDOException $e) {
        handleError("Database error: " . $e->getMessage());
    }

    // Close the PDO connection
    $pdo = null;
}

// GET request handler for fetching all students
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $pdo->query("SELECT * FROM students ORDER BY registration_number");
        
        $students = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        http_response_code(200);
        echo json_encode($students);
    } catch (PDOException $e) {
        handleError("Database error: " . $e->getMessage());
    }

    // Close the PDO connection
    $pdo = null;
}

// GET request handler for fetching a single student by registration_number
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['registration_number'])) {
    try {
        $registration_number = $_GET['registration_number'];
        $stmt = $pdo->prepare("SELECT * FROM students WHERE registration_number = :registration_number");
        $stmt->execute([':registration_number' => $registration_number]);
        
        $student = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($student) {
            http_response_code(200);
            echo json_encode($student);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Student not found']);
        }
    } catch (PDOException $e) {
        handleError("Database error: " . $e->getMessage());
    }

    // Close the PDO connection
    $pdo = null;
}

// PUT request handler for updating a student
if ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['registration_number'])) {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['name']) || !isset($data['email']) || !isset($data['phone_number']) ||
        !isset($data['program_id']) || !isset($data['password'])) {
        handleError("Missing required fields");
    }

    try {
        $registration_number = $_GET['registration_number'];
        $stmt = $pdo->prepare("UPDATE students SET name = :name, email = :email, phone_number = :phone_number, program_id = :program_id, password = :password WHERE registration_number = :registration_number");
        
        $stmt->execute([
            ':registration_number' => $registration_number,
            ':name' => $data['name'],
            ':email' => $data['email'],
            ':phone_number' => $data['phone_number'],
            ':program_id' => $data['program_id'],
            ':password' => password_hash($data['password'], PASSWORD_DEFAULT)
        ]);

        if ($stmt->rowCount() > 0) {
            http_response_code(200);
            echo json_encode(['message' => 'Student updated successfully']);
        } else {
            handleError("Failed to update student");
        }
    } catch (PDOException $e) {
        handleError("Database error: " . $e->getMessage());
    }

    // Close the PDO connection
    $pdo = null;
}

// DELETE request handler for deleting a student
if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['registration_number'])) {
    try {
        $registration_number = $_GET['registration_number'];
        $stmt = $pdo->prepare("DELETE FROM students WHERE registration_number = :registration_number");
        $stmt->execute([':registration_number' => $registration_number]);

        if ($stmt->rowCount() > 0) {
            http_response_code(200);
            echo json_encode(['message' => 'Student deleted successfully']);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Student not found']);
        }
    } catch (PDOException $e) {
        handleError("Database error: " . $e->getMessage());
    }

    // Close the PDO connection
    $pdo = null;
}

?>