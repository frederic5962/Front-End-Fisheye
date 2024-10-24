import { getPhotographers } from '../utils/fetchData.js';
import { photographerFactory } from '../factory/photographer.js';

async function displayPhotographerData() {
  const photographers = await getPhotographers();
  const photographerId = getPhotographerIdFromUrl();
  const photographerData = photographers.find(p => p.id === photographerId);

  if (!photographerData) {
    console.error('Photographe non trouvé');
    return;
  }

  const photographer = photographerFactory(photographerData);

  // Affichage des détails du photographe
  const photographerSection = document.querySelector('.photograph-header');
  photographerSection.innerHTML = `
    <img src="${photographer.portrait}" alt="${photographer.name}">
    <h1>${photographer.name}</h1>
    <p class="photograph-location">${photographer.location}</p>
    <p class="photograph-tagline">${photographer.tagline}</p>
    <p class="photograph-price">${photographer.price}€/jour</p>
  `;
}

function getPhotographerIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return parseInt(urlParams.get('id'));
}

async function init() {
  try {
    await displayPhotographerData();
  } catch (error) {
    console.error('Erreur lors du chargement du photographe:', error);
  }
}

document.addEventListener('DOMContentLoaded', init);
