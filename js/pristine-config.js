import { form, hashtag, description, buttonSubmit } from './global-constant.js';

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
  const maxCountHashtag = 5;
  return getHashtags().length <= maxCountHashtag;
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
  buttonSubmit.disabled = isValidHashtagsQuantity() === false || isValidHashtagDuplicate() === false || isValidHashtagSymbol() === false || isValidLengthDescription() === false;
};
hashtag.addEventListener('input', checkForm);
description.addEventListener('input', checkForm);

export { pristine };
