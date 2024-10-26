function toggleOverlay() {
  let overlay = document.getElementById("contacts-overlay");
  overlay.classList.toggle("hidden");
}

function validateClick(event) {
  let overlay = document.getElementById("contacts-overlay");
  if (overlay && !overlay.contains(event.target)) {
    toggleOverlay();
  }
}

function showAddContactForm(event) {
  toggleOverlay();
  let overlay = document.getElementById("contacts-overlay");
  overlay.innerHTML = getAddContactOverlayTemplate();
  event.stopPropagation();
}

function showEditContactForm(event, color, initial, name, email, phone) {
  toggleOverlay();
  let overlay = document.getElementById("contacts-overlay");
  overlay.innerHTML += getEditContactOverlayTemplate(
    color,
    initial,
    name,
    email,
    phone
  );
  event.stopPropagation();
}

function closeContactForm(event) {
  toggleOverlay();
  let overlay = document.getElementById("contacts-overlay");
  overlay.innerHTML = "";
  event.stopPropagation();
}

function getNewContactsInfo() {
  let name = document.getElementById("add-contact-name").value;
  let mail = document.getElementById("add-contact-mail").value;
  let phone = document.getElementById("add-contact-phone").value;
  let newContact = newContactObject(name, mail, phone);
  createContact(newContact);
}

function createInitial(name) {
  let fullName = name.split(" "),
    initials = fullName[0].substring(0, 1).toUpperCase();
  if (fullName.length > 1) {
    initials += fullName[fullName.length - 1].substring(0, 1).toUpperCase();
  }
  console.log(initials);
  return initials;
}

const colors = [
  "orange",
  "lila",
  "violet",
  "pink",
  "yellow",
  "turquoise",
  "darkviolet",
  "red",
  "lightblue",
  "coral",
  "blue",
  "darkblue",
];

function getRandomColor() {
  let color = colors[Math.floor(Math.random() * colors.length)];
  console.log(color);
  return color;
}

function newContactObject(name, mail, phone) {
  return {
    color: getRandomColor(),
    email: mail,
    initial: createInitial(name),
    name: name,
    phone: phone,
  };
}
