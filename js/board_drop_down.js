"use strict";

/* DROP DOWN  */

function toggleDropdownTaskPopUp() {
  document.getElementById("dropdown_content").classList.toggle("d_none");
}

function toggleInputImage() {
  let inputImage = document.getElementById("dropdown_icon");

  if (inputImage.src.includes("arrow_drop_downaa.png")) {
    inputImage.src = "../assets/img/arrow_drop_up.png";
  } else {
    inputImage.src = "../assets/img/arrow_drop_downaa.png";
  }
}

function renderDropdownContacts(taskId) {
  let dropdownContent = document.getElementById("dropdown_contacts");
  dropdownContent.innerHTML = "";
  let task = tasks.find((t) => t.id === taskId);
  selectedContacts = task.assignedTo;
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    if (task.assignedTo) {
      if (task.assignedTo.some((c) => c.name === contact.name)) {
        dropdownContent.innerHTML +=
          getSelectedDropdownContactsTemplate(contact);
      } else {
        dropdownContent.innerHTML += getDropdownContactsTemplate(contact);
      }
    } else {
      dropdownContent.innerHTML += getDropdownContactsTemplate(contact);
    }
  }
}

function toggleCheckboxContact(contactId) {
  let contact = contacts.find((c) => c.id === contactId);
  let checkbox = document.getElementById(`checkbox_${contact.name}`);
  let selectedContactContent = checkbox.closest(".dropdown-contact");
  if (checkbox.src.includes("checkbox_false.png")) {
    activateCheckbox(checkbox, selectedContactContent);
    addContactToSelected(contactId);
  } else {
    deactivateCheckbox(checkbox, selectedContactContent);
    removeContactFromSelected(contactId);
  }
}

function activateCheckbox(checkbox, selectedContactContent) {
  checkbox.src = "../assets/img/checkbox_true_white.png";
  selectedContactContent.classList.add("checked");
}

function deactivateCheckbox(checkbox, selectedContactContent) {
  checkbox.src = "../assets/img/checkbox_false.png";
  selectedContactContent.classList.remove("checked");
}

function addContactToSelected(contactId) {
  let contact = contacts.find((c) => c.id === contactId);
  selectedContacts.push(contact);
}

/*function addContactToSelected(checkboxId, contactInitial, contactColor) {
  selectedContacts.push({
    id: checkboxId,
    initial: contactInitial,
    color: contactColor,
  });
}*/

function removeContactFromSelected(contactId) {
  const index = selectedContacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (index !== -1) {
    selectedContacts.splice(index, 1);
  }
}

window.onclick = function (event) {
  if (!event.target.matches(".drop-btn")) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("d_none")) {
        openDropdown.classList.remove("d_none");
      }
    }
  }
};
