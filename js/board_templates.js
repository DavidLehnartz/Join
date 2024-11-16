'use strict';

/* BOARD TEMPLATES */


function renderHeaderMenu() {
  return `<div class="header-menu-container">
                <div
                  class="header-menu-item hidden-desktop"
                  onclick="window.location.href='../pages/help.html'"
                >
                  <p class="header-menu-text">Help</p>
                </div>
                <div
                  class="header-menu-item"
                  onclick="window.location.href='../pages/legal_notice.html'"
                >
                  <p class="header-menu-text">Legal Notice</p>
                </div>
                <div
                  class="header-menu-item"
                  onclick="window.location.href='../pages/privacy_policy.html'"
                >
                  <p class="header-menu-text">Privacy Policy</p>
                </div>
                <div class="header-menu-item" onclick="logOut(event)">
                  <p class="header-menu-text">Log out</p>
                </div>
              </div>`;
}


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
              <form class="searchbox-wrapper">
                <div class="searchbox-container"></div>
                <input  onkeyup=" getFilderedTask()" id="filter_input"
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
  
                <button class="add-task-btn">
                  Add task
                  <img
                    class="add-task-btn-img"
                    src="../assets/img/plus_white.png"
                    alt="plus"
                  />
                </button>
              
                <button class="add-task-btn-responsive">
                  <img
                    class="add-task-btn-img"
                    src="../assets/img/plus_white.png"
                    alt="plus"
                  />
                </button>
              </form>
          </div>
  
          <section>
          <div class="headline-responsive-wrapper">
            <div class="headline-responsive">
              <h1>Board</h1>
              <button class="add-task-btn-responsive">
                <img
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


function getTasksTemplate(task, priorityImage, categoryColor, assigneeInitials )  {
  return `    
              <div onclick="openTaskPopUp('${task.id}')" draggable="true" ondragstart="startDragging('${task.id}')" class="kanban-task">
                <div class="kanban-task-header"  style="background-color: ${categoryColor};">
                  <p>${task.category}</p>
                </div>
                <div class="kanban-task-content">
                  <h3 class="task-title" >${task.title}</h3>
                  <p  class="kanban-task-description">
                    ${task.description}
                  </p>
                </div>
                <div class="kanban-task-subtasks">
                      <progress value="0" max="100"></progress>
        <span>Subtasks Completed</span>
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


function getTaskPopUpTemplate(task, priorityImage, categoryColor, assigneeContent) {
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
                     onmouseover="changeImageEdit()" onmouseout="resetImageEdit()"
                     id="edit_img"
                  class="pop-up-footer-edit-img"
                  src="../assets/img/edit_black.png"
                  alt="edit"
                />

                <div class="pop-up-seperator"></div>

                <img onclick="deleteTaskData('${task.id}')"
                     onmouseover="changeImageDelete()" onmouseout="resetImageDelete()"
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
                    <div onclick="changePrioButtons(this)" id="prio_urgent" class="prio-btn">
                      Urgent
                      <img
                        class="prio-img"
                        src="../assets/img/prio_urgent_red.png"
                        alt="urgent"
                      />
                    </div>
                    <div onclick="changePrioButtons(this)" id="prio_medium" class="prio-btn">
                      Medium
                      <img
                        class="prio-img"
                        src="../assets/img/prio_medium_orange.png"
                        alt="medium"
                      />
                    </div>
                    <div onclick="changePrioButtons(this)" id="prio_low" class="prio-btn">
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
                   <button onclick="toggleDropdown(), toggleInputImage()" id="dropdown" class="drop-btn">
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
    return assignedTo.map(assignee => {
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
    }).join('');
  }
  return `<p>No contacts selected</p> `;
}


function getSelectedContactsTemplate(contact) {
  return `
          <div id="selected_contact" class="selected-contact bg-${contact.color}">${contact.initial}</div>
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