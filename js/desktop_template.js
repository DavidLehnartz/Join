function generateSidebar() {
  const sidebar = document.createElement("aside");
  const header = document.getElementById("header");
  sidebar.innerHTML = renderSidebar();
  document.body.insertBefore(sidebar, header);
}

function generateHeader() {
  const header = document.createElement("div");
  header.innerHTML = renderHeader();
  document.body.insertBefore(header, document.body.firstChild);
}

function renderSidebar() {
  return `<div class="left-sidebar">
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
      </div>`;
}

function renderHeader() {
  return `<header id="header">
  <div class="header-wrapper">
          <span> Kanban Project Management Tool</span>
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
        </header>`;
}
