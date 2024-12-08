"use strict";

/* BOARD MAIN SCRIPT */

let currentTaskId = null;
let selectedPriority = "";

/**
 * Initializes the application by rendering the header, sidebar, and fetching data.
 * @param {string} header - The ID of the header container.
 * @param {string} sidebar - The ID of the sidebar container.
 * @param {string} link - The ID of the navigation item to focus on.
 */
function init(header, sidebar, link) {
  let boardContent = document.getElementById("board-content");
  renderDesktopTemplate(header, sidebar, link);
  setTimeout(() => {
    loadFetchedData();
    boardContent.classList.remove("hidden");
  }, 100);
}

/**
 * Fetches and renders data from the database.
 * This includes fetching tasks and contacts, followed by rendering tasks.
 * @async
 */
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
 * Opens a popup displaying task details.
 * @param {number} taskId - The ID of the task to display.
 */
function openTaskPopUp(taskId) {
  document.getElementById("overlay_task_pop_up").classList.remove("responsive-pop-up-closed");

  renderTaskPopUp(taskId);
}

/**
 * Opens the "Add Task" popup.
 */
function openAddTaskPopUp() {
  document.getElementById("overlay_add_task_pop_up").classList.remove("responsive-pop-up-closed");

  renderAddTaskPopUp();
}

/**
 * Saves changes to a task and updates the database.
 * @async
 * @param {number} taskId - The ID of the task to save.
 */
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
  showAnimation("Task successfully saved!");
}

/**
 * Returns the color associated with a task's category.
 * @param {string} category - The category of the task.
 * @returns {string} RGB color string.
 */
function getCategoryColor(category) {
  if (category === "User Story") {
    return "rgb(0, 56, 255)";
  } else if (category === "Technical Task") {
    return "rgb(31, 215, 193)";
  }
  return "gray";
}

/**
 * Returns the image path for the specified priority level.
 * @param {string} priority - The priority level ('Low', 'Medium', 'Urgent').
 * @returns {string} Path to the priority image.
 */
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

/**
 * Handles changes to priority buttons in the edit popup.
 * @param {HTMLElement} selectedButton - The selected priority button.
 */
function changePrioButtonsEditPopUp(selectedButton) {
  resetButtonsEditPopUp();

  let priorityConfig = {
    prio_urgent: { class: "prio-urgent-active", img: "../assets/img/urgent21.png", priority: "Urgent", },
    prio_medium: { class: "prio-medium-active", img: "../assets/img/medium.png", priority: "Medium", },
    prio_low: { class: "prio-low-active", img: "../assets/img/low21.png", priority: "Low", },
  };

  let config = priorityConfig[selectedButton.id];
  if (config) {
    selectedButton.classList.add(config.class);
    selectedButton.querySelector(".prio-img").src = config.img;
    selectedPriority = config.priority;
    updateTaskPriority(config.priority);
  }
}

/**
 * Sets the active priority button in the edit popup based on priority.
 * @param {string} priority - The priority level ('Low', 'Medium', 'Urgent').
 */
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

/**
 * Updates the priority of the current task.
 * @param {string} priority - The new priority level.
 */
function updateTaskPriority(priority) {
  let task = tasks.find((t) => t.id === currentTaskId);
  if (task) {
    task.priority = priority;
  }
}

/**
 * Resets all priority buttons in the edit popup to their default states.
 */
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

/**
 * Toggles the completion state of a subtask.
 * @param {number} taskId - The ID of the parent task.
 * @param {number} index - The index of the subtask in the task's subtasks array.
 */
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

/**
 * Adds a new subtask in the "Edit Task" popup.
 * @param {number} taskId - The ID of the parent task.
 */
function addSubtaskEditPopUp(taskId) {
  let inputAddedSubtask = document.getElementById("input_add_subtask");
  let addedSubtaskTitle = inputAddedSubtask.value.trim();
  let task = tasks.find((t) => t.id === taskId);
  addedSubtasks = task.subtasks ? task.subtasks : [];
  let addedSubtask = { id: generateUniqueId(), name: addedSubtaskTitle, completed: false, };
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

/**
 * Handles the key press event for the subtask input.
 * Adds a new subtask if the Enter key is pressed.
 * @param {KeyboardEvent} event - The keyboard event.
 * @param {number} taskId - The ID of the parent task.
 */
function handleSubtaskKeyPress(event, taskId) {
  if (event.key === "Enter") {
    addSubtaskEditPopUp(taskId);
  }
}

/**
 * Deletes a subtask from the "Edit Task" popup.
 * @param {string} name - The name of the subtask to delete.
 */
function deleteAddedSubtaskEditPopUp(name) {
  let index = addedSubtasks.findIndex(
    (addedSubtask) => addedSubtask.name === name
  );
  if (index !== -1) {
    addedSubtasks.splice(index, 1);
    renderAddSubtasksEditPopUp();
  } else {
    console.error("subtask not found!", addedSubtasks);
  }
}

/**
 * Updates the image for the "Add Subtask" button.
 * @param {number} taskId - The ID of the parent task.
 */
function updateButtonImage(taskId) {
  let buttonContainer = document.getElementById("input_image_content");
  let inputAddedSubtask = document.getElementById("input_add_subtask").value.trim();

  if (inputAddedSubtask.length > 0) {
    buttonContainer.innerHTML = getBeforeButtonContainer(taskId);
  } else {
    buttonContainer.innerHTML = getAfterButtonContainer();
  }
}

/**
 * Edits a subtask in the "Edit Task" popup.
 * @param {string} id - The ID of the subtask to edit.
 */
function editSubtaskEditPopUp(id) {
  let subtask = addedSubtasks.find((sub) => sub.id === id);
  if (!subtask) return;

  let editedSubtask = document.querySelector(`li[data-id="${id}"]`);
  if (!editedSubtask) return;

  editedSubtask.classList.add("editing");
  editedSubtask.innerHTML = getEditSubtaskInput(id, subtask);
}

/**
 * Saves changes to an edited subtask.
 * @param {string} id - The ID of the subtask to save.
 * @param {string} newTitle - The updated title of the subtask.
 */
function saveEditedSubtaskEditPopUp(id, newTitle) {
  let subtaskIndex = addedSubtasks.findIndex((sub) => sub.id === id);
  if (subtaskIndex !== -1 && newTitle.trim() !== "") {
    addedSubtasks[subtaskIndex].title = newTitle.trim();
  }

  renderAddSubtasksEditPopUp();
}

/**
 * Handles pressing the Enter key during subtask editing.
 * @param {KeyboardEvent} event - The key event.
 * @param {string} id - The ID of the subtask.
 * @param {HTMLInputElement} inputElement - The input element for editing the subtask.
 */
function handleEnterKey(event, id, inputElement) {
  if (event.key === "Enter") {
    saveEditedSubtaskEditPopUp(id, inputElement.value);
  }
}

/**
 * Displays an error message if no subtask input is provided.
 * @returns {boolean} True if there is an error, false otherwise.
 */
function errorMessage() {
  let inputAddedSubtask = document.getElementById("input_add_subtask").value.trim();

  if (inputAddedSubtask === "") {
    document.getElementById("error_message").innerHTML = `Please enter a subtask!`;
    return true;
  }
  document.getElementById("error_message").innerHTML = "";
  return false;
}

/**
 * Generates a unique ID.
 * @returns {string} A unique identifier string.
 */
function generateUniqueId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

/**
 * Shows icons for a list item.
 * @param {HTMLElement} listItem - The list item element.
 */
function showIcons(listItem) {
  let iconContainer = listItem.querySelector(".list-icon-container");
  iconContainer.style.visibility = "visible";
}

/**
 * Hides icons for a list item.
 * @param {HTMLElement} listItem - The list item element.
 */
function hideIcons(listItem) {
  let iconContainer = listItem.querySelector(".list-icon-container");
  iconContainer.style.visibility = "hidden";
}

/**
 * Closes all popups.
 */
function closePopUps() {
  document.getElementById("overlay_task_pop_up").classList.add("responsive-pop-up-closed");
  document.getElementById("overlay_add_task_pop_up").classList.add("responsive-pop-up-closed");
  document.getElementById("edit_task_pop_up").classList.add("responsive-pop-up-closed");
}

/**
 * Clears input fields in the "Edit Task" popup.
 * @param {number} taskId - The ID of the parent task.
 */
function clearInputs(taskId) {
  document.getElementById("input_add_subtask").value = "";
  updateButtonImage(taskId);
}

/**
 * Changes an image based on the action ('edit' or 'delete').
 * @param {string} imgageId - The ID of the image element.
 * @param {string} action - The action type ('edit' or 'delete').
 */
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

/**
 * Changes the "plus" image on hover.
 * @param {Event} event - The hover event.
 */
function changePlusImage(event) {
  let img = event.target;

  if (img.src.includes("plus_black.png")) {
    img.src = "../assets/img/plus_blue.png";
  } else {
    img.src = "../assets/img/plus_black.png";
  }
}

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
 * Formats a given date string to (Day/Month/Year).
 * @param {string} dateString - The date string to be formatted.
 * @returns {string} - The formatted date string in the format "DD/MM/YYYY".
 */
function formatDate(dateString) {
  let options = { year: "numeric", month: "numeric", day: "numeric" };
  let date = new Date(dateString);
  return date.toLocaleDateString("de-DE", options);
}