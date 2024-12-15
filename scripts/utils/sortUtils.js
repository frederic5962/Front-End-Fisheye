/**
 * Trie les médias selon un critère spécifié.
 *
 * @param {Array} media - La liste des médias à trier.
 * @param {string} criterion - Le critère de tri (peut être "popularite", "date" ou "title").
 *
 * @returns {Array} - La liste des médias triés.
 */
export function sortMedia(media, criterion) {
  if (criterion === 'popularite') {
    // Trie par ordre décroissant de likes
    return media.sort((a, b) => b.likes - a.likes);
  } else if (criterion === 'date') {
    // Trie par ordre décroissant de date
    return media.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (criterion === 'title') {
    // Trie par ordre alphabétique
    return media.sort((a, b) => a.title.localeCompare(b.title));
  }
}
