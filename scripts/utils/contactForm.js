/**
 * Affiche la modale avec le nom complet du photographe.
 *
 * @param {string} fullName - Le nom complet du photographe.
 */
function displayModal(fullName) {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';

  const modalHeader = modal.querySelector('.modal__header h2');
  modalHeader.textContent = `Contactez-moi ${fullName}`;
}

function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
}

function submitForm() {
  document.getElementById('contact_form').onsubmit = function (event) {
    event.preventDefault(); // Empêche l'envoi du formulaire

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    console.log('Prénom:', firstName);
    console.log('Nom:', lastName);
    console.log('Email:', email);
    console.log('Message:', message);

    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';

    const modal = document.getElementById('contact_modal');
    modal.style.display = 'none';
  };
}

export { displayModal, closeModal, submitForm };
