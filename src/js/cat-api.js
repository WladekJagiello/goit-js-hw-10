const url = 'https://api.thecatapi.com/v1/breeds';
const url2 = 'https://api.thecatapi.com/v1/images';
const api_key =
  'live_MDTHkueXkFBfmzLZztMXNDaz5mXQgnJFQDKODnDEEFzzISBqCerLGchiI1K5z4M7';

function fetchBreeds() {
  return fetch(`${url}?api_key=${api_key}`).then(response => {
    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(`${url2}/${breedId}`).then(response => {
    return response.json();
  });
}

export { fetchBreeds, fetchCatByBreed };
