'use strict';

/* FILTER */

function getFilderedTask() {
    let filterInput = document.getElementById('filter_input').value.toLowerCase();
    let filterInputResponsive = document.getElementById('filter_input_responsive').value.toLowerCase();

    let activeFilter = filterInput || filterInputResponsive;
    if (activeFilter.length < 3) {
        showAllTasks();
    } else {
        filterTaskByTitleOrDescription(activeFilter);
    }
}


function filterTaskByTitleOrDescription(filterInput) {
    let kanbanTasks = document.querySelectorAll('.kanban-task');
    let foundAny = false;

    kanbanTasks.forEach(task => {
        let taskTitle = task.querySelector('.task-title').textContent.toLowerCase();
        let taskDescription = task.querySelector('.kanban-task-description').textContent.toLowerCase();

        if (taskTitle.includes(filterInput) || taskDescription.includes(filterInput)) {
            task.style.display = '';
            foundAny = true;
            // task.style.opacity = '1';
        } else {
            task.style.display = 'none';
            //  task.style.opacity = '0.3'; 
        }
    });

    toggleNoMatchMessage(!foundAny);
}


function showAllTasks() {
    let kanbanTask = document.querySelectorAll('.kanban-task');

    kanbanTask.forEach(task => {
        task.style.display = '';
    });
    toggleNoMatchMessage(false);
}


function toggleNoMatchMessage(show) {
    const noMatchMessage = document.getElementById('no_matching_task');
    if (show) {
        noMatchMessage.style.display = 'block'; 
    } else {
        noMatchMessage.style.display = 'none'; 
    }
}


function disableBtn() {
    let inputBtn = document.getElementById('input_btn');

    inputBtn.disabled = true;
}