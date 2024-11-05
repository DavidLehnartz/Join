function createSidebar(sidebarId, linkId) {
  let sidebar = document.getElementById(sidebarId);
  sidebar.innerHTML = renderSidebar();
  let activeLink = document.getElementById(linkId);
  activeLink.classList.add("active");
}

function renderSidebar() {
  return `<div class="left-sidebar">
        <img src="../assets/img/join_logo_white.svg" alt="join logo" />
        <div class="left-sidebar-links">
          <a id="summary-link" class="links" href="../pages/summary.html">
            <img
              class="sidebar-icons"
              src="../assets/img/summary.png"
              alt="Summary"
            />
            <p>Summary</p>
          </a>
          <a id="task-link" class="links" href="../pages/add_tasks.html">
            <img
              class="sidebar-icons"
              src="../assets/img/add_task.png"
              alt="Add Task"
            />
            <p>Add Task</p>
          </a>
          <a id="board-link" class="links" href="../pages/board.html">
            <img
              class="sidebar-icons"
              src="../assets/img/board.png"
              alt="Board"
            />
            <p>Board</p>
          </a>
          <a id="contacts-link" class="links" href="../pages/contacts.html">
            <img
              class="sidebar-icons"
              src="../assets/img/contacts.png"
              alt="Contacts"
            />
            <p>Contacts</p>
          </a>
        </div>
        <div class="left-sidebar-links">
          <a class="legacy-links" href="../pages/privacy_policy.html"> Privacy Policy </a>
          <a class="legacy-links" href="../pages/legal_notice.html"> Legal notice </a>
        </div>
      </div>`;
}

function createHeader(headerId) {
  let header = document.getElementById(headerId);
  if (isGuest) {
    header.innerHTML = renderHeader("G");
  } else {
    header.innerHTML = renderHeader("XX");
  }
}

function renderHeader(initial) {
  return `<header id="header">
  <div class="header-wrapper">
          <span> Kanban Project Management Tool</span>
          <div class="header-icons">
            <img
              class="header-help-icon"
              src="../assets/img/help.png"
              alt="help"
            />
            <div id="header-profil-icon" class="header-profil-icon">
               ${initial}
            </div>
          </div>
        </div>
        </header>`;
}
