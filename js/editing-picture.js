import { editablePicture } from './global-constants.js';

const scaleValue = document.querySelector('.scale__control--value');
const Scale = {
  smaller: document.querySelector('.scale__control--smaller'),
  bigger: document.querySelector('.scale__control--bigger'),
};

const levelSliderContainer = document.querySelector('.img-upload__effect-level');
const levelSlider = document.querySelector('.effect-level__slider');
const levelValue = document.querySelector('.effect-level__value');

const Effect = {
  none: document.getElementById('effect-none'),
  chrome: document.getElementById('effect-chrome'),
  sepia: document.getElementById('effect-sepia'),
  marvin: document.getElementById('effect-marvin'),
  phobos: document.getElementById('effect-phobos'),
  heat: document.getElementById('effect-heat')
};

let initialZoomValue = 100;

const zoomInitial = function () {
  initialZoomValue = 100;
  scaleValue.value = `${initialZoomValue}%`;
  editablePicture.style.transform = '';
};

const zoom = {
  smaller: function () {
    const MIN_VALUE = 25;
    const STEP_ZOOM = 25;
    if (initialZoomValue > MIN_VALUE) {
      scaleValue.value = `${initialZoomValue -= STEP_ZOOM}%`;
      editablePicture.style.transform = `scale(${initialZoomValue / 100})`;
    }
  },

  bigger: function () {
    const MAX_VALUE = 100;
    const STEP_ZOOM = 25;
    if (initialZoomValue < MAX_VALUE) {
      scaleValue.value = `${initialZoomValue += STEP_ZOOM}%`;
      editablePicture.style.transform = `scale(${initialZoomValue / 100})`;
    }
  }
};

const scalesControls = [Scale.smaller, Scale.bigger];
const scalesControlsFunctions = [zoom.smaller, zoom.bigger];

const addListenerScalesControl = function () {
  for (let i = 0; i < scalesControlsFunctions.length; i++) {
    scalesControls[i].addEventListener('click', scalesControlsFunctions[i]);
  }
};

const removeListenerScalesControl = function () {
  for (let i = 0; i < scalesControlsFunctions.length; i++) {
    scalesControls[i].removeEventListener('click', scalesControlsFunctions[i]);
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

noUiSlider.create(levelSlider, {
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

levelSlider.noUiSlider.on('update', () => {
  levelValue.value = levelSlider.noUiSlider.get();
});

const activeEffectConfig = function () {
  levelSliderContainer.style.display = Effect.none.checked ? 'none' : 'block';
  levelSlider.style.display = Effect.none.checked ? 'none' : 'block';
  editablePicture.className = '';
  editablePicture.classList.add('img-upload__preview');
};

const initLevelSlider = function () {
  levelSlider.noUiSlider.updateOptions (NO_UI_SLIDER_CONFIG);
  Effect.none.checked = true;
  activeEffectConfig();
  editablePicture.style.filter = '';
};


const ApplyEffect = {
  none: function (evt) {
    if (evt.target.checked) {
      initLevelSlider();
    }
  },

  chrome: function (evt) {
    if (evt.target.checked) {
      levelSlider.noUiSlider.updateOptions (NO_UI_SLIDER_CONFIG);
      activeEffectConfig();
      editablePicture.classList.add('effects__preview--chrome');

      levelSlider.noUiSlider.on('update', () => {
        editablePicture.style.filter = `grayscale(${levelValue.value})`;
      });
    }
  },

  sepia: function (evt) {
    if (evt.target.checked) {
      levelSlider.noUiSlider.updateOptions (NO_UI_SLIDER_CONFIG);
      activeEffectConfig();
      editablePicture.classList.add('effects__preview--sepia');

      levelSlider.noUiSlider.on('update', () => {
        editablePicture.style.filter = `sepia(${levelValue.value})`;
      });
    }
  },

  marvin: function (evt) {
    if (evt.target.checked) {
      levelSlider.noUiSlider.updateOptions ({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      activeEffectConfig();
      editablePicture.classList.add('effects__preview--marvin');

      levelSlider.noUiSlider.on('update', () => {
        editablePicture.style.filter = `invert(${levelValue.value}%)`;
      });
    }
  },

  phobos: function (evt) {
    if (evt.target.checked) {
      levelSlider.noUiSlider.updateOptions ({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      activeEffectConfig();
      editablePicture.classList.add('effects__preview--phobos');

      levelSlider.noUiSlider.on('update', () => {
        editablePicture.style.filter = `blur(${levelValue.value}px)`;
      });
    }
  },

  heat: function (evt) {
    if (evt.target.checked) {
      levelSlider.noUiSlider.updateOptions ({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      activeEffectConfig();
      editablePicture.classList.add('effects__preview--heat');

      levelSlider.noUiSlider.on('update', () => {
        editablePicture.style.filter = `brightness(${levelValue.value})`;
      });
    }
  }
};

const effects = [Effect.none, Effect.chrome, Effect.sepia, Effect.marvin, Effect.phobos, Effect.heat];
const effectsFunctions = [ApplyEffect.none, ApplyEffect.chrome, ApplyEffect.sepia, ApplyEffect.marvin, ApplyEffect.phobos, ApplyEffect.heat];

const addListenerEffects = function () {
  for (let i = 0; i < effectsFunctions.length; i++) {
    effects[i].addEventListener('change', effectsFunctions[i]);
  }
};

const removeListenerEffects = function () {
  for (let i = 0; i < effectsFunctions.length; i++) {
    effects[i].removeEventListener('change', effectsFunctions[i]);
  }
};

export { zoomInitial, addListenerScalesControl, removeListenerScalesControl, initLevelSlider, addListenerEffects, removeListenerEffects};
