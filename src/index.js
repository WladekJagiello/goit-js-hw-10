import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import { createMarkup, createCardInfo } from './js/markup';

const bodyEl = document.querySelector('body');
const backgroundEl = document.createElement('div');
bodyEl.prepend(backgroundEl);
const loaderEl = document.querySelector('.loader');
const infoEl = document.querySelector('.cat-info');
const selectEl = document.getElementById('selectElement');
selectEl.style.opacity = '0';

fetchBreeds()
  .then(createMarkup)
  .catch(error => {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
    console.log(error);
  });

selectEl.addEventListener('change', e => {
  loaderEl.style.opacity = '1';
  infoEl.innerHTML = '';
  infoEl.style.cssText = '';
  fetchCatByBreed(e.target.value)
    .then(createCardInfo)
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      console.log(error);
    });
});
