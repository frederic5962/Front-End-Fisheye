/**
 * Piège le focus à l'intérieur de l'élément donné.
 *
 * @param {HTMLElement} element - L'élément dans lequel piéger le focus.
 */
function trapFocus(element) {
  const focusableElements =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const focusableContent = element.querySelectorAll(focusableElements);
  const firstFocusableElement = focusableContent[0];
  const lastFocusableElement = focusableContent[focusableContent.length - 1];

  /**
   * Gestionnaire d'événement clavier pour piéger le focus dans l'élément.
   *
   * @param {KeyboardEvent} event - L'événement clavier.
   */
  const trapHandler = function (event) {
    const isTabPressed = event.key === 'Tab' || event.keyCode === 9;

    if (!isTabPressed) {
      return;
    }

    if (event.shiftKey) {
      // Focus précédent
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        event.preventDefault();
      }
    } else {
      // Focus suivant
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        event.preventDefault();
      }
    }
  };

  document.addEventListener('keydown', trapHandler);

  // Sauvegarde le gestionnaire dans l'élément pour le retirer plus tard
  element._trapHandler = trapHandler;
}

/**
 * Supprime le gestionnaire d'événement clavier qui piège le focus
 * dans la modale de contact.
 */
function removeTrapFocus() {
  const modal = document.getElementById('contact_modal');
  document.removeEventListener('keydown', modal._trapHandler);
}

function displayModal(fullName) {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';

  const modalHeader = modal.querySelector('.modal__header h2');
  modalHeader.textContent = `Contactez-moi ${fullName}`;

  document.body.classList.add('modal-open');

  const firstInput = document.getElementById('firstName');
  if (firstInput) {
    firstInput.focus();
  }

  // Piéger le focus dans la modale
  trapFocus(modal);
}

function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';

  document.body.classList.remove('modal-open');

  removeTrapFocus();
}

const closeImg = document.querySelector('.close-img');
closeImg.addEventListener('click', closeModal);
closeImg.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.keyCode === 13) {
    closeModal();
  }
});

document
  .getElementById('contactButton')
  .addEventListener('click', () => displayModal('Nom du Photographe'));

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

    closeModal();
  };
}

export { displayModal, closeModal, submitForm };
