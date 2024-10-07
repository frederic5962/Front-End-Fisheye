async function fetchJsonData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export async function getPhotographers() {
  try {
    const data = await fetchJsonData('./data/photographers.json');
    return { photographers: data.photographers };
  } catch (error) {
    console.error('Error fetching photographers:', error);
    return { photographers: [] };
  }
}

export async function getMedia() {
  try {
    const data = await fetchJsonData('./data/photographers.json');
    return data.media;
  } catch (error) {
    console.error('Error fetching media:', error);
    return [];
  }
}
