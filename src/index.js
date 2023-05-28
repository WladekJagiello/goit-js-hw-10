import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const selectEl = document.querySelector('#selectElement');
selectEl.style.opacity = '0';
const loaderEl = document.querySelector('.loader');
const infoEl = document.querySelector('.cat-info');
const backgroundEl = document.createElement('div');
selectEl.before(backgroundEl);
backgroundEl.style.cssText =
  'position: absolute; z-index: -1; display: flex; align-items: center; justify-content: space-around; flex-wrap: wrap;';
let interval;

const buttonEl = document.createElement('button');
loaderEl.before(buttonEl);
buttonEl.textContent = 'НАТИСНИ МЕНЕ';
const numberEl = document.createElement('h1');
buttonEl.before(numberEl);
numberEl.textContent = '3';

function createSelect(data) {
  for (let i = 0; i < 30; i += 1) {
    const imgEl = document.createElement('img');
    backgroundEl.append(imgEl);
    imgEl.src = data[i].image.url;
    imgEl.style.cssText = 'width: 150px; margin: 5px';
    interval = setInterval(() => {
      imgEl.style.opacity = `${Math.random()}`;
    }, 1000);
  }
  for (let i = 0; i < data.length; i += 1) {
    const option = document.createElement('option');
    selectEl.append(option);
    option.textContent = `${data[i].name}`;
    option.value = data[i].reference_image_id;
  }
  selectEl.style.opacity = '1';
  loaderEl.style.opacity = '0';
  new SlimSelect({
    select: '#selectElement',
  });
}

function createCardInfo(data) {
  infoEl.insertAdjacentHTML(
    'afterbegin',
    `<img src="${data.url}" width="100%"><div style="padding: 15px; padding-top: 0;"><h1>${data.breeds[0].name}</h1><p>${data.breeds[0].description}</p><b>Temperament: </b><span> ${data.breeds[0].temperament}</span></div>`
  );
  infoEl.style.cssText = `width: 350px; margin-top: 75px; margin-left: auto; margin-right: auto; border: 2mm ridge rgba(211, 211, 211, .5); background-color: #fff;`;
  loaderEl.style.opacity = '0';
  backgroundEl.style.opacity = '1';
}

buttonEl.addEventListener('click', () => {
  buttonEl.remove();
  numberEl.textContent = '2';
  const buttonTwoEl = document.createElement('button');
  loaderEl.before(buttonTwoEl);
  buttonTwoEl.textContent = 'ЩЕ РАЗОЧОК';
  buttonTwoEl.addEventListener('click', () => {
    buttonTwoEl.remove();
    numberEl.textContent = '1';
    const buttonThreeEl = document.createElement('button');
    loaderEl.before(buttonThreeEl);
    buttonThreeEl.textContent = 'ЩЕ, БО ТАК ТРЕБА..';
    buttonThreeEl.addEventListener('click', () => {
      buttonThreeEl.remove();
      numberEl.textContent = '99999';
      const buttonFourEl = document.createElement('button');
      loaderEl.before(buttonFourEl);
      buttonFourEl.textContent = '¯\\_(ツ)_/¯';
      buttonFourEl.addEventListener('click', () => {
        buttonFourEl.remove();
        numberEl.remove();
        backgroundEl.style.opacity = '1';

        fetchBreeds()
          .then(createSelect)
          .catch(error => {
            Notiflix.Notify.failure(
              'Oops! Something went wrong! Try reloading the page!'
            );
          });
      });
    });
  });
});

selectEl.addEventListener('change', e => {
  backgroundEl.style.opacity = '0';
  loaderEl.style.opacity = '1';
  infoEl.innerHTML = '';
  infoEl.style.cssText = '';
  fetchCatByBreed(e.target.value)
    .then(createCardInfo)
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
});
