export function createPhotographerProfile(photographer) {
  const section = document.createElement('section'); // Crée un élément section

  const img = document.createElement('img');
  img.src = `assets/photographers-id-photos/${photographer.portrait}`;
  img.alt = `Portrait de ${photographer.name}`;
  img.setAttribute('aria-label', `Portrait de ${photographer.name}`);
  img.classList.add('photographer-profile-img'); // Ajoute une classe CSS pour l'image

  const h2 = document.createElement('h2');
  h2.textContent = photographer.name;
  h2.classList.add('photographer-profile-name'); // Ajoute une classe CSS pour le nom

  const location = document.createElement('p');
  location.textContent = `${photographer.city}, ${photographer.country}`;
  location.classList.add('photographer-profile-location');
  // Ajoute une classe CSS pour le lieu

  const tagline = document.createElement('p');
  tagline.textContent = photographer.tagline;
  tagline.classList.add('photographer-profile-tagline'); // Ajoute une classe CSS pour la tagline

  const price = document.createElement('p');
  price.textContent = `${photographer.price}€/jour`;
  price.classList.add('photographer-profile-price'); // Ajoute une classe CSS pour le prix

  section.appendChild(img);
  section.appendChild(h2);
  section.appendChild(location);
  section.appendChild(tagline);
  section.appendChild(price);

  return section; // Retourne l'élément section
}
