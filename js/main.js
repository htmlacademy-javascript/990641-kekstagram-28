import {renderThumbnails} from './render-thumbnails.js';
import './big-picture.js';
import './validation.js';
import './filters.js';
import './scale.js';
import {showError} from './alerts.js';
import {sendRequest} from './fetch.js';

let photos = [];

const onSuccess = (data) => {
  photos = data.slice();
  renderThumbnails(photos);
};

const onError = () => {
  showError('Ошибка загрузки, попробуйте еще раз', 'Закрыть');
};

sendRequest(onSuccess, onError, 'GET');

export {photos};
