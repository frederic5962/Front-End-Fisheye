import { getUserCardDOM } from '../templates/photographerCardTemplate.js';
import { getPhotographers } from '../utils/fetchData.js';

async function displayPhotographers() {
  const { photographers } = await getPhotographers(); // Récupération des données réelles
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach(photographer => {
    const userCardDOM = getUserCardDOM(photographer);
    photographersSection.appendChild(userCardDOM); // Affiche les photographes

    const link = document.createElement('a');
    link.href = `./photographer.html?id=${photographer.id}`;
    link.setAttribute('aria-label', `Voir le profil de ${photographer.name}`);// ajout de l'aria-label pour accessibilité
    link.appendChild(userCardDOM);

    photographersSection.appendChild(link);	
  });
}

displayPhotographers();
