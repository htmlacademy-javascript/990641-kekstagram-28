const Zoom = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const uploadPreview = document.querySelector('.img-upload__preview img');

const changeScale = (factor) => {
  let size = parseInt(scaleControlValue.value, 10) + (Zoom.STEP * factor);

  if (size < Zoom.MIN) {
    size = Zoom.MIN;
  }

  if (size > Zoom.MAX) {
    size = Zoom.MAX;
  }

  scaleControlValue.value = `${size}%`;
  uploadPreview.style.transform = `scale(${size / 100})`;
};

const onMinusButtomClick = () => {
  changeScale(-1);
};

const onPlusButtomClick = () => {
  changeScale(1);
};

const controlScale = () => {
  scaleControlBigger.addEventListener('click', onPlusButtomClick);
  scaleControlSmaller.addEventListener('click', onMinusButtomClick);
};

const resetScale = () => {
  scaleControlValue.value = `${Zoom.MAX}%`;
  uploadPreview.style.transform = `scale(${scaleControlValue.value})`;
};

export {controlScale, resetScale};
