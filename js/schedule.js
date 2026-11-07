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


// 選択中の日付
let selectedDate = new Date();

const params = new URLSearchParams(window.location.search);
const dateParam = params.get("date");

if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
    const [year, month, day] = dateParam.split("-").map(Number);
    selectedDate = new Date(year, month - 1, day);
}

let editingId = null;
let events = [];


// 日付を YYYY-MM-DD 形式にする
function toDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


// 日本語の日付を作成
function formatJapaneseDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = ["日", "月", "火", "水", "木", "金", "土"];

    return `${year}年${month}月${day}日（${weekday[date.getDay()]}）`;
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
    console.log("時間行の数:", rows.length);
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


// PHPに予定データを送信する
async function sendScheduleData(data) {
    const userId = localStorage.getItem("user_id");

    if (!userId) {
        formError.textContent = "ログイン情報がありません。再ログインしてください。";
        return null;
    }

    try {
        const response = await fetch("/calender/php/schedule.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...data,
                user_id: userId
            })
        });

        if (!response.ok) {
            throw new Error("PHPとの通信に失敗しました");
        }

        return await response.json();

    } catch (error) {
        console.error(error);
        formError.textContent = "サーバーとの通信に失敗しました。";
        return null;
    }
}




async function loadSchedules() {
    // まず時間行を表示する
    events = [];
    renderSchedule();

    // データベースから予定を読み込む
    const result = await sendScheduleData({
        action: "select"
    });

    if (!Array.isArray(result)) {
        if (formError) {
            formError.textContent =
                result?.message || "予定を読み込めませんでした。";
        }
        return;
    }

    events = result.map(item => ({
        id: Number(item.id),
        title: item.title,
        date: String(item.start_time).slice(0, 10),
        start: String(item.start_time).slice(11, 16),
        end: String(item.end_time).slice(11, 16),
        description: item.description || "",
        color: item.category || "blue",
        allDay: false
    }));

    // 予定を再表示する
    renderSchedule();
}



// 予定を保存・変更
eventForm.addEventListener("submit", async event => {
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
        formError.textContent =
            "終了時刻は開始時刻より後にしてください。";
        return;
    }

    const data = {
        action: editingId === null ? "insert" : "update",
        title: title,
        description: descriptionInput.value.trim(),
        start_time: `${date} ${start}:00`,
        end_time: `${date} ${end}:00`,
        category: colorInput.value
    };

    if (editingId !== null) {
        data.schedule_id = editingId;
    }

    const result = await sendScheduleData(data);

    if (!result || result.status !== "success") {
        formError.textContent =
            result?.message || "予定を変更できませんでした。";
        return;
    }

    selectedDate = new Date(`${date}T12:00:00`);

    eventDialog.close();
    await loadSchedules();
});


// 予定を削除
deleteBtn.addEventListener("click", async () => {
    if (editingId === null) return;

    const result = await sendScheduleData({
        action: "delete",
        schedule_id: editingId
    });

    if (!result || result.status !== "success") {
        formError.textContent =
            result?.message || "予定を削除できませんでした。";
        return;
    }

    eventDialog.close();
    await loadSchedules();
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
loadSchedules();
