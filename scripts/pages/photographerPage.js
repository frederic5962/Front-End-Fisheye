import { fetchData } from '../utils/fetchData.js';
import { getPhotographerIdFromURL, getPhotographerURL } from '../utils/urlUtils.js';
import { photographerTemplate } from '../templates/photographerTemplate.js';

async function getPhotographerAndMediaById(id) {
  const data = await fetchData('./data/photographers.json');
  if (data) {
    console.log('Data fetched:', data);
    const photographer = data.photographers.find(p => p.id == id);
    const media = data.media.filter(m => m.photographerId == id);
    console.log('Photographer:', photographer);
    console.log('Media:', media);
    return { photographer, media };
  }
  return { photographer: null, media: [] };
}

async function displayPhotographerData() {
  const photographerId = getPhotographerIdFromURL();
  if (!photographerId) {
    console.error('No photographer ID found in URL');
    return;
  }
  console.log('Photographer ID from URL:', photographerId);

  const { photographer, media } = await getPhotographerAndMediaById(photographerId);

  if (photographer && media.length > 0) {
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
      const mediaElement = document.createElement('img');
      mediaElement.src = `assets/media/${m.image}`;
      mediaElement.alt = m.title;
      photographerSection.appendChild(mediaElement);
    });
  } else {
    console.error('Photographer ou media non trouvé');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Vérifie si nous sommes sur la page du photographe
  if (window.location.pathname.includes('photographer.html')) {
    displayPhotographerData();
  }
});
