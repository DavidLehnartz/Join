let groupedContacts = {};

function showContactInfo(id, color, initial, name, email, phone) {
  let contactInfo = document.getElementById("contacts-info");
  contactInfo.innerHTML = "";
  contactInfo.innerHTML += getContactInfoTemplate(
    id,
    color,
    initial,
    name,
    email,
    phone
  );
}

function toggleActive() {
  const contactItems = document.getElementsByClassName("contact-list-item");
  for (let i = 0; i < contactItems.length; i++) {
    const item = contactItems[i];
    item.addEventListener("click", () => {
      item.classList.toggle("contact-list-item");
      item.classList.toggle("item-active");
    });
  }
}

async function loadContactList() {
  let contactsArray = await loadAllContactsInfo();
  groupContacts(contactsArray);
  loadGroupedContactList();
}

async function refreshContactList() {
  let contactList = document.getElementById("contact-list");
  let contactInfo = document.getElementById("contacts-info");
  contactList.innerHTML = "";
  contactInfo.innerHTML = "";
  loadContactList();
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
      contact.id,
      contact.name,
      contact.email,
      contact.color,
      contact.initial,
      contact.phone
    );
  }
}
