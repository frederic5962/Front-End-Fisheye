export function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price } = data;
  const picture = `assets/photographers/${portrait}`;   


  function getUserCardDOM() {
    const article = document.createElement('article');
    article.classList.add('photographer-card');   


    const header = document.createElement('header');
    const img = document.createElement('img');
    img.src = picture;
    img.alt = `Portrait de ${name}, photographe`;
    img.classList.add('photographer-portrait');
    header.appendChild(img);

    const h2 = document.createElement('h2');
    h2.textContent = name;
    header.appendChild(h2);

    article.appendChild(header);

    const location = document.createElement('p');
    location.classList.add('location');
    location.textContent = `${city}, ${country}`;
    article.appendChild(location);

    const taglineP = document.createElement('p');
    taglineP.classList.add('tagline');
    taglineP.textContent = tagline;
    article.appendChild(taglineP);

    const priceP = document.createElement('p');
    priceP.classList.add('price');
    priceP.textContent = `${price}€/jour`;
    article.appendChild(priceP);

    return article;
  }

  return { name, picture, getUserCardDOM };
}