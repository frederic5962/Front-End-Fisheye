import { photographerTemplate } from '../templates/photographerTemplate.js';

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

async function displayPhotographers() {
  const { photographers } = await getPhotographers();
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach(photographer => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    const link = document.createElement('a');
    link.href = `photographer.html?id=${photographer.id}`;
    console.log('Generated link:', link.href); // Vérifiez les liens générés
    link.appendChild(userCardDOM);
    photographersSection.appendChild(link);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  displayPhotographers();
});
