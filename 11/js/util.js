const DEBOUNCE_INTERVAL = 500;

const isEscapeKey = (evt) => evt.key === 'Escape';

const shuffleArray = (array) => array
  .map((item) => [Math.random(), item])
  .sort()
  .map((item) => item[1]);

const debounce = (cb) => {
  let lastTimeout = null;

  return (...args) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...args);
    }, DEBOUNCE_INTERVAL);
  };
};

export {isEscapeKey, shuffleArray, debounce};
