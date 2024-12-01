import mediaFactory from '../factory/mediaFactory.js';
import PhotographerCardDOM from '../templates/photographerTemplate.js';
import Video from '../models/videoModel.js';
import Image from '../models/imageModel.js';
import { openLightbox } from '../components/lightbox.js';

const photographerHeaderInfos = document.querySelector('.photograph-header__infos');
const photographerHeaderPortrait = document.querySelector('.photograph-header__portrait');
const photographersGallery = document.querySelector('.photograph-gallery');
const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get('id'));
const sort = document.getElementById('sort');

function displayMedia(media, index) {
  photographersGallery.innerHTML = '';

  media.forEach((mediaItem, index) => {
    // Créer un lien cliquable autour du média
    const link = document.createElement('a');
    link.href = '#';

    if (mediaItem instanceof Image) {
      link.innerHTML = `<img src="${mediaItem.image}" alt="${mediaItem.title}">`;
    } else if (mediaItem instanceof Video) {
      link.innerHTML = `<video controls src="${mediaItem.video}" title="${mediaItem.title}"></video>`;
    }

    // Ajouter un écouteur d'événement pour ouvrir la lightbox
    link.addEventListener('click', event => {
      event.preventDefault(); // Empêcher le comportement par défaut du lien
      openLightbox(media, index); // Ouvrir la lightbox avec le média
    });

    // Ajouter le lien à la galerie
    photographersGallery.appendChild(link);
  });
}

/**
 * Fonction d'initialisation de la page photographe
 * Appelle le JSON des photographes et des médias, puis affiche
 * la carte du photographe correspondant à l'ID donné en paramètre
 * ainsi que les médias associés
 * @returns {Promise<void>}
 */
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

    // Ajouter les informations du photographe dans le bloc `photograph-header__infos`
    photographerHeaderInfos.appendChild(
      photographerCardElement.querySelector('.photographer-infos')
    );

    // Ajouter le portrait dans le bloc `photograph-header__portrait`
    photographerHeaderPortrait.appendChild(
      photographerCardElement.querySelector('.photographer-card__portrait')
    );

    if (media.length === 0) {
      console.error('Aucun média trouvé pour ce photographe');
      return;
    }

    displayMedia(media);
  } catch (error) {
    console.error('Erreur lors du chargement des médias', error);
  }
}

document.addEventListener('DOMContentLoaded', init);

