import { getPhotographers } from '../utils/fetchData.js';


async function displayPhotographerData() {
  const photographers = await getPhotographers(); // Récupère tous les photographes
  const photographerId = getPhotographerIdFromUrl(); // Récupère l'ID du photographe depuis l'URL
  const photographer = photographers.find(p => p.id === photographerId); // Trouve le photographe correspondant

  if (!photographer) {
    console.error('Photographe non trouvé');
    return;
  }

  // Création et affichage des détails du photographe
  const photographerSection = document.querySelector('.photograph-header');
  const imageElement = document.createElement('img');
  imageElement.src = `assets/photographers-id-photo/${photographer.portrait}`;
  imageElement.alt = photographer.name;
  const nameElement = document.createElement('h1');
  nameElement.textContent = photographer.name;
  const taglineElement = document.createElement('p');
  taglineElement.textContent = photographer.tagline;
  const priceElement = document.createElement('p');
  priceElement.textContent = `${photographer.price}€/jour`;


  // Appel de la fonction pour ajouter les éléments au DOM
  photographerSection.appendChild(imageElement);
  photographerSection.appendChild(nameElement);
  photographerSection.appendChild(taglineElement);
  photographerSection.appendChild(priceElement);


  
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
