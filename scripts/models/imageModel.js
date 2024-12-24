import Media from '../models/media.js';
export default class Image extends Media {
  /**
   * @param {Object} data - L'objet contenant les informations sur l'image.
   * @param {string} data.image - Le nom de fichier de l'image.
   * @param {string} data.altText - La description textuelle (texte alternatif) de l'image.
   */
  constructor(data) {
    super(data);
    this.image = `./assets/photos/${data.photographerId}/${data.image}`;
    this.altText = data.altText || 'Image descriptive';
  }
  /**
   * @returns {HTMLElement} L'élément image avec le texte alternatif.
   */
  createImageElement() {
    const img = document.createElement('img');
    img.src = this.image;
    img.alt = this.altText;
    return img;
  }
}
