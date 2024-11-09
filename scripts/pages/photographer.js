import mediaFactory from "../factory/mediaFactory.js";
import PhotographerCardDOM from "../templates/photographerTemplate.js"; 
import Video from "../models/videoModel.js"; 
import Image from "../models/imageModel.js"; 

const photographersGallery = document.querySelector(".photograph-gallery");
const photographerHeader = document.querySelector(".photograph-header");
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");


/**
 * Fonction d'initialisation de la page photographe
 * Appelle le JSON des photographes et des médias, puis affiche
 * la carte du photographe correspondant à l'ID donné en paramètre
 * ainsi que les médias associés
 * @returns {Promise<void>}
 */
async function init() {
  try {
    const data = await fetch("./data/photographers.json").then((res) => res.json());
    const photographer = data.photographers.find((photographer) => photographer.id == id);
    const media = data.media.filter((media) => media.photographerId == id);

    if (photographer) {
      const photographerCardDOM = new PhotographerCardDOM(photographer);
      photographerHeader.appendChild(photographerCardDOM.getUserCardDOM());
    } else {
      console.error('Photographe non trouvé');
    }

    if (media.length > 0) {
      media.forEach((mediaItem) => {
        const mediaDOM = mediaFactory(mediaItem);
        const mediaElement = document.createElement('div');
        if (mediaDOM instanceof Image) {
          mediaElement.innerHTML = `<img src="${mediaDOM.image}" alt="${mediaDOM.title}">`;
        } else if (mediaDOM instanceof Video) {
          mediaElement.innerHTML = `<video controls src="${mediaDOM.video}" title="${mediaDOM.title}"></video>`;
        }
        photographersGallery.appendChild(mediaElement);
      });
    } else {
      console.error('Aucun média trouvé pour ce photographe');
    }
  } catch (error) {
    console.error('Erreur lors du chargement des médias :', error);
  }
}

document.addEventListener('DOMContentLoaded', init);