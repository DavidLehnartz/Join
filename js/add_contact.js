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

function showEditContactForm(event) {
  toggleOverlay();
  let overlay = document.getElementById("contacts-overlay");
  overlay.innerHTML += getEditContactOverlayTemplate(
    "orange",
    "AM",
    "Anton Mayer",
    "antonm@gmail.com",
    "+49 1111 111 11 1"
  );
  event.stopPropagation();
}

function closeContactForm(event) {
  toggleOverlay();
  let overlay = document.getElementById("contacts-overlay");
  overlay.innerHTML = "";
  event.stopPropagation();
}
