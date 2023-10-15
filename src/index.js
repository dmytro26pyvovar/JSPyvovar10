import axios from "axios";
import loader from "loader"
axios.defaults.headers.common["x-api-key"] = "live_hY3ifUu784lkMP59yEf6eKaoe0dFmeq7r0Pa7r64StdlTDGGQtUkc84SO0rhY90O";

export function fetchBreeds() {
    return axios.get("https://api.thecatapi.com/v1/images/search");
}

export function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
};

import { fetchBreeds, fetchCatByBreed } from './api/cat-api';

const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const breedSelect = document.querySelector('#breed-select');
const catInfo = document.querySelector('.cat-info');
const catImage = document.querySelector('#cat-image');
const catBreed = document.querySelector('#cat-breed');
const catDescription = document.querySelector('#cat-description');
const catTemperament = document.querySelector('#cat-temperament');

async function populateBreeds() { try {
        loader.style.display = 'block';
        const response = await fetchBreeds();
        const breeds = response.data;
        breedSelect.innerHTML = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('');
        loader.style.display = 'none';
    } catch (err) {
        error.style.display = 'block';
    }
};

async function displayCatInfo(breedId) {
    try {
        loader.style.display = 'block';
        const response = await fetchCatByBreed(breedId);
        const cat = response.data[0];
        catImage.src = cat.url;
        catBreed.textContent = `Breed: ${cat.breeds[0].name}`;
        catDescription.textContent = `Description: ${cat.breeds[0].description}`;
        catTemperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;
        catInfo.style.display = 'block';
        loader.style.display = 'none';
    } catch (err) {
        error.style.display = 'block';
    }
}

populateBreeds();

breedSelect.addEventListener('change', () => {
    const selectedBreedId = breedSelect.value;
    displayCatInfo(selectedBreedId);
});

