import { form, hashtag, description, buttonSubmit } from './global-constants.js';

let pristine = null;

const pristineConfig = function () {
  const pristineOptions = {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'has-danger',
    successClass: 'has-success',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'text-help'
  };

  pristine = new Pristine(form, pristineOptions);

  const getHashtags = function () {
    return hashtag.value.toLowerCase().split(' ').filter((hashtagElement) => hashtagElement);
  };

  const isValidHashtagsQuantity = function () {
    const MAX_COUNT_HASHTAG = 5;
    return getHashtags().length <= MAX_COUNT_HASHTAG;
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
    const MAX_LENGTH_DESCRIPTION = 140;
    return description.value.length <= MAX_LENGTH_DESCRIPTION;
  };

  pristine.addValidator(hashtag, isValidHashtagsQuantity, 'Не более 5 Хэштегов');
  pristine.addValidator(hashtag, isValidHashtagDuplicate, 'Хэштег повторяется');
  pristine.addValidator(hashtag, isValidHashtagSymbol, 'Хэштег содержит больше 20 символов, имеет недопустимые символы или отсуствует "#"');
  pristine.addValidator(description, isValidLengthDescription, 'Максимальная длинна комментария 140 символов');

  const checkForm = function () {
    buttonSubmit.disabled = isValidHashtagsQuantity() === false
    || isValidHashtagDuplicate() === false
    || isValidHashtagSymbol() === false
    || isValidLengthDescription() === false;
  };
  hashtag.addEventListener('input', checkForm);
  description.addEventListener('input', checkForm);
};

export { pristine, pristineConfig };
