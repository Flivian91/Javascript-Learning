"use strict";

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addtaskBtn = document.getElementById("add-task");

let tasks = [];
let currentDate;
let daysOfTheWeek = ["Sun", "Tue", "Wed", "Thur", "Fri", "Sat"];

addtaskBtn.addEventListener("click", () => {
  if (inputBox.value === "") {
    document.querySelector(".row").style.borderColor = "#bd2222c9";
  } else {

    currentDate = new Date().getDate();

    tasks.push({
      id: Date.now(),
      task: inputBox.value,
      date: currentDate,
    });
    saveData();
    const html = `
    <li id="${tasks[tasks.length - 1].id}">
      ${tasks[tasks.length - 1].task}<span class="this-date">${tasks[tasks.length - 1].date}</span> <span class="close-icon">×</span>
    </li>
    `;
    listContainer.insertAdjacentHTML("afterbegin", html);
    document.querySelector(".row").style.borderColor = "transparent";
  }
  inputBox.value = "";
});

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.classList.contains("close-icon")) {
      const index = tasks.findIndex(
        (item) => item.id == e.target.parentElement.id
      );
      tasks.splice(index, 1);

      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function updateTask() {
  tasks.forEach((item) => {
    const html = `
    <li id="${item.id}">
      ${item.task}<span class="this-date">${((item.date - new Date().getDate() > 0) ? daysOfTheWeek[item.date - 1] : "Today")}</span> <span class="close-icon">×</span>
    </li>
    `;
    listContainer.insertAdjacentHTML("afterbegin", html);
  });
}

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showContentAgain() {
  const items = localStorage.getItem("tasks");
  if (items) {
    tasks = tasks.concat(JSON.parse(items));
    updateTask();
  }
}

showContentAgain();

function clearLocalStorage() {
  localStorage.removeItem("tasks");
}

//console.log("COntents saved" + (localStorage.getItem("tasks")));
console.log(daysOfTheWeek[new Date().getDay()-1]);
// clearLocalStorage()
// window.addEventListener("DOMContentLoaded", updateTask);
