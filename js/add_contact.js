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

/**
 * Show or hide the overlay of a dialog.
 */
function toggleOverlay() {
  let overlay = document.getElementById("contacts-overlay");
  overlay.classList.toggle("hidden");
}

/**
 * Show the dialog on the overlay to add a new contact.
 * @param {event} event - The event of that element.
 */
function showAddContactForm(event) {
  toggleOverlay();
  let dialog = document.getElementById("contacts-dialog");
  dialog.classList.add("show");
  dialog.innerHTML = getAddContactDialog();
  event.stopPropagation();
}

/**
 * Show the dialog on the overlay to edit an existing contact.
 * @param {event} event - The event of that element.
 * @param {string} id - The id of the contact which should be edited.
 */
async function showEditContactForm(event, id) {
  toggleOverlay();
  let dialog = document.getElementById("contacts-dialog");
  dialog.classList.add("show");
  let contact = await getContactById(id);
  dialog.innerHTML = getEditContactDialog(contact, id);
  event.stopPropagation();
}

/**
 * Close the dialog to add or edit a contact.
 * @param {event} event - The event of that element.
 */
function closeContactForm(event) {
  toggleOverlay();
  let dialog = document.getElementById("contacts-dialog");
  dialog.classList.remove("show");
  event.stopPropagation();
}

/**
 * Get all the values for creating a new contact from the given input fields.
 * @param {event} event - The event of that element.
 */
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
  showContactToastMessage("Contact successfully created");
  refreshContactList();
}

/**
 * Update the values of an existing contact from the given input fields.
 * @param {event} event - The event of that element.
 * @param {string} id - The id of the contact which should be updated.
 */
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
  showContactToastMessage("Contact successfully updated");
  await showContactInfo(id);
  refreshContactList();
}

/**
 * Show toast message after successful creation, update or deletion of a new contact.
 */
function showContactToastMessage(message) {
  let message = document.getElementById("add-contact-message");
  let messageText = doucment.getElementById("contact-toast-message");
  message.classList.add("show");
  messageText.innerHTML = message;
  setTimeout(() => {
    message.classList.remove("show");
  }, 3000);
}

/**
 * Get a random color out of the colors array.
 */
function getRandomColor() {
  let color = colors[Math.floor(Math.random() * colors.length)];
  return color;
}

/**
 * Return an object with the given inputs to create a contact.
 * @param {string} name - The name of the contact.
 * @param {string} mail - The email address of the contact.
 * @param {string} password - The password of the contact.
 */
function newContactObject(name, mail, phone) {
  return {
    color: getRandomColor(),
    email: mail,
    initial: createInitial(name),
    name: name,
    phone: phone,
  };
}

/**
 * Return an object with the given inputs to update a contact.
 * @param {string} name - The name of the contact.
 * @param {string} mail - The email address of the contact.
 * @param {string} password - The password of the contact.
 */
function updatedContactObject(name, mail, phone) {
  return {
    email: mail,
    initial: createInitial(name),
    name: name,
    phone: phone,
  };
}
