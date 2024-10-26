'use strict';

/* DROP DOWN 4 EDIT TASK POP UP */


// Dropdown öffnen und schließen
/* const inputField = document.querySelector('.dropdown-input');
const dropdown = document.querySelector('.custom-dropdown');
const dropdownItems = document.querySelectorAll('.dropdown-item');
const dropDownBtn = document.querySelector('.dropdown-icon');

// Öffnen des Dropdowns bei Klick auf das Input-Feld
inputField.addEventListener('click', function () {
  dropdown.classList.toggle('open');
  dropDownBtn.classList.toggle('open');
});

// Text aus dem Dropdown in das Input-Feld setzen
dropdownItems.forEach(item => {
  item.addEventListener('click', function () {
    inputField.value = this.textContent.trim();
    dropdown.classList.remove('open'); // Schließt das Dropdown nach Auswahl
  });
});

// Dropdown schließen, wenn außerhalb geklickt wird
window.addEventListener('click', function (e) {
  if (!dropdown.contains(e.target)) {
    dropdown.classList.remove('open');
  }
}); */