const form = document.querySelector('.img-upload__form');
const modal = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const buttonClose = form.querySelector('#upload-cancel');
const hashtag = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');

const onModalEscKeydown = function (evt) {
  if (evt.key === 'Escape' && document.activeElement !== description && document.activeElement !== hashtag) {
    evt.preventDefault();
    uploadFile.value = '';
    document.body.classList.remove('modal-open');
    modal.classList.add('hidden');
  }
};

const openModal = function () {
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscKeydown);
};

const closeModal = function () {
  document.body.classList.remove('modal-open');
  modal.classList.add('hidden');
  uploadFile.value = '';
  hashtag.value = ''; // Очистка хештегов
  description.value = ''; // Очистка хештегов комментариев
  document.removeEventListener('keydown', onModalEscKeydown);
};

const openForm = function () {
  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'has-danger',
    successClass: 'has-success',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'text-help'
  });

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

  pristine.addValidator(hashtag, isValidHashtagsQuantity, 'Не более 5 Хэштегов');
  pristine.addValidator(hashtag, isValidHashtagDuplicate, 'Хэштег повторяется');
  pristine.addValidator(hashtag, isValidHashtagSymbol, 'Хэштег содержит больше 20 символов, имеет недопустимые символы или отсуствует "#"');

  const checkForm = function () {
    if (isValidHashtagsQuantity() === false || isValidHashtagDuplicate() === false || isValidHashtagSymbol() === false) {
      document.querySelector('.img-upload__submit').disabled = true;
    } else {
      document.querySelector('.img-upload__submit').disabled = false;
    }
  };
  hashtag.addEventListener('input', checkForm);

  const validForm = function (evt) {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      // eslint-disable-next-line no-console
      console.log('Отправляем'); // Отключено для тестов и сдачи 1-ого дз
      form.removeEventListener('submit', validForm);
      hashtag.removeEventListener('input', checkForm);
      closeModal();
    }
  };
  form.addEventListener('submit', validForm);
};

uploadFile.addEventListener('change', () => {
  openModal();
  openForm();
});

buttonClose.addEventListener('click', () => {
  closeModal();
});
