import  Image  from "../models/imageModel.js";
import  Video  from "../models/videoModel.js";

function openLightbox(media) {
  // 1. Créer la structure de la lightbox (balise <dialog>)
  const lightbox = document.createElement('dialog');
  lightbox.classList.add('lightbox');

  // 2. Ajouter le média à la lightbox
  if (media instanceof Image) {
    const img = document.createElement('img');
    img.src = media.image;
    img.alt = media.title;
    lightbox.appendChild(img);
  } else if (media instanceof Video) {
    const video = document.createElement('video');
    video.controls = true;
    video.src = media.video;
    video.title = media.title;
    lightbox.appendChild(video);
  }

  // 3. Ajouter un bouton pour fermer la lightbox
  const closeButton = document.createElement('button');
  closeButton.textContent = 'X';
  closeButton.classList.add('lightbox__close');
  closeButton.addEventListener('click', () => {
    lightbox.close(); 
    // Supprimer la lightbox du DOM après la fermeture
    lightbox.remove(); 
  });
  lightbox.appendChild(closeButton);

  // 4. Ajouter la lightbox au DOM
  document.body.appendChild(lightbox);

  // 5. Afficher la lightbox
  lightbox.showModal();
}

// Fonction pour fermer la lightbox (optionnel)
function closeLightbox() {
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    lightbox.close();
    lightbox.remove();
  }
}

// Exporter les fonctions pour les utiliser dans d'autres fichiers
export { openLightbox, closeLightbox }; 