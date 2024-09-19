import { photographerTemplate } from '../templates/photographerTemplate.js';

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
    const response = await fetch('./data/photographers.json');
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
  console.log('Photographer ID from URL:', photographerId);
  const { photographers } = await getPhotographers();

  console.log('Photographers data:', photographers);

  const photographer = photographers.find((p) => p.id == Number(photographerId));

  if (photographer) {
    const photographerModel = photographerTemplate(photographer);
    const photographerSection = document.querySelector('.photographer_section');
    photographerSection.appendChild(photographerModel.getUserCardDOM());

    // Afficher l'URL du photographe
    const photographerURL = getPhotographerURL();
    const urlElement = document.createElement('p');
    urlElement.textContent = `Photographer URL: ${photographerURL}`;
    photographerSection.appendChild(urlElement);
  } else {
    console.error('Photographer not found');
  }
}

displayPhotographerData();