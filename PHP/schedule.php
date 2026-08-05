<!-- 
=================================
予定
・追加
・取得
・変更
・削除
担当：C
================================= 
-->
<?php

// データベース接続
include "db.php";

// JSONデータを取得（jsから取得）
$data = json_decode(file_get_contents('php://input'), true);

$action = $data['action'];  //アクションを取得（追加、取得、変更、削除）

if($action == "insert"){
    // 予定の追加
    $user_id = $data['user_id'];  //ユーザーIDを取得
    $title = $data['title'];  //予定のタイトルを取得
    $description = $data['description'];  //予定の詳細を取得
    $start_time = $data['start_time'];  //予定の開始時間を取得
    $end_time = $data['end_time'];  //予定の終了時間を取得
    $created_at = date('Y-m-d H:i:s');  //現在の日時を取得
    $category = $data['category'];  //予定のカテゴリを取得

    $sql = "INSERT INTO schedule (user_id, title, description, start_time, end_time, created_at, category) VALUES ('$user_id', '$title', '$description', '$start_time', '$end_time', '$created_at', '$category')";

    $result = $conn->query($sql);

    if($result){
        $response = array("status" => "success", "message" => "予定が追加されました");
    }else{
        $response = array("status" => "error", "message" => "予定の追加に失敗しました");
    }

    header('Content-Type: application/json');
    echo json_encode($response);

}else if($action == "select"){
    // 予定の取得
    $user_id = $data['user_id'];  //ユーザーIDを取得

    $sql = "SELECT * FROM schedule WHERE user_id = '$user_id'";

    $result = $conn->query($sql);

    $schedules = array();

    while($row = $result->fetch_assoc()){
        $schedules[] = $row;
    }

    header('Content-Type: application/json');
    echo json_encode($schedules);
}

?>