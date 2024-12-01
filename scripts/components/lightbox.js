import Image from "../models/imageModel.js";
import Video from "../models/videoModel.js";

function openLightbox(media, index) {
    // 1. Créer la balise dialog et la nomme lightbox pour le css 
    const lightbox = document.createElement('dialog');
    lightbox.classList.add('lightbox');

    // 2. Créer une div pour le contenu
    const lightboxContent = document.createElement('div');
    lightboxContent.classList.add('lightbox__content');

    // 3. Ajouter le média à la lightbox
    const mediaItem = media[index];
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
        video.classList.add('lightbox__media' , 'lightbox__media--video');
        lightboxContent.appendChild(video);
    }

    // 4. Ajouter un bouton pour fermer la lightbox
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.classList.add('lightbox__close');
    closeButton.addEventListener('click', () => {
        lightbox.close();
        lightbox.remove();
    });

    // 5. Ajouter le contenu et le bouton à la lightbox
    lightbox.appendChild(lightboxContent);
    lightbox.appendChild(closeButton);

    // 6. Ajouter la lightbox au DOM
    document.body.appendChild(lightbox);

    // 7. Afficher la lightbox
    lightbox.showModal();
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
        lightbox.close();
        lightbox.remove();
    }
}

export { openLightbox, closeLightbox };
