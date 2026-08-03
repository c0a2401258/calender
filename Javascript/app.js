// 表示先
const app = document.getElementById("app");

// 共通の画面読み込み関数
async function loadPage(page) {

    try {

        // HTMLファイルを取得
        const response = await fetch(page);

        // 文字列として取得
        const html = await response.text();

        // 画面へ表示
        app.innerHTML = html;

    } catch (error) {

        app.innerHTML = "<h2>ページを読み込めませんでした</h2>";
        console.error(error);

    }
}

// ログイン画面
function showLogin() {
    loadPage("pages/login.html");
}

// メイン画面
function showCalendar() {
    loadPage("pages/calendar.html");
}

// 日ごとの予定画面
function showSchedule() {
    loadPage("pages/schedule.html");
}

// アプリ起動時
window.onload = function () {
    showLogin();
};