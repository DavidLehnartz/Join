function toggleDropdown() {
    const dropdown = document.getElementById("categoryDropdown");
    dropdown.classList.toggle("show");
}

document.addEventListener('click', function(event) {
    const selectCategory = document.querySelector('.selectCategory');
    const dropdown = document.getElementById("categoryDropdown");

    if (!selectCategory.contains(event.target)) {
        dropdown.classList.remove("show");
    }
});