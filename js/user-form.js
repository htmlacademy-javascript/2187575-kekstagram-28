import { form, hashtag, description, uploadFile, modal } from './global-constant.js';
import { ZOOM_INITIAL, ADD_LISTENER_SCALES_CONTROL, REMOVE_LISTENER_SCALES_CONTROL, INIT_LEVEL_SLIDER, ADD_LISTENER_EFFECTS, REMOVE_LISTENER_EFFECTS } from './editing-picture.js';
import { removeListenerModal, addListenerModal } from './form-listener-submit.js';
const buttonClose = form.querySelector('#upload-cancel');

const cleanForm = function () {
  uploadFile.value = '';
  hashtag.value = '';
  description.value = '';
};

const onFormKeydown = function (evt) {
  if (evt.key === 'Escape' && document.activeElement !== description && document.activeElement !== hashtag && !document.contains(document.querySelector('.error')) && !document.contains(document.querySelector('.success'))) {
    evt.preventDefault();
    document.body.classList.remove('modal-open');
    modal.classList.add('hidden');
    document.addEventListener('keydown', onFormKeydown);
    removeListenerModal();
    cleanForm();

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
  addListenerModal();

  ADD_LISTENER_SCALES_CONTROL();
  ADD_LISTENER_EFFECTS();

  ZOOM_INITIAL();
  INIT_LEVEL_SLIDER();
};

const closeModal = function () {
  document.body.classList.remove('modal-open');
  modal.classList.add('hidden');
  cleanForm();
  document.removeEventListener('keydown', onFormKeydown);
  removeListenerModal();

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

export { closeModal };
