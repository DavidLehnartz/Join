const BASE_URL =
  "https://join-6838e-default-rtdb.europe-west1.firebasedatabase.app/";

async function loadContacts() {
  let contacts = await fetch(BASE_URL + "/contacts" + ".json");
  let contactsArray = await contacts.json();
  console.log(contactsArray);
  return contactsArray;
}

async function getContactById(id) {
  let contacts = await fetch(BASE_URL + "/contacts" + ".json");
  let contactsArray = await contacts.json();
  let contact = contactsArray.find((e) => id === e.id);
  return contact;
}
