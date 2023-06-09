import SlimSelect from 'slim-select';
const bodyEl = document.querySelector('body');
const backgroundEl = document.createElement('div');
bodyEl.prepend(backgroundEl);
backgroundEl.style.cssText =
  'position: absolute; z-index: -1; top: 40px; display: flex; align-items: center; justify-content: space-around; flex-wrap: wrap;';
const selectEl = document.getElementById('selectElement');
const loaderEl = document.querySelector('.loader');
const infoEl = document.querySelector('.cat-info');

function createOptions(data) {
  data
    .filter(elem => elem.reference_image_id !== undefined)
    .map(
      elem =>
        (selectEl.innerHTML += `<option value="${elem.reference_image_id}">${elem.name}</option>`)
    );
  selectEl.style.opacity = '1';
  loaderEl.style.opacity = '0';
}

function newSelect() {
  // new SlimSelect({
  //   select: '#selectElement',
  // });
  new SlimSelect({ select: selectEl });
}

function createBackground(data) {
  data
    .filter(elem => elem.reference_image_id !== undefined)
    .map(
      elem =>
        (backgroundEl.innerHTML += `<img src="${elem.image.url}" style="width: 125px; margin: 3px" />`)
    );
  setInterval(() => {
    const imgEl = backgroundEl.querySelectorAll('img');
    imgEl.forEach(img => {
      img.style.opacity = `${Math.random()}`;
    });
  }, 1000);
}

function createMarkup(data) {
  createOptions(data);
  newSelect();
  createBackground(data);
}

function createCardInfo(data) {
  infoEl.innerHTML = `<img src="${data.url}" width="100%"><div style="padding: 15px; padding-top: 0;"><h1>${data.breeds[0].name}</h1><p>${data.breeds[0].description}</p><b>Temperament: </b><span> ${data.breeds[0].temperament}</span></div>`;
  infoEl.style.cssText = `width: 350px; margin-top: 75px; margin-left: auto; margin-right: auto; border: 2mm ridge rgba(211, 211, 211, .5); background-color: #fff;`;
  loaderEl.style.opacity = '0';
  backgroundEl.style.opacity = '1';
}

export { createMarkup, createCardInfo };
