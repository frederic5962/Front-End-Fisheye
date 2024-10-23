export function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  return {
    name,
    portrait: `assets/photographers-id-photo/${portrait}`,
    location: `${city}, ${country}`,
    tagline,
    price,
    id,
    getUserCardDOM: function() {
      const article = document.createElement('article');
      article.innerHTML = `
        <a href="photographer.html?id=${id}">
          <img src="${this.portrait}" alt="${name}">
          <h2 class="photograph-name">${name}</h2>
        </a>
        <p class="photograph-location">${this.location}</p>
        <p class="photograph-tagline">${tagline}</p>
        <p class="photograph-price">${price}€/jour</p>
      `;
      return article;
    },
  };
}
