import { editablePicture } from './global-constants.js';

const scaleValue = document.querySelector('.scale__control--value');
const scale = {
  smaller: document.querySelector('.scale__control--smaller'),
  bigger: document.querySelector('.scale__control--bigger'),
};

const ZoomSettings = {
  INITIAL_VALUE: 100,
  MIN_VALUE: 25,
  MAX_VALUE: 100,
  STEP_ZOOM: 25,
};

const levelSliderContainer = document.querySelector('.img-upload__effect-level');
const levelSlider = document.querySelector('.effect-level__slider');
const levelValue = document.querySelector('.effect-level__value');

const effect = {
  none: document.getElementById('effect-none'),
  chrome: document.getElementById('effect-chrome'),
  sepia: document.getElementById('effect-sepia'),
  marvin: document.getElementById('effect-marvin'),
  phobos: document.getElementById('effect-phobos'),
  heat: document.getElementById('effect-heat'),
};

const zoomInitial = function () {
  ZoomSettings.INITIAL_VALUE = 100;
  scaleValue.value = `${ZoomSettings.INITIAL_VALUE}%`;
  editablePicture.style.transform = '';
};

const zoom = {
  smaller: function () {
    if (ZoomSettings.INITIAL_VALUE > ZoomSettings.MIN_VALUE) {
      scaleValue.value = `${ZoomSettings.INITIAL_VALUE -= ZoomSettings.STEP_ZOOM}%`;
      editablePicture.style.transform = `scale(${ZoomSettings.INITIAL_VALUE / 100})`;
    }
  },

  bigger: function () {
    if (ZoomSettings.INITIAL_VALUE < ZoomSettings.MAX_VALUE) {
      scaleValue.value = `${ZoomSettings.INITIAL_VALUE += ZoomSettings.STEP_ZOOM}%`;
      editablePicture.style.transform = `scale(${ZoomSettings.INITIAL_VALUE / 100})`;
    }
  }
};

const scalesControls = [scale.smaller, scale.bigger];
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
  levelSliderContainer.style.display = effect.none.checked ? 'none' : 'block';
  levelSlider.style.display = effect.none.checked ? 'none' : 'block';
  editablePicture.className = '';
};

const initLevelSlider = function () {
  levelSlider.noUiSlider.updateOptions (NO_UI_SLIDER_CONFIG);
  effect.none.checked = true;
  activeEffectConfig();
  editablePicture.style.filter = '';
};

const customizesSlider = function (filter) {
  levelSlider.noUiSlider.on('update', () => {
    switch (filter) {
      case 'chrome':
        editablePicture.style.filter = `grayscale(${levelValue.value})`;
        break;
      case 'sepia':
        editablePicture.style.filter = `sepia(${levelValue.value})`;
        break;
      case 'marvin':
        editablePicture.style.filter = `invert(${levelValue.value}%)`;
        break;
      case 'phobos':
        editablePicture.style.filter = `blur(${levelValue.value}px)`;
        break;
      case 'heat':
        editablePicture.style.filter = `brightness(${levelValue.value})`;
        break;
    }
  });
};

const applyEffect = {
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
      customizesSlider('chrome');
    }
  },

  sepia: function (evt) {
    if (evt.target.checked) {
      levelSlider.noUiSlider.updateOptions (NO_UI_SLIDER_CONFIG);
      activeEffectConfig();
      editablePicture.classList.add('effects__preview--sepia');
      customizesSlider('sepia');
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
      customizesSlider('marvin');
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
      customizesSlider('phobos');
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
      customizesSlider('heat');
    }
  }
};

const effects = [effect.none, effect.chrome, effect.sepia, effect.marvin, effect.phobos, effect.heat];
const effectsFunctions = [applyEffect.none, applyEffect.chrome, applyEffect.sepia, applyEffect.marvin, applyEffect.phobos, applyEffect.heat];

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
