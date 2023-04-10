import {resetEffects, initPictureEffects} from './effects.js';
import {controlScale, resetScale} from './scale.js';
import {showError, showSuccess} from './alerts.js';
import {sendRequest} from './fetch.js';
import {isEscapeKey} from './util.js';
import '../vendor/pristine/pristine.min.js';

const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;
const TAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_COMMENT_LENGTH = 140;

const inputHashtag = document.querySelector('.text__hashtags');
const inputComment = document.querySelector('.text__description');

const uploadForm = document.querySelector('.img-upload__form');

const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('#upload-cancel');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadSubmit = uploadForm.querySelector('#upload-submit');


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field--invalid',
  succesClass: 'img-upload__field--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error',
});

let errorMessage = '';

const hashtagsError = () => errorMessage;

const isHashtagsHandler = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if (!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  if (inputArray.length === 0) {
    return true;
  }

  const rules = [
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэштег начинается с символа # (решётка)',
    },
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хэш-тег не может состоять только из решетки',
    },
    {
      check: inputArray.some((item) => item.indexOf('#', 1) >= 1),
      error: 'Хэш-теги должны разделяться пробелами',
    },
    {
      check: inputArray.some((item, i, arr) => arr.includes(item, i + 1)),
      error: 'Хэш-теги не должны повторяться',
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длина хэш-тега ${MAX_SYMBOLS} символов`,
    },
    {
      check: inputArray.value > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} хэш-тегов`,
    },
    {
      check: inputArray.some((item) => !TAG_REGEXP.test(item)),
      error: 'Хэш-тег содержит недопустимые символы',
    }
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;

    if (isInvalid) {
      errorMessage = rule.error;
    }

    return !isInvalid;
  });

};

pristine.addValidator(inputHashtag, isHashtagsHandler, hashtagsError, 2, false);

const isCommentHandler = () => !(inputComment.value.length > MAX_COMMENT_LENGTH);
const commentError = () => `Максимальная длинна комментария ${MAX_COMMENT_LENGTH} символов`;

pristine.addValidator(inputComment, isCommentHandler, commentError);

const onEnteringInput = () => {
  if (pristine.validate()) {
    uploadSubmit.disabled = false;
  } else {
    uploadSubmit.disabled = true;
  }
};

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const modalClose = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFile.value = '';
  uploadForm.reset();
  resetScale();
  resetEffects();
};

const modalEscClose = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    modalClose();
    document.removeEventListener('keydown', modalEscClose);
  }
};

const modalClickClose = () => {
  modalClose();
  document.removeEventListener('keydown', modalEscClose);
};

const lockFocus = () => {
  const addModalEscClose = () => document.addEventListener('keydown', modalEscClose);
  const removeModalEscClose = () => document.removeEventListener('keydown', modalEscClose);

  inputComment.addEventListener('focus', removeModalEscClose);
  inputComment.addEventListener('blur', addModalEscClose);
  inputHashtag.addEventListener('focus', removeModalEscClose);
  inputHashtag.addEventListener('blur', addModalEscClose);
};

const modalOpen = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  inputHashtag.addEventListener('input', onEnteringInput);
  inputComment.addEventListener('input', onEnteringInput);

  document.addEventListener('keydown', modalEscClose);
  lockFocus();
  controlScale();
  initPictureEffects();
};

const startModal = () => {
  uploadFile.addEventListener('input', modalOpen);
  uploadCancel.addEventListener('click', modalClickClose);
};


const onSuccess = () => {
  showSuccess('Фотография успешно отправлена');
  modalClose();
};

const onError = () => {
  showError('Что-то пошло не так', 'Попробуйте снова, или загрузите новый файл');
};

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendRequest(onSuccess, onError, 'POST', new FormData(evt.target));
});

startModal();

