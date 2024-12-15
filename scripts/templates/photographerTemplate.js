// Création de la carte du photographe pour la page d'accueil et photographer

export default class PhotographerCardDOM {
  /**
   * Initialise une instance de PhotographerCardDOM avec les données du photographe.
   *
   * @param {Object} photographer - L'objet contenant les informations du photographe.
   * @param {number} photographer.id - L'identifiant du photographe.
   * @param {string} photographer.name - Le nom du photographe.
   * @param {string} photographer.city - La ville du photographe.
   * @param {string} photographer.country - Le pays du photographe.
   * @param {string} photographer.tagline - La devise du photographe.
   * @param {number} photographer.price - Le tarif journalier du photographe.
   * @param {string} photographer.portrait - Le chemin vers le portrait du photographe.
   */
  constructor(photographer) {
    this.photographer = photographer;
  }

  /**
   * Renvoie un élément DOM représentant une carte de photographe
   * @returns {HTMLElement} - Élément article avec la classe "photographer-card"
   */
  getUserCardDOM() {
    const { id, name, city, country, tagline, price, portrait } = this.photographer;
    console.log(id, name, city, country, tagline, price, portrait);
    const photographerCardDOM = document.createElement('article');
    photographerCardDOM.classList.add('photographer-card');
    photographerCardDOM.innerHTML = `
      <a href="photographer.html?id=${id}">
        <img
          src="assets/photographers-id-photo/${portrait}"
          alt="portrait du photographe ${name}"
          class="photographer-card__portrait"/>
      </a>
      <div class="photographer-infos">
        <h2 class="photographer-card__name">${name}</h2>
        <p class="photographer-card__location">${city}, ${country}</p>
        <p class="photographer-card__tagline">${tagline}</p>
        <p class="photographer-card__price">${price}€/jour</p>
      </div>
    `;
    return photographerCardDOM;
  }
}
