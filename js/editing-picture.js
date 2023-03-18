const SCALE_VALUE = document.querySelector('.scale__control--value');
const EDITABLE_PICTURE = document.querySelector('.img-upload__preview');
let initialValue = 100;

const ZOOM_INITIAL = function () {
  initialValue = 100;
  SCALE_VALUE.value = `${initialValue}%`;
  EDITABLE_PICTURE.style.transform = `scale(${initialValue / 100})`;
};

const ZOOM_SMALLER = function () {
  if (initialValue > 25) {
    SCALE_VALUE.value = `${initialValue -= 25}%`;
    EDITABLE_PICTURE.style.transform = `scale(${initialValue / 100})`;
  }
};

const ZOOM_BIGGER = function () {
  if(initialValue < 100) {
    SCALE_VALUE.value = `${initialValue += 25}%`;
    EDITABLE_PICTURE.style.transform = `scale(${initialValue / 100})`;
  }
};

export {ZOOM_INITIAL, ZOOM_SMALLER, ZOOM_BIGGER};
