export function sortMedia(media, criterion) {
 if (criterion === 'popularite') {
    return media.sort((a, b) => b.likes - a.likes);
  } else if (criterion === 'date') {
    return media.sort((a, b) => new Date(b.date) - new Date(a.date));
  }else if (criterion === 'title') {
    return media.sort((a, b) => a.title.localeCompare(b.title));
  return media;
  }
}