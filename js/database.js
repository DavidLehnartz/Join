function createInitial(name) {
  let fullName = name.split(" "),
    initials = fullName[0].substring(0, 1).toUpperCase();
  if (fullName.length > 1) {
    initials += fullName[fullName.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
}

function getUserFromLocalStorage() {
  let user;
  let savedUser = JSON.parse(localStorage.getItem("user"));
  if (savedUser != null) {
    user = savedUser;
  }
  return user;
}

function removeUserFromLocalStorage() {
  let user = getUserFromLocalStorage();
  console.log(user);
  localStorage.removeItem(user);
}

function getInitialOfUser(profileId) {
  let user = getUserFromLocalStorage();
  let profileIcon = document.getElementById(profileId);
  profileIcon.innerHTML = user.initial;
}

function logOut(event) {
  event.preventDefault();
  removeUserFromLocalStorage();
  window.location.href = "../pages/login.html";
}
