<!-- 
=================================
講義管理
・追加
・取得
担当：C
================================= 
-->
<?php

// データベース接続
include "db.php";

// JSONデータを取得（jsから取得）
$data = json_decode(file_get_contents('php://input'), true);

$action = $data['action'];  // アクションを取得（追加・取得）

if($action == "insert"){
    // 講義の追加
    $user_id = $data['user_id'];  // ユーザーIDを取得
    $subject = $data['subject'];  // 講義を取得
    $day_of_week = $data['day_of_week'];  // 曜日を取得
    $period = $data['period'];  // 時限を取得
    $room = $data['room']; // 教室を取得
    $teacher = $data['teacher'];  // 先生を取得

    $sql = "INSERT INTO lectures(user_id, subject, day_of_week, period, room, teacher) VALUES ('$user_id', '$subject', '$day_of_week', '$period', '$room', '$teacher')";

    $result = $conn->query($sql);

    if($result){
        $response = array("status" => "success", "message" => "講義が追加されました");
    }else{
        $response = array("status" => "error", "message" => "講義の追加に失敗しました");
    }

    header('Content-Type: application/json');
    echo json_encode($response);
}


?>
