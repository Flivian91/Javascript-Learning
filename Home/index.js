"use strict";

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addtaskBtn = document.getElementById("add-task");

let tasks = [];

addtaskBtn.addEventListener("click", () => {
  if (inputBox.value === "") {
    document.querySelector(".row").style.borderColor = "#bd2222c9";
  } else {
    tasks.push({
      id: Date.now(),
      task: inputBox.value,
    });
    saveData();
    const html = `
    <li id="${tasks[tasks.length - 1].id}">
      ${tasks[tasks.length - 1].task}<span class="close-icon">×</span>
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
      ${item.task}<span class="close-icon">×</span>
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
// clearLocalStorage()
// window.addEventListener("DOMContentLoaded", updateTask);
