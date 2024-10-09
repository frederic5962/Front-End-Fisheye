import { Lightbox } from '../utils/lightbox.js';

export function createMediaGallery(media) {
  const gallery = document.querySelector('.photograph-gallery'); // Récupère la section existante

  media.forEach(mediaItem => {
    const mediaElement = document.createElement(mediaItem.image ? 'img' : 'video');
    mediaElement.src = `assets/photos/${mediaItem.photographerId}/${mediaItem.image || mediaItem.video}`;
    mediaElement.alt = mediaItem.title;
    mediaElement.classList.add('lightbox-link');

    // Créer un élément figure pour contenir le média et ses informations
    const figure = document.createElement('figure');

    // Ajoute un écouteur d'événement pour ouvrir la lightbox
    mediaElement.addEventListener('click', event => {
      event.preventDefault();
      Lightbox.open(mediaElement);
    });

    figure.appendChild(mediaElement); // Ajoute le média au figure

    // Créer un élément figcaption pour le titre et les likes
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = `${mediaItem.title} ${mediaItem.likes} ♥`; // Ajoute le titre et les likes

    figure.appendChild(figcaption); // Ajoute le figcaption au figure
    gallery.appendChild(figure); // Ajoute le figure à la galerie
  });
}