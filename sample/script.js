// ボタンが押された時の動き
load();  //index.htmlを開いたら実行

function save(){

    // htmlで入力された文字を取得（title）
    let title=document.getElementById("title").value;

    // phpを実行する
    fetch("save.php",{

        method:"POST",  //データを送るという意味→save.phpへ

        headers:{
            "Content-Type":
            "application/x-www-form-urlencoded"
        },

        body:"title="+title //phpへtitleを送る

    })

    .then(()=>{  //thenは終わったらという意味

        load();

    });

}

function load(){

    fetch("get.php")

    .then(res=>res.text())  //resはレスポンス=get.phpで帰ってきた値という意味。それを文字列で取り出す

    .then(data=>{  //res.text()で変換された文字列がdata

        document.getElementById("list").innerHTML=data;  //htmlへ入れる

    });

}