'use strict';

/* BOARD MAIN SCRIPT */


/**
 * This function is used to initialize onload
 * 
 */
function init() {
  renderDesktopTemplate();
  loadFetchedData();
}


async function loadFetchedData() {
  try {
    await fetchTasksData();
    await fetchContactsData();
  } catch (error) {
    console.error(error);
  }
  renderTasks();

}


/**
 * This function is used to generate onload the desktop_template.html for each html
 * Template can be find at "board_templates.js"
 */
function renderDesktopTemplate() {
  let sidebarTemplateContent = document.getElementById('sidebar_template');
  let headerTemplateContent = document.getElementById('header_template');
  let boardHeadlineContent = document.getElementById('board_headline');
  /* let kanbanBoardContent = document.getElementById('kanban_board'); */
  let navbarResponsiveContent = document.getElementById('navbar_responsive');

  sidebarTemplateContent.innerHTML = getSidebarTemplate();
  headerTemplateContent.innerHTML = getHeaderTemplate();
  boardHeadlineContent.innerHTML = getBoardHeadlineTemplate();
  /*  kanbanBoardContent.innerHTML = getKanbanBoardTemplate(); */
  navbarResponsiveContent.innerHTML = getNavbarResponsiveTemplate();
}


function renderTasks() {
  let tasksContent = document.getElementById('to_do');
  tasksContent.innerHTML = "";

  for (let indexTasks = 0; indexTasks < tasks.length; indexTasks++
  ) {
    tasksContent.innerHTML += getTasksTemplate(tasks[indexTasks]);
  }
}


/**
 * This function is used to generate the task pop up
 * Template can be found at "board_templates.js"
 * 
 */
function renderTaskPopUp(taskId) {
  let taskPopUpContent = document.getElementById('task_pop_up');
  taskPopUpContent.innerHTML = "";

  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    taskPopUpContent.innerHTML = getTaskPopUpTemplate(task);
  }
}


/**
 * This function is used to open pop up board task onclick
 * 
 * 
 */
function openTaskPopUp(taskId) {
  document.getElementById('overlay_task_pop_up').classList.remove('responsive-pop-up-closed');

  renderTaskPopUp(taskId);
}


/**
 * This function is used to generate the edit task pop up
 * Template can be found at "board_templates.js"
 * 
 */
function renderEditTaskPopUp(taskId) {
  let editTaskPopUpContent = document.getElementById('edit_task_pop_up');
  editTaskPopUpContent.innerHTML = "";

  const task = tasks.find(t => t.id === taskId);

  if (task) {
    editTaskPopUpContent.innerHTML = getEditTaskPopUpTemplate(task);
  }
  document.getElementById('edit_task_pop_up').classList.remove('responsive-pop-up-closed');
}


async function saveTaskChanges(taskId) {
  const task = tasks.find(t => t.id === taskId);

  if (task) {
    task.title = document.getElementById('edit_title').value;
    task.description = document.getElementById('edit_description').value;
    task.dueDate = document.getElementById('edit_due_date').value;
  }
  renderTasks();
  await updateTaskInFirebase(task);
  closeEditPopUp();
  openTaskPopUp(taskId);
}


function closeEditPopUp() {
  document.getElementById('edit_task_pop_up').classList.add('responsive-pop-up-closed');
}



/**
 * This function is used to close pop up board task onclick
 * 
 * 
 */
function closePopUps() {
  document.getElementById('overlay_task_pop_up').classList.add('responsive-pop-up-closed');
}


/**
 * This function is used to render added subtasks
 * 
 * 
 */
function renderSubtasks() {
  let subtasksContent = document.getElementById('subtasks');
  subtasksContent.innerHTML = "";

  for (let indexSubtasks = 0; indexSubtasks < subtasks.length; indexSubtasks++) {
    subtasksContent.innerHTML += getSubtasksTemplate(indexSubtasks);
  }
}


function getSubtasksTemplate(indexSubtasks) {
  return `
          <li>${subtasks[indexSubtasks]}</li>
  `;
}


/**
 * This function is used to add a subtask to subtasks at edit task pop up
 *
 * @returns 
 */
function addSubtask() {
  let inputAddedSubtask = document.getElementById('input_subtask_add_subtask');
  let addedSubtask = inputAddedSubtask.value.trim();

  if (errorMessage()) {
    return;
  }

  subtasks.push(addedSubtask);
  renderSubtasks();
  clearInputs();
}


/**
 * This function is used to show an error message if subtask inputfield is empty (onclick)
 * 
 * 
 */
function errorMessage() {
  let inputAddedSubtask = document.getElementById('input_subtask_add_subtask').value.trim();

  if (inputAddedSubtask === "") {
    document.getElementById('error_message').innerHTML = `Please enter a subtask!`;
    return true;
  }

  document.getElementById('error_message').innerHTML = "";
  return false;
}


/**
 * This function is used to clear inputs
 * Function can be found at: addSubtasks,
 */
function clearInputs() {
  document.getElementById('input_subtask_add_subtask').value = "";
}