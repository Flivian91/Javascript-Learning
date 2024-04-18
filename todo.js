//geting the elements that i will need
let addBtn = document.getElementById("add-task");
let listContainer = document.getElementById("list-container");
let toDo = document.getElementById("input-box");
const deleteBtn = document.querySelector(".delete");

addBtn.addEventListener("click", () => {
  // Get the value of the input field
  const value = toDo.value;
  toDo.value = "";
  const html = `
    <li class="parentEl">
    <span class="text">${value}</span> 
    <img class="delete" src="delete.png" alt="delte icon" />
    </li>
    `;
  listContainer.insertAdjacentHTML("afterbegin", html);
  listClick();
});

// Function to handle clicks on the List container "Using Event Delegation to listen for click"
function listClick() {
  listContainer.addEventListener("click", (e) => {
    const clicked = e.target.closest(".parentEl");
    deleteFun(clicked);

    // Apply Gaurd class if click not on parent
    if (!clicked) return;
    clicked.classList.toggle("checked");
  });
}

// Function to handdle delete
function deleteFun(parent) {
  parent.addEventListener("click", (e) => {
    const click = e.target.closest(".delete");
    if (!click) return;
    parent.remove();
  });
}

// addBtn.addEventListener("click", ()=>{
//     if(toDo.value.trim() !==""){
//         let list = document.createElement('li');//created it in here ndio ina create the element each time the button is pressed
//         list.innerText = toDo.value;
//         listContainer.appendChild(list); //append the child.
//         toDo.value=""; //reset the input value to nothing after kuadd task
//     }
//     else{
//         alert("Add task first");
//     }
// });

// //had to add a className for the list soa as to map it
// let listDone = Array.from(document.getElementsByClassName("Lists"));

// listDone.map(DoneList => {
//     DoneList.addEventListener("click", (e)=>{
//         //hapa nachekc after kumap the class, nacheck ni element gani imeclickiwa
//         //then i change the class name accordingly
//         (e.target.className ==="checked") ? e.target.className ="" : e.target.className ="checked";
//     });
//     });
