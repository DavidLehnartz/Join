function showContactInfo() {
  let contactInfo = document.getElementById("contacts-info");
  contactInfo.innerHTML = "";
  contactInfo.innerHTML += getContactInfoTemplate(
    "orange",
    "AM",
    "Anton Mayer",
    "antonm@gmail.com",
    "+49 1111 111 11 1"
  );
}

function toggleActive(name) {
  let contactItem = document.getElementById(`contact-item-${name}`);
  let contactName = document.getElementById(`list-name-${name}`);
  contactItem.classList.toggle("contact-list-item");
  contactItem.classList.toggle("item-active");
  contactName.classList.toggle("name-active");
}
