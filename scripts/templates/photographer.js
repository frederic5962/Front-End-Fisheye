import { photographerTemplate } from "../templates/photographerTemplate.js";

function getPhotographerIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

async function getPhotographers() {
    try {
        const response = await fetch('./data/photographers.json');
        const data = await response.json();
        return { photographers: data.photographers };
    } catch (error) {
        console.error('Error fetching photographers:', error);
        return { photographers: [] };
    }
}

async function displayPhotographerData() {
    const photographerId = getPhotographerIdFromURL();
    const { photographers } = await getPhotographers();
    const photographer = photographers.find(p => p.id == photographerId);

    if (photographer) {
        const photographerModel = photographerTemplate(photographer);
        const photographerSection = document.querySelector(".photographer_section");
        photographerSection.appendChild(photographerModel.getUserCardDOM());
    } else {
        console.error('Photographer not found');
    }
}

displayPhotographerData();