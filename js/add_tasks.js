task = {
    title: 'title-input',
    content: 'textarea-content',
    assignedTO: 'assigned-to-input',
    date: 'date-input',
    prio: 'prio-button',
    category: 'category-dropdown',
    subtasks: ['first subtask', 'secondSubtask']
}

function selectCategory(category) {
    const selectedCategoryElement = document.getElementById("selectedCategory");
    selectedCategoryElement.textContent = category;
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

function setTodayDate() {
    const dateInput = document.getElementById('inputField4');
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayString = `${year}-${month}-${day}`;
    dateInput.setAttribute('min', todayString);
    dateInput.value = todayString;
}

window.onload = function () {
    restorePriority();
    setTodayDate();
};

function addSubtask() {
    const inputField = document.getElementById('inputField7');
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
    actionIcon.onclick = function() {
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
            editIcon.onclick = function() {
                editSubtask(newSubtask);
            };
            const separator = document.createElement('div');
            separator.classList.add('separator');
            const deleteIcon = document.createElement('img');
            deleteIcon.src = '../assets/img/delete.png';
            deleteIcon.alt = 'Delete';
            deleteIcon.onclick = function() {
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
    const inputField = document.getElementById('inputField7');
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
    input.addEventListener('keydown', function(event) {
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
    input.addEventListener('blur', function() {
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
    const subtaskInput = document.getElementById('inputField7');
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
    const subtaskList = document.getElementById('subtaskList');
    subtaskList.innerHTML = '';
}