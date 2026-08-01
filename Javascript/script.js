const addButton = document.getElementById("addButton");
const scheduleInput = document.getElementById("scheduleInput");
const scheduleList = document.getElementById("scheduleList");

addButton.addEventListener("click", function () {

    const text = scheduleInput.value;

    if (text === "") {
        return;
    }

    const li = document.createElement("li");

    li.textContent = text;

    scheduleList.appendChild(li);

    scheduleInput.value = "";
});