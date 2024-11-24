function createContactHTML(contact, isSelected) {
    return `
    <div class="nameInitials">
        <div class="contact-initials bg-${contact.color}">
          ${contact.initial}
        </div>
        <span class="contact-name">${contact.name}</span>
    </div>
    <input type="checkbox" 
           name="assignedContacts" 
           class="contact-checkbox" 
           data-name="${contact.name}" 
           ${isSelected ? "checked" : ""} />
  `;
}

function createSubtaskHTML(subtaskText) {
    return `
      <div class="subtask-item">
          <span class="subtask-text">${subtaskText}</span>
          <div class="subtask-icons">
              <img src="../assets/img/edit.png" alt="Edit" class="icon" onclick="editSubtask(this.closest('.subtask-item'))">
              <div class="separator"></div>
              <img src="../assets/img/delete.png" alt="Delete" class="icon" onclick="deleteSubtask(this.closest('.subtask-item'))">
          </div>
      </div>
    `;
}

function createCloseIconHTML() {
    return `
      <img src="../assets/img/close.png" class="icon" id="closeIcon" onclick="cancelSubtask()">
    `;
}

function createSubtaskInputHTML(currentText, height) {
    return `
      <input type="text" class="subtaskInput" value="${currentText}" 
             style="width: 100%; height: ${height}px; background-color: #fff; 
             border: none; outline: none;">
    `;
}

function createEditingIconsHTML() {
    return `
      <img src="../assets/img/delete.png" alt="Löschen" class="icon" 
           onclick="deleteSubtask(this.closest('.subtask-item'))">
      <div class="separator3"></div>
      <img src="../assets/img/propertychecktwo.png" alt="Speichern" class="icon" 
           onclick="finishEditing(this.closest('.subtask-item').querySelector('.subtaskInput'), 
           this.closest('.subtask-item').querySelector('.subtask-text'), 
           this.closest('.subtask-item'))">
    `;
}

function createDefaultIconsHTML() {
    return `
      <img src="../assets/img/edit.png" alt="Bearbeiten" class="icon" 
           onclick="editSubtask(this.closest('.subtask-item'))">
      <div class="separator"></div>
      <img src="../assets/img/delete.png" alt="Löschen" class="icon" 
           onclick="deleteSubtask(this.closest('.subtask-item'))">
    `;
}