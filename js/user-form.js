import {ZOOM_INITIAL, ADD_LISTENER_SCALES_CONTROL, REMOVE_LISTENER_SCALES_CONTROL, INIT_LEVEL_SLIDER, ADD_LISTENER_EFFECTS, REMOVE_LISTENER_EFFECTS} from './editing-picture.js';
import { validateForm } from './validate-form.js';

const form = document.querySelector('.img-upload__form');
const hashtag = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');
const modal = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const buttonClose = form.querySelector('#upload-cancel');

const onFormKeydown = function (evt) {
  if (evt.key === 'Escape' && document.activeElement !== description && document.activeElement !== hashtag && !document.contains(document.querySelector('.error')) && !document.contains(document.querySelector('.success'))) {
    evt.preventDefault();
    document.body.classList.remove('modal-open');
    modal.classList.add('hidden');
    document.addEventListener('keydown', onFormKeydown);
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
  }
};

const openModal = function () {
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onFormKeydown);
  form.addEventListener('submit', validateForm);

  ADD_LISTENER_SCALES_CONTROL();
  ADD_LISTENER_EFFECTS();

  ZOOM_INITIAL();
  INIT_LEVEL_SLIDER();
};

const closeModal = function () {
  document.body.classList.remove('modal-open');
  modal.classList.add('hidden');
  uploadFile.value = '';
  hashtag.value = '';
  description.value = '';
  document.removeEventListener('keydown', onFormKeydown);
  form.removeEventListener('submit', validateForm);

  if (document.querySelector('.img-upload__field-wrapper').contains(document.querySelector('.pristine-error'))) {
    document.querySelector('.pristine-error').remove();
    document.querySelector('.img-upload__submit').disabled = false;
  }

  REMOVE_LISTENER_SCALES_CONTROL();
  REMOVE_LISTENER_EFFECTS();

  ZOOM_INITIAL();
  INIT_LEVEL_SLIDER();
};


uploadFile.addEventListener('change', () => {
  openModal();
});

buttonClose.addEventListener('click', () => {
  closeModal();
});

export {closeModal};
