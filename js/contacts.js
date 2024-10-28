let groupedContacts = {};

async function showContactInfo(id) {
  let contactInfo = document.getElementById("contacts-info");
  let contact = await getContactById(id);
  contactInfo.innerHTML = "";
  contactInfo.innerHTML += getContactInfoTemplate(contact, id);
}

async function loadContactList() {
  let contactsArray = await loadAllContactsInfo();
  groupContacts(contactsArray);
  loadGroupedContactList();
}

function refreshContactList() {
  let contactList = document.getElementById("contact-list");
  let contactInfo = document.getElementById("contacts-info");
  contactList.innerHTML = "";
  contactInfo.innerHTML = "";
  loadGroupedContactList();
}

async function deleteAndRefreshContactList(id) {
  let contactList = document.getElementById("contact-list");
  let contactInfo = document.getElementById("contacts-info");
  await deleteContact(id);
  contactList.innerHTML = "";
  contactInfo.innerHTML = "";
  await loadContactList();
}

function groupContacts(arrayName) {
  groupedContacts = Object.groupBy(arrayName, ({ name }) => name.slice(0, 1));
  console.log(groupedContacts);
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
    contactList.innerHTML += getContactListItemTemplate(contact, contact.id);
  }
}
