"use strict";

/* BOARD DROP DOWN  */

/**
 * Toggles the visibility of the dropdown content for the task popup by adding or removing the `d_none` class.
 */
function toggleDropdownTaskPopUp() {
  document.getElementById("dropdown_content").classList.toggle("d_none");
}

/**
 * Toggles the source of the dropdown icon image between "arrow_drop_downaa.png" and "arrow_drop_up.png" to reflect the open/close state.
 */
function toggleInputImage() {
  let inputImage = document.getElementById("dropdown_icon");

  if (inputImage.src.includes("arrow_drop_downaa.png")) {
    inputImage.src = "../assets/img/arrow_drop_up.png";
  } else {
    inputImage.src = "../assets/img/arrow_drop_downaa.png";
  }
}

/**
 * Renders the list of contacts in the dropdown, marking selected contacts as checked and others as unchecked.
 * @param {string} taskId - The ID of the task for which the dropdown contacts should be rendered.
 */
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

/**
 * Toggles the selection state of a contact in the dropdown. Updates the checkbox appearance and adds/removes the contact from the selected contacts list.
 * @param {string} contactId - The ID of the contact to toggle.
 */
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

/**
 * Marks a contact checkbox as active and visually indicates that the contact is selected.
 * @param {HTMLElement} checkbox - The checkbox element to activate.
 * @param {HTMLElement} selectedContactContent - The container element for the selected contact, to apply visual changes.
 */
function activateCheckbox(checkbox, selectedContactContent) {
  checkbox.src = "../assets/img/checkbox_true_white.png";
  selectedContactContent.classList.add("checked");
}

/**
 * Marks a contact checkbox as inactive and removes visual indications of selection.
 * @param {HTMLElement} checkbox - The checkbox element to deactivate.
 * @param {HTMLElement} selectedContactContent - The container element for the deselected contact, to remove visual changes.
 */
function deactivateCheckbox(checkbox, selectedContactContent) {
  checkbox.src = "../assets/img/checkbox_false.png";
  selectedContactContent.classList.remove("checked");
}

/**
 * Adds a contact to the `selectedContacts` list.
 * @param {string} contactId - The ID of the contact to add.
 */
function addContactToSelected(contactId) {
  if (!selectedContacts) selectedContacts = [];
  let contact = contacts.find((c) => c.id === contactId);
  selectedContacts.push(contact);
}

/**
 * Removes a contact from the `selectedContacts` list by its ID.
 * @param {string} contactId - The ID of the contact to remove.
 */
function removeContactFromSelected(contactId) {
  const index = selectedContacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (index !== -1) {
    selectedContacts.splice(index, 1);
  }
}

/* window.onclick = function (event) {
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
}; */