let groupedContacts = {};

function showContactInfo(color, initial, name, email, phone) {
  let contactInfo = document.getElementById("contacts-info");
  contactInfo.innerHTML = "";
  contactInfo.innerHTML += getContactInfoTemplate(
    color,
    initial,
    name,
    email,
    phone
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
  groupContacts(contactsArray);
  loadGroupedContactList();
}

function groupContacts(arrayName) {
  groupedContacts = Object.groupBy(arrayName, ({ name }) => name.slice(0, 1));
  return groupedContacts;
}

function loadGroupedContactList() {
  let contactList = document.getElementById("contact-list");
  for (i = 65; i <= 90; i++) {
    let letter = String.fromCharCode(i);
    if (typeof groupedContacts[letter] !== "undefined") {
      contactList.innerHTML += getContactListHeaderTemplate(letter);
      loadContactListItems(groupedContacts[letter]);
    }
  }
}

function loadContactListItems(arrayName) {
  let contactList = document.getElementById("contact-list");
  for (let i = 0; i < arrayName.length; i++) {
    const contact = arrayName[i];
    contactList.innerHTML += getContactListItemTemplate(
      i,
      contact.name,
      contact.email,
      contact.color,
      contact.initial,
      contact.phone
    );
  }
}
