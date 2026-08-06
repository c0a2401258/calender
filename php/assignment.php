<!-- 
=================================
課題管理
・登録
・取得
・変更
担当：C
================================= 
-->
<?php

// データベース接続
include "db.php";

// JSONデータを取得
$data = json_decode(file_get_contents('php://input'), true);

$action = $data['action'];  // アクションを取得（登録・取得・変更）

if($action == 'insert'){
    // 課題の登録
    $user_id = $data['user_id'];  // ユーザーIDを取得
    $lecture_id = $data['lecture_id'];  // 講義IDを取得
    $title = $data['title'];  // 課題名を取得
    $deadline = $data['deadline'];  // 締切を取得
    $status = $data['status'];

    $sql = "INSERT INTO assignments(user_id, lecture_id, title, deadline, status) VALUES ('$user_id', '$lecture_id', '$title', '$deadline', '$status')";

    $result = $conn->query($sql);

    if($result){
        $response = array("status" => "success", "message" => "課題が追加されました");
    }else{
        $response = array("status" => "error", "message" => "課題の追加に失敗しました");
    }

    header('Content-Type: application/json');
    echo json_encode($response);

}else if($action == 'select'){
    // 課題の取得
    $user_id = $data['user_id'];  // ユーザーIDを取得

    $sql = "SELECT * FROM assignments WHERE user_id = '$user_id'";

    $result = $conn->query($sql);

    $assignments = array();

    while($row = $result->fetch_assoc()){
        $assignments[] = $row;
    }

    header('Content-Type: application/json');
    echo json_encode($assignments);
}else if($action == 'update'){
    // 課題の変更
    $assignment_id = $data['assignment_id'];  // 課題IDを取得
    $title = $data['title'];  // 課題名を取得
    $deadline = $data['deadline'];  // 締切を取得
    $status = $data['status'];
    $user_id = $data['user_id'];  // ユーザーIDを取得

    $sql = "UPDATE assignments SET title = '$title', deadline = '$deadline', status = '$status' WHERE id = '$assignment_id' AND user_id = '$user_id'";

    $result = $conn->query($sql);

    if($result){
        $response = array("status" => "success", "message" => "課題が更新されました");
    }else{
        $response = array("status" => "error", "message" => "課題の更新に失敗しました");
    }

    header('Content-Type: application/json');
    echo json_encode($response);
}

?>