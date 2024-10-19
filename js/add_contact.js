function showAddContactForm(event) {
  let overlay = document.getElementById("contacts-overlay");
  overlay.classList.remove("hidden");
  overlay.innerHTML += getAddContactOverlayTemplate();
  event.stopPropagation();
}

function showEditContactForm(event) {
  let overlay = document.getElementById("contacts-overlay");
  overlay.classList.remove("hidden");
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
  let overlay = document.getElementById("contacts-overlay");
  overlay.innerHTML = "";
  overlay.classList.add("hidden");
  event.stopPropagation();
}
