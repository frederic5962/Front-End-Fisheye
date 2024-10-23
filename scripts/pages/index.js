import { photographerFactory } from '../factory/photographer.js';
import { getPhotographers } from '../utils/fetchData.js';

async function displayPhotographersData() {
  const photographersSection = document.querySelector('.photographer_section');
  const photographers = await getPhotographers();
  photographers.forEach((photographerData) => {
    const photographer = photographerFactory(photographerData);
    const userCardDOM = photographer.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.display = 'flex';
  }

  try {
    await displayPhotographersData();
  } catch (error) {
    console.error('Erreur lors du chargement des photographes:', error);
  } finally {
    if (loader) {
      loader.style.display = 'none';
    }
  }
}

init();
