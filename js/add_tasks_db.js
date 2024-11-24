function clearFormInputs() {
    const inputs = document.querySelectorAll(
        'input[type="text"], input[type="number"], input[type="date"], input[type="email"], input[type="password"]'
    );
    inputs.forEach((input) => {
        input.value = "";
    });
    const textareas = document.querySelectorAll("textarea");
    textareas.forEach((textarea) => {
        textarea.value = "";
    });
}

function clearCheckboxesAndDropdowns() {
    const checkboxesAndRadios = document.querySelectorAll(
        'input[type="checkbox"], input[type="radio"]'
    );
    checkboxesAndRadios.forEach((input) => {
        input.checked = false;
    });
    const dropdowns = document.querySelectorAll("select");
    dropdowns.forEach((dropdown) => {
        dropdown.selectedIndex = 0;
    });
}

function resetSpecialFields() {
    const subtaskInput = document.getElementById("inputFieldSubtask");
    if (subtaskInput) {
        subtaskInput.value = "";
        subtaskInput.disabled = true;
    }
    const selectedCategoryElement = document.getElementById("selectedCategory");
    if (selectedCategoryElement) {
        selectedCategoryElement.textContent = "Select task category";
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
    const subtaskList = document.getElementById("subtaskList");
    subtaskList.innerHTML = "";
    clearSelectedContacts();
}

function clearSelectedContacts() {
    const selectedContactsElement = document.getElementById("selectedContacts");
    if (selectedContactsElement) {
        selectedContactsElement.textContent = "Select Contacts to assign";
    }
    const selectedContactsBadges = document.getElementById(
        "selectedContactsBadges"
    );
    if (selectedContactsBadges) {
        selectedContactsBadges.innerHTML = "";
    }
    const contactCheckboxes = document.querySelectorAll(".contact-checkbox");
    contactCheckboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });
    selectedContacts = [];
}

function checkForm() {
    const title = document.getElementById("inputFieldTitle");
    const dueDate = document.getElementById("inputFieldDueDate");
    const selectedCategory = document.getElementById("selectedCategory");
    const isTitleValid = validateTitle(title);
    const isDueDateValid = validateDueDate(dueDate);
    const isCategoryValid = validateCategory(selectedCategory);
    const formIsValid = isTitleValid && isDueDateValid && isCategoryValid;
    toggleSubmitButton(formIsValid);
}

function validateTitle(title) {
    if (title.value.trim() === "") {
        title.style.border = "2px solid red";
        return false;
    } else {
        title.style.border = "";
        return true;
    }
}

function validateDueDate(dueDate) {
    if (dueDate.value === "") {
        dueDate.style.border = "2px solid red";
        return false;
    } else {
        dueDate.style.border = "";
        return true;
    }
}

function validateCategory(selectedCategory) {
    if (selectedCategory.textContent.trim() === "Select task category") {
        selectedCategory.parentElement.style.border = "2px solid red";
        return false;
    } else {
        selectedCategory.parentElement.style.border = "";
        return true;
    }
}

function toggleSubmitButton(isFormValid) {
    document.getElementById("createTaskBtn").disabled = !isFormValid;
}

function gatherTaskData() {
    const title = document.getElementById("inputFieldTitle").value;
    const description = document.getElementById("inputFieldDescription").value;
    const dueDate = document.getElementById("inputFieldDueDate").value;
    const priority = getPriority();
    const category = document.getElementById("selectedCategory").textContent;
    return {
        title,
        description,
        dueDate,
        priority,
        category,
        subtasks: subtasksData,
        assignedTo: selectedContacts,
        status: "todo",
    };
}

function getPriority() {
    if (document.getElementById("inputFieldUrgent").classList.contains("active-urgent")) {
        return "Urgent";
    } else if (document.getElementById("inputFieldMedium").classList.contains("active-medium")) {
        return "Medium";
    } else if (document.getElementById("inputFieldLow").classList.contains("active-low")) {
        return "Low";
    }
    return "None";
}

async function sendTaskToApi(taskData) {
    try {
        const response = await fetch(`${BASE_URL}/tasks.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskData),
        });
        return response.ok;
    } catch (error) {
        console.error("Error saving task:", error);
        return false;
    }
}

function handleTaskCreationResponse(success) {
    if (success) {
        const message = document.querySelector(".showMe");
        message.classList.remove("d-none");
        setTimeout(() => {
            window.location.href = "board.html";
            message.classList.add("d-none");
        }, 2900);
    } else {
        console.error("Task creation failed.");
    }
}

async function createTask() {
    const taskData = gatherTaskData();
    const success = await sendTaskToApi(taskData);
    handleTaskCreationResponse(success);
}