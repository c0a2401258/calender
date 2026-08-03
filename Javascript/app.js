const app = document.getElementById("app");
const pageStyle = document.getElementById("page-style");


//-------------------------------------
// 画面読み込み
//-------------------------------------
async function loadPage(page, css, js) {

    // HTMLを取得
    const res = await fetch(page);
    const html = await res.text();

    // 表示
    app.innerHTML = html;

    // CSS変更
    pageStyle.href = css;

    // 古いJavaScript削除
    const oldScript = document.getElementById("page-script");

    if (oldScript) {
        oldScript.remove();
    }

    // 新しいJavaScript読み込み
    const script = document.createElement("script");

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
window.onload = function () {

    showLogin();

}