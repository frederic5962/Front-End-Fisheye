export default class Media {
  /**
   * Initialise une instance de Media avec les données fournies.
   *
   * @param {Object} data - L'objet contenant les informations sur le média.
   * @param {number} data.id - L'identifiant du média.
   * @param {number} data.photographerId - L'identifiant du photographe.
   * @param {string} data.title - Le titre du média.
   * @param {number} data.likes - Le nombre de "j'aime" du média.
   * @param {string} data.date - La date du média.
   * @param {number} data.price - Le prix du média.
   */
  constructor(data) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
  }
}
