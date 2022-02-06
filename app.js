//Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Load all event listeners
loadEventListeners();

//load all event lisreners fn
function loadEventListeners() {
    //dom load event
    document.addEventListener('DOMContentLoaded', getTasks)
    //Add task event
    form.addEventListener('submit', addTask )
    //remove task
    taskList.addEventListener('click', removeTask)
    //clear tasks
    clearBtn.addEventListener('click', clearTasks);
    //filter tasks
    filter.addEventListener('keyup', filterTasks);

}

//get tasks
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
         //create LI eleemnt
         const li = document.createElement('li');
         li.className = 'collection-item'; //collection-item is materialises way of adding nice list
         //create text node and append to li
         li.appendChild(document.createTextNode(task));
         //Create new link eement
         const link = document.createElement('a')
         link.setAttribute('href', '#');
         link.className = 'delete-item secondary-content' //content class puts things to the right of parent divs
         link.innerHTML= '<i class="fas fa-trash-alt"></i>';
         //append delete link to li
         li.appendChild(link);
 
         //apend li to ul
         taskList.appendChild(li)
     
    })
}


function addTask(e){

    if(taskInput.value === ''){
        alert('Add a task')
    }
    
       else 
       { 
            //create LI eleemnt
            const li = document.createElement('li');
            li.className = 'collection-item'; //collection-item is materialises way of adding nice list
            //create text node and append to li
            li.appendChild(document.createTextNode(taskInput.value));
            //Create new link eement
            const link = document.createElement('a')
            link.setAttribute('href', '#');
            link.className = 'delete-item secondary-content' //content class puts things to the right of parent divs
            link.innerHTML= '<i class="fas fa-trash-alt"></i>';
            //append delete link to li
            li.appendChild(link);

            //apend li to ul
            taskList.appendChild(li)
        //store in local storage
            storeTaskInLS(taskInput.value);

            //clear input
            taskInput.value = '';
    }
   
        e.preventDefault();
};

//store task
function storeTaskInLS(task){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
        }
        
    }
    ///remove task from LS
    removeTaskFromLS(e.target.parentElement.parentElement);
}

function removeTaskFromLS(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    //loop through tasks and delete task matching taskitem
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks))

}

function clearTasks(){
    
    // taskList.innerHTML  = '' slower
    //faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLS();
}

function clearTasksFromLS(){
    localStorage.clear();
}
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
        }

    })
}





