const SCALE_SMALLER = document.querySelector('.scale__control--smaller');
const SCALE_BIGGER = document.querySelector('.scale__control--bigger');
const SCALE_VALUE = document.querySelector('.scale__control--value');
const EDITABLE_PICTURE = document.querySelector('.img-upload__preview');

const LEVEL_SLIDER_CONTAINER = document.querySelector('.img-upload__effect-level');
const LEVEL_SLIDER = document.querySelector('.effect-level__slider');
const LEVEL_VALUE = document.querySelector('.effect-level__value');
const EFFECT_NONE = document.getElementById('effect-none');
const EFFECT_CHROME = document.getElementById('effect-chrome');
const EFFECT_SEPIA = document.getElementById('effect-sepia');
const EFFECT_MARVIN = document.getElementById('effect-marvin');
const EFFECT_PHOBOS = document.getElementById('effect-phobos');
const EFFECT_HEAT = document.getElementById('effect-heat');
let initialValue = 100;

const ZOOM_INITIAL = function () {
  initialValue = 100;
  SCALE_VALUE.value = `${initialValue}%`;
  EDITABLE_PICTURE.style.transform = '';
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

const SCALES_CONTROL = [SCALE_SMALLER, SCALE_BIGGER];
const SCALES_CONTROL_FUNCTION = [ZOOM_SMALLER, ZOOM_BIGGER];

const ADD_LISTENER_SCALES_CONTROL = function () {
  for (let i = 0; i < SCALES_CONTROL_FUNCTION.length; i++) {
    SCALES_CONTROL[i].addEventListener('click', SCALES_CONTROL_FUNCTION[i]);
  }
};

const REMOVE_LISTENER_SCALES_CONTROL = function () {
  for (let i = 0; i < SCALES_CONTROL_FUNCTION.length; i++) {
    SCALES_CONTROL[i].removeEventListener('click', SCALES_CONTROL_FUNCTION[i]);
  }
};

noUiSlider.create(LEVEL_SLIDER, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

LEVEL_SLIDER.noUiSlider.on('update', () => {
  LEVEL_VALUE.value = LEVEL_SLIDER.noUiSlider.get();
});

const LEVEL_SLIDER_INITIAL = function () {
  LEVEL_SLIDER.noUiSlider.updateOptions ({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  });
  EFFECT_NONE.checked = true;
  LEVEL_SLIDER_CONTAINER.style.display = 'none';
  LEVEL_SLIDER.style.display = 'none';
  EDITABLE_PICTURE.className = '';
  EDITABLE_PICTURE.classList.add('img-upload__preview');
  EDITABLE_PICTURE.style.filter = '';
};

const APPLY_EFFECT_NONE = function (evt) {
  if (evt.target.checked) {
    LEVEL_SLIDER_INITIAL();
  }
};

const APPLY_EFFECT_CHROME = function (evt) {
  if (evt.target.checked) {
    if (evt.target.checked) {
      LEVEL_SLIDER.noUiSlider.updateOptions ({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      LEVEL_SLIDER_CONTAINER.style.display = 'block';
      LEVEL_SLIDER.style.display = 'block';
      EDITABLE_PICTURE.className = '';
      EDITABLE_PICTURE.classList.add('img-upload__preview');
      EDITABLE_PICTURE.classList.add('effects__preview--chrome');

      LEVEL_SLIDER.noUiSlider.on('update', () => {
        EDITABLE_PICTURE.style.filter = `grayscale(${LEVEL_VALUE.value})`;
      });
    }
  }
};

const APPLY_EFFECT_SEPIA = function (evt) {
  if (evt.target.checked) {
    if (evt.target.checked) {
      LEVEL_SLIDER.noUiSlider.updateOptions ({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      LEVEL_SLIDER_CONTAINER.style.display = 'block';
      LEVEL_SLIDER.style.display = 'block';
      EDITABLE_PICTURE.className = '';
      EDITABLE_PICTURE.classList.add('img-upload__preview');
      EDITABLE_PICTURE.classList.add('effects__preview--sepia');

      LEVEL_SLIDER.noUiSlider.on('update', () => {
        EDITABLE_PICTURE.style.filter = `sepia(${LEVEL_VALUE.value})`;
      });
    }
  }
};

const APPLY_EFFECT_MARVIN = function (evt) {
  if (evt.target.checked) {
    LEVEL_SLIDER.noUiSlider.updateOptions ({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
    LEVEL_SLIDER_CONTAINER.style.display = 'block';
    LEVEL_SLIDER.style.display = 'block';
    EDITABLE_PICTURE.className = '';
    EDITABLE_PICTURE.classList.add('img-upload__preview');
    EDITABLE_PICTURE.classList.add('effects__preview--marvin');

    LEVEL_SLIDER.noUiSlider.on('update', () => {
      EDITABLE_PICTURE.style.filter = `invert(${LEVEL_VALUE.value}%)`;
    });
  }
};

const APPLY_EFFECT_PHOBOS = function (evt) {
  if (evt.target.checked) {
    LEVEL_SLIDER.noUiSlider.updateOptions ({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    LEVEL_SLIDER_CONTAINER.style.display = 'block';
    LEVEL_SLIDER.style.display = 'block';
    EDITABLE_PICTURE.className = '';
    EDITABLE_PICTURE.classList.add('img-upload__preview');
    EDITABLE_PICTURE.classList.add('effects__preview--phobos');

    LEVEL_SLIDER.noUiSlider.on('update', () => {
      EDITABLE_PICTURE.style.filter = `blur(${LEVEL_VALUE.value}px)`;
    });
  }
};

const APPLY_EFFECT_HEAT = function (evt) {
  if (evt.target.checked) {
    LEVEL_SLIDER.noUiSlider.updateOptions ({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    LEVEL_SLIDER_CONTAINER.style.display = 'block';
    LEVEL_SLIDER.style.display = 'block';
    EDITABLE_PICTURE.className = '';
    EDITABLE_PICTURE.classList.add('img-upload__preview');
    EDITABLE_PICTURE.classList.add('effects__preview--heat');

    LEVEL_SLIDER.noUiSlider.on('update', () => {
      EDITABLE_PICTURE.style.filter = `brightness(${LEVEL_VALUE.value})`;
    });
  }
};

const EFFECTS = [EFFECT_NONE, EFFECT_CHROME, EFFECT_SEPIA, EFFECT_MARVIN, EFFECT_PHOBOS, EFFECT_HEAT];
const EFFECTS_FUNCTION = [APPLY_EFFECT_NONE, APPLY_EFFECT_CHROME, APPLY_EFFECT_SEPIA, APPLY_EFFECT_MARVIN, APPLY_EFFECT_PHOBOS, APPLY_EFFECT_HEAT];

const ADD_LISTENER_EFFECTS = function () {
  for (let i = 0; i < EFFECTS_FUNCTION.length; i++) {
    EFFECTS[i].addEventListener('change', EFFECTS_FUNCTION[i]);
  }
};

const REMOVE_LISTENER_EFFECTS = function () {
  for (let i = 0; i < EFFECTS_FUNCTION.length; i++) {
    EFFECTS[i].removeEventListener('change', EFFECTS_FUNCTION[i]);
  }
};

export {ZOOM_INITIAL, ADD_LISTENER_SCALES_CONTROL, REMOVE_LISTENER_SCALES_CONTROL, LEVEL_SLIDER_INITIAL, ADD_LISTENER_EFFECTS, REMOVE_LISTENER_EFFECTS};
