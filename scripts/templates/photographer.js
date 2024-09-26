import { photographerTemplate } from '../templates/photographerTemplate.js';
import { fetchPhotographersData } from '../utils/dataUtils.js';

function getPhotographerURL() {
  const fullURL = window.location.href;
  console.log('Full URL:', fullURL);
  return fullURL;
}

function getPhotographerIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  const photographerId = params.get('id');
  console.log('URL Parameters:', params.toString());
  console.log('Photographer ID:', photographerId);
  return photographerId;
}

async function getPhotographers() {
  try {
    const response = await fetch('../data/photographers.json');
    const data = await response.json();
    return { photographers: data.photographers };
  } catch (error) {
    console.error('Error fetching photographers:', error);
    return { photographers: [] };
  }
}

async function displayPhotographerData() {
  const photographerId = getPhotographerIdFromURL();
  if (!photographerId) {
    console.error('No photographer ID found in URL');
    return;
  }

  try {
    const data = await fetchPhotographersData();
    const photographer = data.photographers.find((p) => p.id === parseInt(photographerId, 10)); 

    if (photographer) {
      const photographerModel = photographerTemplate(photographer);
      const photographerSection = document.querySelector('.photographer_section');
      if (!photographerSection) {
        console.error('Photographer section not found');
        return;
      }
    photographerSection.appendChild(photographerModel.getUserCardDOM());

    // Afficher l'URL du photographe
    // const photographerURL = getPhotographerURL();
    // const urlElement = document.createElement('p');
    // urlElement.textContent = `Photographer URL: ${photographerURL}`;
    // photographerSection.appendChild(urlElement);
  } else {
    console.error('Photographer not found');
  }
} catch (error) {
  console.error('Error fetching photographer data:', error);
}

document.addEventListener('DOMContentLoaded', () => {
  // Vérifie si nous sommes sur la page du photographe
  if (window.location.pathname.includes('photographer.html')) {
    displayPhotographerData();
  }
});
}

