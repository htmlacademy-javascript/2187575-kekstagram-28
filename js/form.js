const form = document.querySelector('.img-upload__form');
const modal = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const buttonClose = form.querySelector('#upload-cancel');
const hashtag = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');

const onModalEscKeydown = function (evt) {
  if (document.activeElement !== description && document.activeElement !== hashtag) {
    if(evt.key === 'Escape') {
      evt.preventDefault();
      uploadFile.value = '';
      document.body.classList.remove('modal-open');
      modal.classList.add('hidden');
    }
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
  const pristine = new Pristine(form);

  const getHashtags = function () {
    return hashtag.value.toLowerCase().split(' ').filter((hashtagElement) => hashtagElement);
  };

  const validateCountHashtags = function () {
    return getHashtags().length <= 5;
  };

  const valisdateDuplicate = function () {
    const duplicateHashtags = () => getHashtags().filter((item, index) => getHashtags().indexOf(item) !== index);
    return duplicateHashtags(getHashtags()).length === 0;
  };

  const validateSymbol = function () {
    const result = [];
    for (let i = 0; i < getHashtags().length; i++) {
      const rulesHashtag = /^#[a-zа-яё0-9]{1,19}$/.test(getHashtags()[i]);
      result.push(rulesHashtag);
    }
    const checker = () => result.every((v) => v === true);
    return checker(result);
  };

  pristine.addValidator(hashtag, validateCountHashtags, 'Не более 5 Хэштегов');
  pristine.addValidator(hashtag, valisdateDuplicate, 'Хэштег повторяется');
  pristine.addValidator(hashtag, validateSymbol, 'Хэштег содержит больше 20 символов, имеет недопустимые символы или отсуствует "#"');

  const validForm = function (evt) {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      // eslint-disable-next-line no-console
      console.log('Отправляем'); // Отключено для тестов и сдачи 1-ого дз
      form.removeEventListener('submit', validForm);
      closeModal();
    } else {
      // eslint-disable-next-line no-console
      console.log('Не отправляем'); // Отключено для тестов и сдачи 1-ого дз
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
