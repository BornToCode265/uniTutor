<?php


header("Access-Control-Allow-Origin: *");

header('Content-Type: *');

header('Access-Control-Allow-Heagers: *');

header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: * ");



require_once("./../conn.php");

$method = $_SERVER['REQUEST_METHOD'];



switch ($method) {
  case 'GET':
 

if (isset($_GET['email']) && isset($_GET['password'])) {
        $email = $_GET['email'];
        $password = $_GET['password'];

// $stmt = $pdo->prepare('SELECT * FROM students WHERE email = :email');
// $stmt->bindParam(':email', $email);
// $stmt->execute();

//    $result = $stmt->fetch(PDO::FETCH_ASSOC);

  $stmt = $pdo->query("SELECT * FROM students  WHERE email= $email ORDER BY registration_number");
        
        $students = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        http_response_code(200);
        
        $result = $students[0];

echo md5($password);
echo "---=---";
echo $result['password_hash'];


if (md5($password) == $result['password_hash']) {
    echo json_encode(true);
} else {
    echo json_encode(false);
}

  }else{
    echo json_encode(['error' => 'no data passed']);
  }
    break;

       default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
  }