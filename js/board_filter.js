"use strict";

/* FILTER */

/**
 * Filters tasks displayed on the Kanban board based on user input in the search bar. If the input is less than 3 characters, it shows all tasks.
 */
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

/**
 * Filters Kanban tasks by comparing the input with task titles and descriptions. Matches are displayed, and others are hidden.
 * @param {string} filterInput - The text input to filter tasks by.
 */
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

/**
 * Displays all tasks in the Kanban board by resetting their visibility.
 */
function showAllTasks() {
    let kanbanTask = document.querySelectorAll('.kanban-task');

    kanbanTask.forEach(task => {
        task.style.display = '';
    });
    toggleNoMatchMessage(false);
}

/**
 * Toggles the display of a "no matching tasks" message based on whether any tasks match the filter input.
 * @param {boolean} show - If true, displays the "no matching tasks" message; otherwise, hides it.
 */
function toggleNoMatchMessage(show) {
    const noMatchMessage = document.getElementById('no_matching_task');
    if (show) {
        /* noMatchMessage.style.display = 'block';  */
        noMatchMessage.classList.remove('d_none');
    } else {
        /* noMatchMessage.style.display = 'none'; */ 
        noMatchMessage.classList.add('d_none');
    }
}

/**
 * Disables a button element with the ID `input_btn`, typically used to prevent further user input or actions.
 */
function disableBtn() {
    let inputBtn = document.getElementById('input_btn');

    inputBtn.disabled = true;
}