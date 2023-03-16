const form = document.querySelector('.img-upload__form');
const modal = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const buttonClose = form.querySelector('#upload-cancel');
const hashtag = form.querySelector('.text__hashtags');

const onModalEscKeydown = function (evt) {
  if (document.activeElement !== form.querySelector('.text__description') && document.activeElement !== hashtag) {
    if(evt.key === 'Escape') {
      evt.preventDefault();
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
  document.removeEventListener('keydown', onModalEscKeydown);
};

// document.addEventListener('mousedown', (evt) => {
//   if (evt.button === 0) {
//     const hashtags = hashtag.value.toLowerCase().split(' ').filter((hashtagElement) => hashtagElement);

//     // Вставляем функцию ниже

//     console.log(/*Передаем функцию()*/);
//   }
// });


// const validateHashtag = function () {
//   const hashtags = hashtag.value.toLowerCase().split('  ');

//   const valisdateDuplicate = function () {
//     const duplicateHashtags = hashtags => hashtags.filter((item, index) => hashtags.indexOf(item) !== index);
//     return duplicateHashtags(hashtags).length === 0;
//   };

//   const validateCountHashtags = function () {
//     return hashtags.length <= 5;
//   };

//   const validateSymbol = function () {
//     const result = [];
//     for (let i = 0; i < hashtags.length; i++) {
//       const rulesHashtag = /^#[a-zа-яё0-9]{1,19}$|^$/.test(hashtags[i]);
//       result.push(rulesHashtag);
//     }

//     const checker = result => result.every(v => v === true);
//     return checker(result);
//   };
// };


const openForm = function () {
  const pristine = new Pristine(form);
  const hashtags = hashtag.value.toLowerCase().split('  ').filter((hashtagElement) => hashtagElement);

  const validateCountHashtags = function () {
    return hashtags.length <= 5;
  };

  const valisdateDuplicate = function () {
    const duplicateHashtags = () => hashtags.filter((item, index) => hashtags.indexOf(item) !== index);
    return duplicateHashtags(hashtags).length === 0;
  };

  const validateSymbol = function () {
    const result = [];
    for (let i = 0; i < hashtags.length; i++) {
      const rulesHashtag = /^#[a-zа-яё0-9]{1,19}$/.test(hashtags[i]);
      result.push(rulesHashtag);
    }
    const checker = () => result.every((v) => v === true);
    return checker(result);
  };

  pristine.addValidator(hashtag, validateCountHashtags, 'Не более 5 Хэштегов');
  pristine.addValidator(hashtag, valisdateDuplicate, 'Хэштег повторяется');
  pristine.addValidator(hashtag, validateSymbol, 'Хэштег содержит больше 20 символов, имеет недопустимые символы или отсуствует "#"');

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      // eslint-disable-next-line no-console
      console.log('Отправляем'); // Отключено для тестов и сдачи 1-ого дз
    } else {
      // eslint-disable-next-line no-console
      console.log('Не отправляем'); // Отключено для тестов и сдачи 1-ого дз
    }
  });
};

uploadFile.addEventListener('change', () => {
  openModal();
  openForm();
});

buttonClose.addEventListener('click', () => {
  closeModal();
});


// Надо ли?

// document.addEventListener('mousedown', (evt) => {
//   if (evt.button === 0) {
//     const hashtags = hashtag.value.toLowerCase().split(' ');

//     const validateSymbol = function () {
//       for (let i = 0; i < hashtags.length; i++) {
//         // console.log(hashtags[i]);
//         const rulesHashtag = /^#[a-zа-яё0-9]{1,19}$/.test(hashtags[i]);
//         // console.log(rulesHashtag);
//         return rulesHashtag;
//       }
//     };
//     console.log(validateSymbol());
//   }
// });


// const validateHashtag = function () {
//   const hashtags = hashtag.value.toLowerCase().split('  ');

//   const valisdateDuplicate = function () {
//     const duplicateHashtags = hashtags => hashtags.filter((item, index) => hashtags.indexOf(item) !== index);
//     return duplicateHashtags(hashtags).length === 0;
//   };

//   const validateCountHashtags = function () {
//     return hashtags.length <= 5;
//   };

//   const validateSymbol = function () {
//     hashtags.forEach(hashtag, i) {
//       return ha
//     }
//   };
// };
