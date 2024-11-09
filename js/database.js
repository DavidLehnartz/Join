const BASE_URL =
  "https://join-6838e-default-rtdb.europe-west1.firebasedatabase.app";

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
  return await response.json();
}

async function deleteContact(id) {
  let response = await fetch(`${BASE_URL}/contacts/${id}.json`, {
    method: "DELETE",
  });
  return (responseToJson = await response.json());
}

async function loadUsers() {
  let users = {};
  let usersResponse = await fetch(`${BASE_URL}/users.json`);
  let usersToJson = await usersResponse.json();
  console.log(usersToJson);
  return usersToJson;
}

async function loadAllUsersInfo() {
  let users = [];
  let usersResponse = await fetch(`${BASE_URL}/users.json`);
  let usersToJson = await usersResponse.json();
  if (usersToJson) {
    const userKeys = Object.keys(usersToJson);
    userKeys.forEach((key) => {
      users.push({
        id: key,
        ...usersToJson[key],
      });
    });
  }
  return users;
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

function createInitial(name) {
  let fullName = name.split(" "),
    initials = fullName[0].substring(0, 1).toUpperCase();
  if (fullName.length > 1) {
    initials += fullName[fullName.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
}

function getUserFromLocalStorage() {
  let user;
  let savedUser = JSON.parse(localStorage.getItem("user"));
  if (savedUser != null) {
    user = savedUser;
  }
  return user;
}

function removeUserFromLocalStorage() {
  let user = getUserFromLocalStorage();
  console.log(user);
  localStorage.removeItem(user);
}

function getInitialOfUser(profileId) {
  let user = getUserFromLocalStorage();
  let profileIcon = document.getElementById(profileId);
  profileIcon.innerHTML = user.initial;
}

function logOut(event) {
  event.preventDefault();
  removeUserFromLocalStorage();
  window.location.href = "../pages/login.html";
}
