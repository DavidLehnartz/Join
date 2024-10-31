let isVisible = false;

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
