// =================================
// サイドバー
// 担当：B
// =================================

// カレンダー画面
function showCalendar() {

    loadPage(
        "pages/calendar.html",
        "css/calendar.css",
        "js/calendar.js"
    );
}

// 予定画面
function showSchedule() {

    loadPage(
        "pages/schedule.html",
        "css/schedule.css",
        "js/schedule.js"
    );
}

// サイドバー開閉
function toggleSidebar() {

    const sidebar =
        document.getElementById("sidebar");

    if (!sidebar) {
        return;
    }

    sidebar.classList.toggle("open");
}

// サブメニュー開閉
function toggleSubMenu() {

    const subMenu =
        document.getElementById("scheduleSubMenu");

    if (!subMenu) {
        return;
    }

    subMenu.classList.toggle("open");
}