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

async function getNewContactsInfo(event) {
  event.preventDefault();
  let name = document.getElementById("add-contact-name").value;
  let mail = document.getElementById("add-contact-mail").value;
  let phone = document.getElementById("add-contact-phone").value;
  let dialog = document.getElementById("contacts-dialog");
  let newContact = newContactObject(name, mail, phone);
  await createContact(newContact);
  toggleOverlay();
  dialog.classList.remove("show");
  showSuccessMessage();
  refreshContactList();
}

async function updateContactInfo(event, id) {
  event.preventDefault();
  let name = document.getElementById("edit-contact-name").value;
  let mail = document.getElementById("edit-contact-mail").value;
  let phone = document.getElementById("edit-contact-phone").value;
  let dialog = document.getElementById("contacts-dialog");
  let updatedContact = updatedContactObject(name, mail, phone);
  await updateContact(updatedContact, id);
  toggleOverlay();
  dialog.classList.remove("show");
  await showContactInfo(id);
  refreshContactList();
}

function showSuccessMessage() {
  let message = document.getElementById("add-contact-message");
  message.classList.add("show");
  setTimeout(() => {
    message.classList.remove("show");
  }, 3000);
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

function updatedContactObject(name, mail, phone) {
  return {
    email: mail,
    initial: createInitial(name),
    name: name,
    phone: phone,
  };
}
