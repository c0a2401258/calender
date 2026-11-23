// =================================
// カレンダー
// 担当：A
// =================================

// 現在表示している年月
let currentDate = new Date();

//現在の表示モード
//let currentMode = "work";

const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");
const workCheck = document.getElementById("workCheck");
const privateCheck = document.getElementById("privateCheck");

// データベースから取得した予定
let allSchedules = [];

// =================================
// データベースから予定を取得
// =================================
async function loadCalendarSchedules() {

    try {
        const response = await fetch("/calender/php/schedule.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                action: "select"
            })
        });

        const result = await response.json();

        if (!response.ok || !Array.isArray(result)) {
            throw new Error("予定を取得できませんでした");
        }

        // 取得した予定を保存
        allSchedules = result;

        // カレンダーを再表示
        renderCalendar();

    } catch (error) {
        console.error("予定取得エラー:", error);
    }
}

// カレンダーを表示
function renderCalendar() {

    // カレンダーを空にする
    calendar.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // 年月を表示
    monthYear.textContent = `${year}年 ${month + 1}月`;

    // その月の1日が何曜日か
    const firstDay = new Date(year, month, 1).getDay();

    // その月の最終日
    const lastDate = new Date(year, month + 1, 0).getDate();

    // 曜日
    const week = ["日", "月", "火", "水", "木", "金", "土"];


    // -------------------------
    // 曜日を表示
    // -------------------------

    week.forEach((day, index) => {

        const cell = document.createElement("div");

        cell.classList.add("weekday");

        cell.textContent = day;

        if (index === 0) {
            cell.classList.add("sunday");
        }

        if (index === 6) {
            cell.classList.add("saturday");
        }

        calendar.appendChild(cell);
    });


    // -------------------------
    // 月初めまでの空白
    // -------------------------

    for (let i = 0; i < firstDay; i++) {

        const empty = document.createElement("div");

        empty.classList.add("empty");

        calendar.appendChild(empty);
    }


    // -------------------------
    // 日付
    // -------------------------

    const today = new Date();

    for (let day = 1; day <= lastDate; day++) {

        const cell = document.createElement("div");
        cell.classList.add("day");

        //日付を変更
        const dateText = document.createElement("div");
        dateText.textContent = day;
        cell.appendChild(dateText);

        //  YYYY-MM-DD形式の日付を作成
        const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        // 日付をクリックしたら予定ページへ移動
        cell.addEventListener("click", () => {
            window.location.href = `/calender/pages/schedule.html?date=${dateKey}`;
        });


        
        // データベースから取得した予定を表示
        allSchedules.forEach((schedule) => {

            if (!schedule.start_time) {
                return;
            }

            // 予定の日付を取得
            const scheduleDate =
                schedule.start_time.substring(0, 10);

            // 表示中の日付と一致するか確認
            if (scheduleDate !== dateKey) {
                return;
            }

            // カテゴリーによる表示切り替え
            const category = schedule.category;

            if (
                (category === "work" || category === "仕事") &&
                !workCheck.checked
            ) {
                return;
            }

            if (
                (category === "private" || category === "プライベート") &&
                !privateCheck.checked
            ) {
                return;
            }

            // 予定を作成
            const event = document.createElement("div");

            event.classList.add("calendar-event");

            if (category === "work" || category === "仕事") {
                event.classList.add("work-event");
            } else {
                event.classList.add("private-event");
            }

            event.textContent = schedule.title;

            cell.appendChild(event);
        });





        // 日曜日
        const dayOfWeek = (firstDay + day - 1) % 7;

        if (dayOfWeek === 0) {
            cell.classList.add("sunday");
        }

        // 土曜日
        if (dayOfWeek === 6) {
            cell.classList.add("saturday");
        }


        // 今日
        if (
            year === today.getFullYear() &&
            month === today.getMonth() &&
            day === today.getDate()
        ) {

            cell.classList.add("today");
        }


        calendar.appendChild(cell);
    }
}


// -------------------------
// 前月
// -------------------------

document.getElementById("prevBtn").addEventListener("click", () => {

    currentDate.setMonth(currentDate.getMonth() - 1);

    renderCalendar();
});


// -------------------------
// 次月
// -------------------------

document.getElementById("nextBtn").addEventListener("click", () => {

    currentDate.setMonth(currentDate.getMonth() + 1);

    renderCalendar();
});


// -------------------------
// 今日
// -------------------------

document.getElementById("todayBtn").addEventListener("click", () => {

    currentDate = new Date();

    renderCalendar();
});


workCheck.addEventListener("change", () => {
    renderCalendar();
});
privateCheck.addEventListener("change", () => {
    renderCalendar();
})

// 初期表示
renderCalendar();
loadCalendarSchedules();
loadTodaySchedules();

//予定ページから戻ってきたときも最新にする
window.addEventListener("pageshow", (e) => {
    if (e.persisted) {
        loadCalendarSchedules();
        loadTodaySchedules();
    }
});

// sidebar.htmlを読み込む
async function loadSidebar() {

    const response =
        await fetch("pages/sidebar.html");

    const html =
        await response.text();

    document.getElementById("sidebar").innerHTML = html;
}

loadSidebar();

function openLecturePopup() {

    const popup =
        document.getElementById("popup");

    popup.classList.remove("hidden");
}

function closePopup() {

    const popup =
        document.getElementById("popup");

    popup.classList.add("hidden");
}

function openLecturePopup() {

    document
        .getElementById("lectureDialog")
        .showModal();

}

function closeLectureDialog() {

    document
        .getElementById("lectureDialog")
        .close();

}

window.openLecturePopup =
    openLecturePopup;

// サイドバーが出てくる
const sidebarBtn = document.getElementById("sidebarBtn");
const sidebar = document.getElementById("sidebar");
const mainContainer = document.getElementById("mainContainer");

sidebarBtn.addEventListener("click", () => {

    sidebar.classList.toggle("open");

    mainContainer.classList.toggle("sidebar-open");

});

document
    .getElementById("closeLectureDialogBtn")
    .addEventListener(
        "click",
        closeLectureDialog
    );

document
    .getElementById("cancelLectureBtn")
    .addEventListener(
        "click",
        closeLectureDialog
    );

// =================================
// 今日の予定を取得する
// =================================
async function loadTodaySchedules() {
    const scheduleList =
        document.getElementById("todayScheduleList");

    if (!scheduleList) {
        console.error(
            "calendar.htmlにtodayScheduleListがありません"
        );
        return;
    }

    try {
        const response = await fetch(
            "/calender/php/schedule.php",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    action: "select"
                })
            }
        );

        const responseText = await response.text();

        let result;

        try {
            result = JSON.parse(responseText);
        } catch (error) {
            console.error(
                "schedule.phpから返された内容:",
                responseText
            );

            scheduleList.textContent =
                "予定を読み込めませんでした。";

            return;
        }

        if (
            response.status === 401 ||
            result.status === "login_required"
        ) {
            scheduleList.textContent =
                result.message || "ログインしてください。";

            return;
        }

        if (!response.ok) {
            throw new Error(
                result.message || "予定の取得に失敗しました"
            );
        }

        if (!Array.isArray(result)) {
            throw new Error(
                "予定データの形式が正しくありません"
            );
        }

        const today = getTodayDateString();

        const todaySchedules = result.filter(
            (schedule) => {
                if (!schedule.start_time) {
                    return false;
                }

                const scheduleDate =
                    schedule.start_time.substring(0, 10);

                return scheduleDate === today;
            }
        );

        todaySchedules.sort((a, b) => {
            return a.start_time.localeCompare(
                b.start_time
            );
        });

        displayTodaySchedules(todaySchedules);

    } catch (error) {
        console.error(error);

        scheduleList.textContent =
            "予定を読み込めませんでした。";
    }
}


// =================================
// 今日の日付をYYYY-MM-DDで取得
// =================================
function getTodayDateString() {
    const now = new Date();

    const year = now.getFullYear();

    const month = String(
        now.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        now.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


// =================================
// 日時から時刻部分を取得
// =================================
function getScheduleTime(dateTime) {
    if (!dateTime) {
        return "--:--";
    }

    const timePart = dateTime.split(" ")[1];

    if (!timePart) {
        return "--:--";
    }

    return timePart.substring(0, 5);
}


// =================================
// 今日の予定を表示する
// =================================
function displayTodaySchedules(schedules) {
    const scheduleList =
        document.getElementById("todayScheduleList");

    scheduleList.innerHTML = "";

    if (schedules.length === 0) {
        const message = document.createElement("p");

        message.textContent =
            "今日の予定はありません。";

        message.classList.add("no-schedule");

        scheduleList.appendChild(message);
        return;
    }

    schedules.forEach((schedule) => {
        const item = document.createElement("div");

        item.classList.add("today-schedule-item");

        const time = document.createElement("div");

        time.classList.add("today-schedule-time");

        time.textContent =
            `${getScheduleTime(schedule.start_time)}`
            + " ～ "
            + `${getScheduleTime(schedule.end_time)}`;

        const title = document.createElement("div");

        title.classList.add("today-schedule-title");

        title.textContent =
            schedule.title || "タイトルなし";

        item.appendChild(time);
        item.appendChild(title);

        if (
            schedule.description &&
            schedule.description.trim() !== ""
        ) {
            const description =
                document.createElement("div");

            description.classList.add(
                "today-schedule-description"
            );

            description.textContent =
                schedule.description;

            item.appendChild(description);
        }

        scheduleList.appendChild(item);
    });
}


// // =================================
// // メイン画面を開いたときに実行
// // =================================
// document.addEventListener(
//     "DOMContentLoaded",
//     loadTodaySchedules
// );    