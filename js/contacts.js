let groupedContacts = {};
let editMenuShown = false;

function initContacts(header, sidebar, link) {
  let contactContent = document.getElementById("contacts-list-container");
  createHeader(header);
  createSidebar(sidebar, link);
  setTimeout(() => {
    loadContactList();
    contactContent.classList.remove("hidden");
  }, 100);
}

async function showContactInfo(id) {
  let contact = await getContactById(id);
  if (window.innerWidth > 800) {
    let contactInfo = document.getElementById("contacts-info");
    contactInfo.innerHTML = "";
    contactInfo.innerHTML += getContactInfoTemplate(contact, id);
  } else {
    showMobileInfoDialog(contact, id);
  }
}

function showMobileInfoDialog(contact, id) {
  let mobileInfo = document.getElementById("mobile-contacts-dialog");
  let contactList = document.getElementById("contacts-list-container");
  mobileInfo.classList.remove("hidden");
  contactList.classList.add("hidden");
  mobileInfo.innerHTML = "";
  mobileInfo.innerHTML = renderMobileInfoSection(contact, id);
}

function closeMobileInfoDialog() {
  let mobileInfo = document.getElementById("mobile-contacts-dialog");
  let contactList = document.getElementById("contacts-list-container");
  mobileInfo.classList.add("hidden");
  contactList.classList.remove("hidden");
}

async function loadContactList() {
  getInitialOfUser("contact-profile-icon");
  let contactsArray = await loadAllContactsInfo();
  groupContacts(contactsArray);
  loadGroupedContactList();
}

async function refreshContactList() {
  let contactList = document.getElementById("contact-list");
  let contactInfo = document.getElementById("contacts-info");
  contactList.innerHTML = "";
  contactInfo.innerHTML = "";
  await loadContactList();
}

async function deleteAndRefreshContactList(id) {
  let contactList = document.getElementById("contact-list");
  let contactInfo = document.getElementById("contacts-info");
  await deleteContact(id);
  contactList.innerHTML = "";
  contactInfo.innerHTML = "";
  await loadContactList();
}

async function deleteAndRefreshContactListMobile(id) {
  let contactList = document.getElementById("contact-list");
  await deleteContact(id);
  contactList.innerHTML = "";
  closeMobileInfoDialog();
  await loadContactList();
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
    contactList.innerHTML += getContactListItemTemplate(contact, contact.id);
  }
}

function showMobileEditMenu(id) {
  let editMenu = document.getElementById("edit-menu");
  if (editMenuShown) {
    editMenu.innerHTML = "";
  } else {
    editMenu.innerHTML = renderMobileEditMenu(id);
  }
  editMenuShown = !editMenuShown;
}
