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
    //Créer un conteneur pour le media
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


    photographersGallery.appendChild(link);
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
