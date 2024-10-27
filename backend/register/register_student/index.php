<?php

// Import your db_connection.php file
require_once "./../../conn.php";

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

    $data = json_decode(file_get_contents('php://input'), true);

    if ( !isset($data['registration_number']) || !isset($data['full_name']) || !isset($data['email']) || !isset($data['phone_number']) ||
        !isset($data['password']) || !isset($data['department']) || !isset($data['program']) ||
        !isset($data['year_of_study']) || !isset($data['academic_level']) || !isset($data['age']) ||
        !isset($data['nationality']) || !isset($data['language']) || !isset($data['technical_skills']) ||
        !isset($data['hobbies']) || !isset($data['goals_motivation'])) {
        handleError("Missing required fields");
    }



          

    try {
        $stmt = $pdo->prepare("INSERT INTO students (registration_number, name, email, phone_number, program_id, created_at, password_hash, department_id, year_of_study, academic_level, date_of_birth, nationality, language, technical_skills, hobbies, goals_motivation)
                                VALUES (:registration_number, :fullName, :email, :phone_number, :password, :department, :program, :year_of_study, :academic_level, :age, :nationality, :language, :technical_skills, :hobbies, :goals_motivation)");

        $stmt->execute([
            ':registration_number'=> $data['registration_number'],
            ':full_name' => $data['full_name'],
            ':email' => $data['email'],
            ':phone_number' => $data['phone_number'],
            ':password' => $data['password'],
            ':department' => $data['department'],
            ':program' => $data['program'],
            ':year_of_study' => $data['year_of_study'],
            ':academic_level' => $data['academic_level'],
            ':age' => $data['age'],
            ':nationality' => $data['nationality'],
            ':language' => $data['language'],
            ':technical_skills' => $data['technical_skills'],
            ':hobbies' => $data['hobbies'],
            ':goals_motivation' => $data['goals_motivation']
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
  



// PUT request handler for updating a student
if ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['registration_number'])) {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['fullName']) || !isset($data['email']) || !isset($data['phoneNumber']) ||
        !isset($data['password']) || !isset($data['department']) || !isset($data['program']) ||
        !isset($data['yearOfStudy']) || !isset($data['academicLevel']) || !isset($data['age']) ||
        !isset($data['nationality']) || !isset($data['language']) || !isset($data['technicalSkills']) ||
        !isset($data['hobbies']) || !isset($data['goalsMotivation'])) {
        handleError("Missing required fields");
    }

    try {
        $registration_number = $_GET['registration_number'];
        $stmt = $pdo->prepare("UPDATE students SET fullName = :fullName, email = :email, phoneNumber = :phoneNumber, password = :password, department = :department, program = :program, yearOfStudy = :yearOfStudy, academicLevel = :academicLevel, age = :age, nationality = :nationality, language = :language, technicalSkills = :technicalSkills, hobbies = :hobbies, goalsMotivation = :goalsMotivation WHERE registration_number = :registration_number");

        $stmt->execute([
            ':registration_number' => $registration_number,
            ':fullName' => $data['fullName'],
            ':email' => $data['email'],
            ':phoneNumber' => $data['phoneNumber'],
            ':password' => $data['password'],
            ':department' => $data['department'],
            ':program' => $data['program'],
            ':yearOfStudy' => $data['yearOfStudy'],
            ':academicLevel' => $data['academicLevel'],
            ':age' => $data['age'],
            ':nationality' => $data['nationality'],
            ':language' => $data['language'],
            ':technicalSkills' => $data['technicalSkills'],
            ':hobbies' => $data['hobbies'],
            ':goalsMotivation' => $data['goalsMotivation']
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