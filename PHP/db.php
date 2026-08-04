<!-- 
=================================
データベース接続
担当：C
================================= 
-->
<?php

$host="localhost";  //接続先
$user="root";  //ログインユーザ名（XAMPPならroot）
$password="";
$dbname="calendar_db";  //データベース名

$conn=new mysqli($host,$user,$password,$dbname);  //接続開始

if($conn->connect_error){
    die("接続失敗");  //終了
}

?>