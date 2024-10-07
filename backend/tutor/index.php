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
     if (isset($_GET['tutor_id'])) {
         $tutor_id = $_GET['tutor_id'];
         
         // Fetch tutor details and expertise_id
         $stmt = $pdo->prepare("SELECT t.*, te.expertise_id
                               FROM tutors t
                               LEFT JOIN tutor_expertise te ON t.tutor_id = te.tutor_id
                               WHERE t.tutor_id = :tutor_id");
         
         $stmt->execute([':tutor_id' => $tutor_id]);
         
         $tutor = $stmt->fetch(PDO::FETCH_ASSOC);
         
         if ($tutor) {
             // Fetch expert details using expertise_id
             $expert_stmt = $pdo->prepare("SELECT * FROM expertise WHERE expertise_id = :expertise_id");
             $expert_stmt->execute([':expertise_id' => $tutor['expertise_id']]);
             
             $expert = $expert_stmt->fetch(PDO::FETCH_ASSOC);
             
             // Merge tutor and expert details
             $merged_result = array_merge($tutor, ['expert' => $expert]);
             
             http_response_code(200);
             echo json_encode($merged_result);
         } else {
             http_response_code(404);
             echo json_encode(['error' => 'Tutor not found']);
         }
     } else {
         echo json_encode(['error' => 'No tutor_id provided']);
     }
     break;

       default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
  }