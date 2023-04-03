const SCALE_STEP = 25;
const SCALE_DEFAULT = 100;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const uploadPreview = document.querySelector('.img-upload__preview img');

const controlScaling = () => {

  let standardValue = SCALE_DEFAULT;
  scaleControlValue.value = `${standardValue}%`;

  scaleControlSmaller.addEventListener('click', () => {
    if (standardValue > 25) {
      standardValue -= SCALE_STEP;
      scaleControlValue.value = `${standardValue}%`;
      uploadPreview.style.transform = `scale(${scaleControlValue.value})`;
    }
  });

  scaleControlBigger.addEventListener('click', () => {
    if (standardValue < 100) {
      standardValue += SCALE_STEP;
      scaleControlValue.value = `${standardValue}%`;
      uploadPreview.style.transform = `scale(${scaleControlValue.value})`;
    }
  });

};

controlScaling();
