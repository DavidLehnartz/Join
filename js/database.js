const BASE_URL =
  "https://join-6838e-default-rtdb.europe-west1.firebasedatabase.app/";

async function loadContacts() {
  let contacts = await fetch(BASE_URL + "/contacts" + ".json");
  let contactsToJson = await contacts.json();
  let contactsArray = Object.keys(contactsToJson);
  return contactsArray;
}

async function loadAllContactsInfo() {
  let idArray = await loadContacts();
  let contactsArray = [];
  for (let i = 0; i < idArray.length; i++) {
    const id = idArray[i];
    let newContact = await getContactById(id);
    contactsArray.push(newContact);
  }
  console.log(contactsArray);
  return contactsArray;
}

async function getContactById(id) {
  let contactResponse = await fetch(BASE_URL + "/contacts/" + id + ".json");
  let contactToJson = await contactResponse.json();
  return contactToJson;
}

async function getSingleContact(name, email, phone) {
  let contactsArray = await loadAllContactsInfo();
  let contact = contactsArray.find((c) => {
    c.name === name && c.email === email && c.phone === phone;
  });
  console.log(contact);
  return contact;
}

async function createContact(contactData) {
  let newContactResponse = await fetch(BASE_URL + "/contacts" + ".json", {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactData),
  });
  return (contactToJson = await newContactResponse.json());
}

async function deleteContact(id) {
  let contactResponse = await fetch(BASE_URL + "/contacts/" + id + ".json", {
    method: "DELETE",
  });
  let deletedContact = await contactResponse.json();
  return deletedContact;
}

async function createUser(userData) {
  let newUserResponse = await fetch(BASE_URL + "/users" + ".json", {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return (userToJson = await newUserResponse.json());
}
