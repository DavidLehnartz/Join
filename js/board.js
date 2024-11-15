"use strict";

/* BOARD MAIN SCRIPT */

let currentTaskId = null;
let selectedPriority = "";

async function init(header, sidebar, link) {
  renderDesktopTemplate(header, sidebar, link);
  await loadFetchedData();

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

function renderDesktopTemplate(header, sidebar, link) {
  createHeader(header);
  createSidebar(sidebar, link);
  //let sidebarTemplateContent = document.getElementById('sidebar_template');
  //let headerTemplateContent = document.getElementById('header_template');
  let boardHeadlineContent = document.getElementById("board_headline");

  //sidebarTemplateContent.innerHTML = getSidebarTemplate();
  //headerTemplateContent.innerHTML = getHeaderTemplate();
  boardHeadlineContent.innerHTML = getBoardHeadlineTemplate();
}

function showHeaderMenu(headerId) {
  let headerMenu = document.getElementById(headerId);
  if (headerMenuShown) {
    headerMenu.innerHTML = "";
  } else {
    headerMenu.innerHTML = renderHeaderMenu();
  }
  headerMenuShown = !headerMenuShown;
}

/* ----- FÜR DRAG AND DROP ----- */

/* function renderTasks() {
  let tasksContent = document.getElementById('to_do');
  tasksContent.innerHTML = "";

  for (let indexTasks = 0; indexTasks < tasks.length; indexTasks++) {
    let task = tasks[indexTasks];
    let priorityImage = getPriorityImage(task.priority);
    let categoryColor = getCategoryColor(task.category);
    let assigneeInitials = renderAssigneeInitials(task.assignedTo);

    const { completedSubtasksCount, totalSubtasks, progressPercent } = calculateSubtaskProgress(task);

    tasksContent.innerHTML += getTasksTemplate(task, priorityImage, categoryColor, assigneeInitials,  completedSubtasksCount, totalSubtasks, progressPercent);
  }
  // renderAssigneeInitials();
} */

/* function renderTasks() {
  const columns = ['to_do', 'in_progress', 'await_feedback', 'done'];

  columns.forEach(columnId => {
    let tasksContent = document.getElementById(columnId);
    tasksContent.innerHTML = "";

    // Filtern der Aufgaben nach dem aktuellen Spaltenstatus
    let filteredTasks = tasks.filter(task => task.status === columnId);

    // Aufgaben in der aktuellen Spalte rendern
    filteredTasks.forEach(task => {
      let priorityImage = getPriorityImage(task.priority);
      let categoryColor = getCategoryColor(task.category);
      let assigneeInitials = renderAssigneeInitials(task.assignedTo);

      // Füge das Template für jede Aufgabe hinzu
      tasksContent.innerHTML += getTasksTemplate(task, priorityImage, categoryColor, assigneeInitials);
    });
  });
} */

/* ----------------------------------------------------- */

function renderTasks() {
  let tasksContent = document.getElementById("to_do");
  tasksContent.innerHTML = "";

  tasks.forEach((task) => {
    let priorityImage = getPriorityImage(task.priority);
    let categoryColor = getCategoryColor(task.category);
    let assigneeInitials = renderAssigneeInitials(task.assignedTo);

    tasksContent.innerHTML += getTasksTemplate(
      task,
      priorityImage,
      categoryColor,
      assigneeInitials
    );
  });
}

function renderTaskPopUp(taskId) {
  let taskPopUpContent = document.getElementById("task_pop_up");
  taskPopUpContent.innerHTML = "";

  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    let priorityImage = getPriorityImage(task.priority);
    let categoryColor = getCategoryColor(task.category);
    let assigneeContent = getAssigneesTemplate(task.assignedTo);

    taskPopUpContent.innerHTML = getTaskPopUpTemplate(
      task,
      priorityImage,
      categoryColor,
      assigneeContent
    );
  }

  renderSubtasks(taskId);
}

function renderEditTaskPopUp(taskId, priorityImage) {
  currentTaskId = taskId;

  let editTaskPopUpContent = document.getElementById("edit_task_pop_up");
  editTaskPopUpContent.innerHTML = "";

  const task = tasks.find((t) => t.id === taskId);

  if (task) {
    editTaskPopUpContent.innerHTML = getEditTaskPopUpTemplate(
      task,
      priorityImage
    );

    setPriorityButton(task.priority);
  }

  document
    .getElementById("edit_task_pop_up")
    .classList.remove("responsive-pop-up-closed");
}

function renderSelectedContacts() {
  let selectedContactsContent = document.getElementById("selected_contacts");
  selectedContactsContent.innerHTML = "";

  for (
    let indexSelectedContacts = 0;
    indexSelectedContacts < selectedContacts.length;
    indexSelectedContacts++
  ) {
    let contact = selectedContacts[indexSelectedContacts];
    selectedContactsContent.innerHTML += getSelectedContactsTemplate(contact);
  }
}

function renderAssigneeInitials(assignedTo) {
  let assigneeInitialsContent = "";

  if (Array.isArray(assignedTo)) {
    assignedTo.forEach((assignee) => {
      assigneeInitialsContent += getAssigneeInitialsTemplate(assignee);
    });
  }

  return assigneeInitialsContent;
}

function openTaskPopUp(taskId) {
  document
    .getElementById("overlay_task_pop_up")
    .classList.remove("responsive-pop-up-closed");

  renderTaskPopUp(taskId);
}

async function saveTaskChanges(taskId) {
  const task = tasks.find((t) => t.id === taskId);

  if (task) {
    task.title = document.getElementById("edit_title").value;
    task.description = document.getElementById("edit_description").value;
    task.dueDate = document.getElementById("edit_due_date").value;

    task.assignedContacts = [...selectedContacts];

    if (selectedPriority) {
      task.priority = selectedPriority;
    }

    //  const priorityButton = document.querySelector('.prio-btn.prio-urgent-active, .prio-btn.prio-medium-active, .prio-btn.prio-low-active');
    //task.priority = priorityButton ? priorityButton.id.replace('prio_', '') : '';
  }
  renderTasks();
  await updateTaskInFirebase(task);
  closeEditPopUp();
  openTaskPopUp(taskId);
}

function getCategoryColor(category) {
  if (category === "User Story") {
    return "rgb(0, 56, 255)";
  } else if (category === "Technical Task") {
    return "rgb(31, 215, 193)";
  }
  return "gray";
}

function getPriorityImage(priority) {
  if (priority === "Low") {
    return "../assets/img/prio_low_green.png";
  } else if (priority === "Medium") {
    return "../assets/img/prio_medium_orange.png";
  } else if (priority === "Urgent") {
    return "../assets/img/prio_urgent_red.png";
  }
  return "";
}

function changePrioButtons(selectedButton) {
  resetButtons();

  let img = selectedButton.querySelector(".prio-img");

  if (selectedButton.id === "prio_urgent") {
    selectedButton.classList.add("prio-urgent-active");
    img.src = "../assets/img/urgent21.png";
    selectedPriority = "Urgent";
    updateTaskPriority("Urgent");
  } else if (selectedButton.id === "prio_medium") {
    selectedButton.classList.add("prio-medium-active");
    img.src = "../assets/img/medium.png";
    selectedPriority = "Medium";
    updateTaskPriority("Medium");
  } else if (selectedButton.id === "prio_low") {
    selectedButton.classList.add("prio-low-active");
    img.src = "../assets/img/low21.png";
    selectedPriority = "Low";
    updateTaskPriority("Low");
  } else if (selectedButton.id === "prio_low") {
    selectedButton.classList.add("prio-low-active");
    img.src = "../assets/img/low21.png";
    selectedPriority = "Low";
    updateTaskPriority("Low");
  }
}

function setPriorityButton(priority) {
  resetButtons();

  if (priority === "Urgent") {
    document.getElementById("prio_urgent").classList.add("prio-urgent-active");
    document.getElementById("prio_urgent").querySelector(".prio-img").src =
      "../assets/img/urgent21.png";
  } else if (priority === "Medium") {
    document.getElementById("prio_medium").classList.add("prio-medium-active");
    document.getElementById("prio_medium").querySelector(".prio-img").src =
      "../assets/img/medium.png";
  } else if (priority === "Low") {
    document.getElementById("prio_low").classList.add("prio-low-active");
    document.getElementById("prio_low").querySelector(".prio-img").src =
      "../assets/img/low21.png";
  }
}

function updateTaskPriority(priority) {
  const task = tasks.find(
    (t) => t.id === currentTaskId
  ); /* currentTaskId für den aktiven Task */
  if (task) {
    task.priority = priority;
  }
}

function resetButtons() {
  let buttons = document.querySelectorAll(".prio-btn");
  buttons.forEach((button) => {
    let img = button.querySelector(".prio-img");
    if (button.id === "prio_urgent") {
      img.src = "../assets/img/prio_urgent_red.png";
    } else if (button.id === "prio_medium") {
      img.src = "../assets/img/prio_medium_orange.png";
    } else if (button.id === "prio_low") {
      img.src = "../assets/img/prio_low_green.png";
    }
    button.classList.remove(
      "prio-low-active",
      "prio-medium-active",
      "prio-urgent-active"
    );
  });
}

/* ----- versuch subtasks in ein globales array zu pushen ----- */

/* function toggleCheckboxSubtasks(subtaskId) {
  let checkbox = document.getElementById(`checkbox_${subtaskId}`);

  if (checkbox.src.includes('checkbox_false.png')) {
    checkbox.src = '../assets/img/checkbox_true.png';
    // Optional: Subtask zum Array hinzufügen, wenn nicht vorhanden
    const subtask = subtasks.find(subtask => subtask.id === subtaskId);
    if (!subtask) {
      subtasks.push(
        {
          id: subtaskId,
          completed: true
        });
    } else {
      subtask.completed = true; // Setze completed auf true
    }
  } else {
    checkbox.src = '../assets/img/checkbox_false.png';

    const index = subtasks.findIndex(subtask => subtask.id === subtaskId);
    if (index !== -1) {
      subtasks[index].completed = false; // Setze completed auf false
      subtasks.splice(index, 1)
    }
  }
  renderTasks();
  console.log(subtasks); 
} */

function renderSubtasks(taskId) {
  let subtaskContent = document.getElementById("single_subtasks");
  subtaskContent.innerHTML = "";

  const task = tasks.find((t) => t.id === taskId);

  if (task && Array.isArray(task.subtasks) && task.subtasks.length > 0) {
    task.subtasks.forEach((subtask, index) => {
      subtaskContent.innerHTML += getSubtasksTemplate(taskId, subtask, index);
    });
  } else {
    subtaskContent.innerHTML = "<p>No subtasks found</p>";
  }
}

function getSubtasksTemplate(taskId, subtask, index) {
  return `
          <div class="subtask" id="subtask_${taskId}_${index}">
            <img class="checkbox" onclick="toggleCheckboxSubtasks('${taskId}', ${index})" 
                 id="checkbox_${taskId}_${index}" 
                 src="../assets/img/checkbox_false.png" 
                 alt="checkbox">
            <span>${subtask.name}</span>
          </div>
  `;
}

function updateButtonImage() {
  /* let ButtonImage = document.getElementById('input_button_image'); */
  let buttonContainer = document.getElementById("input_image_content");
  let inputAddedSubtask = document
    .getElementById("input_add_subtask")
    .value.trim();

  if (inputAddedSubtask.length > 0) {
    buttonContainer.innerHTML = ` <button class="pop-up-edit-task-input-btn">
                                    <div id="button_content_with_images" class="pop-up-edit-task-input-btn-img-container">
                                       <img onclick="clearInputs()" class="pop-up-edit-task-input-btn-img" src="../assets/img/iconoir_cancel.png" alt="image 1">
                                       <div class="vertical_line"></div>
                                       <img onclick="addSubtask()" class="pop-up-edit-task-input-btn-img" src="../assets/img/check_black.png" alt="image 2">
                                    </div>
                                  </button>
                                `;
  } else {
    buttonContainer.innerHTML = ` <button class="pop-up-edit-task-input-btn">
                                    <img id="input_button_image"
                                    class="pop-up-edit-task-input-btn-img"
                                    src="../assets/img/add_black.png"
                                    alt=""
                                    />
                                  </button> 
                                `;
  }
}

function addSubtask() {
  let inputAddedSubtask = document.getElementById("input_add_subtask");
  let addedSubtaskTitle = inputAddedSubtask.value.trim();
  let addedSubtask = {
    id: generateUniqueId(),
    title: addedSubtaskTitle,
  };

  if (errorMessage()) {
    return;
  } else {
    addedSubtasks.push(addedSubtask);
    console.log("added subtasks arr", addedSubtasks);

    renderAddSubtasks();
    clearInputs();
  }

  updateButtonImage();
}

function generateUniqueId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

function renderAddSubtasks() {
  let addedSubtasksContent = document.getElementById("added_subtasks");
  addedSubtasksContent.innerHTML = "";

  addedSubtasks.forEach((addedSubtask) => {
    addedSubtasksContent.innerHTML += getAddedSubtasksTemplate(addedSubtask);
  });
}

function getAddedSubtasksTemplate(addedSubtask) {
  return `
          <li onmouseover="showIcons(this)" onmouseout="hideIcons(this)" class="added-subtask-item">
             <span>${addedSubtask.title}</span>
              <div class="list-icon-container">
                <img  class="icon-container-images " src="../assets/img/edit.png" alt="edit icon">
                <div class="vertical_line"></div>
                <img onclick="deleteAddedSubtask('${addedSubtask.id}')" class="icon-container-images " src="../assets/img/delete.png" alt="delete icon">
              </div>
          </li>
  `;
}

function showIcons(listItem) {
  const iconContainer = listItem.querySelector(".list-icon-container");
  iconContainer.style.visibility = "visible";
}

function hideIcons(listItem) {
  const iconContainer = listItem.querySelector(".list-icon-container");
  iconContainer.style.visibility = "hidden";
}

function errorMessage() {
  let inputAddedSubtask = document
    .getElementById("input_add_subtask")
    .value.trim();

  if (inputAddedSubtask === "") {
    document.getElementById(
      "error_message"
    ).innerHTML = `Please enter a subtask!`;
    return true;
  }
  document.getElementById("error_message").innerHTML = "";
  return false;
}

function deleteAddedSubtask(id) {
  let index = addedSubtasks.findIndex((addedSubtask) => addedSubtask.id === id);

  if (index !== -1) {
    addedSubtasks.splice(index, 1);
    renderAddSubtasks();
  }

  console.log(addedSubtasks);
}

function closeEditPopUp() {
  document
    .getElementById("edit_task_pop_up")
    .classList.add("responsive-pop-up-closed");
}

function closePopUps() {
  document
    .getElementById("overlay_task_pop_up")
    .classList.add("responsive-pop-up-closed");
}

function clearInputs() {
  document.getElementById("input_add_subtask").value = "";
  updateButtonImage();
}

function changeImageEdit() {
  document.getElementById("edit_img").src = "../assets/img/edit_blue.png";
}

function resetImageEdit() {
  document.getElementById("edit_img").src = "../assets/img/edit_black.png";
}

function changeImageDelete() {
  document.getElementById("delete_img").src = "../assets/img/delete_blue.png";
}

function resetImageDelete() {
  document.getElementById("delete_img").src = "../assets/img/delete_black.png";
}

/* ---------- WIRD NOCH GEBRAUCHT ---------- */

/**
 * This function is used to render added subtasks
 *
 *
 */
/* function renderAddSubtasks() {
  let subtasksContent = document.getElementById('subtasks');
  subtasksContent.innerHTML = "";

/* ------------------------------- GPT ---------------------------------- */

async function toggleCheckboxSubtasks(taskId, subtaskIndex) {
  const task = tasks.find((t) => t.id === taskId);
  if (!task) return;
}
/**
 * This function is used to add a subtask to subtasks at edit task pop up
 *
 *
 */
/* function addSubtask() {
  let inputAddedSubtask = document.getElementById('input_subtask_add_subtask');
  let addedSubtask = inputAddedSubtask.value.trim();
  // Toggle the completion status of the specified subtask
  task.subtasks[subtaskIndex].completed = !task.subtasks[subtaskIndex].completed;

  // Update the task in Firebase
  await updateTaskInFirebase(task);

  // Re-render the subtasks to reflect the change in the UI
  renderSubtasks(taskId);
}

/* ------------------------------------------------------------------- */

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

/* --------- drag and drop mit empty kanban wrapper message -------- */

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

/* ---- neuen subtask erstellen ---- */

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
  let inputAddedSubtask = document.getElementById('input_add_subtask');
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
