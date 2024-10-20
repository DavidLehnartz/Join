async function showContactInfo(id) {
  let contactInfo = document.getElementById("contacts-info");
  let contact = await getContactById(id);
  console.log(contact);
  contactInfo.innerHTML = "";
  contactInfo.innerHTML += getContactInfoTemplate(
    "orange",
    "AM",
    "Anton Mayer",
    "antonm@gmail.com",
    "+49 1111 111 11 1"
  );
}

function toggleActive(i) {
  let contactItem = document.getElementById(`contact-item-${i}`);
  let contactName = document.getElementById(`list-name-${i}`);
  contactItem.classList.toggle("contact-list-item");
  contactItem.classList.toggle("item-active");
  contactName.classList.toggle("name-active");
}

async function loadContactList() {
  let contactsArray = await loadContacts();
  sortContacts(contactsArray);
  loadContactListItems(contactsArray);
}

function sortContacts(arrayName) {
  arrayName.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
}

function loadContactListItems(arrayName) {
  let contactList = document.getElementById("contact-list");
  for (let i = 0; i < arrayName.length; i++) {
    const contact = arrayName[i];
    contactList.innerHTML += getContactListItemTemplate(
      i,
      contact.id,
      contact.name,
      contact.email,
      contact.color,
      contact.initial
    );
  }
}
