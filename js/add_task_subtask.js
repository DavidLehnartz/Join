function addSubtask() {
    const inputField = document.getElementById("inputFieldSubtask");
    const iconWrapper = document.getElementById("iconWrapper");
    const actionIcon = document.getElementById("actionIcon");
    inputField.disabled = false;
    inputField.focus();
    actionIcon.src = "../assets/img/Propertycheck.png";
    if (!document.getElementById("closeIcon")) {
        iconWrapper.insertAdjacentHTML("afterbegin", createCloseIconHTML());
    }
    actionIcon.onclick = function () {
        const subtaskText = inputField.value.trim();
        if (subtaskText !== "") {
            const subtaskList = document.getElementById("subtaskList");
            subtaskList.insertAdjacentHTML("beforeend", createSubtaskHTML(subtaskText));
            subtasksData.push({ name: subtaskText, completed: false });
            inputField.value = "";
            inputField.focus();
        }
    };
}

function cancelSubtask() {
    const inputField = document.getElementById("inputFieldSubtask");
    const iconWrapper = document.getElementById("iconWrapper");
    const actionIcon = document.getElementById("actionIcon");
    inputField.disabled = true;
    inputField.value = "";
    actionIcon.src = "../assets/img/Propertyadd.png";
    const closeIcon = document.getElementById("closeIcon");
    if (closeIcon) {
        iconWrapper.removeChild(closeIcon);
    }
    actionIcon.onclick = addSubtask;
}

function editSubtask(subtaskItem) {
    const textElement = subtaskItem.querySelector(".subtask-text");
    const currentText = textElement.textContent.trim();
    subtaskItem.classList.add("editing");
    textElement.outerHTML = createSubtaskInputHTML(currentText, subtaskItem.offsetHeight);
    const iconsWrapper = subtaskItem.querySelector(".subtask-icons");
    iconsWrapper.innerHTML = createEditingIconsHTML();
    const input = subtaskItem.querySelector(".subtaskInput");
    input.focus();
    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            finishEditing(input, textElement, subtaskItem);
        }
    });
    input.addEventListener("blur", function () {
        finishEditing(input, textElement, subtaskItem);
    });
}

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("contact-checkbox")) {
        console.log("Checkbox clicked:", event.target.dataset.name);
    }
});

function finishEditing(input, textElement, subtaskItem) {
    const newText = input.value.trim();
    textElement.textContent = newText !== "" ? newText : input.value;
    input.replaceWith(textElement);
    subtaskItem.classList.remove("editing");
    const subtask = subtasksData.find(
        (sub) => sub.name === textElement.textContent
    );
    if (subtask) {
        subtask.name = newText;
    }
    const iconsWrapper = subtaskItem.querySelector(".subtask-icons");
    iconsWrapper.innerHTML = createDefaultIconsHTML();
}

function deleteSubtask(subtaskItem) {
    subtaskItem.remove();
}