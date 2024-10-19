function toggleDropdown() {
    const dropdown = document.getElementById("categoryDropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

document.addEventListener('click', function(event) {
    const selectCategory = document.querySelector('.selectCategory');
    const dropdown = document.getElementById("categoryDropdown");

    if (!selectCategory.contains(event.target)) {
        dropdown.style.display = "none";
    }
});

function setPriority(button, priority) {
    // Entferne die aktive Klasse von allen Buttons und setze die Bilder zurück
    const buttons = document.querySelectorAll('.priobtn');
    buttons.forEach(btn => {
        btn.classList.remove('active-urgent', 'active-medium', 'active-low');
        
        // Setze das ursprüngliche Bild zurück
        const img = btn.querySelector('img');
        if (btn.innerText.includes('Urgent')) {
            img.src = '../assets/img/urgent.png';
        } else if (btn.innerText.includes('Medium')) {
            img.src = '../assets/img/medium.png';
        } else if (btn.innerText.includes('Low')) {
            img.src = '../assets/img/low.png';
        }
    });

    // Füge die entsprechende Klasse zum geklickten Button hinzu
    const img = button.querySelector('img');
    if (priority === 'urgent') {
        button.classList.add('active-urgent');
        img.src = '../assets/img/urgent_active.png'; // Setze das rote Bild
    } else if (priority === 'medium') {
        button.classList.add('active-medium');
        img.src = '../assets/img/medium_active.png'; // Setze das orange Bild
    } else if (priority === 'low') {
        button.classList.add('active-low');
        img.src = '../assets/img/low_active.png'; // Setze das grüne Bild
    }
}