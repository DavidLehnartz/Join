'use strict';

/* BOARD MAIN SCRIPT */


let subtasks = [];


/**
 * This function is used to initialize onload
 * 
 */
function init() {
  renderDesktopTemplate();
  /*   renderBoardHeadline(); */

  /* renderEditTaskPopUp(); */
  /* renderNavbarResponsive(); */
}


/**
 * This function is used to generate onload the desktop_template.html for each html
 * Template can be find at "board_templates.js"
 */
function renderDesktopTemplate() {
  let sidebarTemplateContent = document.getElementById('sidebar_template');
  let headerTemplateContent = document.getElementById('header_template');
  let boardHeadlineContent = document.getElementById('board_headline');
  let navbarResponsiveContent = document.getElementById('navbar_responsive');

  sidebarTemplateContent.innerHTML = getSidebarTemplate();
  headerTemplateContent.innerHTML = getHeaderTemplate();
  boardHeadlineContent.innerHTML = getBoardHeadlineTemplate();
  navbarResponsiveContent.innerHTML = getNavbarResponsiveTemplate();
}


/**
 * This function is used to generate the task pop up
 * Template can be found at "board_templates.js"
 * 
 */
function renderTaskPopUp() {
  let taskPopUpContent = document.getElementById('task_pop_up');
  taskPopUpContent.innerHTML = '';
  taskPopUpContent.innerHTML = getTaskPopUpTemplate();
}


/**
 * This function is used to generate the edit task pop up
 * Template can be found at "board_templates.js"
 * 
 */
function renderEditTaskPopUp() {
  let editTaskPopUpContent = document.getElementById('edit_task_pop_up');
  editTaskPopUpContent.innerHTML = '';
  editTaskPopUpContent.innerHTML = getEditTaskPopUp();
}


/**
 * This function is used to open pop up board task onclick
 * 
 * 
 */
function openTaskPopUp() {
  document.getElementById('overlay_task_pop_up').classList.remove('responsive-pop-up-closed');

  renderTaskPopUp();
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

  // Überprüfen, ob das Eingabefeld leer ist
  if (inputAddedSubtask === "") {
    document.getElementById('error_message').innerHTML = `Please enter a subtask!`;
    return true; // Gibt `true` zurück, wenn eine Fehlermeldung angezeigt wurde
  }

  // Leert die Fehlermeldung, falls eine gültige Eingabe vorliegt
  document.getElementById('error_message').innerHTML = "";
  return false; // Gibt `false` zurück, wenn keine Fehlermeldung angezeigt wurde
}


/**
 * This function is used to clear inputs
 * Function can be found at: addSubtasks,
 */
function clearInputs() {
  document.getElementById('input_subtask_add_subtask').value = "";
}




















/* function toggleTaskPopUp() {
  document.getElementById('overlay_task_pop_up').classList.toggle('responsive-pop-up-closed');
  renderTaskPopUp();
} */



