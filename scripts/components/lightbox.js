import Image from '../models/imageModel.js';
import Video from '../models/videoModel.js';

function openLightbox(media, index) {
  // 1. Créer la balise dialog et la nomme lightbox pour le css
  const lightbox = document.createElement('dialog');
  lightbox.classList.add('lightbox');

  // 2. Créer une div pour le contenu
  const lightboxContent = document.createElement('div');
  lightboxContent.classList.add('lightbox__content');

  let currentIndex = index;

  function showMedia(index) {
    // 3. Ajouter le média à la lightbox
    const mediaItem = media[index];
    lightboxContent.innerHTML = '';

    if (mediaItem instanceof Image) {
      const img = document.createElement('img');
      img.src = mediaItem.image;
      img.alt = mediaItem.title;
      img.classList.add('lightbox__media', 'lightbox__media--image');
      lightboxContent.appendChild(img);
    } else if (mediaItem instanceof Video) {
      const video = document.createElement('video');
      video.controls = true;
      video.src = mediaItem.video;
      video.title = mediaItem.title;
      video.classList.add('lightbox__media', 'lightbox__media--video');
      lightboxContent.appendChild(video);
    }
  }

  showMedia(currentIndex);

  // 4. Ajouter un bouton pour fermer la lightbox
  const closeButton = document.createElement('button');
  closeButton.textContent = 'X';
  closeButton.classList.add('lightbox__close');
  closeButton.addEventListener('click', () => {
    lightbox.close();
    lightbox.remove();
  });

  const prevButton = document.createElement('button');
  prevButton.textContent = '<';
  prevButton.classList.add('lightbox__arrow', 'lightbox__arrow--left');
  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + media.length) % media.length;
    showMedia(currentIndex);
  });

  const nextButton = document.createElement('button');
  nextButton.textContent = '›';
  nextButton.classList.add('lightbox__arrow', 'lightbox__arrow--right');
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % media.length;
    showMedia(currentIndex);
  });

  lightbox.appendChild(prevButton);
  lightbox.appendChild(lightboxContent);
  lightbox.appendChild(nextButton);
  lightbox.appendChild(lightboxContent);
  lightbox.appendChild(closeButton);

  // 6. Ajouter la lightbox au DOM
  document.body.appendChild(lightbox);

  // 7. Afficher la lightbox
  lightbox.showModal();
}



export { openLightbox };
