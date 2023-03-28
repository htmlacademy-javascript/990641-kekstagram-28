import {getRandomNumber, getRandomArray} from './util.js';

const IDENTIFY_COUNTS = {
  MIN: 1,
  MAX: 25,
  OTHER: 999,
};

const COMMENTS = {
  MIN: 1,
  MAX: 25,
};

const LIKES = {
  MIN: 15,
  MAX: 200,
};

const PHOTO_COUNTS = {
  MIN: 1,
  MAX: 6,
};

const NAMES = [
  'Полина',
  'Тимофей',
  'Андрей',
  'Евгений',
  'Александра',
  'Шерелин',
  'Алёна',
];

const DESCRIPTIONS_PHOTO = [
  'Яркие впечатления!',
  'Без фильтров',
  'С фильтрами',
  'Использован обьектив 54мм',
  'Тестирование новой камеры',
  'Внимание на акцентах',
  'Удивительные краски',
];

const COMMENTS_LIST = [
  'Всё отлично!',
  'В целом всё неплохо.Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !',
];

const photosDescription = [];

const addComments = () => {
  const commentsUsers = [];

  for (let i = COMMENTS.MIN; i <= getRandomNumber(COMMENTS.MIN, COMMENTS.MAX); i++) {
    commentsUsers.push({
      id: getRandomNumber(IDENTIFY_COUNTS.MAX, IDENTIFY_COUNTS.OTHER),
      avatar: `img/avatar-${getRandomNumber(PHOTO_COUNTS.MIN, PHOTO_COUNTS.MAX)}.svg`,
      message: getRandomArray(COMMENTS_LIST),
      name: getRandomArray(NAMES),
    });
  }

  return commentsUsers;
};

const getDescriptionPhoto = () => {

  for (let i = IDENTIFY_COUNTS.MIN; i <= IDENTIFY_COUNTS.MAX; i++) {
    photosDescription.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: getRandomArray(DESCRIPTIONS_PHOTO),
      likes: getRandomNumber(LIKES.MIN, LIKES.MAX),
      comments: addComments(),
    });
  }

  return photosDescription;
};

export {getDescriptionPhoto};
