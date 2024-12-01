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
}

function populateDropdown(dropdown) {
  dropdown.innerHTML = "";
  contacts.forEach((contact) => {
    const contactElement = document.createElement("div");
    contactElement.classList.add("contact-item");
    if (isSelected(contact.name)) contactElement.classList.add("selected");
    contactElement.innerHTML = getAddDropdownContactsTemplate(contact);
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
  if (selectedContacts.length > 0) {
    if (selectedContacts.length > 5) {
      for (let i = 0; i < 5; i++) {
        const contact = selectedContacts[i];
        const contactBadge = document.createElement("div");
        contactBadge.classList.add("contact-badge", `bg-${contact.color}`);
        contactBadge.textContent = contact.initial;
        badgesContainer.appendChild(contactBadge);
      }
      const remainingCount = selectedContacts.length - 5;
      const remainingBadge = document.createElement("div");
      remainingBadge.classList.add("contact-badge", "remaining-contacts-badge");
      remainingBadge.textContent = `+${remainingCount}`;
      maxContactsContainer.appendChild(remainingBadge);
    } else {
      selectedContacts.forEach((contact) => {
        const contactBadge = document.createElement("div");
        contactBadge.classList.add("contact-badge", `bg-${contact.color}`);
        contactBadge.textContent = contact.initial;
        badgesContainer.appendChild(contactBadge);
      });
    }
  }
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

function addSubtask() {
  const inputField = document.getElementById("inputFieldSubtask");
  const iconWrapper = document.getElementById("iconWrapper");
  const actionIcon = document.getElementById("actionIcon");
  inputField.disabled = false;
  inputField.focus();
  actionIcon.src = "../assets/img/Propertycheck.png";
  if (!document.getElementById("closeIcon")) {
    iconWrapper.insertAdjacentHTML(
      "afterbegin",
      `
            <img src="../assets/img/close.png" class="icon" id="closeIcon" onclick="cancelSubtask()">
        `
    );
  }
  actionIcon.onclick = function () {
    const subtaskText = inputField.value.trim();
    if (subtaskText !== "") {
      const subtaskList = document.getElementById("subtaskList");
      subtaskList.insertAdjacentHTML(
        "beforeend",
        `
                <div class="subtask-item">
                    <span class="subtask-text">${subtaskText}</span>
                    <div class="subtask-icons">
                        <img src="../assets/img/edit.png" alt="Edit" class="icon" onclick="editSubtask(this.closest('.subtask-item'))">
                        <div class="separator"></div>
                        <img src="../assets/img/delete.png" alt="Delete" class="icon" onclick="deleteSubtask(this.closest('.subtask-item'))">
                    </div>
                </div>
            `
      );
      subtasksData.push({
        name: subtaskText,
        completed: false,
      });
      inputField.value = "";
      inputField.focus();
    }
  };
}

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

function editSubtask(subtaskItem) {
  const textElement = subtaskItem.querySelector(".subtask-text");
  const currentText = textElement.textContent.trim();
  subtaskItem.classList.add("editing");
  subtaskItem.querySelector(".subtask-text").outerHTML = `
        <input type="text" class="subtaskInput" value="${currentText}" style="width: 100%; height: ${subtaskItem.offsetHeight}px; background-color: #fff; border: none; outline: none;">
    `;
  const iconsWrapper = subtaskItem.querySelector(".subtask-icons");
  iconsWrapper.innerHTML = `
        <img src="../assets/img/delete.png" alt="Löschen" class="icon" onclick="deleteSubtask(this.closest('.subtask-item'))">
        <div class="separator3"></div>
        <img src="../assets/img/propertychecktwo.png" alt="Speichern" class="icon" onclick="finishEditing(this.closest('.subtask-item').querySelector('.subtaskInput'), this.closest('.subtask-item').querySelector('.subtask-text'), this.closest('.subtask-item'))">
    `;
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

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("contact-checkbox")) {
    console.log("Checkbox clicked:", event.target.dataset.name);
  }
});

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
  iconsWrapper.innerHTML = `
    <img src="../assets/img/edit.png" alt="Bearbeiten" class="icon" onclick="editSubtask(this.closest('.subtask-item'))">
    <div class="separator"></div>
    <img src="../assets/img/delete.png" alt="Löschen" class="icon" onclick="deleteSubtask(this.closest('.subtask-item'))">
`;
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
  let formIsValid = true;
  if (title.value.trim() === "") {
    title.style.border = "2px solid red";
    formIsValid = false;
  } else {
    title.style.border = "";
  }
  if (dueDate.value === "") {
    dueDate.style.border = "2px solid red";
    formIsValid = false;
  } else {
    dueDate.style.border = "";
  }
  if (selectedCategory.textContent.trim() === "Select task category") {
    selectedCategory.parentElement.style.border = "2px solid red";
    formIsValid = false;
  } else {
    selectedCategory.parentElement.style.border = "";
  }
  document.getElementById("createTaskBtn").disabled = !formIsValid;
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
  if (
    document
      .getElementById("inputFieldUrgent")
      .classList.contains("active-urgent")
  ) {
    return "Urgent";
  } else if (
    document
      .getElementById("inputFieldMedium")
      .classList.contains("active-medium")
  ) {
    return "Medium";
  } else if (
    document.getElementById("inputFieldLow").classList.contains("active-low")
  ) {
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
