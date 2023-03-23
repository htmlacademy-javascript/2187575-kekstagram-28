import {showAlert, onSuccess} from './util.js';
import {closeModal} from './user-form.js';

const form = document.querySelector('.img-upload__form');
const hashtag = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');

const pristineOptions = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'has-danger',
  successClass: 'has-success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text-help'
};

const pristine = new Pristine(form, pristineOptions);

const getHashtags = function () {
  return hashtag.value.toLowerCase().split(' ').filter((hashtagElement) => hashtagElement);
};

const isValidHashtagsQuantity = function () {
  return getHashtags().length <= 5;
};

const isValidHashtagDuplicate = function () {
  return getHashtags().filter((item, index) => getHashtags().indexOf(item) !== index).length === 0;
};

const isValidHashtagSymbol = function () {
  const result = [];
  for (let i = 0; i < getHashtags().length; i++) {
    result.push(/^#[a-zа-яё0-9]{1,19}$/.test(getHashtags()[i]));
  }

  return result.every((v) => v === true);
};

const isValidLengthDescription = function () {
  const maxLengthDescription = 140;
  return description.value.length <= maxLengthDescription;
};

pristine.addValidator(hashtag, isValidHashtagsQuantity, 'Не более 5 Хэштегов');
pristine.addValidator(hashtag, isValidHashtagDuplicate, 'Хэштег повторяется');
pristine.addValidator(hashtag, isValidHashtagSymbol, 'Хэштег содержит больше 20 символов, имеет недопустимые символы или отсуствует "#"');
pristine.addValidator(description, isValidLengthDescription, 'Максимальная длинна комментария 140 символов');

const checkForm = function () {
  document.querySelector('.img-upload__submit').disabled = isValidHashtagsQuantity() === false || isValidHashtagDuplicate() === false || isValidHashtagSymbol() === false || isValidLengthDescription() === false;
};
hashtag.addEventListener('input', checkForm);
description.addEventListener('input', checkForm);

const blockSubmitButton = function () {
  document.querySelector('.img-upload__submit').disabled = true;
  document.querySelector('.img-upload__submit').textContent = 'ОБРАБАТЫВАЮ...';
};

const unblockSubmitButton = function () {
  document.querySelector('.img-upload__submit').disabled = false;
  document.querySelector('.img-upload__submit').textContent = 'ОПУБЛИКОВАТЬ';
};

const validateForm = function (evt) {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    const formData = new FormData (evt.target);
    fetch ('https://28.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body: formData
      },
    )
      .then((responce) => {
        if (responce.ok) {
          onSuccess();
          closeModal();
        } else {
          showAlert();
        }
      })
      .catch(() => {
        showAlert();
      })
      .finally(unblockSubmitButton);
  }
};

export {validateForm};

