const baseUrl = "https://rickandmortyapi.com/api/resource";

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
