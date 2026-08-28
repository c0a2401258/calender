// =================================
// カレンダー
// 担当：A
// =================================

// 現在表示している年月
let currentDate = new Date();

//現在の表示モード
//let currentMode = "work";

const schedules = {
    work: {
        "2026-08-11": ["授業 10:00"],
        "2026-08-12": ["ゼミ 13:00"],
        "2026-08-15": ["課題提出"]
    },

    private: {
        "2026-08-11": ["友達と食事 18:00"],
        "2026-08-13": ["買い物 15:00"],
        "2026-08-16": ["映画 14:00"]
    }
}

const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");
const workCheck = document.getElementById("workCheck");
const privateCheck = document.getElementById("privateCheck");


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

        // 仕事の予定を表示
        if (workCheck.checked) {

            const workSchedules = schedules.work[dateKey] || [];

            workSchedules.forEach(function (schedule) {

                const event = document.createElement("div");

                event.classList.add("calendar-event");
                event.classList.add("work-event");

                event.textContent = schedule;

                cell.appendChild(event);
            });
        }


        // プライベートの予定を表示
        if (privateCheck.checked) {

            const privateSchedules = schedules.private[dateKey] || [];

            privateSchedules.forEach(function (schedule) {

                const event = document.createElement("div");

                event.classList.add("calendar-event");
                event.classList.add("private-event");

                event.textContent = schedule;

                cell.appendChild(event);
            });
        }




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

// =================================
// サイドバーが出てくる
// =================================

const sidebarBtn = document.getElementById("sidebarBtn");
const sidebar = document.getElementById("sidebar");

sidebarBtn.addEventListener("click", () => {

    sidebar.classList.toggle("open");

});