function init(header, sidebar, link) {
  let addTaskContent = document.getElementById("add-task-content");
  createHeader(header);
  createSidebar(sidebar, link);
  setTimeout(() => {
    restorePriority();
    setTodayDate();
    loadAllContactsInfo();
    addTaskContent.classList.remove("hidden");
  }, 100);
}

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

async function loadContacts() {
  let contacts1 = await fetch(BASE_URL + "/contacts" + ".json");
  let contactsToJson = await contacts1.json();
  let contacts = Object.keys(contactsToJson);
  return contacts;
}

async function getContactById(id) {
  let contactResponse = await fetch(BASE_URL + "/contacts/" + id + ".json");
  let contactToJson = await contactResponse.json();
  return contactToJson;
}

async function loadAllContactsInfo() {
  let idArray = await loadContacts();
  for (let i = 0; i < idArray.length; i++) {
    const id = idArray[i];
    let newContact = await getContactById(id);
    contacts.push(newContact);
  }
  console.log(contacts);
  return contacts;
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
