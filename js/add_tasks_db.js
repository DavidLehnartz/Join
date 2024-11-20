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