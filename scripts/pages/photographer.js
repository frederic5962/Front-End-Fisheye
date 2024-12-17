// Importations des modules nécessaires
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

let totalLikes = 0; // Variable pour stocker le total des likes

// Fonction pour afficher les médias du photographe
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

    // Crée une div pour contenir les likes
    const likesContainer = document.createElement('div');
    likesContainer.classList.add('media-likes-container');

    // Crée un élément span pour afficher le nombre de likes
    const likesText = document.createElement('span');
    likesText.textContent = mediaItem.likes;
    likesText.classList.add('media-likes');
    totalLikes += mediaItem.likes; // Ajoute le nombre de likes au total

    // Crée un bouton pour le cœur qui permet d'ajouter des likes
    const heartIcon = document.createElement('button');
    heartIcon.innerHTML = '<span class="fas fa-heart" aria-hidden="true"></span>';
    heartIcon.classList.add('media-likes-button');

    // Ajoute un événement de clic pour incrémenter les likes
    heartIcon.addEventListener('click', () => {
      mediaItem.likes += 1; // Incrémente le nombre de likes pour cet item
      likesText.textContent = mediaItem.likes; // Met à jour le texte des likes
      totalLikes += 1; // Ajoute un like au total
      // Met à jour l'affichage du total des likes
      document.getElementById(
        'totalLikes'
      ).innerHTML = `${totalLikes} <span class="fas fa-heart" aria-hidden="true"></span>`;
    });

    // Ajoute le texte des likes et le bouton cœur au conteneur des likes
    likesContainer.appendChild(likesText);
    likesContainer.appendChild(heartIcon);

    // Crée une div pour contenir les informations du média (titre et likes)
    const mediaInfo = document.createElement('div');
    mediaInfo.classList.add('media-info');
    mediaInfo.appendChild(title);
    mediaInfo.appendChild(likesContainer);

    // Ajoute le lien (image ou vidéo) et les informations du média au conteneur de médias
    mediaContainer.appendChild(link);
    mediaContainer.appendChild(mediaInfo);

    // Ajoute le conteneur de médias à la galerie des photographes
    photographersGallery.appendChild(mediaContainer);
  });

  // Met à jour l'affichage du total des likes au chargement de la page
  document.getElementById(
    'totalLikes'
  ).innerHTML = `${totalLikes} <span class="fas fa-heart" aria-hidden="true"></span>`;
}

// Fonction pour initialiser la page du photographe
async function init() {
  try {
    const data = await fetch('./data/photographers.json').then(res => res.json());
    const photographer = data.photographers.find(photographer => photographer.id === id);
    const media = data.media
      .filter(media => media.photographerId === id)
      .map(media => mediaFactory(media));

    if (!photographer) {
      console.error('Photographe introuvable');
      // Afficher un message d'erreur accessible
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
      // Afficher un message d'erreur accessible
      const errorMessage = document.createElement('div');
      errorMessage.setAttribute('role', 'alert');
      errorMessage.innerText = 'Aucun média trouvé pour ce photographe.';
      document.body.appendChild(errorMessage);
      return;
    }

    displayMedia(media);
    updatePricePerDay(photographer.price); // Mettre à jour le prix journalier

    // Trier les médias par défaut
    const sortedMedia = sortMedia(media, sort.value);
    displayMedia(sortedMedia);

    // Ajouter l'écouteur d'événement pour le tri
    sort.addEventListener('change', event => {
      const sortedMedia = sortMedia(media, event.target.value);
      displayMedia(sortedMedia);
    });

    // Séparation du prénom et du nom à partir du champ name
    const [firstName, ...lastNameArray] = photographer.name.split(' ');
    const lastName = lastNameArray.join(' ');
    const fullName = `${firstName} ${lastName}`;

    // Ajouter l'écouteur d'événement pour ouvrir la modale de contact
    const contactButton = document.getElementById('contactButton');
    if (contactButton) {
      contactButton.addEventListener('click', () => {
        displayModal(fullName);
      });
    } else {
      console.error('Bouton de contact introuvable');
      // Afficher un message d'erreur accessible
      const errorMessage = document.createElement('div');
      errorMessage.setAttribute('role', 'alert');
      errorMessage.innerText = 'Bouton de contact introuvable.';
      document.body.appendChild(errorMessage);
    }

    // Ajouter l'écouteur pour soumettre le formulaire
    submitForm();

    // Ajouter l'écouteur pour fermer la modale
    document.querySelector('.close-img').addEventListener('click', closeModal);
  } catch (error) {
    console.error('Erreur lors du chargement des médias', error);
  }
}

/**
 * Met à jour le prix journalier
 *
 * @param {number} price - Le prix journalier du photographe.
 */
function updatePricePerDay(price) {
  document.getElementById('pricePerDay').textContent = `${price}€/jour`;
}

// Ajout de l'événement pour initialiser la page une fois le DOM chargé
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await init(); // Verifie que init est une fonction async
  } catch (error) {
    console.error('Erreur lors du lancement', error);
  
  }
});
 