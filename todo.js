//geting the elements that i will need
let addBtn = document.getElementById("add-task");
let listContainer = document.getElementById("list-container");
let toDo = document.getElementById("input-box");


addBtn.addEventListener("click", ()=>{
    if(toDo.value.trim() !==""){
        let list = document.createElement('li');//created it in here ndio ina create the element each time the button is pressed
        list.innerText = toDo.value;
        listContainer.appendChild(list); //append the child.
        toDo.value=""; //reset the input value to nothing after kuadd task
    }
    else{
        alert("Add task first");
    }
});

//had to add a className for the list soa as to map it
let listDone = Array.from(document.getElementsByClassName("Lists"));

listDone.map(DoneList => {
    DoneList.addEventListener("click", (e)=>{
        //hapa nachekc after kumap the class, nacheck ni element gani imeclickiwa
        //then i change the class name accordingly
        (e.target.className ==="checked") ? e.target.className ="" : e.target.className ="checked";
    });
    });
