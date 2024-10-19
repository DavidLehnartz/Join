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
    // Entferne die aktive Klasse von allen Buttons und setze die ursprünglichen Bilder zurück
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

    // Füge die entsprechende Klasse zum geklickten Button hinzu und ändere das Bild
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

    // Speichere die ausgewählte Priorität in localStorage
    localStorage.setItem('selectedPriority', priority);
}

function restorePriority() {
    const savedPriority = localStorage.getItem('selectedPriority');
    const buttons = document.querySelectorAll('.priobtn');

    if (savedPriority) {
        buttons.forEach(button => {
            if (button.innerText.includes('Urgent') && savedPriority === 'urgent') {
                setPriority(button, 'urgent');
            } else if (button.innerText.includes('Medium') && savedPriority === 'medium') {
                setPriority(button, 'medium');
            } else if (button.innerText.includes('Low') && savedPriority === 'low') {
                setPriority(button, 'low');
            }
        });
    } else {
        // Wenn keine Auswahl gespeichert ist, wähle standardmäßig "Medium"
        const mediumPriorityBtn = document.querySelector('.urgMedLow-btn-medium');
        setPriority(mediumPriorityBtn, 'medium');
    }
}

window.onload = function () {
    restorePriority();
};