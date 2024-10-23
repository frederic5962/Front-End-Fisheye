export async function getPhotographers() {
    try {
      const response = await fetch('./data/photographers.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.photographers;
    } catch (error) {
      console.error('Error fetching photographers:', error);
      return [];
    }
  }
  
  