 import { createPhotographerCard } from '../templates/photographerCard.js'; 


/**
 * Crée une carte de profil pour un photographe et retourne l'élément DOM correspondant.
 * 
 * @param {Object} data - Les données du photographe, incluant le nom, l'ID, le portrait, la ville, le pays, la tagline, et le prix.
 * @returns {HTMLElement} - L'article HTML représentant la carte de profil du photographe.
 */
 export function getUserCardDOM(data) {
  // Options pour la carte du photographe : inclure le lieu, la tagline et le prix
  const options = {
    includeLocation: true,
    includeTagline: true,
    includePrice: true,
  };
  // Appeler la fonction createPhotographerCard pour générer la carte avec les options spécifiées
  return createPhotographerCard(data, options);
} 
