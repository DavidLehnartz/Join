const BASE_URL = "https://join-6838e-default-rtdb.europe-west1.firebasedatabase.app/";
let contacts = [];
let selectedContacts = [];

window.onload = function () {
    restorePriority();
    setTodayDate();
    loadAllContactsInfo();
};

function setTodayDate() {
    const dateInput = document.getElementById('inputFieldDueDate');
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayString = `${year}-${month}-${day}`;
    dateInput.setAttribute('min', todayString);
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

// Funktion zum Öffnen und Schließen der Dropdown-Liste (beim Klick auf den Dropdown-Pfeil)
function toggleContactDropdown() {
    const dropdown = document.getElementById("categoryDropdown2");
    const arrowElement = document.getElementById("dropdownArrow");

    if (dropdown.classList.contains("open")) {
        dropdown.classList.remove("open");
        arrowElement.src = "../assets/img/arrow_drop_downaa.png";
        removeOutsideClickListener();
    } else {
        dropdown.classList.add("open");
        arrowElement.src = "../assets/img/arrow_drop_up.png";

        // Kontakte in Dropdown-Liste laden
        dropdown.innerHTML = ''; // Reset der Liste

        contacts.forEach(contact => {
            const contactElement = document.createElement('div');
            contactElement.classList.add('contact-item');
            contactElement.innerHTML = `
                <div class="contact-initials bg-${contact.color}">${contact.initial}</div>
                <span>${contact.name}</span>
                <input type="checkbox" name="assignedContacts" class="contact-checkbox" data-name="${contact.name}" ${isSelected(contact.name) ? 'checked' : ''}/>
            `;

            const checkbox = contactElement.querySelector(".contact-checkbox");
            checkbox.addEventListener("change", function () {
                toggleContactSelection(contact);
            });

            dropdown.appendChild(contactElement);
        });

        addOutsideClickListener(dropdown, arrowElement);
    }
}

function addOutsideClickListener(dropdown, arrowElement) {
    function handleClickOutside(event) {
        if (!dropdown.contains(event.target) && !arrowElement.contains(event.target)) {
            dropdown.classList.remove("open");
            arrowElement.src = "../assets/img/arrow_drop_downaa.png";
            removeOutsideClickListener(); // Listener entfernen, nachdem er einmal ausgelöst wurde
        }
    }

    document.addEventListener("click", handleClickOutside);
    dropdown.setAttribute('data-listener', handleClickOutside); // Speichert die Referenz zum Listener
}


function removeOutsideClickListener() {
    const dropdown = document.getElementById("categoryDropdown2");
    const listener = dropdown.getAttribute('data-listener');
    if (listener) {
        dropdown.removeAttribute('data-listener'); // Listener entfernen
    }
}


// Funktion, um den Status eines Kontakts zu ändern (ausgewählt oder nicht)
function toggleContactSelection(contact) {
    if (isSelected(contact.name)) {
        selectedContacts = selectedContacts.filter(c => c.name !== contact.name);
    } else {
        selectedContacts.push(contact);
    }
    updateSelectedContactsDisplay();
}

// Funktion, um zu überprüfen, ob ein Kontakt ausgewählt ist
function isSelected(contactName) {
    return selectedContacts.some(contact => contact.name === contactName);
}

// Funktion, um die ausgewählten Kontakte als Namenskürzel (Badges) unterhalb des Dropdowns anzuzeigen
function updateSelectedContactsDisplay() {
    const badgesContainer = document.getElementById("selectedContactsBadges");
    badgesContainer.innerHTML = ''; // Inhalt zurücksetzen

    if (selectedContacts.length > 0) {
        selectedContacts.forEach(contact => {
            const contactBadge = document.createElement('div');
            contactBadge.classList.add('contact-badge', `bg-${contact.color}`); // Klasse für die Farbe hinzufügen
            contactBadge.textContent = contact.initial;
            badgesContainer.appendChild(contactBadge);
        });
    }
}

function toggleDropdown() {
    const dropdown = document.getElementById("categoryDropdown");
    const arrowElement = document.getElementById("dropdownArrow");
    if (dropdown.classList.contains("open")) {
        dropdown.classList.remove("open");
        arrowElement.src = "../assets/img/arrow_drop_downaa.png";
    } else {
        dropdown.classList.add("open");
        arrowElement.src = "../assets/img/arrow_drop_up.png";
    }
}


function resetButtons() {
    const buttons = document.querySelectorAll('.priobtn');
    buttons.forEach(btn => {
        btn.classList.remove('active-urgent', 'active-medium', 'active-low');
        const img = btn.querySelector('img');
        if (btn.innerText.includes('Urgent')) {
            img.src = '../assets/img/urgent.png';
        } else if (btn.innerText.includes('Medium')) {
            img.src = '../assets/img/medium21.png';
        } else if (btn.innerText.includes('Low')) {
            img.src = '../assets/img/low.png';
        }
    });
}

function setPriority(button, priority) {
    resetButtons();
    const img = button.querySelector('img');
    if (priority === 'urgent') {
        button.classList.add('active-urgent');
        img.src = '../assets/img/urgent21.png';
    } else if (priority === 'medium') {
        button.classList.add('active-medium');
        img.src = '../assets/img/medium.png';
    } else if (priority === 'low') {
        button.classList.add('active-low');
        img.src = '../assets/img/low21.png';
    }
    localStorage.setItem('selectedPriority', priority);
}

function restorePriority() {
    const mediumPriorityBtn = document.querySelector('.urgMedLow-btn-medium');
    setPriority(mediumPriorityBtn, 'medium');
}



function addSubtask() {
    const inputField = document.getElementById('inputFieldSubtask');
    const iconWrapper = document.getElementById('iconWrapper');
    const actionIcon = document.getElementById('actionIcon');
    inputField.disabled = false;
    inputField.focus();
    actionIcon.src = "../assets/img/Propertycheck.png";
    if (!document.getElementById('closeIcon')) {
        const closeIcon = document.createElement('img');
        closeIcon.src = "../assets/img/close.png";
        closeIcon.classList.add('icon');
        closeIcon.id = 'closeIcon';
        closeIcon.onclick = cancelSubtask;
        iconWrapper.prepend(closeIcon);
    }
    actionIcon.onclick = function () {
        const subtaskText = inputField.value.trim();
        if (subtaskText !== '') {
            const subtaskList = document.getElementById('subtaskList');
            const newSubtask = document.createElement('li');
            newSubtask.classList.add('subtask-item');
            newSubtask.textContent = subtaskText;
            const iconsWrapper = document.createElement('div');
            iconsWrapper.classList.add('subtask-icons');
            const editIcon = document.createElement('img');
            editIcon.src = '../assets/img/edit.png';
            editIcon.alt = 'Edit';
            editIcon.onclick = function () {
                editSubtask(newSubtask);
            };
            const separator = document.createElement('div');
            separator.classList.add('separator');
            const deleteIcon = document.createElement('img');
            deleteIcon.src = '../assets/img/delete.png';
            deleteIcon.alt = 'Delete';
            deleteIcon.onclick = function () {
                deleteSubtask(newSubtask);
            };
            iconsWrapper.appendChild(editIcon);
            iconsWrapper.appendChild(separator);
            iconsWrapper.appendChild(deleteIcon);
            newSubtask.appendChild(iconsWrapper);
            subtaskList.appendChild(newSubtask);
            inputField.value = '';
            inputField.focus();
        }
    }.bind(this);
}

function cancelSubtask() {
    const inputField = document.getElementById('inputFieldSubtask');
    const iconWrapper = document.getElementById('iconWrapper');
    const actionIcon = document.getElementById('actionIcon');
    inputField.disabled = true;
    inputField.value = '';
    actionIcon.src = "../assets/img/Propertyadd.png";
    const closeIcon = document.getElementById('closeIcon');
    if (closeIcon) {
        iconWrapper.removeChild(closeIcon);
    }
    actionIcon.onclick = addSubtask;
}

function editSubtask(subtaskItem) {
    const currentText = subtaskItem.firstChild.textContent.trim();
    subtaskItem.classList.add('editing');
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.classList.add('subtaskInput');
    input.style.width = '100%';
    input.style.height = subtaskItem.offsetHeight + 'px';
    input.style.backgroundColor = '#fff';
    input.style.border = 'none';
    input.style.outline = 'none';
    input.style.paddingLeft = '40px';
    subtaskItem.firstChild.replaceWith(input);
    input.focus();
    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const newText = input.value.trim();
            if (newText !== '') {
                const textNode = document.createTextNode(newText);
                input.replaceWith(textNode);
                subtaskItem.classList.remove('editing');
            } else {
                const textNode = document.createTextNode(currentText);
                input.replaceWith(textNode);
                subtaskItem.classList.remove('editing');
            }
        }
    });
    input.addEventListener('blur', function () {
        const newText = input.value.trim();
        if (newText !== '') {
            const textNode = document.createTextNode(newText);
            input.replaceWith(textNode);
        } else {
            const textNode = document.createTextNode(currentText);
            input.replaceWith(textNode);
        }
        subtaskItem.classList.remove('editing');
    });
}

function deleteSubtask(subtaskItem) {
    subtaskItem.remove();
}




function clearFormInputs() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="number"], input[type="date"], input[type="email"], input[type="password"]');
    inputs.forEach(input => {
        input.value = '';
    });
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.value = '';
    });
}

function clearCheckboxesAndDropdowns() {
    const checkboxesAndRadios = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
    checkboxesAndRadios.forEach(input => {
        input.checked = false;
    });
    const dropdowns = document.querySelectorAll('select');
    dropdowns.forEach(dropdown => {
        dropdown.selectedIndex = 0;
    });
}

function resetSpecialFields() {
    const subtaskInput = document.getElementById('inputFieldSubtask');
    if (subtaskInput) {
        subtaskInput.value = '';
        subtaskInput.disabled = true;
    }
    const selectedCategoryElement = document.getElementById("selectedCategory");
    if (selectedCategoryElement) {
        selectedCategoryElement.textContent = 'Select task category';
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

    // Subtask-Liste leeren
    const subtaskList = document.getElementById('subtaskList');
    subtaskList.innerHTML = '';

    // Kontakte zurücksetzen
    clearSelectedContacts();
}

function clearSelectedContacts() {
    // Setzt den Text des Kontaktfeldes zurück
    const selectedContactsElement = document.getElementById('selectedContacts');
    if (selectedContactsElement) {
        selectedContactsElement.textContent = 'Select Contacts to assign';  // Setzt den Text zurück
    }

    // Entfernt alle angezeigten Kontakt-Badges
    const selectedContactsBadges = document.getElementById('selectedContactsBadges');
    if (selectedContactsBadges) {
        selectedContactsBadges.innerHTML = '';  // Entfernt alle Kontakt-Badges
    }

    // Setzt die Kontakt-Checkboxen zurück
    const contactCheckboxes = document.querySelectorAll('.contact-checkbox');
    contactCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    // Leert das Array der ausgewählten Kontakte
    selectedContacts = [];
}




function checkForm() {
    const title = document.getElementById('inputFieldTitle');
    const dueDate = document.getElementById('inputFieldDueDate');
    const selectedCategory = document.getElementById('selectedCategory');
    let formIsValid = true;
    if (title.value.trim() === '') {
        title.style.border = '2px solid red';
        formIsValid = false;
    } else {
        title.style.border = '';
    }
    if (dueDate.value === '') {
        dueDate.style.border = '2px solid red';
        formIsValid = false;
    } else {
        dueDate.style.border = '';
    }
    if (selectedCategory.textContent.trim() === 'Select task category') {
        selectedCategory.parentElement.style.border = '2px solid red';
        formIsValid = false;
    } else {
        selectedCategory.parentElement.style.border = '';
    }
    document.getElementById('createTaskBtn').disabled = !formIsValid;
}

async function createTask() {
    const taskData = {
        title: document.getElementById('inputFieldTitle').value,
        description: document.getElementById('inputFieldDescription').value,
        dueDate: document.getElementById('inputFieldDueDate').value,
        priority: document.getElementById('inputFieldUrgent').classList.contains('active-urgent') ? 'Urgent' :
            document.getElementById('inputFieldMedium').classList.contains('active-medium') ? 'Medium' :
                document.getElementById('inputFieldLow').classList.contains('active-low') ? 'Low' : 'None',
        category: document.getElementById('selectedCategory').textContent,
        subtasks: [
            ...Array.from(document.querySelectorAll('#subtaskList li')).map(item => item.textContent.trim()),
            document.getElementById('inputFieldSubtask').value.trim()
        ].filter(subtask => subtask !== ''),
        assignedTo: selectedContacts
    };

    try {
        const response = await fetch(`${BASE_URL}/tasks.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskData)
        });

        if (response.ok) {
            let message = document.querySelector('.showMe');
            message.classList.remove('d-none');
            setTimeout(() => {
                window.location.href = 'board.html';
                message.classList.add('d-none');
            }, 2900);
        }

    } catch (error) {
        console.error("Error saving task:", error);
    }
}

