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
  let boardHeadlineContent = document.getElementById("board_headline");
  boardHeadlineContent.innerHTML = getBoardHeadlineTemplate();
}

function renderTaskPopUp(taskId) {
  let taskPopUpContent = document.getElementById("task_pop_up");
  taskPopUpContent.innerHTML = "";
  let task = tasks.find((t) => t.id === taskId);
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
  let task = tasks.find((t) => t.id === taskId);
  if (task) {
    editTaskPopUpContent.innerHTML = getEditTaskPopUpTemplate(
      task,
      priorityImage
    );
    renderSelectedContacts();
    setPriorityButton(task.priority);
  }
  document
    .getElementById("edit_task_pop_up")
    .classList.remove("responsive-pop-up-closed");
}

function renderSelectedContacts() {
  let selectedContactsContent = document.getElementById("selected_contacts");
  selectedContactsContent.innerHTML = "";
  if (selectedContacts) {
    for (let i = 0; i < selectedContacts.length; i++) {
      let contact = selectedContacts[i];
      selectedContactsContent.innerHTML += getSelectedContactsTemplate(contact);
    }
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

function renderAddTaskPopUp() {
  let addTaskPopUpContent = document.getElementById("add_task_pop_up");
  addTaskPopUpContent.innerHTML = getAddTaskPopUpTemplate();
}

function openAddTaskPopUp() {
  document
    .getElementById("overlay_add_task_pop_up")
    .classList.remove("responsive-pop-up-closed");
  renderAddTaskPopUp();
}

async function saveTaskChanges(taskId) {
  let task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.title = document.getElementById("edit_title").value;
    task.description = document.getElementById("edit_description").value;
    task.dueDate = document.getElementById("edit_due_date").value;
    task.assignedTo = [...selectedContacts];
    if (selectedPriority) {
      task.priority = selectedPriority;
    }
    task.subtasks = [...addedSubtasks];
  }
  renderTasks();
  await updateTaskInFirebase(task);
  selectedContacts = [];
  addedSubtasks = [];
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
    button.classList.remove(
      "prio-low-active",
      "prio-medium-active",
      "prio-urgent-active"
    );
  });
}

function renderSubtasks(taskId) {
  let subtaskContent = document.getElementById("single_subtasks");
  subtaskContent.innerHTML = "";
  let task = tasks.find((t) => t.id === taskId);
  if (task && Array.isArray(task.subtasks) && task.subtasks.length > 0) {
    task.subtasks.forEach((subtask, index) => {
      if (subtask.completed) {
        subtaskContent.innerHTML += getDoneSubtasksTemplate(
          taskId,
          subtask,
          index
        );
      } else {
        subtaskContent.innerHTML += getSubtasksTemplate(taskId, subtask, index);
      }
    });
  } else {
    subtaskContent.innerHTML = "<p>No subtasks found</p>";
  }
}

function toggleSubtasksCheckbox(taskId, index) {
  let checkbox = document.getElementById(`checkbox_subtask_${taskId}_${index}`);
  let task = tasks.find((t) => t.id === taskId);
  if (checkbox.src.includes("checkbox_false.png")) {
    checkbox.src = "../assets/img/checkbox_true.png";
    task.subtasks[index].completed = true;
    updateTaskInFirebase(task);
  } else {
    checkbox.src = "../assets/img/checkbox_false.png";
    task.subtasks[index].completed = false;
    updateTaskInFirebase(task);
  }
  renderTasks();
}

function renderAddSubtasksEditPopUp() {
  let addedSubtasksContent = document.getElementById("added_subtasks");
  addedSubtasksContent.innerHTML = "";

  addedSubtasks.forEach((addedSubtask) => {
    addedSubtasksContent.innerHTML += getAddedSubtasksTemplate(addedSubtask);
  });
}

function addSubtaskEditPopUp(taskId) {
  let inputAddedSubtask = document.getElementById("input_add_subtask");
  let addedSubtaskTitle = inputAddedSubtask.value.trim();
  let task = tasks.find((t) => t.id === taskId);
  addedSubtasks = task.subtasks ? task.subtasks : [];
  console.log(addedSubtasks);
  let addedSubtask = {
    id: generateUniqueId(),
    name: addedSubtaskTitle,
    completed: false,
  };
  if (errorMessage()) {
    return;
  } else {
    addedSubtasks.push(addedSubtask);
    renderAddSubtasksEditPopUp();
    clearInputs(taskId);
  }
  updateTaskInFirebase(task);
  updateButtonImage(taskId);
}

function deleteAddedSubtaskEditPopUp(name) {
  let index = addedSubtasks.findIndex(
    (addedSubtask) => addedSubtask.name === name
  );
  if (index !== -1) {
    addedSubtasks.splice(index, 1);
    renderAddSubtasksEditPopUp();
    console.log("subtask deleted successfully", addedSubtasks);
  } else {
    console.error("subtask not found!", addedSubtasks);
  }
}

function updateButtonImage(taskId) {
  /* let ButtonImage = document.getElementById('input_button_image'); */
  let buttonContainer = document.getElementById("input_image_content");
  let inputAddedSubtask = document
    .getElementById("input_add_subtask")
    .value.trim();

  if (inputAddedSubtask.length > 0) {
    buttonContainer.innerHTML = getBeforeButtonContainer(taskId);
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
  document
    .getElementById("overlay_task_pop_up")
    .classList.add("responsive-pop-up-closed");

  document
    .getElementById("overlay_add_task_pop_up")
    .classList.add("responsive-pop-up-closed");

  document
    .getElementById("edit_task_pop_up")
    .classList.add("responsive-pop-up-closed");
}

function clearInputs(taskId) {
  document.getElementById("input_add_subtask").value = "";
  updateButtonImage(taskId);
}

function changeImage(imgageId, action) {
  let img = document.getElementById(imgageId);

  if (action === "edit") {
    if (img.src.includes("edit_blue.png")) {
      img.src = "../assets/img/edit_black.png";
    } else {
      img.src = "../assets/img/edit_blue.png";
    }
  } else if (action === "delete") {
    if (img.src.includes("delete_blue.png")) {
      img.src = "../assets/img/delete_black.png";
    } else {
      img.src = "../assets/img/delete_blue.png";
    }
  }
}

function changePlusImage(event) {
  let img = event.target;

  if (img.src.includes("plus_black.png")) {
    img.src = "../assets/img/plus_blue.png";
  } else {
    img.src = "../assets/img/plus_black.png";
  }
}

/* ----------------------------------------------------- */
/**
 * Get the count of the Subtasks of a Task.
 * @param {object} task - The object of the task.
 */
function getCompletedSubtasksCount(task) {
  let completedSubTasks = [];
  for (let i = 0; i < task.subtasks.length; i++) {
    const subtask = task.subtasks[i];
    if (subtask.completed) {
      completedSubTasks.push(subtask);
    }
  }
  return completedSubTasks.length;
}

/**
 * Get the percentage of the completed Subtasks of a Task.
 * @param {object} task - The object of the task.
 */
function getSubtasksProgress(task) {
  if (task.subtasks) {
    let subTaskCount = task.subtasks.length;
    let completedSubTasks = getCompletedSubtasksCount(task);
    return (completedSubTasks / subTaskCount) * 100;
  }
}

/**
 * Render a string that shows how many of the Subtasks are completed.
 * @param {object} task - The object of the task.
 */
function renderProgressString(task) {
  if (task.subtasks) {
    let subTaskCount = task.subtasks.length;
    let completedSubTasks = getCompletedSubtasksCount(task);
    return `${completedSubTasks}/${subTaskCount} Subtasks Completed`;
  } else {
    return "0/0 Subtasks Completed";
  }
}

function renderTasks() {
  const columns = {
    todo: document.getElementById("to_do"),
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
        assigneeInitials,
        renderProgressString(task),
        getSubtasksProgress(task)
      );
    }
  });
}
