export default class Photographer {
  /**
   * Initialise une instance de Photographer avec les données fournies.
   *
   * @param {Object} data - L'objet contenant les informations sur le photographe.
   * @param {number} data.id - L'identifiant du photographe.
   * @param {string} data.name - Le nom du photographe.
   * @param {string} data.city - La ville du photographe.
   * @param {string} data.country - Le pays du photographe.
   * @param {string} data.tagline - La devise du photographe.
   * @param {number} data.price - Le tarif du photographe.
   * @param {string} data.portrait - Le chemin vers le portrait du photographe.
   */
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
    this.portrait = data.portrait;
  }

  /**
   * Renvoie l'élément HTML de l'image du portrait du photographe.
   * @returns {HTMLElement} L'élément image avec le texte alternatif.
   */
  createPortraitElement() {
    const img = document.createElement('img');
    img.src = `./assets/photographers/${this.portrait}`;
    img.alt = `Portrait de ${this.name}, photographe basé à ${this.city}, ${this.country}`;
    return img;
  }
}
