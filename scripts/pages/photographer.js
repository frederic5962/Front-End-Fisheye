//Mettre le code JavaScript lié à la page photographer.html
export class photographerPage {
    constructor() {
        this.photographerId = this.getphotographerIdFromUrl();
        this.photographer = null;
        this.medias = null;
    }

getphotographerIdFromUrl() {
    const urlParams = new UrlSearchParams(window.location.search);
    return urlParams.get('id');
}

async getPhotographerById(id) {
    try {
      const response = await fetch("./data/photographers.json");
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
      const response = await fetch("./data/photographers.json");
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
    if (photographer && media) {
      const photographerModel = photographerTemplateById(photographer, media);
      photographerModel.getUserHeaderDOM();
      photographerModel.getUserSelectDOM();
      photographerModel.getPhotographerGalleryDOM();
      photographerModel.getPhotographerOverlay();
      createForm(photographer);
    } else {
      console.error("Photographer ou media non trouvé");
    }
  }

  async init() {
    this.photographerId = this.getPhotographerIdFromUrl();
    this.photographer = await this.getPhotographerById(this.photographerId);
    this.media = await this.getMediaByIdPhotographer(this.photographerId);
    this.displayPhotographerData(this.photographer, this.media);
  }
}




