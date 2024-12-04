import mediaFactory from '../factory/mediaFactory.js';
import PhotographerCardDOM from '../templates/photographerTemplate.js';
import Video from '../models/videoModel.js';
import Image from '../models/imageModel.js';
import { openLightbox } from '../components/lightbox.js';
import { sortMedia } from '../utils/sortUtils.js';

const photographerHeaderInfos = document.querySelector('.photograph-header__infos');
const photographerHeaderPortrait = document.querySelector('.photograph-header__portrait');
const photographersGallery = document.querySelector('.photograph-gallery');
const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get('id'));
const sort = document.getElementById('sort');

function displayMedia(media) {
  photographersGallery.innerHTML = '';

  media.forEach((mediaItem, index) => {
    // Créer un conteneur pour le média
    const mediaContainer = document.createElement('div');
    mediaContainer.classList.add('media-container');

    // Créer le lien pour le média
    const link = document.createElement('a');
    link.href = '#';

    if (mediaItem instanceof Image) {
      link.innerHTML = `<img src="${mediaItem.image}" alt="${mediaItem.title}">`;
    } else if (mediaItem instanceof Video) {
      link.innerHTML = `<video controls src="${mediaItem.video}" title="${mediaItem.title}"></video>`;
    }

    // Ajouter un événement pour ouvrir la lightbox
    link.addEventListener('click', event => {
      event.preventDefault();
      openLightbox(media, index);
    });

    // Créer l'élément titre
    const title = document.createElement('h3');
    title.textContent = mediaItem.title;
    title.classList.add('media-title');

    // Créer l'élément des likes avec le cœur
    const likesContainer = document.createElement('div');
    likesContainer.classList.add('media-likes-container');

    const likesText = document.createElement('span'); 
    likesText.textContent = mediaItem.likes;
    likesText.classList.add('media-likes');

    const heartIcon = document.createElement('button');
    heartIcon.innerHTML = '❤'; // caractère Unicode sans couleur
    heartIcon.classList.add('media-likes-button');
    heartIcon.addEventListener('click', () => {
      mediaItem.likes += 1;
      likesText.textContent = mediaItem.likes;
    });

    likesContainer.appendChild(likesText);
    likesContainer.appendChild(heartIcon);

    // Ajouter le lien média, le titre et les likes au conteneur de média
    mediaContainer.appendChild(link);
    mediaContainer.appendChild(title);
    mediaContainer.appendChild(likesContainer);

    // Ajouter le conteneur de média à la galerie du photographe
    photographersGallery.appendChild(mediaContainer);
  });
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
      return;
    }

    // Trier les médias par défaut
    const sortedMedia = sortMedia(media, sort.value);
    displayMedia(sortedMedia);

    // Ajouter l'écouteur d'événement pour le tri
    sort.addEventListener('change', event => {
      const sortedMedia = sortMedia(media, event.target.value);
      displayMedia(sortedMedia);
    });
  } catch (error) {
    console.error('Erreur lors du chargement des médias', error);
  }
}

document.addEventListener('DOMContentLoaded', init);
