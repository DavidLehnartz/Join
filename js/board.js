"use strict";

/* BOARD MAIN SCRIPT */

let currentTaskId = null;
let selectedPriority = "";

function init(header, sidebar, link) {
  let boardContent = document.getElementById("board-content");
  renderDesktopTemplate(header, sidebar, link);
  setTimeout(() => {
    loadFetchedData();
    console.log(tasks);
    boardContent.classList.remove("hidden");
  }, 100);
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
  // let sidebarTemplateContent = document.getElementById('sidebar_template');
  // let headerTemplateContent = document.getElementById('header_template');
  let boardHeadlineContent = document.getElementById("board_headline");

  // sidebarTemplateContent.innerHTML = getSidebarTemplate();
  // headerTemplateContent.innerHTML = getHeaderTemplate();
  boardHeadlineContent.innerHTML = getBoardHeadlineTemplate();
}

function renderTasks() {
  let tasksContent = document.getElementById("to_do");
  tasksContent.innerHTML = "";

  tasks.forEach((task) => {
    let priorityImage = getPriorityImage(task.priority);
    let categoryColor = getCategoryColor(task.category);
    let assigneeInitials = renderAssigneeInitials(task.assignedTo);
    let { completedSubtasks, totalSubtasks } = calculateSubtaskProgress(task);
    let subtaskProgressHTML = renderSubtaskProgress(completedSubtasks, totalSubtasks);
    let { progressPercentage } = calculateSubtaskProgress(task);

    tasksContent.innerHTML += getTasksTemplate(task, priorityImage, categoryColor, assigneeInitials, subtaskProgressHTML, progressPercentage);
  });
}

function renderTaskPopUp(taskId) {
  let taskPopUpContent = document.getElementById("task_pop_up");
  taskPopUpContent.innerHTML = "";

  let task = tasks.find((t) => t.id === taskId);
  if (task) {
    let priorityImage = getPriorityImage(task.priority);
    let categoryColor = getCategoryColor(task.category);
    let assigneeContent = getAssigneesTemplate(task.assignedTo);

    taskPopUpContent.innerHTML = getTaskPopUpTemplate(task, priorityImage, categoryColor, assigneeContent);
  }

  renderSubtasks(taskId);
}

function renderEditTaskPopUp(taskId, priorityImage) {
  currentTaskId = taskId;

  let editTaskPopUpContent = document.getElementById("edit_task_pop_up");
  editTaskPopUpContent.innerHTML = "";

  let task = tasks.find((t) => t.id === taskId);

  if (task) {
    editTaskPopUpContent.innerHTML = getEditTaskPopUpTemplate(
      task,
      priorityImage
    );

    setPriorityButton(task.priority);
  }

  document.getElementById("edit_task_pop_up").classList.remove("responsive-pop-up-closed");
}

function renderSelectedContacts() {
  let selectedContactsContent = document.getElementById("selected_contacts");
  selectedContactsContent.innerHTML = "";

  for (let indexSelectedContacts = 0; indexSelectedContacts < selectedContacts.length; indexSelectedContacts++) {
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
  document.getElementById("overlay_task_pop_up").classList.remove("responsive-pop-up-closed");

  renderTaskPopUp(taskId);
}

function renderAddTaskPopUp() {
  let addTaskPopUpContent = document.getElementById("add_task_pop_up");
  addTaskPopUpContent.innerHTML = getAddTaskPopUpTemplate();
}

function openAddTaskPopUp() {
  document.getElementById("overlay_add_task_pop_up").classList.remove("responsive-pop-up-closed");

  renderAddTaskPopUp();
}

async function saveTaskChanges(taskId) {
  let task = tasks.find((t) => t.id === taskId);

  if (task) {
    task.title = document.getElementById("edit_title").value;
    task.description = document.getElementById("edit_description").value;
    task.dueDate = document.getElementById("edit_due_date").value;

    task.assignedContacts = [...selectedContacts];

    if (selectedPriority) {
      task.priority = selectedPriority;
    }
  }

  renderTasks();
  await updateTaskInFirebase(task);
  /* closeEditPopUp(); */
  closePopUps();
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

function changePrioButtonsEditPopUp(selectedButton) {
  resetButtonsEditPopUp();

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
  resetButtonsEditPopUp();

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
  let task = tasks.find(
    (t) => t.id === currentTaskId
  ); /* currentTaskId für den aktiven Task */
  if (task) {
    task.priority = priority;
  }
}

function resetButtonsEditPopUp() {
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
    button.classList.remove("prio-low-active", "prio-medium-active", "prio-urgent-active");
  });
}

function renderSubtasks(taskId) {
  let subtaskContent = document.getElementById("single_subtasks");
  subtaskContent.innerHTML = "";

  let task = tasks.find((t) => t.id === taskId);

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
            <img class="checkbox" onclick="toggleSubtasksCheckbox('${taskId}', ${index})" 
                 id="checkbox_subtask_${taskId}_${index}"
                 src="../assets/img/checkbox_false.png" 
                 alt="checkbox">
            <span>${subtask.name}</span>
          </div>
  `;
}

function toggleSubtasksCheckbox(taskId, index) {
  let checkbox = document.getElementById(`checkbox_subtask_${taskId}_${index}`);

  if (checkbox.src.includes('checkbox_false.png')) {
    checkbox.src = '../assets/img/checkbox_true.png';
  } else {
    checkbox.src = '../assets/img/checkbox_false.png';
  }
  renderTasks();
}

function calculateSubtaskProgress(task) {
  let totalSubtasks = task.subtasks ? task.subtasks.length : 0;
  let completedSubtasks = 0;

  if (totalSubtasks > 0) {
    for (let i = 0; i < totalSubtasks; i++) {
      let checkbox = document.getElementById(`checkbox_subtask_${task.id}_${i}`);
      if (checkbox && checkbox.src.includes("checkbox_true.png")) {
        completedSubtasks++;
      }
    }
  }
  let progressPercentage = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  return { completedSubtasks, totalSubtasks, progressPercentage };
}

function renderSubtaskProgress(completedSubtasks, totalSubtasks) {
  return `<span>${completedSubtasks}/${totalSubtasks} Subtasks Completed</span>`;
}

function renderAddSubtasksEditPopUp() {
  let addedSubtasksContent = document.getElementById("added_subtasks");
  addedSubtasksContent.innerHTML = "";

  addedSubtasks.forEach((addedSubtask) => {
    addedSubtasksContent.innerHTML += getAddedSubtasksTemplate(addedSubtask);
  });
}

function addSubtaskEditPopUp() {
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

    renderAddSubtasksEditPopUp();
    clearInputs();
  }

  updateButtonImage();
}

function deleteAddedSubtaskEditPopUp(id) {
  let index = addedSubtasks.findIndex((addedSubtask) => addedSubtask.id === id);

  if (index !== -1) {
    addedSubtasks.splice(index, 1);
    renderAddSubtasksEditPopUp();
    console.log("subtask deleted successfully", addedSubtasks);
  } else {
    console.error("subtask not found!", addedSubtasks);
  }
}

function updateButtonImage() {
  /* let ButtonImage = document.getElementById('input_button_image'); */
  let buttonContainer = document.getElementById("input_image_content");
  let inputAddedSubtask = document.getElementById("input_add_subtask").value.trim();

  if (inputAddedSubtask.length > 0) {
    buttonContainer.innerHTML = getBeforeButtonContainer();
  } else {
    buttonContainer.innerHTML = getAfterButtonContainer();
  }
}

function editSubtaskEditPopUp(id) {
  let subtask = addedSubtasks.find((sub) => sub.id === id);
  if (!subtask) return;

  let editedSubtask = document.querySelector(`li[data-id="${id}"]`);
  if (!editedSubtask) return;

  editedSubtask.classList.add("editing");

  editedSubtask.innerHTML = getEditSubtaskInput(id, subtask);

  console.log("save edit subtask", addedSubtasks);
}

function saveEditedSubtaskEditPopUp(id, newTitle) {
  let subtaskIndex = addedSubtasks.findIndex((sub) => sub.id === id);
  if (subtaskIndex !== -1 && newTitle.trim() !== "") {
    addedSubtasks[subtaskIndex].title = newTitle.trim();
  }

  renderAddSubtasksEditPopUp();
  console.log(addedSubtasks);
}

function handleEnterKey(event, id, inputElement) {
  if (event.key === "Enter") {
    saveEditedSubtaskEditPopUp(id, inputElement.value);
  }
}

function errorMessage() {
  let inputAddedSubtask = document.getElementById("input_add_subtask").value.trim();

  if (inputAddedSubtask === "") {
    document.getElementById("error_message").innerHTML = `Please enter a subtask!`;
    return true;
  }
  document.getElementById("error_message").innerHTML = "";
  return false;
}

function generateUniqueId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

function showIcons(listItem) {
  let iconContainer = listItem.querySelector(".list-icon-container");
  iconContainer.style.visibility = "visible";
}

function hideIcons(listItem) {
  let iconContainer = listItem.querySelector(".list-icon-container");
  iconContainer.style.visibility = "hidden";
}

function closePopUps() {
  document.getElementById("overlay_task_pop_up").classList.add("responsive-pop-up-closed");

  document.getElementById("overlay_add_task_pop_up").classList.add("responsive-pop-up-closed");

  document.getElementById("edit_task_pop_up").classList.add("responsive-pop-up-closed");
}

function clearInputs() {
  document.getElementById("input_add_subtask").value = "";
  updateButtonImage();
}

function changeImage(imgageId, action) {
  let img = document.getElementById(imgageId);

  if (action === 'edit') {
    if (img.src.includes("edit_blue.png")) {
      img.src = "../assets/img/edit_black.png";
    } else {
      img.src = "../assets/img/edit_blue.png";
    }
  } else if (action === 'delete') {
    if (img.src.includes("delete_blue.png")) {
      img.src = "../assets/img/delete_black.png";
    } else {
      img.src = "../assets/img/delete_blue.png";
    }
  }
}


/* function closeEditPopUp() {
  document
    .getElementById("edit_task_pop_up")
    .classList.add("responsive-pop-up-closed");
} */


/* function changeImageEdit() {
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
} */




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

/* function renderTasks() {
  const columns = {
      to_do: document.getElementById("to_do"),
      in_progress: document.getElementById("in_progress"),
      await_feedback: document.getElementById("await_feedback"),
      done: document.getElementById("done"),
  };

  // Alle Spalten leeren
  for (let column in columns) {
      columns[column].innerHTML = "";
  }

  tasks.forEach((task) => {
      let priorityImage = getPriorityImage(task.priority);
      let categoryColor = getCategoryColor(task.category);
      let assigneeInitials = renderAssigneeInitials(task.assignedTo);

      const column = columns[task.status];
      if (column) {
          column.innerHTML += getTasksTemplate(
              task,
              priorityImage,
              categoryColor,
              assigneeInitials
          );
      }
  });
} */