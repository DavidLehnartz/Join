function init() {
  restorePriority();
  setTodayDate();
  loadAllContactsInfo();
}

window.onload = function () {
  restorePriority();
};

function setTodayDate() {
  const dateInput = document.getElementById("inputFieldDueDate");
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const todayString = `${year}-${month}-${day}`;
  dateInput.setAttribute("min", todayString);
  dateInput.value = todayString;
}

function selectCategory(category) {
  const selectedCategoryElement = document.getElementById("selectedCategory");
  selectedCategoryElement.textContent = category;
  checkForm();
}

function toggleContactDropdown() {
  const dropdown = document.getElementById("categoryDropdown2");
  const arrowElement = document.getElementById("dropdownArrow2");
  const dropdown1 = document.getElementById("selectOnes");
  if (dropdown.classList.contains("open")) {
    dropdown.classList.remove("open");
    arrowElement.src = "../assets/img/arrow_drop_downaa.png";
    removeOutsideClickListener();
  } else {
    dropdown.classList.add("open");
    arrowElement.src = "../assets/img/arrow_drop_up.png";
    populateDropdown(dropdown);
    addOutsideClickListener(dropdown, arrowElement, dropdown1);
  }
}

function preventDropdownCloseOnSelect(element, contactElement, contact) {
  element.addEventListener("click", function (event) {
    event.stopPropagation();
    const checkbox = contactElement.querySelector(".contact-checkbox");
    if (event.target === checkbox) {
      handleContactSelection(contactElement, contact, checkbox.checked);
    } else {
      checkbox.checked = !checkbox.checked;
      handleContactSelection(contactElement, contact, checkbox.checked);
    }
  });
}

function handleContactSelection(contactElement, contact, isChecked) {
  const checkbox = contactElement.querySelector(".contact-checkbox");
  checkbox.checked = isChecked;
  if (isChecked) {
    if (!isSelected(contact.name)) {
      selectedContacts.push(contact);
    }
  } else {
    selectedContacts = selectedContacts.filter((c) => c.name !== contact.name);
  }
  contactElement.classList.toggle("selected", isChecked);
  updateSelectedContactsDisplay();
}

function populateDropdown(dropdown) {
  dropdown.innerHTML = "";
  contacts.forEach((contact) => {
    const contactElement = document.createElement("div");
    contactElement.classList.add("contact-item");
    if (isSelected(contact.name)) contactElement.classList.add("selected");
    contactElement.innerHTML = createContactHTML(contact, isSelected(contact.name));
    const checkbox = contactElement.querySelector(".contact-checkbox");
    preventDropdownCloseOnSelect(checkbox, contactElement, contact);
    preventDropdownCloseOnSelect(contactElement, contactElement, contact);
    dropdown.appendChild(contactElement);
  });
}

function addOutsideClickListener(dropdown, arrowElement, dropdown1) {
  function handleClickOutside(event) {
    if (!dropdown.contains(event.target) && !dropdown1.contains(event.target)) {
      dropdown.classList.remove("open");
      arrowElement.src = "../assets/img/arrow_drop_downaa.png";
      removeOutsideClickListener();
    }
  }
  document.addEventListener("click", handleClickOutside);
  dropdown.setAttribute("data-listener", handleClickOutside);
}

function removeOutsideClickListener() {
  const dropdown = document.getElementById("categoryDropdown2");
  const listener = dropdown.getAttribute("data-listener");
  if (listener) {
    dropdown.removeAttribute("data-listener");
  }
}

function toggleContactSelection(contact) {
  if (isSelected(contact.name)) {
    selectedContacts = selectedContacts.filter((c) => c.name !== contact.name);
  } else {
    selectedContacts.push(contact);
  }
  updateSelectedContactsDisplay();
}

function isSelected(contactName) {
  return selectedContacts.some((contact) => contact.name === contactName);
}

function updateSelectedContactsDisplay() {
  const badgesContainer = document.getElementById("selectedContactsBadges");
  const maxContactsContainer = document.querySelector(".maxContacts");
  badgesContainer.innerHTML = "";
  maxContactsContainer.innerHTML = "";
  if (selectedContacts.length === 0) return;
  const contactsToShow = selectedContacts.slice(0, 5);
  contactsToShow.forEach((contact) => {
    const badge = createContactBadge(contact);
    badgesContainer.appendChild(badge);
  });
  if (selectedContacts.length > 5) {
    const remainingCount = selectedContacts.length - 5;
    const remainingBadge = createRemainingBadge(remainingCount);
    maxContactsContainer.appendChild(remainingBadge);
  }
}

function createContactBadge(contact) {
  const badge = document.createElement("div");
  badge.classList.add("contact-badge", `bg-${contact.color}`);
  badge.textContent = contact.initial;
  return badge;
}

function createRemainingBadge(count) {
  const badge = document.createElement("div");
  badge.classList.add("contact-badge", "remaining-contacts-badge");
  badge.textContent = `+${count}`;
  return badge;
}

function toggleDropdown() {
  const dropdown = document.getElementById("categoryDropdown");
  const dropdown2 = document.getElementById("selectCat");
  const arrowElement = document.getElementById("dropdownArrow");
  if (dropdown.classList.contains("open")) {
    dropdown.classList.remove("open");
    arrowElement.src = "../assets/img/arrow_drop_downaa.png";
    removeOutsideClickListener();
  } else {
    dropdown.classList.add("open");
    arrowElement.src = "../assets/img/arrow_drop_up.png";
    addOutsideClickListener(dropdown, arrowElement, dropdown2);
  }
}

function resetButtons() {
  const buttons = document.querySelectorAll(".priobtn");
  buttons.forEach((btn) => {
    btn.classList.remove("active-urgent", "active-medium", "active-low");
    const img = btn.querySelector("img");
    if (btn.innerText.includes("Urgent")) {
      img.src = "../assets/img/urgent.png";
    } else if (btn.innerText.includes("Medium")) {
      img.src = "../assets/img/medium21.png";
    } else if (btn.innerText.includes("Low")) {
      img.src = "../assets/img/low.png";
    }
  });
}

function setPriority(button, priority) {
  resetButtons();
  const img = button.querySelector("img");
  if (priority === "urgent") {
    button.classList.add("active-urgent");
    img.src = "../assets/img/urgent21.png";
  } else if (priority === "medium") {
    button.classList.add("active-medium");
    img.src = "../assets/img/medium.png";
  } else if (priority === "low") {
    button.classList.add("active-low");
    img.src = "../assets/img/low21.png";
  }
  localStorage.setItem("selectedPriority", priority);
}

function restorePriority() {
  const mediumPriorityBtn = document.querySelector(".urgMedLow-btn-medium");
  setPriority(mediumPriorityBtn, "medium");
}

function initializeSubtaskInput() {
  const inputField = document.getElementById("inputFieldSubtask");
  const iconWrapper = document.getElementById("iconWrapper");
  const actionIcon = document.getElementById("actionIcon");
  inputField.disabled = false;
  inputField.focus();
  actionIcon.src = "../assets/img/Propertycheck.png";
  if (!document.getElementById("closeIcon")) {
      iconWrapper.insertAdjacentHTML("afterbegin", createCloseIconHTML());
  }
  return { inputField, actionIcon };
}

/**
* Handles the addition of a new subtask.
* Adds the subtask to the list and resets the input field for further use.
* @param {HTMLElement} inputField - The input field for subtasks.
* @param {HTMLElement} actionIcon - The action icon to trigger subtask addition.
*/
function handleSubtaskAddition(inputField, actionIcon) {
  actionIcon.onclick = function () {
      const subtaskText = inputField.value.trim();
      if (subtaskText !== "") {
          const subtaskList = document.getElementById("subtaskList");
          subtaskList.insertAdjacentHTML("beforeend", createSubtaskHTML(subtaskText));
          subtasksData.push({ name: subtaskText, completed: false });
          inputField.value = "";
          inputField.focus();
      }
  };
}

function addSubtask() {
  const { inputField, actionIcon } = initializeSubtaskInput();
  handleSubtaskAddition(inputField, actionIcon);
}

/**
* Cancels the subtask addition process.
* Resets the input field, removes the close icon, and restores the default action icon.
*/
function cancelSubtask() {
  const inputField = document.getElementById("inputFieldSubtask");
  const iconWrapper = document.getElementById("iconWrapper");
  const actionIcon = document.getElementById("actionIcon");
  inputField.disabled = true;
  inputField.value = "";
  actionIcon.src = "../assets/img/Propertyadd.png";
  const closeIcon = document.getElementById("closeIcon");
  if (closeIcon) {
      iconWrapper.removeChild(closeIcon);
  }
  actionIcon.onclick = addSubtask;
}

/**
* Edits an existing subtask by replacing its text with an input field.
* Provides icons for confirming or canceling the edit and handles input events.
* @param {HTMLElement} subtaskItem - The subtask item to be edited.
*/
function editSubtask(subtaskItem) {
  const textElement = subtaskItem.querySelector(".subtask-text");
  const currentText = textElement.textContent.trim();
  subtaskItem.classList.add("editing");
  textElement.outerHTML = createSubtaskInputHTML(currentText, subtaskItem.offsetHeight);
  const iconsWrapper = subtaskItem.querySelector(".subtask-icons");
  iconsWrapper.innerHTML = createEditingIconsHTML();
  const input = subtaskItem.querySelector(".subtaskInput");
  input.focus();
  input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
          finishEditing(input, textElement, subtaskItem);
      }
  });
  input.addEventListener("blur", function () {
      finishEditing(input, textElement, subtaskItem);
  });
}

/**
* Listens for checkbox clicks and logs the associated contact name.
*/
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("contact-checkbox")) {
      console.log("Checkbox clicked:", event.target.dataset.name);
  }
});

/**
* Completes the editing process for a subtask.
* Updates the subtask's text and data, and restores the default icons.
* @param {HTMLElement} input - The input field used for editing.
* @param {HTMLElement} textElement - The original text element of the subtask.
* @param {HTMLElement} subtaskItem - The subtask item being edited.
*/
function finishEditing(input, textElement, subtaskItem) {
  const newText = input.value.trim();
  textElement.textContent = newText !== "" ? newText : input.value;
  input.replaceWith(textElement);
  subtaskItem.classList.remove("editing");
  const subtask = subtasksData.find(
      (sub) => sub.name === textElement.textContent
  );
  if (subtask) {
      subtask.name = newText;
  }
  const iconsWrapper = subtaskItem.querySelector(".subtask-icons");
  iconsWrapper.innerHTML = createDefaultIconsHTML();
}

function deleteSubtask(subtaskItem) {
  subtaskItem.remove();
}

function clearFormInputs() {
  const inputs = document.querySelectorAll(
    'input[type="text"], input[type="number"], input[type="date"], input[type="email"], input[type="password"]'
  );
  inputs.forEach((input) => {
    input.value = "";
  });
  const textareas = document.querySelectorAll("textarea");
  textareas.forEach((textarea) => {
    textarea.value = "";
  });
}

function clearCheckboxesAndDropdowns() {
  const checkboxesAndRadios = document.querySelectorAll(
      'input[type="checkbox"], input[type="radio"]'
  );
  checkboxesAndRadios.forEach((input) => {
      input.checked = false;
  });
  const dropdowns = document.querySelectorAll("select");
  dropdowns.forEach((dropdown) => {
      dropdown.selectedIndex = 0;
  });
}

function resetSpecialFields() {
  const subtaskInput = document.getElementById("inputFieldSubtask");
  if (subtaskInput) {
      subtaskInput.value = "";
      subtaskInput.disabled = true;
  }
  const selectedCategoryElement = document.getElementById("selectedCategory");
  if (selectedCategoryElement) {
      selectedCategoryElement.textContent = "Select task category";
  }
  resetButtons();
  restorePriority();
  setTodayDate();
}

function clearEverything() {
  clearFormInputs();
  clearCheckboxesAndDropdowns();
  resetSpecialFields();
  cancelSubtask();
  const subtaskList = document.getElementById("subtaskList");
  subtaskList.innerHTML = "";
  clearSelectedContacts();
}

function clearSelectedContacts() {
  const selectedContactsElement = document.getElementById("selectedContacts");
  if (selectedContactsElement) {
      selectedContactsElement.textContent = "Select Contacts to assign";
  }
  const selectedContactsBadges = document.getElementById(
      "selectedContactsBadges"
  );
  if (selectedContactsBadges) {
      selectedContactsBadges.innerHTML = "";
  }
  const contactCheckboxes = document.querySelectorAll(".contact-checkbox");
  contactCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
  });
  selectedContacts = [];
}

function checkForm() {
  const title = document.getElementById("inputFieldTitle");
  const dueDate = document.getElementById("inputFieldDueDate");
  const selectedCategory = document.getElementById("selectedCategory");
  const isTitleValid = validateTitle(title);
  const isDueDateValid = validateDueDate(dueDate);
  const isCategoryValid = validateCategory(selectedCategory);
  const formIsValid = isTitleValid && isDueDateValid && isCategoryValid;
  toggleSubmitButton(formIsValid);
}

function validateTitle(title) {
  if (title.value.trim() === "") {
      title.style.border = "2px solid red";
      return false;
  } else {
      title.style.border = "";
      return true;
  }
}

/**
* Validates the due date input field.
* @param {HTMLElement} dueDate - The due date input field.
* @returns {boolean} True if the due date is valid, otherwise false.
*/
function validateDueDate(dueDate) {
  if (dueDate.value === "") {
      dueDate.style.border = "2px solid red";
      return false;
  } else {
      dueDate.style.border = "";
      return true;
  }
}

function validateCategory(selectedCategory) {
  if (selectedCategory.textContent.trim() === "Select task category") {
      selectedCategory.parentElement.style.border = "2px solid red";
      return false;
  } else {
      selectedCategory.parentElement.style.border = "";
      return true;
  }
}

/**
* Enables or disables the submit button based on form validation results.
* @param {boolean} isFormValid - Whether the form is valid.
*/
function toggleSubmitButton(isFormValid) {
  document.getElementById("createTaskBtn").disabled = !isFormValid;
}

function gatherTaskData() {
  const title = document.getElementById("inputFieldTitle").value;
  const description = document.getElementById("inputFieldDescription").value;
  const dueDate = document.getElementById("inputFieldDueDate").value;
  const priority = getPriority();
  const category = document.getElementById("selectedCategory").textContent;
  return {
      title,
      description,
      dueDate,
      priority,
      category,
      subtasks: subtasksData,
      assignedTo: selectedContacts,
      status: "todo",
  };
}

function getPriority() {
  if (document.getElementById("inputFieldUrgent").classList.contains("active-urgent")) {
      return "Urgent";
  } else if (document.getElementById("inputFieldMedium").classList.contains("active-medium")) {
      return "Medium";
  } else if (document.getElementById("inputFieldLow").classList.contains("active-low")) {
      return "Low";
  }
  return "None";
}

async function sendTaskToApi(taskData) {
  try {
      const response = await fetch(`${BASE_URL}/tasks.json`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
      });
      return response.ok;
  } catch (error) {
      console.error("Error saving task:", error);
      return false;
  }
}

function handleTaskCreationResponse(success) {
  if (success) {
      const message = document.querySelector(".showMe");
      message.classList.remove("d-none");
      setTimeout(() => {
          window.location.href = "board.html";
          message.classList.add("d-none");
      }, 2900);
  } else {
      console.error("Task creation failed.");
  }
}

async function createTask() {
  const taskData = gatherTaskData();
  const success = await sendTaskToApi(taskData);
  handleTaskCreationResponse(success);
}