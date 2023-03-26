import { form, buttonSubmit, hashtag, description } from './global-constants.js';
import { ZOOM_INITIAL, ADD_LISTENER_SCALES_CONTROL, REMOVE_LISTENER_SCALES_CONTROL, INIT_LEVEL_SLIDER, ADD_LISTENER_EFFECTS, REMOVE_LISTENER_EFFECTS } from './editing-picture.js';
import { pristine, pristineConfig } from './pristine-config.js';
import { showAlert, onSuccess } from './util.js';
import { sendPhotoData } from './api.js';

const modal = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const buttonClose = form.querySelector('#upload-cancel');
let validateForm = null;

const closeModalConfig = function () {
  document.body.classList.remove('modal-open');
  modal.classList.add('hidden');
  form.removeEventListener('submit', validateForm);
  uploadFile.value = '';
  hashtag.value = '';
  description.value = '';

  if (document.querySelector('.img-upload__field-wrapper').contains(document.querySelector('.pristine-error'))) {
    document.querySelector('.pristine-error').remove();
    document.querySelector('.img-upload__submit').disabled = false;
  }

  REMOVE_LISTENER_SCALES_CONTROL();
  REMOVE_LISTENER_EFFECTS();

  ZOOM_INITIAL();
  INIT_LEVEL_SLIDER();
};

const onFormKeydown = function (evt) {
  if (evt.key === 'Escape' && document.activeElement !== description && document.activeElement !== hashtag && !document.contains(document.querySelector('.error')) && !document.contains(document.querySelector('.success'))) {
    evt.preventDefault();
    document.addEventListener('keydown', onFormKeydown);
    closeModalConfig();
  }
};

const openModal = function () {
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onFormKeydown);
  form.addEventListener('submit', validateForm);
  pristineConfig();

  ADD_LISTENER_SCALES_CONTROL();
  ADD_LISTENER_EFFECTS();

  ZOOM_INITIAL();
  INIT_LEVEL_SLIDER();
};

const closeModal = function () {
  closeModalConfig();
  document.removeEventListener('keydown', onFormKeydown);
};

const blockSubmitButton = function () {
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = 'ОБРАБАТЫВАЮ...';
};

const unblockSubmitButton = function () {
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = 'ОПУБЛИКОВАТЬ';
};

validateForm = function (evt) {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (!isValid) {
    return;
  }
  blockSubmitButton();
  const formData = new FormData (evt.target);
  sendPhotoData(formData)
    .then(() => {
      onSuccess();
      closeModal();
    })
    .catch(() => {
      showAlert();
    })
    .finally(unblockSubmitButton);
};

uploadFile.addEventListener('change', () => {
  openModal();
});

buttonClose.addEventListener('click', () => {
  closeModal();
});
