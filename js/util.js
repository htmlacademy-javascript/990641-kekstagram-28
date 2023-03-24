const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomArray = (array) => array[getRandomNumber(0, array.length - 1)];

const isEnterKey = (evt) => evt.key === 'Enter';

const isEscapeKey = (evt) => evt.ley === 'Escape';

export {getRandomNumber, getRandomArray, isEnterKey, isEscapeKey};
