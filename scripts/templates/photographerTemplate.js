export default class PhotographerCardDOM {
  
    constructor(photographer) {
      this.photographer = photographer;
    }
  

  /**
   * Return a DOM element representing a photographer card
   * @returns {HTMLElement} - article element with class "photographer-card"
   */

    getUserCardDOM() {
      const { id, name, city, country, tagline, price, portrait } = this.photographer;
      const photographerCardDOM = document.createElement("article");
      photographerCardDOM.classList.add("photographer-card");
      photographerCardDOM.innerHTML = `
      <a href="photographer.html?id=${id}">
        <img
          src="assets/photographers-id-photo/${portrait}"
          alt="portrait du photographe ${name}"
          class="photographer-card__portrait"
        />
      </a>
      <div class="photographer-card__infos">
        <h2 class="photographer-card__name">${name}</h2>
        <p class="photographer-card__location">${city}, ${country}</p>
        <p class="photographer-card__tagline">${tagline}</p>
        <p class="photographer-card__price">${price}€/jour</p>
      </div>
      `;
      return photographerCardDOM;
    }
  }
  
  
  