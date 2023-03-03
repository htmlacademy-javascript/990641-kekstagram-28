const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomArray = (array) => array[getRandomNumber(0, array.length - 1)];

export {getRandomNumber, getRandomArray};
