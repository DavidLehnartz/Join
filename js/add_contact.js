function toggleOverlay() {
  let overlay = document.getElementById("contacts-overlay");
  overlay.classList.toggle("hidden");
}

function showAddContactForm(event) {
  toggleOverlay();
  let dialog = document.getElementById("contacts-dialog");
  dialog.classList.add("show");
  dialog.innerHTML = getAddContactDialog();
  event.stopPropagation();
}

async function showEditContactForm(event, id) {
  toggleOverlay();
  let dialog = document.getElementById("contacts-dialog");
  dialog.classList.add("show");
  let contact = await getContactById(id);
  dialog.innerHTML = getEditContactDialog(contact, id);
  event.stopPropagation();
}

function closeContactForm(event) {
  toggleOverlay();
  let dialog = document.getElementById("contacts-dialog");
  dialog.classList.remove("show");
  event.stopPropagation();
}

function getNewContactsInfo(event) {
  let form = document.getElementById("add-contacts-form");
  let name = document.getElementById("add-contact-name").value;
  let mail = document.getElementById("add-contact-mail").value;
  let phone = document.getElementById("add-contact-phone").value;
  let dialog = document.getElementById("contacts-dialog");
  toggleOverlay();
  dialog.classList.remove("show");
  let newContact = newContactObject(name, mail, phone);
  createContact(newContact);
  form.clear();
  event.stopPropagation();
}

function updateContactInfo(event, id) {
  let name = document.getElementById("edit-contact-name").value;
  let mail = document.getElementById("edit-contact-mail").value;
  let phone = document.getElementById("edit-contact-phone").value;
  toggleOverlay();
  let updatedContact = newContactObject(name, mail, phone);
  updateContact(updatedContact, id);
  event.stopPropagation();
}

function showSuccessMessage() {
  let message = document.getElementById("add-contact-message");
  message.classList.add("show");
  setTimeout(() => {
    message.classList.remove("show");
  }, 3000);
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
