import Api from '../api/api.js';
import PhotographerCardDOM from '../templates/photographerTemplate.js';
import Photographer from '../models/photographersModel.js';

const isHomePage = document.body.classList.contains('home_page');
const photographersSection = document.querySelector('.photographer_section');
const photographersApi = new Api('./data/photographers.json');

/**
 * @async
 * @returns {void}
 * @throws {Error} Erreur lors de l'appel à l'API
 */
const displayPhotographers = async () => {
  try {
    const photographersData = await photographersApi.getPhotographers();
    const photographers = photographersData.photographers;
    photographers
      .map(photographer => new Photographer(photographer))
      .forEach(photographer => {
        const photographerCardDOM = new PhotographerCardDOM(photographer);
        const photographerElement = photographerCardDOM.getUserCardDOM();
        if (isHomePage) {
          photographerElement.classList.add('home-page');
        } else {
          photographerElement.classList.add('photographer-page');
        }
        photographersSection.appendChild(photographerElement);
      });
  } catch (error) {
    console.error("Erreur lors de l'affichage des photographes :", error);
    // Afficher un message d'erreur accessible
    const errorMessage = document.createElement('div');
    errorMessage.setAttribute('role', 'alert');
    errorMessage.innerText =
      "Une erreur s'est produite lors du chargement des photographes. Veuillez réessayer plus tard.";
    document.body.appendChild(errorMessage);
  }
};

document.addEventListener('DOMContentLoaded', displayPhotographers);
