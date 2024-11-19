let isVisible = false;
let isRememberOn = false;

function animateIntro() {
  if (window.innerWidth > 700) {
    introAnimationDesktop();
  } else {
    introAnimationMobile();
  }
}

function introAnimationDesktop() {
  const logo = document.getElementById("intro-logo");
  logo.addEventListener("animationend", (event) => {
    if (event.animationName === "fadeOut") {
      window.location.href = "../pages/login.html";
    }
  });
}

function introAnimationMobile() {
  const mobileLogo = document.getElementById("intro-mobile-logo");
  mobileLogo.addEventListener("animationend", (event) => {
    if (event.animationName === "fadeOut") {
      window.location.href = "../pages/login.html";
    }
  });
}

function showPassword(iconId, passwordId) {
  let passwordIcon = document.getElementById(iconId);
  let password = document.getElementById(passwordId);
  isVisible = !isVisible;
  if (isVisible) {
    passwordIcon.src = "../assets/icons/visibility.svg";
    password.type = "text";
  } else {
    passwordIcon.src = "../assets/icons/visibility_off.svg";
    password.type = "password";
  }
}

function showVisibilityIcon(iconId) {
  let passwordIcon = document.getElementById(iconId);
  passwordIcon.src = "../assets/icons/visibility_off.svg";
}

function checkRememberMe() {
  let checkbox = document.getElementById("remember-checkbox");
  let checkboxHover = document.getElementById("remember-checkbox-hover");
  isRememberOn = !isRememberOn;
  if (isRememberOn) {
    checkbox.src = "../assets/icons/checked.svg";
    checkboxHover.src = "../assets/icons/hover_checked.svg";
  } else {
    checkbox.src = "../assets/icons/default.svg";
    checkboxHover.src = "../assets/icons/hover_default.svg";
  }
}

async function findUser(mail, password) {
  let userList = await loadAllUsersInfo();
  let validMail = userList.some((user) => user.email === mail);
  let validPassword = userList.some((user) => user.password === password);
  return validMail && validPassword;
}

async function getValidUser(mail, password) {
  let users = await loadAllUsersInfo();
  let validUser = users.find(
    (u) => u.email === mail && u.password === password
  );
  return validUser;
}

async function saveContactToLocalStorage(mail, password) {
  let user = await getValidUser(mail, password);
  let contacts = await loadAllContactsInfo();
  let loggedContact = contacts.find(
    (c) => c.email === user.email && c.name === user.name
  );
  localStorage.setItem("user", JSON.stringify(loggedContact));
}

async function isValidCredential(event) {
  event.preventDefault();
  let password = document.getElementById("login-password");
  let mail = document.getElementById("login-mail");
  let error = document.getElementById("login-error-message");
  let userExists = await findUser(mail.value, password.value);
  if (userExists) {
    await saveContactToLocalStorage(mail.value, password.value);
    window.location.href = "../pages/summary.html";
  } else {
    mail.classList.add("error-input");
    password.classList.add("error-input");
    error.classList.remove("hidden");
  }
}

function loginAsGuest() {
  localStorage.setItem("user", JSON.stringify({ name: "Guest", initial: "G" }));
  window.location.href = "../pages/summary.html";
}
