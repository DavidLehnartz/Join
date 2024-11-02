let isVisible = false;
let isRememberOn = false;

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

async function isValidCredential(event) {
  event.preventDefault();
  let password = document.getElementById("login-password");
  let mail = document.getElementById("login-mail");
  let error = document.getElementById("login-error-message");
  let userExists = await findUser(mail.value, password.value);
  if (userExists) {
    window.location.href = "./pages/summary.html";
  } else {
    mail.classList.add("error-input");
    password.classList.add("error-input");
    error.classList.remove("hidden");
  }
}
