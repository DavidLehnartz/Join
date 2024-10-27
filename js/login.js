let isPrivacyChecked = false;
let isVisible = false;

function checkPrivacyPolicy() {
  let checkbox = document.getElementById("privacy-checkbox");
  let checkboxHover = document.getElementById("privacy-checkbox-hover");
  isPrivacyChecked = !isPrivacyChecked;
  if (isPrivacyChecked) {
    checkbox.src = "../assets/icons/checked.svg";
    checkboxHover.src = "../assets/icons/hover_checked.svg";
  } else {
    checkbox.src = "../assets/icons/default.svg";
    checkboxHover.src = "../assets/icons/hover_default.svg";
  }
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
function signUpUser() {
  let form = document.getElementById("signup-form");
  let name = document.getElementById("signup-name").value;
  let email = document.getElementById("signup-mail").value;
  let password = document.getElementById("signup-password").value.toString();
  let passwordConfirm = document
    .getElementById("signup-password.confirm")
    .value.toString();
  let newUser = newUserObject(name, email, password);
  let newContact = newContactObject(name, email, "-");
  console.log(name.value);
  //console.log(newUser);
  //console.log(newContact);
  //createUser(newUser);
  //createContact(newContact);
  //form.clear();
}

function newUserObject(name, mail, password) {
  return {
    email: mail,
    name: name,
    password: password,
  };
}
