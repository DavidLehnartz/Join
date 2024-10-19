function toggleDropdown(event) {
    const dropdown = document.getElementById("categoryDropdown");
    dropdown.classList.toggle("show");
    event.stopPropagation();
}

function selectCategory(category) {
    const selectedCategoryElement = document.getElementById("selectedCategory");
    selectedCategoryElement.textContent = category;
}