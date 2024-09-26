import { photographerTemplate } from '../templates/photographerTemplate.js';
import { fetchPhotographersData } from '../utils/dataUtils.js';

async function getPhotographers() {
  try {
    const data = await fetchPhotographersData();
    return { photographers: data.photographers };
  } catch (error) {
    console.error('Erreur lors de la récupération des photographes :', error);
    return { photographers: [] };
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
