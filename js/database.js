const BASE_URL =
  "https://join-6838e-default-rtdb.europe-west1.firebasedatabase.app";

async function loadContacts() {
  let contacts = await fetch(`${BASE_URL}/contacts.json`);
  let contactsToJson = await contacts.json();
  let contactsArray = Object.keys(contactsToJson);
  return contactsArray;
}

async function loadAllContactsInfo() {
  let contacts = [];
  let contactsResponse = await fetch(`${BASE_URL}/contacts.json`);
  let contactsToJson = await contactsResponse.json();
  if (contactsToJson) {
    const contactKeys = Object.keys(contactsToJson);
    contactKeys.forEach((key) => {
      contacts.push({
        id: key,
        ...contactsToJson[key],
      });
    });
  }
  return contacts;
}

async function getContactById(id) {
  let contactResponse = await fetch(`${BASE_URL}/contacts/${id}.json`);
  let contactToJson = await contactResponse.json();
  return contactToJson;
}

async function createContact(contactData) {
  let newContactResponse = await fetch(`${BASE_URL}/contacts.json`, {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactData),
  });
  return (contactToJson = await newContactResponse.json());
}

async function updateContact(contactData, id) {
  const response = await fetch(`${BASE_URL}/contacts/${id}.json`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactData),
  });
  if (!response.ok) {
    throw new Error("Failed to update contact");
  }
  const result = await response.json();
  console.log("Contact updated:", result);
}

async function deleteContact(id) {
  let response = await fetch(`${BASE_URL}/contacts/${id}.json`, {
    method: "DELETE",
  });
  return (responseToJson = await response.json());
}

async function createUser(userData) {
  let newUserResponse = await fetch(`${BASE_URL}/users.json`, {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return (userToJson = await newUserResponse.json());
}
