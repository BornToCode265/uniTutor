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
 


        $email = $_GET['email'];
       
  $stmt = $pdo->query("SELECT * FROM tutors  WHERE email= $email");
        
        $tutors = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        http_response_code(200);
        
        $result = $tutors[0];



    echo json_encode($result);

echo json_encode(['error' => 'no data passed']);

break;

       default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
  }