'use strict';

/* FILTER */


function filterTaskByTitleOrDescription() {
    let filterInput = document.getElementById('filter_input').value.toLowerCase();
    let kanbanTask = document.querySelectorAll('.kanban-task');
    /* let foundAny = false; */

    kanbanTask.forEach(task => {
        let taskTitle = task.querySelector('.task-title').textContent.toLowerCase();
        let taskDescription = task.querySelector('.kanban-task-description').textContent.toLowerCase();

        if (taskTitle.includes(filterInput) || taskDescription.includes(filterInput)) {
            task.style.display = '';
            /* task.style.opacity = '1'; */
            /*  foundAny = true; */
        } else {
            task.style.display = 'none';
           /*  task.style.opacity = '0.3'; */

        }
    });

    /* toggleNoMatchMessage(true); */
}


function getFilderedTask() {
    let filterInput = document.getElementById('filter_input').value.toLowerCase();
   
    if (filterInput.length < 3) {
        showAllTasks();
    } else {
        filterTaskByTitleOrDescription(filterInput);
    }
}


function showAllTasks() {
    let kanbanTask = document.querySelectorAll('.kanban-task');

    kanbanTask.forEach(task => {
        task.style.display = '';
    });
    /* toggleNoMatchMessage(true); */
}


function disableBtn() {
    let inputBtn = document.getElementById('input_btn');

    inputBtn.disabled = true;
}


/* function clearInput() {
    document.getElementById('filter_input').value = '';
    
} */


/* function isTaskFound(foundAny) {
    let noMatchingTaskMessage = document.getElementById('no_matching_task');
    let kanbanTask = document.querySelectorAll('.kanban-task');

    if (foundAny) {
        noMatchingTaskMessage.classList.remove('d_none');
    } else{
        noMatchingTaskMessage.classList.remove('d_none');
    }
} */


/*  function toggleNoMatchMessage(foundAny) {
     let noMatchMessage = document.getElementById('no-matching-tasks');
     noMatchMessage.style.display = foundAny ? 'none' : 'block';
 } */