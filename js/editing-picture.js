const EDITABLE_PICTURE = document.querySelector('.img-upload__preview');

const SCALE_VALUE = document.querySelector('.scale__control--value');
const SCALE = {
  smaller: document.querySelector('.scale__control--smaller'),
  bigger: document.querySelector('.scale__control--bigger'),
};

const LEVEL_SLIDER_CONTAINER = document.querySelector('.img-upload__effect-level');
const LEVEL_SLIDER = document.querySelector('.effect-level__slider');
const LEVEL_VALUE = document.querySelector('.effect-level__value');

const EFFECT = {
  none: document.getElementById('effect-none'),
  chrome: document.getElementById('effect-chrome'),
  sepia: document.getElementById('effect-sepia'),
  marvin: document.getElementById('effect-marvin'),
  phobos: document.getElementById('effect-phobos'),
  heat: document.getElementById('effect-heat')
};

let initialZoomValue = 100;

const ZOOM_INITIAL = function () {
  initialZoomValue = 100;
  SCALE_VALUE.value = `${initialZoomValue}%`;
  EDITABLE_PICTURE.style.transform = '';
};

const ZOOM = {
  smaller: function () {
    const MIN_VALUE = 25;
    const STEP_ZOOM = 25;
    if (initialZoomValue > MIN_VALUE) {
      SCALE_VALUE.value = `${initialZoomValue -= STEP_ZOOM}%`;
      EDITABLE_PICTURE.style.transform = `scale(${initialZoomValue / 100})`;
    }
  },

  bigger: function () {
    const MAX_VALUE = 100;
    const STEP_ZOOM = 25;
    if(initialZoomValue < MAX_VALUE) {
      SCALE_VALUE.value = `${initialZoomValue += STEP_ZOOM}%`;
      EDITABLE_PICTURE.style.transform = `scale(${initialZoomValue / 100})`;
    }
  }
};

const SCALES_CONTROLS = [SCALE.smaller, SCALE.bigger];
const SCALES_CONTROL_FUNCTIONS = [ZOOM.smaller, ZOOM.bigger];

const ADD_LISTENER_SCALES_CONTROL = function () {
  for (let i = 0; i < SCALES_CONTROL_FUNCTIONS.length; i++) {
    SCALES_CONTROLS[i].addEventListener('click', SCALES_CONTROL_FUNCTIONS[i]);
  }
};

const REMOVE_LISTENER_SCALES_CONTROL = function () {
  for (let i = 0; i < SCALES_CONTROL_FUNCTIONS.length; i++) {
    SCALES_CONTROLS[i].removeEventListener('click', SCALES_CONTROL_FUNCTIONS[i]);
  }
};

const NO_UI_SLIDER_CONFIG = {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
};

noUiSlider.create(LEVEL_SLIDER, {
  ...NO_UI_SLIDER_CONFIG,
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

const ACTIVE_EFFECT_CONFIG = function () {
  LEVEL_SLIDER_CONTAINER.style.display = EFFECT.none.checked ? 'none' : 'block';
  LEVEL_SLIDER.style.display = EFFECT.none.checked ? 'none' : 'block';
  EDITABLE_PICTURE.className = '';
  EDITABLE_PICTURE.classList.add('img-upload__preview');
};

const INIT_LEVEL_SLIDER = function () {
  LEVEL_SLIDER.noUiSlider.updateOptions (NO_UI_SLIDER_CONFIG);
  EFFECT.none.checked = true;
  ACTIVE_EFFECT_CONFIG();
  EDITABLE_PICTURE.style.filter = '';
};


const APPLY_EFFECT = {
  none: function (evt) {
    if (evt.target.checked) {
      INIT_LEVEL_SLIDER();
    }
  },

  chrome: function (evt) {
    if (evt.target.checked) {
      LEVEL_SLIDER.noUiSlider.updateOptions (NO_UI_SLIDER_CONFIG);
      ACTIVE_EFFECT_CONFIG();
      EDITABLE_PICTURE.classList.add('effects__preview--chrome');

      LEVEL_SLIDER.noUiSlider.on('update', () => {
        EDITABLE_PICTURE.style.filter = `grayscale(${LEVEL_VALUE.value})`;
      });
    }
  },

  sepia: function (evt) {
    if (evt.target.checked) {
      LEVEL_SLIDER.noUiSlider.updateOptions (NO_UI_SLIDER_CONFIG);
      ACTIVE_EFFECT_CONFIG();
      EDITABLE_PICTURE.classList.add('effects__preview--sepia');

      LEVEL_SLIDER.noUiSlider.on('update', () => {
        EDITABLE_PICTURE.style.filter = `sepia(${LEVEL_VALUE.value})`;
      });
    }
  },

  marvin: function (evt) {
    if (evt.target.checked) {
      LEVEL_SLIDER.noUiSlider.updateOptions ({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      ACTIVE_EFFECT_CONFIG();
      EDITABLE_PICTURE.classList.add('effects__preview--marvin');

      LEVEL_SLIDER.noUiSlider.on('update', () => {
        EDITABLE_PICTURE.style.filter = `invert(${LEVEL_VALUE.value}%)`;
      });
    }
  },

  phobos: function (evt) {
    if (evt.target.checked) {
      LEVEL_SLIDER.noUiSlider.updateOptions ({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      ACTIVE_EFFECT_CONFIG();
      EDITABLE_PICTURE.classList.add('effects__preview--phobos');

      LEVEL_SLIDER.noUiSlider.on('update', () => {
        EDITABLE_PICTURE.style.filter = `blur(${LEVEL_VALUE.value}px)`;
      });
    }
  },

  heat: function (evt) {
    if (evt.target.checked) {
      LEVEL_SLIDER.noUiSlider.updateOptions ({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      ACTIVE_EFFECT_CONFIG();
      EDITABLE_PICTURE.classList.add('effects__preview--heat');

      LEVEL_SLIDER.noUiSlider.on('update', () => {
        EDITABLE_PICTURE.style.filter = `brightness(${LEVEL_VALUE.value})`;
      });
    }
  }
};

const EFFECTS = [EFFECT.none, EFFECT.chrome, EFFECT.sepia, EFFECT.marvin, EFFECT.phobos, EFFECT.heat];
const EFFECTS_FUNCTIONS = [APPLY_EFFECT.none, APPLY_EFFECT.chrome, APPLY_EFFECT.sepia, APPLY_EFFECT.marvin, APPLY_EFFECT.phobos, APPLY_EFFECT.heat];

const ADD_LISTENER_EFFECTS = function () {
  for (let i = 0; i < EFFECTS_FUNCTIONS.length; i++) {
    EFFECTS[i].addEventListener('change', EFFECTS_FUNCTIONS[i]);
  }
};

const REMOVE_LISTENER_EFFECTS = function () {
  for (let i = 0; i < EFFECTS_FUNCTIONS.length; i++) {
    EFFECTS[i].removeEventListener('change', EFFECTS_FUNCTIONS[i]);
  }
};

export {ZOOM_INITIAL, ADD_LISTENER_SCALES_CONTROL, REMOVE_LISTENER_SCALES_CONTROL, INIT_LEVEL_SLIDER, ADD_LISTENER_EFFECTS, REMOVE_LISTENER_EFFECTS};
// module9-task2
