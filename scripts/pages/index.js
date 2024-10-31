import Api from "../api/api.js";
import PhotographerCardDOM from "../templates/photographerTemplate.js"; // Assurez-vous que c'est le bon chemin
import Photographer from "../models/photographersModel.js";

const photographersSection = document.querySelector(".photographer_section");
const photographersApi = new Api("./data/photographers.json");


/**
 * Affiche les photographes sur la page d'accueil
 *
 * @async
 *
 * @throws {Error} Erreur lors de l'appel à l'API
 */

const displayPhotographers = async () => {
  try {
    const photographersData = await photographersApi.getPhotographers();
    const photographers = photographersData.photographers;

    photographers
      .map((photographer) => new Photographer(photographer))
      .forEach((photographer) => {
        const photographerCardDOM = new PhotographerCardDOM(photographer);
        photographersSection.appendChild(photographerCardDOM.getUserCardDOM());
      });
  } catch (error) {
    console.error('Erreur lors de l\'affichage des photographes :', error);
  }
};

document.addEventListener('DOMContentLoaded', displayPhotographers);
