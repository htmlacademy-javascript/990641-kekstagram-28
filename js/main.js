import {renderThumbnails} from './render-thumbnails.js';
import {shuffleArray, debounce} from './util.js';
import {showError} from './alerts.js';
import {sendRequest} from './fetch.js';
import './big-picture.js';
import './validation.js';
// import './effects.js';
// import './scale.js';
import './load-image.js';


const DEFAULT_PREVIEW_LOAD = 25;
const RANDOM_PREVIEW_LOAD = 10;

const filter = document.querySelector('.img-filters');
let photos = [];

const removeActiveClass = () => {
  const activeFilter = document.querySelector('.img-filters__button--active');
  activeFilter.classList.remove('img-filters__button--active');
};

const removePhotos = () => {
  const images = document.querySelectorAll('.picture');
  if (images) {
    images.forEach((element) => element.remove());
  }
};

const filters = {
  'filter-default': () => {
    renderThumbnails(photos.slice(0, DEFAULT_PREVIEW_LOAD));
  },
  'filter-random': () => {
    renderThumbnails(shuffleArray(photos.slice())
      .slice(0, RANDOM_PREVIEW_LOAD));
  },
  'filter-discussed': () => {
    renderThumbnails(photos.slice()
      .sort((a, b) => b.comments.length - a.comments.length));
  },
};

const onSuccess = (data) => {
  filter.classList.remove('img-filters--inactive');
  photos = data.slice();
  renderThumbnails(photos.slice(0, DEFAULT_PREVIEW_LOAD));
};

const onError = () => {
  showError('Ошибка загрузки, попробуйте еще раз', 'Закрыть');
};

sendRequest(onSuccess, onError, 'GET');

const onFilterClick = debounce((evt) => {
  if (evt.target.classList.contains('img-filters__button')) {
    removeActiveClass();
    removePhotos();
    evt.target.classList.add('img-filters__button--active');
    filters[evt.target.id]();
  }
});

filter.addEventListener('click', onFilterClick);
