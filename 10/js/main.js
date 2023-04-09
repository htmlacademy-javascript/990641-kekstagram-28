import {renderThumbnails} from './render-thumbnails.js';
import './big-picture.js';
import './validation.js';
import './filters.js';
import './scale.js';
import {sendRequest} from './fetch.js';

let photos = [];

const onSuccess = (data) => {
  photos = data.slice();
  renderThumbnails(photos);
};

const onFail = () => {
  const messageAlert = document.createElement('div');
  messageAlert.style.position = 'absolute';
  messageAlert.style.left = 0;
  messageAlert.style.top = 0;
  messageAlert.style.right = 0;
  messageAlert.style.fontSize = '30px';
  messageAlert.style.backgroundColor = 'red';
  messageAlert.style.textAlign = 'center';
  messageAlert.textContent = 'Ошибка загрузки фото';
  document.body.append(messageAlert);
};

sendRequest(onSuccess, onFail, 'GET');

export {photos};
