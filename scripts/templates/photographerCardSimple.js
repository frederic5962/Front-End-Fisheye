import { createPhotographerCard } from '../templates/photographerCard.js';

export function photographerTemplate(data) {
  const options = {
    includeLocation: true,
    includeTagline: true,
    includePrice: true,
  };
  return {
    name: data.name,
    picture: 'assets/photographers-id-photos/' + data.portrait,
    getUserCardDOM: () => createPhotographerCard(data, options),
  };
}
