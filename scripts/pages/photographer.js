import { photographerTemplateById } from './templates/photographerTemplate.js';
import { createForm } from './formUtils.js';

export class photographerPage {
  constructor() {
    this.photographerId = this.getPhotographerIdFromUrl();
    this.photographer = null;
    this.medias = null;
  }

  getPhotographerIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get('id');
    console.log('URL Parameters:', urlParams.toString());
    console.log('Photographer ID:', photographerId);
    return photographerId;
  }

  getPhotographerURL() {
    const fullURL = window.location.href;
    console.log('Full URL:', fullURL);
    return fullURL;
  }

  async getPhotographerById(id) {
    try {
      const response = await fetch('./data/photographers.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const photographer = data.photographers.find((p) => p.id == id);
      return photographer;
    } catch (error) {
      console.error("Erreur lors de la récupération des données depuis l'API :", error);
      return null;
    }
  }

  async getMediaByIdPhotographer(id) {
    try {
      const response = await fetch('./data/photographers.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const media = data.media.filter((m) => m.photographerId == id);
      return media;
    } catch (error) {
      console.error("Erreur lors de la récupération des données depuis l'API :", error);
      return null;
    }
  }

  async displayPhotographerData(photographer, media) {
    const photographerURL = this.getPhotographerURL();
    console.log('Photographer URL:', photographerURL);

    if (photographer && media) {
      const photographerModel = photographerTemplateById(photographer, media);
      photographerModel.getUserHeaderDOM();
      photographerModel.getUserSelectDOM();
      photographerModel.getPhotographerGalleryDOM();
      photographerModel.getPhotographerOverlay();
      createForm(photographer);

      // Afficher l'URL du photographe
      const photographerSection = document.querySelector('.photographer_section');
      const urlElement = document.createElement('p');
      urlElement.textContent = `Photographer URL: ${photographerURL}`;
      photographerSection.appendChild(urlElement);
    } else {
      console.error('Photographer ou media non trouvé');
    }
  }

  async init() {
    this.photographerId = this.getPhotographerIdFromUrl();
    if (!this.photographerId) {
      console.error('No photographer ID found in URL');
      return;
    }
    this.photographer = await this.getPhotographerById(this.photographerId);
    this.media = await this.getMediaByIdPhotographer(this.photographerId);
    this.displayPhotographerData(this.photographer, this.media);
  }
}

// Initialisation de la page
const page = new photographerPage();
page.init();