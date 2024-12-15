/**
 * Affiche la modale avec le nom complet du photographe.
 *
 * @param {string} fullName - Le nom complet du photographe.
 */
function displayModal(fullName) {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';

  // Mettre à jour le titre de la modale avec le prénom et le nom du photographe
  const modalHeader = modal.querySelector('.modal__header h2');
  modalHeader.textContent = `Contactez-moi ${fullName}`;
}

/**
 * Ferme la modale.
 */
function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
}

/**
 * Soumet le formulaire de contact.
 */
function submitForm() {
  document.getElementById('contact_form').onsubmit = function (event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const data = {
      firstName,
      lastName,
      email,
      message,
    };

    alert('Message envoyé !');
    console.log(data);

    const modal = document.getElementById('contact_modal');
    modal.style.display = 'none';
  };
}

export { displayModal, closeModal, submitForm };
