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
  let sidebarTemplateContent = document.getElementById('sidebar_template');
  let headerTemplateContent = document.getElementById('header_template');
  let boardHeadlineContent = document.getElementById('board_headline');

  sidebarTemplateContent.innerHTML = getSidebarTemplate();
  headerTemplateContent.innerHTML = getHeaderTemplate();
  boardHeadlineContent.innerHTML = getBoardHeadlineTemplate();
}


function renderTasks() {
  let tasksContent = document.getElementById('to_do');
  tasksContent.innerHTML = "";

  for (let indexTasks = 0; indexTasks < tasks.length; indexTasks++) {
    let task = tasks[indexTasks];
    let priorityImage = getPriorityImage(task.priority);
    let categoryColor = getCategoryColor(task.category);
    let assigneeInitials = renderAssigneeInitials(task.assignedTo);
    tasksContent.innerHTML += getTasksTemplate(task, priorityImage, categoryColor, assigneeInitials);
  }
  // renderAssigneeInitials();
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
    /*    transformSubtasks(task); */
    let priorityImage = getPriorityImage(task.priority);
    let categoryColor = getCategoryColor(task.category);
    let assigneeContent = getAssigneesTemplate(task.assignedTo);
    taskPopUpContent.innerHTML = getTaskPopUpTemplate(task, priorityImage, categoryColor, assigneeContent);
  }
  /*   renderSubtasks(task); */
}


/**
 * This function is used to generate the edit task pop up
 * Template can be found at "board_templates.js"
 * 
 */
function renderEditTaskPopUp(taskId, priorityImage) {
  currentTaskId = taskId;

  let editTaskPopUpContent = document.getElementById('edit_task_pop_up');
  editTaskPopUpContent.innerHTML = "";

  const task = tasks.find(t => t.id === taskId);

  if (task) {
    editTaskPopUpContent.innerHTML = getEditTaskPopUpTemplate(task, priorityImage);
  }

  document.getElementById('edit_task_pop_up').classList.remove('responsive-pop-up-closed');
}


function renderDropdownContacts() {
  let dropdownContent = document.getElementById('dropdown_contacts');
  dropdownContent.innerHTML = "";

  for (let indexContacts = 0; indexContacts < contacts.length; indexContacts++) {
    let contact = contacts[indexContacts];
    dropdownContent.innerHTML += getDropdownContactsTemplate(contact);
  }
}


function renderSelectedContacts() {
  let selectedContactsContent = document.getElementById('selected_contacts');
  selectedContactsContent.innerHTML = "";

  for (let indexSelectedContacts = 0; indexSelectedContacts < selectedContacts.length; indexSelectedContacts++) {
    let contact = selectedContacts[indexSelectedContacts];
    selectedContactsContent.innerHTML += getSelectedContactsTemplate(contact);
  }
}


function renderAssigneeInitials(assignedTo) {

  let assigneeInitialsContent = "";

  if (Array.isArray(assignedTo)) {
    assignedTo.forEach(assignee => {
      assigneeInitialsContent += getAssigneeInitialsTemplate(assignee);
    });
  }

  return assigneeInitialsContent;
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


async function saveTaskChanges(taskId) {
  const task = tasks.find(t => t.id === taskId);

  if (task) {
    task.title = document.getElementById('edit_title').value;
    task.description = document.getElementById('edit_description').value;
    task.dueDate = document.getElementById('edit_due_date').value;
    task.subtasks = document.getElementById('input_subtask_add_subtask').value;

    /*  task.assignedContacts = [...selectedContacts]; */

    const priorityButton = document.querySelector('.prio-btn.prio-urgent-active, .prio-btn.prio-medium-active, .prio-btn.prio-low-active');
    task.priority = priorityButton ? priorityButton.id.replace('prio_', '') : ''; 

  }
  renderTasks();
  await updateTaskInFirebase(task);
  closeEditPopUp();
  openTaskPopUp(taskId);
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


let selectedPriority = '';


function getPriorityImage(priority) {
  if (priority === "low") {
    return "../assets/img/prio_low_green.png";
  }
  else if (priority === "medium") {
    return "../assets/img/prio_medium_orange.png";
  }
  else if (priority === "urgent") {
    return "../assets/img/prio_urgent_red.png";
  }
  return "";
}


function changePrioButtons(selectedButton) {
  resetButtons();

  let img = selectedButton.querySelector('.prio-img');

  if (selectedButton.id === 'prio_urgent') {
    selectedButton.classList.add('prio-urgent-active');
    img.src = '../assets/img/urgent21.png';
    selectedPriority = 'urgent';
   /* updateTaskPriority('Urgent'); */
  }
  else if (selectedButton.id === 'prio_medium') {
    selectedButton.classList.add('prio-medium-active');
    img.src = '../assets/img/medium.png';
    selectedPriority = 'medium';
    /* updateTaskPriority('Medium'); */
  }
  else if (selectedButton.id === 'prio_low') {
    selectedButton.classList.add('prio-low-active');
    img.src = '../assets/img/low21.png';
    selectedPriority = 'low';
    /* updateTaskPriority('Low'); */
  }
}


function setPriorityButton(priority) {
  resetButtons(); 

  if (priority === 'urgent') {
    document.getElementById('prio_urgent').classList.add('prio-urgent-active');
    document.getElementById('prio_urgent').querySelector('.prio-img').src = '../assets/img/urgent21.png';
  } else if (priority === 'medium') {
    document.getElementById('prio_medium').classList.add('prio-medium-active');
    document.getElementById('prio_medium').querySelector('.prio-img').src = '../assets/img/medium.png';
  } else if (priority === 'low') {
    document.getElementById('prio_low').classList.add('prio-low-active');
    document.getElementById('prio_low').querySelector('.prio-img').src = '../assets/img/low21.png';
  }
}


// Hilfsfunktion, um die Task-Priorität zu aktualisieren
function updateTaskPriority(priority) {
  const task = tasks.find(t => t.id === currentTaskId); /* currentTaskId für den aktiven Task */
  if (task) {
    task.priority = priority; 
  }
}


function resetButtons() {
  let buttons = document.querySelectorAll('.prio-btn');
  buttons.forEach(button => {
    /*    button.style.color = 'black'; */
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
  });
}


function toggleCheckbox(checkboxId, contactInitial, contactColor) {
  let checkbox = document.getElementById(checkboxId);

  if (checkbox.src.includes('checkbox_false.png')) {
    checkbox.src = '../assets/img/checkbox_true.png';
    selectedContacts.push(
      {
        id: checkboxId,
        initial: contactInitial,
        color: contactColor
      });
  }
  else {
    checkbox.src = '../assets/img/checkbox_false.png';
    const index = selectedContacts.findIndex(contact => contact.id === checkboxId);
    if (index !== -1) {
      selectedContacts.splice(index, 1); 
    }
  }
  renderSelectedContacts();
  console.log(selectedContacts);

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





/* function getPriorityImage(priority) {
  switch (priority) {
      case 'urgent':
          return '../assets/img/prio_urgent_red.png';
      case 'medium':
          return '../assets/img/prio_medium_orange.png';
      case 'low':
          return '../assets/img/prio_low_green.png';
      default:
          console.error('Unbekannte Priorität:', priority);
          return '';
  }
} */





/* function renderTasks() {
  clearColumns();
 
  for (let indexTasks = 0; indexTasks < tasks.length; indexTasks++) {
    let task = tasks[indexTasks];
    let priorityImage = getPriorityImage(task.priority);
    let categoryColor = getCategoryColor(task.category);
    let assigneeInitials = renderAssigneeInitials(task.assignedTo);
 
    let columnId = task.status;
    let column = document.getElementById(columnId);
 
    if (column) {
      column.innerHTML += getTasksTemplate(task, priorityImage, categoryColor, assigneeInitials);
    } else {
      console.error(`Spalte mit ID ${columnId} nicht gefunden.`);
    }
  }
   // updateEmptyMessages();
}  */


/* function clearColumns() {
 document.getElementById('to_do').innerHTML = "";
 document.getElementById('in_progress').innerHTML = "";
 document.getElementById('await_feedback').innerHTML = "";
 document.getElementById('done').innerHTML = "";
} */


/*  function updateEmptyMessages() {
   
   const columnsWithTasks = {
     to_do: false,
     in_progress: false,
     await_feedback: false,
     done: false
   };
 
   tasks.forEach(task => {
     columnsWithTasks[task.status] = true; 
   });
 
   for (const columnId in columnsWithTasks) {
     const messageElement = document.getElementById(`${columnId}_message`);
     if (!columnsWithTasks[columnId]) {
       messageElement.style.display = 'block'; 
     } else {
       messageElement.style.display = 'none'; 
     }
   }
 } */




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
    task.subtasks = task.subtasks || []; 
    task.subtasks.push(addedSubtask);
    renderAddSubtasks(taskId);
    clearInputs();
  }
} */




/* function renderSubtasks(task) {
let subtasksContent = document.getElementById('single_subtasks');
subtasksContent.innerHTML = "";

// Prüfen, ob subtasks ein Array ist
if (Array.isArray(task.subtasks) && task.subtasks.length > 0) {
  task.subtasks.forEach(subtask => {
    const subtaskImage = getSubtaskImage(subtask.checked);
    subtasksContent.innerHTML += getSubtaskTemplate(task, subtaskImage);
  });
}
else {
  subtasksContent.innerHTML = "<p>No subtasks available</p>";
} 
}*/

/* function getSubtaskTemplate(task, subtaskImage) {
  return `
    <div class="subtask">
      <img onclick="toggleSubtaskStatus()"
           id="subtask_image"
           src="${subtaskImage}" alt="checkbox">
      <span>${task.subtasks}</span>
    </div>
  `;
} */


/* function getSubtaskImage(isChecked) {
  return isChecked ? "../assets/img/checkbox_true.png" : "../assets/img/checkbox_false.png";
} */

/* async function toggleSubtaskStatus(taskId, subtaskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  const subtask = task.subtasks.find(s => s.id === subtaskId);
  if (subtask) {
    // Status wechseln
    subtask.checked = !subtask.checked;

  
    const subtaskElement = document.getElementById(`subtask_image-${taskId}-${subtaskId}`);
    if (subtaskElement) {
      subtaskElement.src = getSubtaskImage(subtask.checked);
    }

    
    await updateTaskInFirebase(task);

    
    updateTaskProgress(taskId);
  }
} */

/* function transformSubtasks(task) {
  if (Array.isArray(task.subtasks)) {
    task.subtasks = task.subtasks.map((title, index) => ({
      id: `subtask-${task.id}-${index}`, 
      title: title,
      checked: false 
    }));
  }
} */