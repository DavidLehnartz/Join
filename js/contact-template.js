function getAddContactOverlayTemplate() {
  return `<div class="contacts-overlay-container">
          <div class="contacts-overlay-header">
            <img src="../assets/img/join_logo_white.svg" />
            <h2>Add contact</h2>
            <h4>Tasks are better with a team!</h4>
            <hr />
          </div>
          <div class="contacts-overlay-info">
            <div class="contacts-close">
              <img src="../assets/icons/close.svg" onclick="closeContactForm(event)"/>
            </div>
            <div class="add-contact-section">
              <div class="profile-icon-big bg-grey">
                <img src="../assets/icons/person.svg" />
              </div>
              <form class="add-contacts-form">
                <div class="icon-input-field">
                  <input id="add-contact-name" type="text" placeholder="Name" />
                  <img
                    class="input-icon"
                    src="../assets/icons/person-grey.svg"
                  />
                </div>
                <div class="icon-input-field">
                  <input
                    id="add-contact-mail"
                    type="email"
                    placeholder="Email"
                  />
                  <img class="input-icon" src="../assets/icons/mail-grey.svg" />
                </div>
                <div class="icon-input-field">
                  <input
                    id="add-contact-phone"
                    placeholder="Phone"
                  />
                  <img class="input-icon" src="../assets/icons/call-grey.svg" />
                </div>
                <div class="add-contact-buttons">
                  <button class="contact-form-btn btn-outline" onclick="closeContactForm(event)">
                    <p>Cancel</p>
                    <img src="../assets/icons/close.svg" />
                  </button>
                  <button class="contact-form-btn btn-filled" onclick="getNewContactsInfo(event)">
                    <p>Create Contact</p>
                    <img src="../assets/icons/check.svg" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>`;
}

function getEditContactOverlayTemplate(color, initial, name, email, phone) {
  return `<div class="contacts-overlay-container">
            <div class="contacts-overlay-header">
              <img src="../assets/img/join_logo_white.svg" />
              <h2>Add contact</h2>
              <h4>Tasks are better with a team!</h4>
              <hr />
            </div>
            <div class="contacts-overlay-info">
              <div class="contacts-close">
                <img src="../assets/icons/close.svg" onclick="closeContactForm(event)"/>
              </div>
              <div class="add-contact-section">
                <div class="profile-icon-big bg-${color}">
                  ${initial}
                </div>
                <form class="add-contacts-form input-active">
                  <div class="icon-input-field">
                    <input id="add-contact-name" type="text" value="${name}"/>
                    <img
                      class="input-icon"
                      src="../assets/icons/person-grey.svg"
                    />
                  </div>
                  <div class="icon-input-field">
                    <input
                      id="add-contact-mail"
                      type="email"
                      value="${email}"
                    />
                    <img class="input-icon" src="../assets/icons/mail-grey.svg" />
                  </div>
                  <div class="icon-input-field">
                    <input
                      id="add-contact-phone"
                      value="${phone}"
                    />
                    <img class="input-icon" src="../assets/icons/call-grey.svg" />
                  </div>
                  <div class="add-contact-buttons">
                    <button class="contact-form-btn btn-outline" onclick="closeContactForm(event)">
                      <p>Cancel</p>
                      <img src="../assets/icons/close.svg" />
                    </button>
                    <button class="contact-form-btn btn-filled">
                      <p>Save</p>
                      <img src="../assets/icons/check.svg" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>`;
}

function getContactInfoTemplate(color, initial, name, email, phone) {
  return `<div class="contacts-name">
              <div id="contact-initial" class="profile-icon-big bg-${color}">${initial}</div>
              <div id="contact-name" class="name-container">
                <h3>${name}</h3>
                <div class="contacts-btn-row">
                  <div
                    id="btn-contact-edit"
                    class="text-button"
                    onclick="showEditContactForm(event, '${color}', '${initial}', '${name}', '${email}', '${phone}')"
                  >
                    <img src="../assets/icons/edit.svg" />
                    <p>Edit</p>
                  </div>
                  <div id="btn-contact-delete" class="text-button">
                    <img src="../assets/icons/delete.svg" />
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
              <p id="contact-mail" class="copy-mail">${email}</p>
              <p class="label">Phone</p>
              <p id="contact-phone" class="copy-text">${phone}</p>
            </div>`;
}

function getContactListHeaderTemplate(letter) {
  return `<div id="section-header" class="section-header">
              <p class="contacts-info-hl section-letter">${letter}</p>
              <hr />
            </div>`;
}

function getContactListItemTemplate(index, name, mail, color, initial, phone) {
  return `<div
              id="contact-item-${index}"
              class="contact-list-item"
              onclick="showContactInfo('${color}', '${initial}', '${name}', '${mail}', '${phone}')"
            >
              <div id="list-initial" class="profile-icon-small bg-${color}">${initial}</div>
              <div class="contact-list-info">
                <p id="list-name-${index}" class="contacts-info-hl">${name}</p>
                <p id="list-mail" class="copy-mail">${mail}</p>
              </div>
            </div>`;
}
