export function sortMedia(media, criterion) {
 if (criterion === 'popularite') {
  // trie par ordre decroissant de likes
    return media.sort((a, b) => b.likes - a.likes);
  } else if (criterion === 'date') {
    // trie par ordre decroissant de date 
    return media.sort((a, b) => new Date(b.date) - new Date(a.date));
  }else if (criterion === 'title') {
    // trie par ordre alphabétique
    return media.sort((a, b) => a.title.localeCompare(b.title));
  return media;
  }
}