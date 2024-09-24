export function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price } = data;

  console.log(data);

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');

    article.innerHTML = `	
        <img src="${picture}" alt="Photo de ${name}">
        <h2>${name}</h2>
        <p class="location">${city}, ${country}</p>
        <p>${tagline}</p>
        <p class="prix">${price}€/jour</p>
      `;
    return article;
  }

  return { name, picture, getUserCardDOM };
}
