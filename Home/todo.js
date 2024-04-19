//geting the elements that i will need
let addBtn = document.getElementById("add-task");
let listContainer = document.getElementById("list-container");
let toDo = document.getElementById("input-box");
const deleteBtn = document.querySelector(".delete");


//create an array of object in key-value pairs to be used to store in the local storage

let tasks = [];

//i will be the indexing for the local storage, bado ndio nitatumia kuautomate id
let i = 0;

seePreviousTasks();

function seePreviousTasks(){
  const prevTasks = JSON.parse(localStorage.getItem("Tasks"));
  console.log(prevTasks);

  //here i load the tasks saved from local storage to the tasks array
  if(prevTasks!=null)tasks = prevTasks;

  //for debugging purposes
  console.log("Task in array: " + tasks);

  if(tasks!=null){

    // load a the tasks in the li element, kama ukona a better way of doing this propose
    for(var j= 0; j<tasks.length;j++,i++){
      const html = `
    <li class="parentEl" id= ${i}>
    <span class="text">${tasks[j]}</span> 
    <img class="delete" src="delete.png" alt="delte icon" />
    </li>
    `;

    listContainer.insertAdjacentHTML("afterbegin", html);

    }
  }

  }


addBtn.addEventListener("click", () => {

  // Get the value of the input field
  const value = toDo.value;
  toDo.value = "";

  //here you will notice nmepea elements id ya value ya i
  const html = `
    <li class="parentEl" id=${i}>
    <span class="text">${value}</span> 
    <img class="delete" src="delete.png" alt="delte icon" />
    </li>
    `;
  listContainer.insertAdjacentHTML("afterbegin", html);
  listClick();

  //store values in the tasks object
  if(tasks === null) tasks[0] = value;
  tasks.push(value);
  i++;

  //implement the local storage fucntionality each time the add button is clicked
  localStorage.setItem("Tasks",JSON.stringify(tasks));

  /*for debugging purposes*/ console.log("In Tasks array: " + tasks);

});

// Function to handle clicks on the List container "Using Event Delegation to listen for click"
function listClick() {
  listContainer.addEventListener("click", (e) => {
    const clicked = e.target.closest(".parentEl");

    // Apply Gaurd class if click not on parent
    if (!clicked) return;
    clicked.classList.toggle("checked");

    /*for debugging*/console.log(clicked.id);
    let delItem = document.getElementById(clicked.id).innerText;
    /*for debugging*/console.log(delItem);

    //here i added another parameter yenye itakuwa inahold value ya the selected item
    deleteFun(clicked, delItem);
  });
}

// Function to handdle delete
function deleteFun(parent, delItem) {
  parent.addEventListener("click", (e) => {
    const click = e.target.closest(".delete");
    if (!click) return;
    parent.remove();

    //for debugging 
    console.log(delItem);
    
    //k ni indexing for while loop
    var k=0;

    //in this loop, i loop through the array until nipate value ye delItem
    //during which i delete it and break out of the loop
    while(tasks!=null){
      if(tasks[k] === delItem){
        tasks.splice(k,1);
        break;
      }
      k++;
    }

    //i save the new array overwriting the other one
    localStorage.setItem("Tasks",JSON.stringify(tasks));
    /*for debugging*/console.log("New array: " + tasks);


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
