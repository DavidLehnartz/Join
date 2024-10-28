"use strict";

function getAddContactDialog() {
  return `<div class="contacts-overlay-header">
          <img src="../assets/img/join_logo_white.svg" />
          <h2>Add contact</h2>
          <h4>Tasks are better with a team!</h4>
          <hr />
        </div>
        <div class="contacts-overlay-info">
          <div class="contacts-close">
            <img
              src="../assets/icons/close.svg"
              onclick="closeContactForm(event)"
            />
          </div>
          <div class="add-contact-section">
            <div id="add-contact-icon" class="profile-icon-big bg-grey"><img src="../assets/icons/person.svg" /></div>
            <form id="add-contacts-form" class="add-contacts-form">
              <div class="icon-input-field">
                <input id="add-contact-name" type="text" placeholder="Name" />
                <img class="input-icon" src="../assets/icons/person-grey.svg" />
              </div>
              <div class="icon-input-field">
                <input id="add-contact-mail" type="email" placeholder="Email" />
                <img class="input-icon" src="../assets/icons/mail-grey.svg" />
              </div>
              <div class="icon-input-field">
                <input id="add-contact-phone" placeholder="Phone" />
                <img class="input-icon" src="../assets/icons/call-grey.svg" />
              </div>
              <div class="add-contact-buttons">
                <button
                  class="contact-form-btn btn-outline"
                  onclick="closeContactForm(event)"
                >
                  <p>Cancel</p>
                  <img src="../assets/icons/close.svg" />
                </button>
                <button
                  id="add-contact-btn"
                  class="contact-form-btn btn-filled"
                  onclick="getNewContactsInfo(event), showSuccessMessage()"
                >
                  <p>Create Contact</p>
                  <img src="../assets/icons/check.svg" />
                </button>
              </div>
            </form>
          </div>`;
}

function getEditContactDialog(contact, id) {
  return `<div class="contacts-overlay-header">
          <img src="../assets/img/join_logo_white.svg" />
          <h2>Add contact</h2>
          <h4>Tasks are better with a team!</h4>
          <hr />
        </div>
        <div class="contacts-overlay-info">
          <div class="contacts-close">
            <img
              src="../assets/icons/close.svg"
              onclick="closeContactForm(event)"
            />
          </div>
          <div class="add-contact-section">
            <div class="profile-icon-big bg-${contact.color}">${contact.initial}</div>
            <form class="add-contacts-form">
              <div class="icon-input-field">
                <input id="edit-contact-name" type="text" placeholder="Name" value="${contact.name}"/>
                <img class="input-icon" src="../assets/icons/person-grey.svg" />
              </div>
              <div class="icon-input-field">
                <input id="edit-contact-mail" type="email" placeholder="Email" value="${contact.email}"/>
                <img class="input-icon" src="../assets/icons/mail-grey.svg" />
              </div>
              <div class="icon-input-field">
                <input id="edit-contact-phone" placeholder="Phone" value="${contact.phone}"/>
                <img class="input-icon" src="../assets/icons/call-grey.svg" />
              </div>
              <div class="add-contact-buttons">
                <button
                  class="contact-form-btn btn-outline"
                  onclick="closeContactForm(event)"
                >
                  <p>Cancel</p>
                  <img src="../assets/icons/close.svg" />
                </button>
                <button
                  id="edit-contact-btn"
                  class="contact-form-btn btn-filled"
                  onclick="updateContactInfo(event, '${id}')"
                >
                  <p>Save</p>
                  <img src="../assets/icons/check.svg" />
                </button>
              </div>
            </form>
          </div>`;
}

function getContactInfoTemplate(contact, id) {
  return `<div class="contacts-name">
              <div id="contact-initial" class="profile-icon-big bg-${contact.color}">${contact.initial}</div>
              <div id="contact-name" class="name-container">
                <h3>${contact.name}</h3>
                <div class="contacts-btn-row">
                  <div
                    id="btn-contact-edit"
                    class="text-button"
                    onclick="showEditContactForm(event, '${id}')"
                  >
                    <img class="default-icon" src="../assets/icons/edit.svg" />
                    <img class="hover-icon" src="../assets/icons/edit_blue.svg" />
                    <p>Edit</p>
                  </div>
                  <div id="btn-contact-delete" class="text-button" onclick="deleteAndRefreshContactList('${id}')">
                    <img class="default-icon" src="../assets/icons/delete.svg" />
                    <img class="hover-icon" src="../assets/icons/delete_blue.svg" />
                    <p>Delete</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="contacts-info-hl">
              <h4>Contact Information</h4>
            </div>
            <div class="contacts-info-content">
              <p class="label">Email</p>
              <p id="contact-mail" class="copy-mail">${contact.email}</p>
              <p class="label">Phone</p>
              <p id="contact-phone" class="copy-text">${contact.phone}</p>
            </div>`;
}

function getContactListHeaderTemplate(letter) {
  return `<div id="section-header" class="section-header">
              <p class="contacts-info-hl section-letter">${letter}</p>
              <hr />
            </div>`;
}

function getContactListItemTemplate(contact, id) {
  return `<button
              id="contact-item"
              class="contact-list-item"
              onclick="showContactInfo('${id}')"
            >
              <div id="list-initial" class="profile-icon-small bg-${contact.color}">${contact.initial}</div>
              <div class="contact-list-info">
                <p id="list-name" class="contacts-info-hl">${contact.name}</p>
                <p id="list-mail" class="copy-mail">${contact.email}</p>
              </div>
            </button>`;
}
