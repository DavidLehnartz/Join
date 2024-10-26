'use strict';

/* BOARD TEMPLATES */


function getSidebarTemplate() {
  return `
          <div class="left-sidebar">
            <img src="../assets/img/join_logo_white.svg" alt="join logo" />
            <div class="left-sidebar-links">
              <a class="links" href="#">
                <img
                  class="sidebar-icons"
                  src="../assets/img/summary.png"
                  alt="Summary"
                />
                <p>Summary</p>
              </a>
              <a class="links" href="#">
                <img
                  class="sidebar-icons"
                  src="../assets/img/add_task.png"
                  alt="Add Task"
                />
                <p>Add Task</p>
              </a>
              <a class="links" href="#">
                <img
                  class="sidebar-icons"
                  src="../assets/img/board.png"
                  alt="Board"
                />
                <p>Board</p>
              </a>
              <a class="links" href="#">
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
            <!-- RESPONSIVE LOGO -->
            <img
              class="join-logo-responsive"
              src="../assets/img/join_logo_grey.svg"
              alt="logo"
            />
            <div class="header-icons">
              <img
                class="header-help-icon"
                src="../assets/img/help.png"
                alt="help"
              />
              <img
                class="header-profil-icon"
                src="../assets/img/profil_icon.png"
                alt="profil"
              />
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
                <input
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
            <button class="input-btn-responsive">
              <img
                class="input-btn-img"
                src="../assets/img/search_glass.png"
                alt="search"
              />
            </button>
          </section>
    `;
}


function getTaskPopUpTemplate() {
  return `
             <div class="pop-up-board-inner-container">
                <div class="pop-up-task-header">
                  <div class="header-category">
                    <p>$$Ctgry$$</p>
                  </div>
                  <img onclick="closePopUps()"
                    class="pop-up-close-img"
                    src="../assets/img/close_black.png"
                    alt="close"
                  />
                </div>
                <div class="pop-up-task-content">
                  <h4>$$ Title $$</h4>
                  <div class="pop-up-description">
                    <p>
                      $$ Task Text $$ Lorem ipsum, dolor sit amet consectetur
                      adipisicing elit....
                    </p>
                  </div>
                </div>
                <div class="pop-up-task-info-container">
                  <div class="pop-up-task-info">
                    <div class="task-info-label">Due date:</div>
                    <div class="task-info-value">Priority:</div>
                  </div>
                  <div class="pop-up-task-info">
                    <div class="task-info-label">$$ Date $$</div>
                    <div class="task-info-value">
                      Medium
                      <img src="../assets/img/prio_medium_orange.png" alt="" />
                    </div>
                  </div>
                </div>
                <div class="pop-up-assigned-to-wrapper">
                  <p>Assigned To:</p>
                  <div class="pop-up-assigned-profils">
                    <div class="single-assigned-profil">
                      <img
                        class="assigned-to-profil-icons"
                        src="../assets/img/profil_icon_orange.png"
                        alt="contact"
                      />
                      <p>$$ Name $$</p>
                    </div>
                    <div class="single-assigned-profil">
                      <img
                        class="assigned-to-profil-icons"
                        src="../assets/img/profil_icon_light_blue_.png"
                        alt="contact"
                      />
                      <p>$$ Name $$</p>
                    </div>
                  </div>
                </div>
                <div class="pop-up-subtasks">
                  <p>Subtasks</p>
                  <div class="single-subtasks">
                    <img
                      src="../assets/img/checkbox_false.png"
                      alt="checkbox"
                    />
                    $$ Single Subtask $$
                  </div>
                  <div class="single-subtasks">
                    <img
                      src="../assets/img/checkbox_false.png"
                      alt="checkbox"
                    />
                    $$ Single Subtask $$
                  </div>
                </div>
              </div>
              <div class="pop-up-footer">
                <img onclick="renderEditTaskPopUp()"
                  class="pop-up-footer-edit-img"
                  src="../assets/img/edit_black.png"
                  alt="edit"
                />
                <div class="pop-up-seperator"></div>
                <img
                  class="pop-up-footer-delete-img"
                  src="../assets/img/delete_black.png"
                  alt="delete"
                />
              </div> 

              <div id="edit_task_pop_up"></div>
    `;
}


function getEditTaskPopUp() {
  return `
          <div class="pop-up-edit-task-wrapper">
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
                  <input
                    class="pop-up-edit-task-input"
                    type="text"
                    placeholder="Enter a title"
                  />
                </div>

                <div class="pop-up-edit-task-description">
                  <label for=""> Description </label>
                  <textarea
                    class="pop-up-edit-task-textarea"
                    rows="4"
                    placeholder="Enter a Description"
                  ></textarea>
                </div>

                <div class="pop-up-edit-task-due-date">
                  <label for="">
                    Due date
                    <span class="required-sign">*</span>
                  </label>
                  <input class="pop-up-edit-task-input" type="date" />
                </div>

                <div class="pop-up-edit-task-priority">
                  <label for=""> Priority </label>
                  <div class="prio-status">
                    <div class="prio-urgent">
                      Urgent
                      <img
                        class="prio-img"
                        src="../assets/img/prio_urgent_red.png"
                        alt="urgent"
                      />
                    </div>
                    <div class="prio-medium">
                      Medium
                      <img
                        class="prio-img"
                        src="../assets/img/prio_medium_orange.png"
                        alt="medium"
                      />
                    </div>
                    <div class="prio-low">
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
                  <label for="">
                    Assigned to
                    <span class="required-sign">*</span>
                  </label>

                  <div class="custom-dropdown">
                    <input
                      type="text"
                      class="dropdown-input"
                      placeholder="Select an option"
                      readonly
                    />
                    <img
                      class="dropdown-icon"
                      src="../assets/img/arrow_drop_downaa.png"
                      alt=""
                    />
                    <div class="dropdown-content">
                      <div class="dropdown-item">
                        <div class="dropdown-item-user">
                          <img
                            class="user-icon"
                            src="../assets/img/profil_icon_orange.png"
                            alt="Option 1"
                          />
                          Option 1
                        </div>
                        <img src="../assets/img/checkbox_false.png" alt="" />
                      </div>
                      <div class="dropdown-item">
                        <div class="dropdown-item-user">
                          <img
                            class="user-icon"
                            src="../assets/img/profil_icon_light_blue_.png"
                            alt="Option 1"
                          />
                          Option 2
                        </div>
                        <img src="../assets/img/checkbox_false.png" alt="" />
                      </div>
                    </div>
                  </div>

                  <div class="assigned-contacts">
                    <div>
                      <img
                        class="user-icon"
                        src="../assets/img/profil_icon_orange.png"
                        alt=""
                      />
                    </div>
                    <div>
                      <img
                        class="user-icon"
                        src="../assets/img/profil_icon_light_blue_.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                <div class="pop-up-edit-task-subtasks">
                  Subtasks
                  <div class="input-box">
                    <input
                      id="input_subtask_add_subtask"
                      class="pop-up-edit-subtask-input"
                      type="text"
                      placeholder="Add new subtask"
                    />
                    <button class="pop-up-edit-task-input-btn">
                      <img
                        onclick="addSubtask()"
                        class="pop-up-edit-task-input-btn-img"
                        src="../assets/img/add_black.png"
                        alt=""
                      />
                    </button>
                  </div>

                  <div id="error_message" class="error-message"></div>
                  <div
                    id="subtasks"
                    class="pop-up-edit-task-list-container"
                  >
                  </div>
                </div>
              </div>
            </div>
            <div class="pop-up-edit-task-footer">
              <button
                onclick=" renderTaskPopUp();"
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


function getNavbarResponsiveTemplate() {
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
}
