import mediaFactory from '../factory/mediaFactory.js';
import PhotographerCardDOM from '../templates/photographerTemplate.js';
import Video from '../models/videoModel.js';
import Image from '../models/imageModel.js';
import { openLightbox } from '../components/lightbox.js';
import { sortMedia } from '../utils/sortUtils.js';
import { displayModal, closeModal, submitForm } from '../utils/contactForm.js';

const photographerHeaderInfos = document.querySelector('.photograph-header__infos');
const photographerHeaderPortrait = document.querySelector('.photograph-header__portrait');
const photographersGallery = document.querySelector('.photograph-gallery');
const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get('id'));
const sort = document.getElementById('sort');

let totalLikes = 0;

function displayMedia(media) {
  photographersGallery.innerHTML = '';

  media.forEach((mediaItem, index) => {
    const mediaContainer = document.createElement('div');
    mediaContainer.classList.add('media-container');

    const link = document.createElement('a');
    link.href = '#';

    if (mediaItem instanceof Image) {
      link.innerHTML = `<img src="${mediaItem.image}" alt="${mediaItem.title}">`;
    } else if (mediaItem instanceof Video) {
      link.innerHTML = `<video controls src="${mediaItem.video}" title="${mediaItem.title}"></video>`;
    }

    link.addEventListener('click', event => {
      event.preventDefault();
      openLightbox(media, index);
    });

    const title = document.createElement('h3');
    title.textContent = mediaItem.title;
    title.classList.add('media-title');

    const likesContainer = document.createElement('div');
    likesContainer.classList.add('media-likes-container');

    const likesText = document.createElement('span');
    likesText.textContent = mediaItem.likes;
    likesText.classList.add('media-likes');
    totalLikes += mediaItem.likes;

    const heartIcon = document.createElement('button');
    heartIcon.innerHTML = '<span class="fas fa-heart" aria-hidden="true"></span>';
    heartIcon.classList.add('media-likes-button');

    heartIcon.addEventListener('click', () => {
      mediaItem.likes += 1;
      likesText.textContent = mediaItem.likes;
      totalLikes += 1;

      document.getElementById(
        'totalLikes'
      ).innerHTML = `${totalLikes} <span class="fas fa-heart" aria-hidden="true"></span>`;
    });

    likesContainer.appendChild(likesText);
    likesContainer.appendChild(heartIcon);

    const mediaInfo = document.createElement('div');
    mediaInfo.classList.add('media-info');
    mediaInfo.appendChild(title);
    mediaInfo.appendChild(likesContainer);

    mediaContainer.appendChild(link);
    mediaContainer.appendChild(mediaInfo);

    photographersGallery.appendChild(mediaContainer);
  });

  document.getElementById(
    'totalLikes'
  ).innerHTML = `${totalLikes} <span class="fas fa-heart" aria-hidden="true"></span>`;
}

async function init() {
  try {
    const data = await fetch('./data/photographers.json').then(res => res.json());
    const photographer = data.photographers.find(photographer => photographer.id === id);
    const media = data.media
      .filter(media => media.photographerId === id)
      .map(media => mediaFactory(media));

    if (!photographer) {
      console.error('Photographe introuvable');
      const errorMessage = document.createElement('div');
      errorMessage.setAttribute('role', 'alert');
      errorMessage.innerText = 'Photographe introuvable.';
      document.body.appendChild(errorMessage);
      return;
    }

    const photographerCardDOM = new PhotographerCardDOM(photographer);
    const photographerCardElement = photographerCardDOM.getUserCardDOM();

    photographerHeaderInfos.appendChild(
      photographerCardElement.querySelector('.photographer-infos')
    );

    photographerHeaderPortrait.appendChild(
      photographerCardElement.querySelector('.photographer-card__portrait')
    );

    if (media.length === 0) {
      console.error('Aucun média trouvé pour ce photographe');
      const errorMessage = document.createElement('div');
      errorMessage.setAttribute('role', 'alert');
      errorMessage.innerText = 'Aucun média trouvé pour ce photographe.';
      document.body.appendChild(errorMessage);
      return;
    }

    displayMedia(media);
    updatePricePerDay(photographer.price);

    const sortedMedia = sortMedia(media, sort.value);
    displayMedia(sortedMedia);

    sort.addEventListener('change', event => {
      const sortedMedia = sortMedia(media, event.target.value);
      displayMedia(sortedMedia);
    });

    const [firstName, ...lastNameArray] = photographer.name.split(' ');
    const lastName = lastNameArray.join(' ');
    const fullName = `${firstName} ${lastName}`;

    const contactButton = document.getElementById('contactButton');
    if (contactButton) {
      contactButton.addEventListener('click', () => {
        displayModal(fullName);
      });
    } else {
      console.error('Bouton de contact introuvable');
      const errorMessage = document.createElement('div');
      errorMessage.setAttribute('role', 'alert');
      errorMessage.innerText = 'Bouton de contact introuvable.';
      document.body.appendChild(errorMessage);
    }

    submitForm();

    document.querySelector('.close-img').addEventListener('click', closeModal);
  } catch (error) {
    console.error('Erreur lors du chargement des médias', error);
  }
}

/**
 * @param {number} price - Le prix journalier du photographe.
 */
function updatePricePerDay(price) {
  document.getElementById('pricePerDay').textContent = `${price}€/jour`;
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await init();
  } catch (error) {
    console.error('Erreur lors du lancement', error);
  }
});
