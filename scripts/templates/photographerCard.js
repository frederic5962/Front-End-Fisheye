export function createPhotographerCard(data, options) {
  const { name, portrait, city, country, tagline, price } = data; // Extraire toutes les données
  const picture = `assets/photographers-id-photos/${portrait}`;

  const article = document.createElement('article');
  const img = document.createElement('img');
  img.setAttribute('src', picture);  

  img.setAttribute('alt', `Photo de ${name}`);  // Ajouter l'attribut alt
  const h2 = document.createElement('h2');
  h2.textContent = name;
  article.appendChild(img);
  article.appendChild(h2);

  if (options.includeLocation) {
    const location = document.createElement('p');
    location.classList.add('location');
    location.textContent = `${city}, ${country}`;
    article.appendChild(location);
  }

  if (options.includeTagline) {
    const taglineElement = document.createElement('p');
    taglineElement.textContent = tagline;
    article.appendChild(taglineElement); 
  }

  if (options.includePrice) {
    const priceElement = document.createElement('p');
    priceElement.classList.add('prix'); 
    priceElement.textContent = `${price}€/jour`;
    article.appendChild(priceElement);
  }

  return article;
}

