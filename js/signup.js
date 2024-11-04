let isPrivacyChecked = false;

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

function isInputEmpty() {
  let name = document.getElementById("signup-name").value;
  let email = document.getElementById("signup-mail").value;
  let password = document.getElementById("signup-password").value;
  let passwordConfirm = document.getElementById(
    "signup-password-confirm"
  ).value;
  return name != "" && email != "" && password != "" && passwordConfirm != "";
}

function isPasswordSame() {
  let password = document.getElementById("signup-password");
  let passwordConfirm = document.getElementById("signup-password-confirm");
  let error = document.getElementById("signup-error-message");
  if (password.value !== passwordConfirm.value) {
    passwordConfirm.classList.add("error-input");
    error.classList.remove("hidden");
    return false;
  } else {
    passwordConfirm.classList.remove("error-input");
    error.classList.add("hidden");
    return true;
  }
}

function validateInput() {
  return isPrivacyChecked && isInputEmpty() && isPasswordSame();
}

function showSignupSuccessMessage() {
  let message = document.getElementById("signup-message");
  message.classList.add("show");
  setTimeout(() => {
    message.classList.remove("show");
  }, 3000);
}

async function signUpUser(event) {
  event.preventDefault();
  let name = document.getElementById("signup-name").value;
  let email = document.getElementById("signup-mail").value;
  let password = document.getElementById("signup-password").value;
  let newUser = newUserObject(name, email, password);
  let newContact = newContactObject(name, email, "-");
  await createUser(newUser);
  await createContact(newContact);
  resetForm();
}

async function validateAndSignupUser(event) {
  if (validateInput()) {
    await signUpUser(event);
    showSignupSuccessMessage();
    window.location.href("../pages/login.hmtl");
  } else {
    alert("You have to fill out all the fields and accept the privacy policy");
  }
}

function resetForm() {
  let form = document.getElementById("signup-form");
  form.reset();
  isPrivacyChecked = false;
}

function newUserObject(name, mail, password) {
  return {
    email: mail,
    name: name,
    password: password,
  };
}
