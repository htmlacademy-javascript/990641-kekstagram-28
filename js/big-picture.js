import {getDescriptionPhoto} from './data.js';
import {isEscapeKey} from './util.js';
import {renderComments} from './render-comments.js';

const body = document.body;
const pictureContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.cancel');

const commentsLoader = document.querySelector('.comments-loader');
const commentCount = document.querySelector('.social__comment-count');


const renderPictureDetails = ({url, likes, description}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
};

function onDocumentKeyDown (evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  commentsLoader.classList.add('hidden');
  commentCount.classList.add('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeyDown);
  closeButton.addEventListener('click', closeBigPicture);

  renderPictureDetails(data);
  renderComments(data.comments);
};

const renderBigPicture = (photosCollection) => {
  pictureContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');

    if (!thumbnail) {
      return;
    }

    const picture = photosCollection.find((item) => item.id === +thumbnail.dataset.thumbnailId);
    showBigPicture(picture);
  });

};

renderBigPicture(getDescriptionPhoto());

