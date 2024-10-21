function toggleOverlay() {
  let overlay = document.getElementById("contacts-overlay");
  overlay.classList.toggle("hidden");
}

function showAddContactForm(event) {
  toggleOverlay();
  let overlay = document.getElementById("contacts-overlay");
  overlay.innerHTML += getAddContactOverlayTemplate();
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

function getNewContactsInfo(event) {
  let name = document.getElementById("add-contact-name").value;
  let mail = document.getElementById("add-contact-mail").value;
  let phone = document.getElementById("add-contact-phone").value;
  let newContact = newContactObject(name, mail, phone);
  createContact(newContact);
  event.stopPropagation();
}

function createInitial(name) {
  let fullName = string.split(" "),
    initials = fullName[0].substring(0, 1).toUpperCase();

  if (fullName.length > 1) {
    initials += fullName[fullName.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
}

function newContactObject(name, mail, phone) {
  return {
    color: "coral",
    email: mail,
    id: uuidv4(),
    initial: createInitial(name),
    name: name,
    phone: phone,
  };
}
