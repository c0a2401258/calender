<!-- 取得用 -->
<?php

include "db.php";  //db.phpを読み込む

$sql="SELECT * FROM schedule";  //scheduleを全て取得

$result=$conn->query($sql);  //sqlを実行

while($row=$result->fetch_assoc()){  //1件ずつ取り出す（idとtitle）

    echo "<li>".$row["title"]."</li>";  //htmlを作成（rowに入っているtaileのみ取り出す）

}

?>