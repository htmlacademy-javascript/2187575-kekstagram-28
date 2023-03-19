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

EFFECT_NONE.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    LEVEL_SLIDER_INITIAL();
  }
});

EFFECT_CHROME.addEventListener('change', (evt) => {
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

      EDITABLE_PICTURE.style.filter = 'grayscale(1)';
      LEVEL_SLIDER.noUiSlider.on('update', () => {
        EDITABLE_PICTURE.style.filter = `grayscale(${LEVEL_VALUE.value})`;
      });
    }
  }
});

EFFECT_SEPIA.addEventListener('change', (evt) => {
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
      EDITABLE_PICTURE.style.filter = 'sepia(1)';

      LEVEL_SLIDER.noUiSlider.on('update', () => {
        EDITABLE_PICTURE.style.filter = `sepia(${LEVEL_VALUE.value})`;
      });
    }
  }
});

EFFECT_MARVIN.addEventListener('change', (evt) => {
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
    EDITABLE_PICTURE.style.filter = 'invert(100%)';

    LEVEL_SLIDER.noUiSlider.on('update', () => {
      EDITABLE_PICTURE.style.filter = `invert(${LEVEL_VALUE.value}%)`;
    });
  }
});

EFFECT_PHOBOS.addEventListener('change', (evt) => {
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
    EDITABLE_PICTURE.style.filter = 'blur(3px)';

    LEVEL_SLIDER.noUiSlider.on('update', () => {
      EDITABLE_PICTURE.style.filter = `blur(${LEVEL_VALUE.value}px)`;
    });
  }
});

EFFECT_HEAT.addEventListener('change', (evt) => {
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
    EDITABLE_PICTURE.style.filter = 'brightness(3)';

    LEVEL_SLIDER.noUiSlider.on('update', () => {
      EDITABLE_PICTURE.style.filter = `brightness(${LEVEL_VALUE.value})`;
    });
  }
});

export {ZOOM_INITIAL, ZOOM_SMALLER, ZOOM_BIGGER, LEVEL_SLIDER_INITIAL};
