'use strict';

/* DROP DOWN  */


function toggleDropdownTaskPopUp() {
  document.getElementById('dropdown_content').classList.toggle('d_none');
}


function toggleInputImage() {
  let inputImage = document.getElementById('dropdown_icon');

  if (inputImage.src.includes('arrow_drop_downaa.png')) {
    inputImage.src = '../assets/img/arrow_drop_up.png';
  } else {
    inputImage.src = '../assets/img/arrow_drop_downaa.png';
  }
}


function renderDropdownContacts() {
  let dropdownContent = document.getElementById('dropdown_contacts');
  dropdownContent.innerHTML = "";

  for (let indexContacts = 0; indexContacts < contacts.length; indexContacts++) {
    let contact = contacts[indexContacts];
    dropdownContent.innerHTML += getDropdownContactsTemplate(contact);
  }
}


function toggleCheckboxContact(checkboxId, contactInitial, contactColor) {
  let checkbox = document.getElementById(checkboxId);
  let selectedContactContent = checkbox.closest('.dropdown-contact');

  if (checkbox.src.includes('checkbox_false.png')) {
    activateCheckbox(checkbox, selectedContactContent);
    addContactToSelected(checkboxId, contactInitial, contactColor);
  } else {
    deactivateCheckbox(checkbox, selectedContactContent);
    removeContactFromSelected(checkboxId);
  }

  renderSelectedContacts();
  console.log(selectedContacts);
}


function activateCheckbox(checkbox, selectedContactContent) {
  checkbox.src = '../assets/img/checkbox_true_white.png';  
  /* selectedContactContent.style.backgroundColor = '#2A3647';  */ 
 /*  selectedContactContent.style.color = 'white'; */
 selectedContactContent.classList.add('checked');  
}


function deactivateCheckbox(checkbox, selectedContactContent) {
  checkbox.src = '../assets/img/checkbox_false.png';  
 /*  selectedContactContent.style.backgroundColor = '';  
  selectedContactContent.style.color = '';  */
  selectedContactContent.classList.remove('checked');
}


function addContactToSelected(checkboxId, contactInitial, contactColor) {
  selectedContacts.push({
    id: checkboxId,
    initial: contactInitial,
    color: contactColor
  });
}




function removeContactFromSelected(checkboxId) {
  const index = selectedContacts.findIndex(contact => contact.id === checkboxId);
  if (index !== -1) {
    selectedContacts.splice(index, 1);
  }
}




/* window.onclick = function (event) {
  if (!event.target.matches('.drop-btn')) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('d_none')) {
        openDropdown.classList.remove('d_none');
      }
    }
  }
}  */

  