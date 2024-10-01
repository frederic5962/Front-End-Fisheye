import { photographerTemplate } from '../templates/photographerTemplate.js';
import { fetchPhotographersData } from '../utils/dataUtils.js';

async function getPhotographerById(id) {
  try {
    const data = await fetchPhotographersData();
    const photographer = data.photographers.find(p => p.id === id);
    return photographer; 
  } catch (error) {
    console.error('Erreur lors de la récupération du photographe :', error);
    return null; 
  }
}

async function displayPhotographers() {
  const { photographers } = await getPhotographers();
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach(photographer => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    const link = document.createElement('a');
    link.href = `photographer.html?id=${photographer.id}`;
    link.appendChild(userCardDOM);
    photographersSection.appendChild(link);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  displayPhotographers();
});
