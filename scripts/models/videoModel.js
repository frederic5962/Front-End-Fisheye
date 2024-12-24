import Media from '../models/media.js';

export default class Video extends Media {
  /**
   * @param {Object} data - L'objet contenant les informations sur la vidéo.
   * @param {string} data.video - Le nom de fichier de la vidéo.
   * @param {string} data.title - Le titre de la vidéo pour l'accessibilité.
   */
  constructor(data) {
    super(data);
    this.video = `./assets/photos/${data.photographerId}/${data.video}`;
    this.title = data.title || 'Vidéo descriptive';
  }

  /**
   * @returns {HTMLElement} L'élément vidéo avec les attributs d'accessibilité.
   */
  createVideoElement() {
    const video = document.createElement('video');
    video.src = this.video;
    video.title = this.title;
    video.controls = true;
  }
}
