const baseUrl = "https://rickandmortyapi.com/api/resource";
const cardsWrapper = document.querySelector("#cards-wrapper");
const selectLocationsSelect = document.querySelector("#locationsSelect");
const nameCharacterFilter = document.querySelector("#nameCharacterInput");
const locationSelectFilter = document.querySelector("#locationsSelect");

let characters = [];
let locations = [];
let episodes = [];

getCharacters();
getLocations();
getEpisodes();

async function getCharacters() {
  await fetch(baseUrl.replace("resource", "character"))
    .then((res) => res.json())
    .then(
      (data) =>
        (characters = data.results.map((person) => {
          const {
            id,
            name,
            status,
            species,
            gender,
            image,
            location,
            episode,
          } = person;
          return {
            id,
            name,
            status,
            species,
            gender,
            image,
            episode,
            location: location.name,
          };
        }))
    )
    .catch(() => alert("Ocorreu um erro no sistema"));

  renderCharacter(characters);
}

async function getLocations() {
  await fetch(baseUrl.replace("resource", "location"))
    .then((res) => res.json())
    .then(
      (data) =>
        (locations = data.results.map((location) => {
          const { id, name, type, dimension } = location;
          return {
            id,
            name,
            type,
            dimension,
          };
        }))
    )
    .catch(() => alert("Ocorreu um erro no sistema"));

  renderOptionsFilterLocation(locations);
}

async function getEpisodes() {
  await fetch(baseUrl.replace("resource", "episode"))
    .then((res) => res.json())
    .then(
      (data) =>
        (episodes = data.results.map((location) => {
          const { id, name, type, dimension } = location;
          return {
            id,
            name,
            type,
            dimension,
          };
        }))
    )
    .catch(() => alert("Ocorreu um erro no sistema"));
}

const renderCharacter = (itens) => {
  cardsWrapper.innerHTML = "";

  itens.forEach((char) => {
    const element = `
      <div class="card">
        <div class="image-wrapper">
          <img
            src="${char.image}"
            alt="image"
          />
        </div>
        <div class="info-wrapper">
          <h2>${char.name}</h2>
          <div class="gender-wrapper">
            <span class="material-icons ${char.gender.toLowerCase()}">${
      char.gender === "Male" ? "male" : "female"
    }</span>
            <p>${char.species}</p>
          </div>
          <div class="status-wrapper">
            <span class="material-icons ${char.status.toLowerCase()}">circle</span>
            <p>${char.status}</p>
          </div>
          <div class="location-wrapper">
            <span class="material-icons">public</span>
            <p>${char.location}</p>
          </div>
          <p>Displayed ${char.episode.length} times</p>
        </div>
      </div>
    `;

    cardsWrapper.innerHTML += element;
  });
};

const renderOptionsFilterLocation = (itens) => {
  itens.forEach((location) => {
    const option = `
      <option value="${location.id}">${location.name}</option>
    `;

    selectLocationsSelect.innerHTML += option;
  });
};

nameCharacterFilter.addEventListener("input", (e) => {
  e.preventDefault();

  !nameCharacterFilter.value.length
    ? renderCharacter(characters)
    : renderCharacter(
        characters.filter((char) =>
          char.name.includes(nameCharacterFilter.value)
        )
      );
});

locationSelectFilter.addEventListener("change", (e) => {
  e.preventDefault();

  const location = locations.find(
    (item) => item.id === Number(locationSelectFilter.value)
  );

  !locationSelectFilter.value
    ? renderCharacter(characters)
    : renderCharacter(
        characters.filter((char) => char.location === location.name)
      );
});
