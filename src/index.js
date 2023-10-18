import axios from "axios";
import Notiflix from "notiflix";
import loader from "loader";

axios.defaults.headers.common["x-api-key"] = "live_hY3ifUu784lkMP59yEf6eKaoe0dFmeq7r0Pa7r64StdlTDGGQtUkc84SO0rhY90O";

export function fetchBreeds() {
  return axios
    .get("https://api.thecatapi.com/v1/breeds")
    .then((response) => response.data)
    .catch((error) => {
      Notiflix.Notify.failure("Не вдалося знайти інформацію. Будь-ласка спробуйте пізніше.");
      throw error;
    });
};

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((response) => response.data)
    .catch((error) => {
      Notiflix.Notify.failure("Не вдалося знайти інформацію. Будь-ласка спробуйте пізніше.");
      throw error;
    });
};

const breedSelect = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");
const breedName = document.querySelector(".breed-name");
const description = document.querySelector(".description");
const temperament = document.querySelector(".temperament");
const error = document.querySelector(".error");
const loaderText = document.querySelector(".loader")

catInfo.style.display = "none";
error.style.display = "none";

window.addEventListener("load", () => {
  const loaderText = document.querySelector(".loader");
   if (loaderText) {
    loaderText.style.display = "none";
  }
});

function clearCatInfo() {
  catInfo.style.display = "none";
  breedName.textContent = "";
  description.textContent = "";
  temperament.textContent = "";
  catInfo.innerHTML = '';
  
};



breedSelect.addEventListener("change", (event) => {
  const selectedBreedId = event.target.value;
  clearCatInfo();
  
  
  fetchCatByBreed(selectedBreedId)
  .then((cats) => {
    if (cats.length > 0) {
      const cat = cats[0];
      breedName.textContent = "Breed: " + cat.breeds[0].name;
      description.textContent = "Description: " + cat.breeds[0].description;
      temperament.textContent = "Temperament: " + cat.breeds[0].temperament;
      
      const catImage = document.createElement("img");
      catImage.src = cat.url;
      catInfo.appendChild(catImage);

      catInfo.style.display = "block";
    } else {
      Notiflix.Notify.failure("Котів не знайдено.");
    }
  })
    .catch((error) => {
      
    });
});

fetchBreeds()
  .then((breeds) => {
    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  })
  .catch((error) => {
  
  });
  
  



