// =================================
// 予定
// 担当：B
// =================================



// Googleカレンダー風の1日表示

const timeGrid = document.getElementById("timeGrid");
const allDayEvents = document.getElementById("allDayEvents");
const dateHeading = document.getElementById("dateHeading");
const eventDialog = document.getElementById("eventDialog");
const eventForm = document.getElementById("eventForm");

const titleInput = document.getElementById("eventTitle");
const dateInput = document.getElementById("eventDate");
const startInput = document.getElementById("eventStart");
const endInput = document.getElementById("eventEnd");
const descriptionInput = document.getElementById("eventDescription");
const colorInput = document.getElementById("eventColor");
const formError = document.getElementById("formError");
const deleteBtn = document.getElementById("deleteBtn");
//URLからクリックされた日付を取得
const params = new URLSearchParams(window.location.search);
const dateParam = params.get("date");

// 選択中の日付
let selectedDate = new Date();

// URLに日付がある場合はその日付に変更
if (dateParam) {
    const [year, month, day] = dateParam.split("-").map(Number);
    Selection = new Date(year, month - 1, day)
}

let editingId = null;

// サンプル予定
// 現段階ではデータベースには保存されません
let events = [
    {
        id: 1,
        title: "プログラミング演習",
        date: "2026-10-22",
        start: "09:00",
        end: "10:30",
        description: "大学",
        color: "green"
    },
    {
        id: 2,
        title: "コンビニ勤務",
        date: "2026-10-22",
        start: "13:00",
        end: "15:00",
        description: "アルバイト",
        color: "blue"
    },
    {
        id: 3,
        title: "友達とご飯",
        date: "2026-10-22",
        start: "20:00",
        end: "21:00",
        description: "駅前レストラン",
        color: "orange"
    },
    {
        id: 4,
        title: "課題提出",
        date: "2026-10-22",
        start: "00:00",
        end: "23:59",
        description: "",
        color: "purple",
        allDay: true
    }
];

let nextId = 5;


// 日付を YYYY-MM-DD 形式にする
function toDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


// 日本語の日付を作成
function formatJapaneseDate(date) {
    const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日（${weekdays[date.getDay()]}）`;
}


// 時刻を分に変換
function minutesFromTime(time) {
    const [hours, minutes] = time.split(":").map(Number);

    return hours * 60 + minutes;
}


// カレンダーを表示
function renderSchedule() {
    dateHeading.textContent = formatJapaneseDate(selectedDate);

    const dateKey = toDateKey(selectedDate);

    dateInput.value = dateKey;
    allDayEvents.innerHTML = "";
    timeGrid.innerHTML = "";

    // 選択した日付の予定だけ取得
    const todaysEvents = events
        .filter(event => event.date === dateKey)
        .sort((a, b) => a.start.localeCompare(b.start));

    // 終日の予定
    todaysEvents
        .filter(event => event.allDay)
        .forEach(event => {
            const item = document.createElement("div");

            item.className = `all-day-event color-${event.color}`;
            item.textContent = event.title;
            item.title = "クリックして編集";

            item.addEventListener("click", () => {
                openEditDialog(event.id);
            });

            allDayEvents.appendChild(item);
        });

    // 00:00～23:00の時間行を作成
    for (let hour = 0; hour < 24; hour++) {
        const row = document.createElement("div");
        row.className = "hour-row";

        const label = document.createElement("div");
        label.className = "hour-label";
        label.textContent = `${String(hour).padStart(2, "0")}:00`;

        const track = document.createElement("div");
        track.className = "hour-track";

        // 時間の行をダブルクリックして予定を作成
        track.addEventListener("dblclick", () => {
            const start = `${String(hour).padStart(2, "0")}:00`;
            openCreateDialog(dateKey, start);
        });

        row.append(label, track);
        timeGrid.appendChild(row);
    }

    const rows = [...timeGrid.querySelectorAll(".hour-row")];
    const rowHeight = rows[0]?.getBoundingClientRect().height || 64;

    // 時刻指定の予定を表示
    todaysEvents
        .filter(event => !event.allDay)
        .forEach(event => {
            const start = minutesFromTime(event.start);
            const end = minutesFromTime(event.end);

            // 開始時刻の時間行の中での位置
            const top = ((start % 60) / 60) * rowHeight;

            // 予定の長さに合わせて高さを設定
            const height = Math.max(
                ((end - start) / 60) * rowHeight,
                44
            );

            const block = document.createElement("button");

            block.type = "button";
            block.className = `event-block color-${event.color}`;
            block.style.top = `${top}px`;
            block.style.height = `${height}px`;
            block.innerHTML = "<strong></strong><span></span>";

            block.querySelector("strong").textContent = event.title;

            block.querySelector("span").textContent =
                `${event.start}～${event.end}` +
                (event.description ? ` ・ ${event.description}` : "");

            block.title = "クリックして編集";

            block.addEventListener("click", () => {
                openEditDialog(event.id);
            });

            // 開始時刻の行に配置
            const targetRow = rows[Math.min(Math.floor(start / 60), 23)];

            targetRow.querySelector(".hour-track").appendChild(block);
        });
}


// 新しい予定を作成する画面
function openCreateDialog(date = toDateKey(selectedDate), start = "09:00") {
    editingId = null;

    eventForm.reset();

    document.getElementById("dialogTitle").textContent = "予定を作成";

    dateInput.value = date;
    startInput.value = start;

    const startMinutes = minutesFromTime(start);
    const endMinutes = Math.min(startMinutes + 60, 23 * 60 + 59);

    endInput.value =
        `${String(Math.floor(endMinutes / 60)).padStart(2, "0")}:` +
        `${String(endMinutes % 60).padStart(2, "0")}`;

    colorInput.value = "blue";
    deleteBtn.classList.add("hidden");
    formError.textContent = "";

    eventDialog.showModal();
    titleInput.focus();
}


// 既存の予定を編集する画面
function openEditDialog(id) {
    const event = events.find(item => item.id === id);

    if (!event) return;

    editingId = id;

    document.getElementById("dialogTitle").textContent = "予定を編集";

    titleInput.value = event.title;
    dateInput.value = event.date;
    startInput.value = event.allDay ? "09:00" : event.start;
    endInput.value = event.allDay ? "10:00" : event.end;
    descriptionInput.value = event.description || "";
    colorInput.value = event.color;

    deleteBtn.classList.remove("hidden");
    formError.textContent = "";

    eventDialog.showModal();
}


// 予定を保存
eventForm.addEventListener("submit",async event => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const date = dateInput.value;
    const start = startInput.value;
    const end = endInput.value;

    if (!title || !date || !start || !end) {
        formError.textContent = "必要な項目を入力してください。";
        return;
    }

    if (end <= start) {
        formError.textContent = "終了時刻は開始時刻より後にしてください。";
        return;
    }

    const newEvent = {
        id: editingId ?? nextId++,
        title: title,
        date: date,
        start: start,
        end: end,
        description: descriptionInput.value.trim(),
        color: colorInput.value,
        allDay: false
    };

    if (editingId === null) {
        // 新規追加
        events.push(newEvent);
    } else {
        // 編集した予定に置き換える
        events = events.map(item =>
            item.id === editingId ? newEvent : item
        );
    }

    selectedDate = new Date(`${date}T12:00:00`);

    eventDialog.close();
    renderSchedule();
});


// 予定を削除
deleteBtn.addEventListener("click", () => {
    if (editingId === null) return;

    events = events.filter(item => item.id !== editingId);

    eventDialog.close();
    renderSchedule();
});


// ダイアログを閉じる
function closeDialog() {
    eventDialog.close();
}

document.getElementById("closeDialogBtn")
    .addEventListener("click", closeDialog);

document.getElementById("cancelBtn")
    .addEventListener("click", closeDialog);


// 予定追加ボタン
document.getElementById("addBtn").addEventListener("click", () => {
    openCreateDialog();
});


// 前の日
document.getElementById("prevBtn").addEventListener("click", () => {
    selectedDate.setDate(selectedDate.getDate() - 1);
    renderSchedule();
});


// 次の日
document.getElementById("nextBtn").addEventListener("click", () => {
    selectedDate.setDate(selectedDate.getDate() + 1);
    renderSchedule();
});


// 今日
document.getElementById("todayBtn").addEventListener("click", () => {
    selectedDate = new Date();
    renderSchedule();
});


// カレンダー画面に戻る
document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "calendar.html";
});


// メニューボタン（仮）
document.getElementById("menuBtn").addEventListener("click", () => {
    alert("メニュー機能は後から追加できます。");
});


// 初期表示
renderSchedule();
