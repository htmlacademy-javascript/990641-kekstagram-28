import {isEscapeKey} from './util.js';

const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');

const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const pictureCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const loadComments = bigPicture.querySelector('.comments-loader');
const socialFooterText = bigPicture.querySelector('.social__footer-text');

const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

let commentsCount = COMMENTS_STEP;
let currentComments = [];

const renderComments = () => {
  socialComments.innerHTML = '';

  commentsCount = (commentsCount > currentComments.length) ? currentComments.length : commentsCount;

  const commentsSelected = currentComments.slice(0, commentsCount);

  if (currentComments.length <= COMMENTS_STEP || commentsCount >= currentComments.length) {
    loadComments.classList.add('hidden');
  } else {
    loadComments.classList.remove('hidden');
  }

  socialCommentsCount.textContent = `${commentsCount} из ${currentComments.length} комментариев`;

  const commentsFragment = document.createDocumentFragment();

  commentsSelected.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    commentsFragment.append(commentElement);
  });

  socialComments.appendChild(commentsFragment);

};

const onLoadComments = () => {
  commentsCount += COMMENTS_STEP;
  renderComments();
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsCount = COMMENTS_STEP;
  currentComments = [];
  socialFooterText.value = '';
};

const onBigPictureKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    closeBigPicture();
    document.removeEventListener('keydown', onBigPictureKeyDown);
  }
};

const onCloseBigPictureClick = () => {
  closeBigPicture();
  document.removeEventListener('keydown', onBigPictureKeyDown);
};

const showBigPicture = (url, comments, likes, description) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImage.src = url;
  likesCount.textContent = likes;
  pictureCaption.textContent = description;

  currentComments = comments;
  renderComments();

  loadComments.addEventListener('click', onLoadComments);
  document.addEventListener('keydown', onBigPictureKeyDown);
  closeButton.addEventListener('click', onCloseBigPictureClick);
};

export {showBigPicture};
