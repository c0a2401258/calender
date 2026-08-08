<?php

// =================================
// ログイン認証
// 担当：C
// ================================= 

// データベース接続
include "db.php";

// JSONデータを取得（jsから取得）
$data = json_decode(file_get_contents('php://input'), true);

//　受け取った値（変数変換JSON→PHP）
$email = $data['email'];
$password = $data['password'];

// SQL
$sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";

// SQL実行
$result = $conn->query($sql);

// 結果を確認
if ($result->num_rows > 0) {  //num_rowsは取得件数を返す（1件以上あればログイン成功）
    // ログイン成功
    $response = array('status' => 'success', 'message' => 'ログイン成功');
} else {
    // ログイン失敗
    $response = array('status' => 'error', 'message' => 'ユーザー名またはパスワードが間違っています');
}

// JSON形式でレスポンスを返す
header('Content-Type: application/json');
echo json_encode($response);
?>