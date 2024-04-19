"use strict"; //I am using strict mode to ensure i catch all possible error. Like not binding this keyword na Allow hoisting
// All variable decre
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addtaskBtn = document.getElementById("add-task");

//When user click the add task button.
addtaskBtn.addEventListener("click", () => {
  // Check if the input is null and return error
  if (inputBox.value === "") {
    /**
     * first on div element with classname row. we set the borderColor
     *  on css to transparent the we change the color here on he JS to improve user experince
     */
    document.querySelector(".row").style.borderColor = "#bd2222c9";
  } else {
    // Create the element wich will hold all the items
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    /**
     * i decided to use the HTML Entity for times to delete item instead of Delete image.
     * Check the styling of the Close icon on the css.
     * You can try to figure out with delete icon and see it wont work vipoe
     */
    let span = document.createElement("span");
    // span.src = 'delete.png'
    span.classList.add("close-icon");
    span.innerHTML = "\u00d7"; //on HTML is represented bt "&times"
    li.appendChild(span);
    // Reset the Input field
    document.querySelector(".row").style.borderColor = "transparent";
  }
  inputBox.value = "";
  // Saves the data on the local storage
  saveData();
});
/**
 * Event Delegation again to know which element exactly is clicked on the list items
 * This Technique improves on perfomance
 */
listContainer.addEventListener(
  "click",
  function (e) {
    /**
     * I have used tag nage On this contest, You can also use "e.target.classList.contains("className of target")"
     */
    if (e.target.tagName === "LI") {
      // This handles checking the Item and overwitting on it
      e.target.classList.toggle("checked");
      saveData();
      // This Block handles delete functionaity
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData(); //update the LocalStorage
    }
  },
  false //this prevent event to propage upward 
);
/**
 * This Function Takes no Parameter, 
 * It just saves the Data To the localStorage Each time it is called
 */
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}
// Function to display the content once We open the broswer again
function showContentAgain() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showContentAgain();

/**
 * This Function is used for Development Purpose And is called when we want to Remove all the items on the Local Storage
 * Hii ni ya developer pekee not for users
 */
function clearLocalStorage(){
  localStorage.removeItem()
}
