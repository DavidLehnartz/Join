'use strict';

/* BOARD MAIN SCRIPT */


/**
 * This function is used to initialize onload
 * 
 */
function init() {
  renderDesktopTemplate();
  loadFetchedData();

  console.log(tasks);

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
  /* let sidebarTemplateContent = document.getElementById('sidebar_template'); */
  /* let headerTemplateContent = document.getElementById('header_template'); */
  let boardHeadlineContent = document.getElementById('board_headline');
  /* let kanbanBoardContent = document.getElementById('kanban_board'); */
  /* let navbarResponsiveContent = document.getElementById('navbar_responsive'); */

  /*   sidebarTemplateContent.innerHTML = getSidebarTemplate(); */
  /* headerTemplateContent.innerHTML = getHeaderTemplate(); */
  boardHeadlineContent.innerHTML = getBoardHeadlineTemplate();
  /*  kanbanBoardContent.innerHTML = getKanbanBoardTemplate(); */
  /* navbarResponsiveContent.innerHTML = getNavbarResponsiveTemplate(); */
}


function renderTasks() {
  let tasksContent = document.getElementById('to_do');
  tasksContent.innerHTML = "";

  for (let indexTasks = 0; indexTasks < tasks.length; indexTasks++) {
    let task = tasks[indexTasks];
    let priorityImage = getPriorityImage(task.priority);
    let categoryColor = getCategoryColor(task.category);
    tasksContent.innerHTML += getTasksTemplate(task, priorityImage, categoryColor);
  }

}


function renderDropdownContacts() {
  let dropdownContent = document.getElementById('dropdown_contacts');
  dropdownContent.innerHTML = "";

  for (let indexContacts = 0; indexContacts < contacts.length; indexContacts++) {
    let contact = contacts[indexContacts];
    dropdownContent.innerHTML += getDropdownContactsTemplate(contact);
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
    let priorityImage = getPriorityImage(task.priority);
    let categoryColor = getCategoryColor(task.category);
    taskPopUpContent.innerHTML = getTaskPopUpTemplate(task, priorityImage, categoryColor);
  }
  renderSubtasks(task);
}


function renderSubtasks(task) {
  let subtasksContent = document.getElementById('single_subtasks');
  subtasksContent.innerHTML = ""; 

  // Prüfen, ob subtasks ein Array ist
  if (Array.isArray(task.subtasks) && task.subtasks.length > 0) {
    task.subtasks.forEach(subtask => {
      subtasksContent.innerHTML += getSubtaskTemplate(subtask);
    });
  } 
  else {
    subtasksContent.innerHTML = "<p>No subtasks available</p>";
  }
}

function getSubtaskTemplate(subtask) {
  return `
    <div class="subtask">
      <img src="../assets/img/checkbox_false.png" alt="checkbox">
      <span>${subtask}</span>
    </div>
  `;
}

/* 
function renderInitials(task) {
  let initialsContent = document.getElementById('assignee_initials');
  initialsContent.innerHTML = "";

  if (Array.isArray(task.assignedTo) && task.assignedTo.length > 0) {
    task.assignedTo.forEach(assigned => {
      initialsContent.innerHTML += getInitialTemplate(assigned);
    })
  }
} */

/* function getInitialTemplate(assigned) {
  return `
        <div class="test">${assigned}</div>
  `;
} */


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
    task.subtasks = document.getElementById('input_subtask_add_subtask').value;

  }
  renderTasks();
  await updateTaskInFirebase(task);
  closeEditPopUp();
  openTaskPopUp(taskId);
}


/**
 * This function is used to render added subtasks
 * 
 * 
 */
function renderAddSubtasks() {
  let subtasksContent = document.getElementById('subtasks');
  subtasksContent.innerHTML = "";

  for (let indexTasks = 0; indexTasks < subtasks.length; indexTasks++) {
    subtasksContent.innerHTML += getSubtasksTemplate(tasks[indexTasks]);
  }
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
  renderAddSubtasks();
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
 * This function is used to clear inputs
 * Function can be found at: addSubtasks,
 */
function clearInputs() {
  document.getElementById('input_subtask_add_subtask').value = "";
}


function changeImageEdit() {
  document.getElementById('edit_img').src = '../assets/img/edit_blue.png';
}

function resetImageEdit() {
  document.getElementById('edit_img').src = '../assets/img/edit_black.png';
}


function changeImageDelete() {
  document.getElementById('delete_img').src = '../assets/img/delete_blue.png';
}

function resetImageDelete() {
  document.getElementById('delete_img').src = '../assets/img/delete_black.png';
}


function getCategoryColor(category) {
  if (category === "User Story") {
    return "rgb(0, 56, 255)";
  }
  else if (category === "Technical Task") {
    return "rgb(31, 215, 193)";
  }
  return "gray";
}


function getPriorityImage(priority) {
  if (priority === "Low") {
    return "../assets/img/prio_low_green.png";
  }
  else if (priority === "Medium") {
    return "../assets/img/prio_medium_orange.png";
  }
  else if (priority === "Urgent") {
    return "../assets/img/prio_urgent_red.png";
  }
  return "";
}


// Funktion zum Ändern des angeklickten Buttons
function changePrioButtons(selectedButton) {
  resetButtons();

  selectedButton.style.color = 'white';
  let img = selectedButton.querySelector('.prio-img');
  if (selectedButton.id === 'prio_urgent') {
    selectedButton.classList.add('prio-urgent-active');
    img.src = '../assets/img/urgent21.png';
  }
  else if (selectedButton.id === 'prio_medium') {
    selectedButton.classList.add('prio-medium-active');
    img.src = '../assets/img/medium.png';
  }
  else if (selectedButton.id === 'prio_low') {
    selectedButton.classList.add('prio-low-active');
    img.src = '../assets/img/low21.png';
  }
}


// Funktion zum Zurücksetzen aller Buttons
function resetButtons() {
  let buttons = document.querySelectorAll('.prio-btn');
  buttons.forEach(button => {

    button.style.color = 'black';

    let img = button.querySelector('.prio-img');
    if (button.id === 'prio_urgent') {
      img.src = '../assets/img/prio_urgent_red.png';
    }
    else if (button.id === 'prio_medium') {
      img.src = '../assets/img/prio_medium_orange.png';
    }
    else if (button.id === 'prio_low') {
      img.src = '../assets/img/prio_low_green.png';
    }

    button.classList.remove('prio-low-active', 'prio-medium-active', 'prio-urgent-active');
    button.classList.add('prio-btn');
  });
}



/*  function renderAddSubtasks(taskId) {
   const task = tasks.find((t) => t.id === taskId);
   const subtasksContent = document.getElementById('subtasks');
   subtasksContent.innerHTML = "";
 
   if (task && task.subtasks) {
     task.subtasks.forEach((subtask, index) => {
       subtasksContent.innerHTML += getSubtasksTemplate(subtask, index);
     });
   }
 } */


/* function addSubtask(taskId) {
  let inputAddedSubtask = document.getElementById('input_subtask_add_subtask');
  let addedSubtask = inputAddedSubtask.value.trim();
 
  if (!addedSubtask) {
    console.error("Please enter a valid subtask.");
    return;
  }
 
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.subtasks = task.subtasks || []; // Falls subtasks noch nicht existiert
    task.subtasks.push(addedSubtask);
    renderAddSubtasks(taskId);
    clearInputs();
  }
} */
