import { createPhotographerProfile } from '../templates/photographerProfile.js';
import { createMediaGallery } from '../templates/mediaGallery.js';
import { getPhotographers, getMedia } from '../utils/fetchData.js';
import { Lightbox } from '../utils/lightbox.js';

async function displayPhotographerData() {
  const { photographers } = await getPhotographers();
  const photographerId = getPhotographerIdFromUrl();
  const photographer = photographers.find(p => p.id === photographerId);

  if (!photographer) {
    console.error('photographer not found');
    return;
  }

  const media = await getMedia();

  // Gestion des erreurs pour getMedia()
  if (!media) {
    console.error('Erreur lors de la récupération des médias');
    return;
  }

  const photographerMedia = media.filter(m => m.photographerId === photographerId);
  if (photographerMedia.length === 0) {
    console.error('No media found for this photographer');
  }

  const photographerProfile = createPhotographerProfile(photographer);

  const photographerSection = document.querySelector('.photographer_section');
  photographerSection.appendChild(photographerProfile);
  
  createMediaGallery(photographerMedia); 

  Lightbox.init();
}

function getPhotographerIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = parseInt(urlParams.get('id'));
  return photographerId;
}

displayPhotographerData();