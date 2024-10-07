//Mettre le code JavaScript lié à la page photographer.html
import { createPhotographerProfile } from '../templates/photographerProfile.js';
import { createMediaGallery } from '../templates/mediaGallery.js';
import { getPhotographers, getMedia } from '../utils/fetchData.js';
import { Lightbox } from '../utils/lightbox.js';

async function displayPhotographerData() {
  const { photographers } = await getPhotographers();

  const photographerId = getPhotographerIdFromUrl();

  console.log("ID du photographe : ", photographerId);
  const photographer = photographers.find(p => p.id === photographerId); 

  console.log(photographer);
  if (!photographer) {
    console.error('photographer not found');
    return;
  }

  const media = await getMedia(); // Attendre la résolution de la promesse
  const photographerMedia = media.filter(m => m.photographerId === photographerId); // Correction de la fonction de rappel

  if (photographerMedia.length === 0) {
    console.error('No media found for this photographer');
  }

  const photographerProfile = createPhotographerProfile(photographer); 
  const mediaGallery = createMediaGallery(photographerMedia); 

  const photographerSection = document.querySelector('.photographer_section');
  photographerSection.appendChild(photographerProfile); 

  const gallerySection = document.querySelector('.photograph-gallery');
  gallerySection.appendChild(mediaGallery);

  Lightbox.init(); 
}

function getPhotographerIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = parseInt(urlParams.get('id'));
  console.log(typeof photographerId);
  return photographerId;
}

displayPhotographerData();
