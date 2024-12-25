function openModal(fullName) {
  console.log('openModal called'); // Log ajouté
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';

  const modalHeader = modal.querySelector('.modal__header h2');
  modalHeader.textContent = `Contactez-moi ${fullName}`;

  document.body.classList.add('modal-open');

  const firstInput = document.getElementById('firstName');
  if (firstInput) {
    firstInput.focus();
  }
}

function closeModal() {
  console.log('closeModal called'); // Log ajouté
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';

  document.body.classList.remove('modal-open');
}

document.addEventListener('DOMContentLoaded', () => {
  const closeImg = document.querySelector('.close-img');
  if (closeImg) {
    console.log('Close button found'); // Log ajouté
    closeImg.addEventListener('click', closeModal);
    closeImg.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.keyCode === 13) {
        closeModal();
      }
    });
  } else {
    console.error('Close button not found'); // Log ajouté
  }

  const contactButton = document.getElementById('contactButton');
  if (contactButton) {
    console.log('Contact button found'); // Log ajouté
    contactButton.addEventListener('click', () => {
      console.log('Contact button clicked'); // Log ajouté
      openModal('Nom du Photographe');
    });
  } else {
    console.error('Contact button not found'); // Log ajouté
  }
});

function submitForm() {
  document.getElementById('contact_form').onsubmit = function (event) {
    event.preventDefault();

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

export { openModal, closeModal, submitForm };
