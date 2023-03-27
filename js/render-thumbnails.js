import {getDescriptionPhoto} from './data.js';

const thumbnailsContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const thumbnailFragment = document.createDocumentFragment();

const renderThumbnails = (photosCollection) => {

  photosCollection.forEach(({url, comments, likes, id}) => {

    const thumbnailElement = thumbnailTemplate.cloneNode(true);

    thumbnailElement.querySelector('.picture__img').src = url;
    thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
    thumbnailElement.querySelector('.picture__likes').textContent = likes;
    thumbnailElement.dataset.thumbnailId = id;

    thumbnailFragment.appendChild(thumbnailElement);
  });

  return thumbnailsContainer.appendChild(thumbnailFragment);
};

renderThumbnails(getDescriptionPhoto());


