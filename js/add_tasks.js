task = {
    title: 'title-input',
    content: 'textarea-content',
    assignedTO: 'assigned-to-input',
    date: 'date-input',
    prio: 'prio-button',
    category: 'category-dropdown',
    subtasks: ['first subtask', 'secondSubtask']
}

function toggleDropdown(event) {
    const dropdown = document.getElementById("categoryDropdown");
    dropdown.classList.toggle("show");
    event.stopPropagation();
}

function selectCategory(category) {
    const selectedCategoryElement = document.getElementById("selectedCategory");
    selectedCategoryElement.textContent = category;
}

function setPriority(button, priority) {
    const buttons = document.querySelectorAll('.priobtn');
    buttons.forEach(btn => {
        btn.classList.remove('active-urgent', 'active-medium', 'active-low');
        const img = btn.querySelector('img');
        if (btn.innerText.includes('Urgent')) {
            img.src = '../assets/img/urgent.png';
        } else if (btn.innerText.includes('Medium')) {
            img.src = '../assets/img/medium2.png';
        } else if (btn.innerText.includes('Low')) {
            img.src = '../assets/img/low.png';
        }
    });

    const img = button.querySelector('img');
    if (priority === 'urgent') {
        button.classList.add('active-urgent');
        img.src = '../assets/img/urgent2.png';
    } else if (priority === 'medium') {
        button.classList.add('active-medium');
        img.src = '../assets/img/medium.png';
    } else if (priority === 'low') {
        button.classList.add('active-low');
        img.src = '../assets/img/low2.png';
    }
    
    localStorage.setItem('selectedPriority', priority);
}

function restorePriority() {
    const mediumPriorityBtn = document.querySelector('.urgMedLow-btn-medium');
    setPriority(mediumPriorityBtn, 'medium');
}

window.onload = function () {
    restorePriority();
    setTodayDate();
};

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