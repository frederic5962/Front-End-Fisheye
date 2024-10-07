import { createPhotographerCard } from '../utils/photographerCardUtils.js';

export function getUserCardDOM(data) {
  const options = {
    includeLocation: true,
    includeTagline: true,
    includePrice: true,
  };
  return createPhotographerCard(data, options);
}
