function getContactInfoTemplate(id, color, initial, name, email, phone) {
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
                    <img class="default-icon" src="../assets/icons/edit.svg" />
                    <img class="hover-icon" src="../assets/icons/edit_blue.svg" />
                    <p>Edit</p>
                  </div>
                  <div id="btn-contact-delete" class="text-button" onclick="deleteContact('${id}'), refreshContactList()">
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

function getContactListItemTemplate(id, name, mail, color, initial, phone) {
  return `<button
              id="contact-item"
              class="contact-list-item"
              onclick="showContactInfo('${id}', '${color}', '${initial}', '${name}', '${mail}', '${phone}')"
            >
              <div id="list-initial" class="profile-icon-small bg-${color}">${initial}</div>
              <div class="contact-list-info">
                <p id="list-name" class="contacts-info-hl">${name}</p>
                <p id="list-mail" class="copy-mail">${mail}</p>
              </div>
            </button>`;
}
