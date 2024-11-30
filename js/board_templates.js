"use strict";

/* BOARD TEMPLATES */
function getSidebarTemplate() {
  return `
        <div class="left-sidebar">
           <img src="../assets/img/join_logo_white.svg" alt="join logo" />
           <div class="left-sidebar-links">
             <a class="links" href="summary.html">
               <img
                 class="sidebar-icons"
                 src="../assets/img/summary.png"
                 alt="Summary"
               />
               <p>Summary</p>
             </a>
             <a class="links" href="add_tasks.html">
               <img
                 class="sidebar-icons"
                 src="../assets/img/add_task.png"
                 alt="Add Task"
               />
               <p>Add Task</p>
             </a>
             <a class="links link-active" href="#">
               <img
                 class="sidebar-icons"
                 src="../assets/img/board.png"
                 alt="Board"
               />
               <p>Board</p>
             </a>
             <a class="links" href="contacts.html">
               <img
                 class="sidebar-icons"
                 src="../assets/img/contacts.png"
                 alt="Contacts"
               />
              <p>Contacts</p>
             </a>
           </div>
           <div class="left-sidebar-links">
             <a class="legacy-links" href="#"> Privacy Policy </a>
             <a class="legacy-links" href="#"> Legal notice </a>
           </div>
        </div>
    `;
}

function getHeaderTemplate() {
  return `
        <div class="header-wrapper">
          <span class="app-description"> Kanban Project Management Tool</span>
          
          <img
            class="join-logo-responsive"
            src="../assets/img/join_logo_grey.svg"
            alt="logo"
          />
          <div class="header-icons">
            <img onclick="window.location.href='./help.html'"
              class="header-help-icon"
              src="../assets/img/help.png"
              alt="help"
            />
            <div id="contact-profile-icon" class="header-profil-icon" onclick="showHeaderMenu('contacts-header-menu')"></div>
            <div id="contacts-header-menu"></div>
          </div>
        </div>
    `;
}

function getBoardHeadlineTemplate() {
  return `
          <div class="headline">
              <h1>Board</h1>
              <div class="searchbox-wrapper">
                <div class="searchbox-container"></div>
                <input onkeyup="getFilderedTask()" id="filter_input"
                  class="searchbox-input"
                  type="text"
                  placeholder="Find Task"
                />
                <button class="input-btn">
                  <img
                    class="input-btn-img"
                    src="../assets/img/search_glass.png"
                    alt="search"
                  />
                </button>
  
                <button onclick="openAddTaskPopUp()" class="add-task-btn">
                  Add task
                  <img
                    class="add-task-btn-img"
                    src="../assets/img/plus_white.png"
                    alt="plus"
                  />
                </button>
              
                <button class="add-task-btn-responsive">
                  <img onclick="openAddTaskPopUp()"
                    class="add-task-btn-img"
                    src="../assets/img/plus_white.png"
                    alt="plus"
                  />
                </button>
              </div>
          </div>
  
          <section>
          <div class="headline-responsive-wrapper">
            <div class="headline-responsive">
              <h1>Board</h1>
              <button class="add-task-btn-responsive">
                <img onclick="openAddTaskPopUp()"
                  class="add-task-btn-img"
                  src="../assets/img/plus_white.png"
                  alt="plus"
                />
              </button>
            </div>
            <input
              class="searchbox-input-responsive"
              type="text"
              placeholder="Find Task"
            />
            <button onclick="disableBtn()" id="input_btn" class="input-btn-responsive">
              <img 
                class="input-btn-img"
                src="../assets/img/search_glass.png"
                alt="search"
              />
            </button>
            </div>
          </section>
    `;
}

function getTasksTemplate(
  task,
  priorityImage,
  categoryColor,
  assigneeInitials,
  subtaskProgressHTML,
  progressPercentage
) {
  return `    
          <div id="${task.id}" onclick="openTaskPopUp('${task.id}')" draggable="true" ondragstart="startDragging('${task.id}')" ondragend="endDragging('${task.id}')" class="kanban-task task">
                <div class="kanban-task-header"  style="background-color: ${categoryColor};">
                  <p>${task.category}</p>
                </div>
                <div class="kanban-task-content">
                  <h3 class="task-title" >${task.title}</h3>
                  <p  class="kanban-task-description">
                    ${task.description}
                  </p>
                </div>
                <div id="kanban-task-subtasks" class="kanban-task-subtasks">
                      <progress value="${progressPercentage}" max="100"></progress>
                       ${subtaskProgressHTML}
                </div>
                <div class="kanban-task-footer">

                  <div class="asignees-profil">
                   ${assigneeInitials}
                  </div>

                  <div class="priority-info">
                     <img src="${priorityImage}" alt="${task.priority}" class="priority-icon">
                  </div>
                </div>
          </div>
`;
}

function getTaskPopUpTemplate(
  task,
  priorityImage,
  categoryColor,
  assigneeContent
) {
  return `
          <div class="pop-up-board-inner-container">
                <div class="pop-up-task-header">
                  <div class="header-category"  style="background-color: ${categoryColor};">
                    <p>${task.category}</p>
                  </div>
                  <img onclick="closePopUps()"
                    class="pop-up-close-img"
                    src="../assets/img/close_black.png"
                    alt="close"
                  />
                </div>
                <div class="pop-up-task-content">
                <div class="blubb">
                  <h4>${task.title}</h4>
                  </div>
                  <div class="pop-up-description">
                    <p>
                      ${task.description}
                    </p>
                  </div>
                </div>
                <div class="pop-up-task-info-container">
                  <div class="pop-up-task-info">
                    <div class="task-info-label">Due date:</div>
                    <div class="task-info-value">Priority:</div>
                  </div>
                  <div class="pop-up-task-info">
                    <div class="task-info-label">${task.dueDate}</div>
                    <div class="task-info-value">
                    ${task.priority}
                      <img src="${priorityImage}" alt="${task.priority}" class="priority-icon" />
                    </div>
                  </div>
                </div>
                <div class="pop-up-assigned-to-wrapper">
                  <p>Assigned To:</p>
                  <div id="message" class="pop-up-assigned-profils">
                      <p>${assigneeContent}</p>
                  </div>
                </div>
                <div class="pop-up-subtasks">
                  <p>Subtasks</p>

                  <div id="single_subtasks" class="single-subtasks-wrapper"></div>
                  
                </div>
              </div>
              <div class="pop-up-footer">
                <img onclick="renderEditTaskPopUp('${task.id}'), renderDropdownContacts()"
                     onmouseover="changeImage('edit_img', 'edit')" 
                     onmouseout="changeImage('edit_img', 'edit')"
                     id="edit_img"
                     class="pop-up-footer-edit-img"
                     src="../assets/img/edit_black.png"
                     alt="edit"
                />

                <div class="pop-up-seperator"></div>

                <img onclick="deleteTaskData('${task.id}')"
                     onmouseover="changeImage('delete_img', 'delete')" 
                     onmouseout="changeImage('delete_img', 'delete')"
                     id="delete_img"
                     class="pop-up-footer-delete-img"
                     src="../assets/img/delete_black.png"
                     alt="delete"
                />
              </div> 

          <div id="edit_task_pop_up"></div>
    `;
}

function getEditTaskPopUpTemplate(task) {
  return `
          <div class="pop-up-edit-task-wrapper responsive-pop-up-closed">
            <div class="pop-up-edit-task-inner-container">
              <div class="pop-up-edit-task-headline">
                <h4>Edit task</h4>
                <img
                  onclick="closePopUps()"
                  class="pop-up-close-img"
                  src="../assets/img/close_black.png"
                  alt="close"
                />
              </div>
              <div class="pop-up-edit-task-form">
                <div class="pop-up-edit-task-title">
                  <label for="">
                  Title
                    <span class="required-sign">*</span>
                  </label>
                  <input id="edit_title" value="${task.title}"
                    class="pop-up-edit-task-input"
                    type="text"
                    placeholder="Enter a title"
                  />
                </div>

                <div class="pop-up-edit-task-description">
                  <label for=""> Description </label>
                  <textarea id="edit_description"
                    class="pop-up-edit-task-textarea"
                    rows="4"
                    placeholder="Enter a Description"
                  >${task.description}</textarea>
                </div>

                <div class="pop-up-edit-task-due-date">
                  <label for="">
                    Due date
                    <span class="required-sign">*</span>
                  </label>
                  <input id="edit_due_date" value="${task.dueDate}"
                   class="pop-up-edit-task-input"
                   type="date" />
                </div>

                <div class="pop-up-edit-task-priority">
                  <label for=""> Priority </label>
                  <div class="prio-status">
                    <div onclick="changePrioButtonsEditPopUp(this)" id="prio_urgent" class="prio-btn">
                      Urgent
                      <img
                        class="prio-img"
                        src="../assets/img/prio_urgent_red.png"
                        alt="urgent"
                      />
                    </div>
                    <div onclick="changePrioButtonsEditPopUp(this)" id="prio_medium" class="prio-btn">
                      Medium
                      <img
                        class="prio-img"
                        src="../assets/img/prio_medium_orange.png"
                        alt="medium"
                      />
                    </div>
                    <div onclick="changePrioButtonsEditPopUp(this)" id="prio_low" class="prio-btn">
                      Low
                      <img
                        class="prio-img"
                        src="../assets/img/prio_low_green.png"
                        alt="low"
                      />
                    </div>
                  </div>
                </div>

                <div class="pop-up-edit-task-assigned-to">
                  <div>
                    Assigned to
                    <span class="required-sign">*</span>
                  </div>
            
                  <div class="dropdown">
                   <button onclick="toggleDropdownTaskPopUp(), toggleInputImage()" id="dropdown" class="drop-btn">
                     Select contacts to assign
                     <img id="dropdown_icon" class="dropdown-icon" src="../assets/img/arrow_drop_downaa.png" alt="arrow">
                   </button>
                   <div id="dropdown_content" class="dropdown-content-wrapper d_none">
                     
                      <div id="dropdown_contacts" class="dropdown-content"></div>

                   </div>
                  </div>
                  
                  <div id="selected_contacts" class="assigned-contacts"></div>

                </div>

                <div class="pop-up-edit-task-subtasks">
                  Subtasks
                  <div class="input-box">
                    <input onkeyup="updateButtonImage();"
                      id="input_add_subtask"
                      class="pop-up-edit-subtask-input"
                      type="text"
                      placeholder="Add new subtask"
                    />
                    
                    <button class="pop-up-edit-task-input-btn">
                    <div id="input_image_content">
                      <img onclick="errorMessage()" id="input_button_image"
                        class="pop-up-edit-task-input-btn-img"
                        src="../assets/img/add_black.png"
                        alt=""
                      />
                      </div>
                    </button>
                    
                  </div>

                  <div id="error_message" class="error-message"></div>

                  <ul id="added_subtasks" class="pop-up-edit-task-list-container"></ul>

                </div>
              </div>
            </div>
            <div class="pop-up-edit-task-footer">
              <button
               onclick="saveTaskChanges('${task.id}')"
                class="pop-up-edit-task-btn"
              >
                Ok
                <img
                  class="pop-up-edit-task-btn-img"
                  src="../assets/img/check_white.png"
                  alt="check"
                />
              </button>
            </div>
          </div>
    `;
}

function getDropdownContactsTemplate(contact) {
  return `
         <div  class="dropdown-contact" onclick="toggleCheckboxContact('checkbox_${contact.name}', '${contact.initial}','${contact.color}')" id="selected_contact">
              <div class="dropdown-contact-name">
                <span class="dropdown-initial bg-${contact.color}">${contact.initial}</span>
                <p>${contact.name}</p>
              </div>
                <img id="checkbox_${contact.name}" src="../assets/img/checkbox_false.png" alt="checkbox">
          </div>
  `;
}

function getAssigneeInitialsTemplate(assignee) {
  return `
         <div class="initials bg-${assignee.color}";>
           ${assignee.initial} 
         </div>
  `;
}

function getAssigneesTemplate(assignedTo) {
  if (Array.isArray(assignedTo)) {
    return assignedTo
      .map((assignee) => {
        return `
        <div class="single-assigned-profil-wrapper">
          <div class="single-assigned-profil">
            <div class="single-assigned-profil-initials bg-${assignee.color}">
              ${assignee.initial}
            </div>
            <div class="initial-name">
              ${assignee.name}
            </div>
          </div>
        </div>
      `;
      })
      .join("");
  }
  return `<p>No contacts selected</p> `;
}

function getSelectedContactsTemplate(contact) {
  return `
          <div id="selected_contact" class="selected-contact bg-${contact.color}">${contact.initial}</div>
  `;
}

function getAddedSubtasksTemplate(addedSubtask) {
  return `
          <li onmouseover="showIcons(this)" onmouseout="hideIcons(this)" class="added-subtask-item" data-id="${addedSubtask.id}">
            <span>${addedSubtask.title}</span>
            <div class="list-icon-container">
              <img onclick="editSubtaskEditPopUp('${addedSubtask.id}')" class="icon-container-images" src="../assets/img/edit.png" alt="edit icon">
              <div class="vertical_line"></div>
              <img onclick="deleteAddedSubtaskEditPopUp('${addedSubtask.id}')" class="icon-container-images" src="../assets/img/delete.png" alt="delete icon">
            </div>
          </li>
        `;
}

function getAddTaskPopUpTemplate() {
  return `
         <div class="headingAndAnEx">
              <h1>Add Task</h1>
              <img onclick="closePopUps()" class="makeEnEx" src="../assets/img/makeEnEx.png" alt="">
            </div>
            <div class="bothSides">
              <div class="leftSide">
                <div class="inputStyle">
                  <span for="inputField">Title<span class="required-asterisk">*</span></span>
                  <input type="text" id="inputFieldTitle" placeholder="Enter a title" class="titleInput"
                    oninput="checkForm()" />
                </div>
                <div class="inputStyle">
                  <span for="inputField">Description</span>
                  <textarea id="inputFieldDescription" placeholder="Enter a Description"
                    class="titleInputDescription"></textarea>
                </div>
                <div class="inputStyle">
                  <span class="assignedToSpanStyle" for="inputField">Assigned to</span>
                  <div id="selectOnes" class="selectContactsToAssign" onclick="toggleContactDropdown()">
                    <span id="selectedContacts" name="assignedContactsDisplay">Select contacts to assign</span>
                    <img id="dropdownArrow2" src="../assets/img/arrow_drop_downaa.png" class="dropdown-arrow" />
                    <div class="category-dropdown" id="categoryDropdown2"></div>
                  </div>
                  <div class="completeContacts">
                    <div id="selectedContactsBadges" class="selected-contacts-badges-container"></div>
                    <div class="maxContacts"></div>
                  </div>
                </div>
              </div>
              <div class="seperator1"></div>
              <div class="rightSide">
                <div class="inputStyle">
                  <span for="inputField">Due date<span class="required-asterisk">*</span></span>
                  <input type="date" id="inputFieldDueDate" class="titleInput" oninput="checkForm()" />
                </div>
                <div class="priorityStyle">
                  <span for="inputField">Prio</span>
                  <div class="priority-button">
                    <button id="inputFieldUrgent" class="priobtn urgMedLow-btn" onclick="setPriority(this, 'urgent')">
                      Urgent
                      <img src="../assets/img/urgent.png" class="priority-icon" />
                    </button>
                    <button id="inputFieldMedium" class="priobtn urgMedLow-btn-medium active-medium"
                      onclick="setPriority(this, 'medium')">
                      Medium
                      <img src="../assets/img/medium.png" class="priority-icon" />
                    </button>
                    <button id="inputFieldLow" class="priobtn urgMedLow-btn" onclick="setPriority(this, 'low')">
                      Low
                      <img src="../assets/img/low.png" class="priority-icon" />
                    </button>
                  </div>
                </div>
                <div class="inputStyle">
                  <span class="spanCategoryStyle" for="inputField">Category<span class="required-asterisk">*</span></span>
                  <div id="selectCat" class="selectCategory" onclick="toggleDropdown(event)">
                    <span id="selectedCategory">Select task category</span>
                    <img id="dropdownArrow" src="../assets/img/arrow_drop_downaa.png" class="dropdown-arrow" />
                    <div class="category-dropdown" id="categoryDropdown">
                      <span onclick="selectCategory('Technical Task')">Technical Task</span>
                      <span onclick="selectCategory('User Story')">User Story</span>
                    </div>
                  </div>
                </div>
                <div class="inputStyle">
                  <span class="SubtaskSpanStyle" for="inputField">Subtasks</span>
                  <div class="subtaskInputWrapper">
                    <input type="text" id="inputFieldSubtask" placeholder="Add new subtask" class="subtaskInput" />
                    <div class="iconWrapper" id="iconWrapper">
                      <img src="../assets/img/Propertyadd.png" id="actionIcon" class="icon" onclick="addSubtask()" />
                    </div>
                  </div>

                  <div id="subtaskList" class="subtaskList"></div>

                </div>
              </div>
            </div>
            <div class="addTaskFooter">
              <div class="addTaskFooterLeftSide">
                <span class="mobileSpanStyle" style="color: black; position: relative">
                  <span style="position: absolute; left: -5px; top: -7px; color: red">*</span>
                  This Field is required
                </span>
              </div>
              
              <div class="clear-task-button">
                <button class="btn clear-btn" onclick="clearEverything()">
                  Clear
                  <img id="cancelIcon" src="../assets/img/iconoir_cancel.png" alt="Cancel Icon" />
                </button>
                <button id="createTaskBtn" class="btn create-task-btn" onclick="createTask()" disabled>
                  Create Task
                  <img id="checkIcon" src="../assets/img/check_white.png" alt="Check Icon" />
                </button>
              </div>
            </div>

        <div class="showMe d-none">
          Task Added To Board
          <img src="../assets/img/board.png" alt="" />
        </div> 
  `;
}

function getBeforeButtonContainer() {
  return `
          <button class="pop-up-edit-task-input-btn">
            <div id="button_content_with_images" class="pop-up-edit-task-input-btn-img-container">
                <img onclick="clearInputs()" class="pop-up-edit-task-input-btn-img" src="../assets/img/iconoir_cancel.png" alt="image 1">
                <div class="vertical_line"></div>
                <img onclick="addSubtaskEditPopUp()" class="pop-up-edit-task-input-btn-img" src="../assets/img/check_black.png" alt="image 2">
            </div>
          </button>
  `;
}

function getAfterButtonContainer() {
  return `
          <button class="pop-up-edit-task-input-btn">
            <img id="input_button_image"class="pop-up-edit-task-input-btn-img"src="../assets/img/add_black.png"alt="" />
          </button> 
  `;
}

function getEditSubtaskInput(id, subtask) {
  return `
          <input type="text" value="${subtask.title}" 
                onblur="saveEditedSubtaskEditPopUp('${id}', this.value)"  
                onkeydown="handleEnterKey(event, '${id}', this)" 
                class="edit-subtask-input">
          <div class="list-icon-container">
                <img onclick="deleteAddedSubtaskEditPopUp('${id}')" 
                class="icon-container-images" 
                src="../assets/img/delete.png" 
                alt="check icon">
          <div class="vertical_line"></div>
                <img onclick="saveEditedSubtaskEditPopUp('${id}')"
                class="icon-container-images" 
                src="../assets/img/check_black.png" 
          </div>
  `;
}

/* function getNavbarResponsiveTemplate() {
  return `
          <div class="navbar-links-responsive">
            <a class="navbar-links" href="#">
              <img
                class="navbar-icons"
                src="../assets/img/summary.png"
                alt="Summary"
              />
              <p>Summary</p>
            </a>
            <a class="navbar-links" href="#">
              <img
                class="navbar-icons"
                src="../assets/img/add_task.png"
                alt="Add Task"
              />
              <p>Add Task</p>
            </a>
            <a class="navbar-links" href="#">
              <img
                class="navbar-icons"
                src="../assets/img/board.png"
                alt="Board"
              />
              <p>Board</p>
            </a>
            <a class="navbar-links" href="#">
              <img
                class="navbar-icons"
                src="../assets/img/contacts.png"
                alt="Contacts"
              />
              <p>Contacts</p>
            </a>
          </div>
    `;
} */
