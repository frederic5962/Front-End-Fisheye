import { getPhotographerIdFromURL, getPhotographerURL } from '../utils/urlUtils.js';
import { photographerTemplate } from '../templates/photographerTemplate.js';
import { fetchPhotographersData } from '../utils/dataUtils.js';

let photographersData = null;
// Fonction pour obtenir les données du photographe
async function getPhotographerById(id) {
  if (!photographersData) {
    photographersData = await fetchPhotographersData();
  }

  if (photographersData) {
    const photographer = photographersData.photographers.find(p => p.id === id);
    return photographer;
  }
  return null;
}

// Fonction pour obtenir les médias du photographe
async function getMediaByPhotographerId(id) {
  if (!photographersData) {
    photographersData = await fetchPhotographersData();
  }

  if (photographersData) {
    const media = photographersData.media.filter(m => m.photographerId === id);
    return media;
  }
  return [];
}

// Fonction principale pour afficher les données
async function displayPhotographerData() {
  const photographerId = getPhotographerIdFromURL();
  if (!photographerId) {
    console.error('No photographer ID found in URL');
    return;
  }

  const photographer = await getPhotographerById(photographerId);
  const media = await getMediaByPhotographerId(photographerId);
console.log(photographer, media);

  if (!photographer) {
    console.error('Photographer non trouvé');
    return;
  }

  if (!media || media.length === 0) {
    console.error('Media non trouvé');
    return;
  }

  const photographerModel = photographerTemplate(photographer);
  const photographerSection = document.querySelector('.photographer_section');
  if (!photographerSection) {
    console.error('Photographer section not found');
    return;
  }
  photographerSection.appendChild(photographerModel.getUserCardDOM());

  // Afficher l'URL du photographe
  const photographerURL = getPhotographerURL();
  const urlElement = document.createElement('p');
  urlElement.textContent = `Photographer URL: ${photographerURL}`;
  photographerSection.appendChild(urlElement);

  // Afficher les médias du photographe
  media.forEach(m => {
    const mediaElement = document.createElement(m.image.endsWith('.mp4') ? 'video' : 'img');
    mediaElement.src = `assets/Sample Photos/${photographer.name}/${m.image}`;
    mediaElement.alt = m.title || "Media du photographe"; 
    if (mediaElement instanceof HTMLVideoElement) {
      mediaElement.controls = true; // Ajouter des contrôles pour les vidéos
    }
    photographerSection.appendChild(mediaElement);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Vérifie si nous sommes sur la page du photographe
  if (window.location.pathname.includes('photographer.html')) {
    displayPhotographerData();
  }
});
