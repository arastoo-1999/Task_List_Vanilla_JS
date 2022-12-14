const Day = document.querySelector(".days");
const Month = document.querySelector(".month");
const ClearAll = document.querySelector(".ca_tasks");
const Counter = document.querySelector(".numberOf-tasks");
const Task_list = document.querySelector(".task_list");
const Task_input = document.querySelector(".task_input");
const Add_btn = document.querySelector(".add_btn");
const Filter_Elem = document.querySelectorAll(".filter");

function SetDate(day, month) {
    Day.innerHTML = day;
    Month.innerHTML = month;
}

// Set Task-Date //
const NewDate = new Date();
const Stringdate = NewDate.toDateString();
const SplitedDate = Stringdate.split(" ");
const NewValues = new Array(SplitedDate[0], Math.round(SplitedDate[2]));
SetDate(NewValues.toString(), SplitedDate[1]);

function AddTask() {
    const Li = document.createElement("li");
    const Elements = `
    <input class='check_input' onclick='ItsDone(this)' type='checkbox'>
    <span class='text'>${Task_input.value}</span>
    <span onclick='Delete_Task(this)'><i class='fas fa-trash delete-icon'></i></span>`;
    Li.classList.add("tasks");
    Li.innerHTML = Elements;
    Task_input.value = "";
    Task_list.appendChild(Li);
    TaskCounter();
}

function Delete_Task(elem) {
    const task_Li = elem.closest(".tasks");
    task_Li.remove();
}
 
function TaskCounter() {
    const List = document.querySelectorAll(".tasks");
    Counter.textContent = List.length;
}

function ItsDone(el) {
    if(el.checked == true) {
        el.parentElement.classList.add("check-mood");
    } 
    else {
        el.parentElement.classList.remove("check-mood");
    }
}

function FilterTask(e) {
    const Lists = document.querySelectorAll(".tasks")
    Lists.forEach(elem => {
    // get filter's id //
    const Target = e.target;
    const ID = Target.dataset.filterId;
    switch (ID) {
        case "1":
            console.log("all");
            elem.style.display = "flex";
            break;
        case "2":
            console.log("pending");
            if(elem.classList.contains("check-mood")) {
                elem.style.display = "none";
            } 
            else {
                elem.style.display = "flex";
            }
            break;
        case "3":
            console.log("completed");
            if(!elem.classList.contains("check-mood")) {
                elem.style.display = "none";
            } 
            else {
                elem.style.display = "flex";
            }
    }
    })  
}

Add_btn.addEventListener("click", AddTask);
Filter_Elem.forEach(item => { item.addEventListener("click", FilterTask) });
ClearAll.addEventListener("click", () => {  
            Task_list.innerHTML = "";
            Counter.textContent = "0";
        })