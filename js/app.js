const app = document.getElementById("app");  //変更されない変数
const pageStyle = document.getElementById("page-style");


//-------------------------------------
// 画面読み込み
//-------------------------------------
//awaitを使うためにasyncを使用する
async function loadPage(page, css, js) {  //ファイル名を変数

    // HTMLを取得
    const res = await fetch(page);  //指定のファイルを取ってくるまで待つ fetchファイルの取得、await待つ　Responsesオブジェクトを返す
    const html = await res.text();  //文字列変換

    // 表示
    app.innerHTML = html;  //<div>のappにhtml情報を入れる

    // CSS変更
    pageStyle.href = css;

    // 古いJavaScript削除
    const oldScript = document.getElementById("page-script");

    if (oldScript) {
        oldScript.remove();
    }

    // 新しいJavaScript読み込み
    const script = document.createElement("script");  //<script>作成

    script.src = js;
    script.id = "page-script";

    document.body.appendChild(script);

}


//-------------------------------------
// ログイン画面
//-------------------------------------
function showLogin() {

    loadPage(
        "pages/login.html",
        "css/login.css",
        "js/login.js"
    );

}
    

//-------------------------------------
// メイン画面
//-------------------------------------
function showCalendar() {

    loadPage(
        "pages/calendar.html",
        "css/calendar.css",
        "js/calendar.js"
    );

}


//-------------------------------------
// 日ごとの予定
//-------------------------------------
function showSchedule() {

    loadPage(
        "pages/schedule.html",
        "css/schedule.css",
        "js/schedule.js"
    );

}


//-------------------------------------
// 起動時
//-------------------------------------
function showPopup() {

    loadPage(
        "pages/popup.html",
        "css/popup.css",
        "js/popup.js"
    );
}

//-------------------------------------
// 起動時
//-------------------------------------
window.onload = function () {

    showLogin();

}