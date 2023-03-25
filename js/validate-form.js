import { buttonSubmit } from './global-constant.js';
import { pristine } from './pristine-config.js';
import { showAlert, onSuccess } from './util.js';
import { closeModal } from './user-form.js';
import { sendPhotoData } from './api.js';

const blockSubmitButton = function () {
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = 'ОБРАБАТЫВАЮ...';
};

const unblockSubmitButton = function () {
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = 'ОПУБЛИКОВАТЬ';
};

const validateForm = function (evt) {
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

export { validateForm };

