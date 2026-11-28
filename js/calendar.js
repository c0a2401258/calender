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

    loadLectures();

}

loadSidebar();

// 講義管理のポップアップを開く
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

// 課題管理のポップアップを開く
function openAssignmentPopup() {

    document
        .getElementById("assignmentDialog")
        .showModal();

}

function closeAssignmentDialog() {

    document
        .getElementById("assignmentDialog")
        .close();

}

// 通知のポップアップを開く
function openNotificationPopup() {

    document
        .getElementById("notificationDialog")
        .showModal();

}

function closeNotificationDialog() {

    document
        .getElementById("notificationDialog")
        .close();

}

// 設定のポップアップを開く
function openSettingPopup() {

    document
        .getElementById("settingDialog")
        .showModal();

}

function closeSettingDialog() {

    document
        .getElementById("settingDialog")
        .close();

}



window.openLecturePopup =
    openLecturePopup;

window.openAssignmentPopup =
    openAssignmentPopup;

// 講義管理保存
async function saveLecture() {

    console.log("保存ボタンが押されました");

    const data = {

        action: "insert",

        user_id: 1,

        subject:
            document
            .getElementById("lectureName")
            .value,

        day_of_week:
            document
            .getElementById("lectureDay")
            .value,

        period:
            document
            .getElementById("lecturePeriod")
            .value,

        room:
            document
            .getElementById("lectureRoom")
            .value,

        teacher:
            document
            .getElementById("lectureTeacher")
            .value

    };

    console.log(data);

    const result =
        await post(
            "php/lecture.php",
            data
        );

    console.log(result);

    alert(result.message);

    if(result.status === "success") {

        closeLectureDialog();

        loadLectures();
    }
}

// 講義取得関数
async function loadLectures() {

    console.log("loadLectures開始");

    const data = {

        action: "select",

        user_id: 1

    };

    const lectures =
        await post(
            "php/lecture.php",
            data
        );

    console.log("取得結果");
    console.log(lectures);

    const lectureList =
        document.getElementById(
            "lectureList"
        );

    lectureList.innerHTML = "";

    const dayText = {

        "1": "月",
        "2": "火",
        "3": "水",
        "4": "木",
        "5": "金",
        "6": "土",
        "7": "日"

    };

    lectures.forEach(lecture => {

        console.log(lecture);

        const item =
            document.createElement("div");

        item.className =
            "lecture-item";

        item.textContent =
            `${lecture.subject}
            (${dayText[lecture.day_of_week]}曜 ${lecture.period}限)`;

        lectureList.appendChild(item);

    });

}


window.openNotificationPopup =
    openNotificationPopup;

window.openSettingPopup =
    openSettingPopup;

// サイドバーが出てくる
const sidebarBtn = document.getElementById("sidebarBtn");
const sidebar = document.getElementById("sidebar");
const mainContainer = document.getElementById("mainContainer");

sidebarBtn.addEventListener("click", () => {

    sidebar.classList.toggle("open");

    mainContainer.classList.toggle("sidebar-open");

});

// 講義管理モーダル
const lectureDialog =
    document.getElementById("lectureDialog");

lectureDialog.addEventListener("click", (event) => {

    const rect =
        lectureDialog.getBoundingClientRect();

    const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.bottom &&
        rect.left <= event.clientX &&
        event.clientX <= rect.right;

    if (!isInDialog) {

        lectureDialog.close();

    }

});

// 課題管理モーダル
const assignmentDialog =
    document.getElementById("assignmentDialog");

assignmentDialog.addEventListener("click", (event) => {

    const rect =
        assignmentDialog.getBoundingClientRect();

    const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.bottom &&
        rect.left <= event.clientX &&
        event.clientX <= rect.right;

    if (!isInDialog) {

        assignmentDialog.close();

    }

});

// 通知モーダル
const notificationDialog =
    document.getElementById("notificationDialog");

notificationDialog.addEventListener("click", (event) => {

    const rect =
        notificationDialog.getBoundingClientRect();

    const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.bottom &&
        rect.left <= event.clientX &&
        event.clientX <= rect.right;

    if (!isInDialog) {

        notificationDialog.close();

    }

});

// 設定モーダル
const settingDialog =
    document.getElementById("settingDialog");

settingDialog.addEventListener("click", (event) => {

    const rect =
        settingDialog.getBoundingClientRect();

    const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.bottom &&
        rect.left <= event.clientX &&
        event.clientX <= rect.right;

    if (!isInDialog) {

        settingDialog.close();

    }

});

// 講義管理のポップアップを閉じる
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
// 課題管理のポップアップを閉じる
document
    .getElementById("closeAssignmentDialogBtn")
    ?.addEventListener(
        "click",
        closeAssignmentDialog
    );

document
    .getElementById("cancelAssignmentBtn")
    ?.addEventListener(
        "click",
        closeAssignmentDialog
    );

// 通知のポップアップを閉じる
document
    .getElementById("closeNotificationDialogBtn")
    ?.addEventListener(
        "click",
        closeNotificationDialog
    );

document
    .getElementById("cancelNotificationBtn")
    ?.addEventListener(
        "click",
        closeNotificationDialog
    );

// 設定のポップアップを閉じる
document
    .getElementById("closeSettingDialogBtn")
    ?.addEventListener(
        "click",
        closeSettingDialog
    );

document
    .getElementById("cancelSettingBtn")
    ?.addEventListener(
        "click",
        closeSettingDialog
    );

document
    .getElementById("saveLectureBtn")
    .addEventListener(
        "click",
        saveLecture
    );


// モーダルの外側をクリックしたら閉じる
function enableOutsideClose(dialogId) {

    const dialog =
        document.getElementById(dialogId);

    dialog.addEventListener("click", (event) => {

        const rect =
            dialog.getBoundingClientRect();

        const isInDialog =
            rect.top <= event.clientY &&
            event.clientY <= rect.bottom &&
            rect.left <= event.clientX &&
            event.clientX <= rect.right;

        if (!isInDialog) {

            dialog.close();

        }

    });

}

enableOutsideClose("lectureDialog");

enableOutsideClose("assignmentDialog");

enableOutsideClose("notificationDialog");

enableOutsideClose("settingDialog");

