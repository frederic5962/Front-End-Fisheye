import { Lightbox } from '../utils/lightbox.js';

export function createMediaGallery(media) {
  const gallery = document.createElement('section'); // Crée la section de la galerie

  media.forEach(mediaItem => {
    const mediaElement = document.createElement(mediaItem.image ? 'img' : 'video'); // Crée une balise img ou video
    mediaElement.src = `assets/media/${mediaItem.photographerId}/${
      mediaItem.image || mediaItem.video
    }`; // Définit le chemin du média
    mediaElement.alt = mediaItem.title;
    mediaElement.classList.add('lightbox-link'); // Ajoute la classe pour la lightbox

    // Ajoute un écouteur d'événement pour ouvrir la lightbox
    mediaElement.addEventListener('click', event => {
      event.preventDefault();
      Lightbox.open(mediaElement);
    });

    gallery.appendChild(mediaElement); // Ajoute le média à la galerie
  });

  return gallery;
}
