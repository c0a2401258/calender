<!-- 保存用 -->
<?php

include "db.php";  //db.phpを読み込む

$title=$_POST["title"];  //送られてきたのをtileへ代入

$sql="INSERT INTO schedule(title)VALUES('$title')";  //テーブルに値を追加

$conn->query($sql);  //実際にINSERTする（connに中にあるqueryを使うという意味）

echo "保存しました";  //返す値（表示する機能はなし）

?>