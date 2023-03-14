
const modal = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const buttonClose = document.querySelector('#upload-cancel');

const onModalEscKeydown = function (evt) {
  if(evt.key === 'Escape') {
    evt.preventDefault();
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
  document.removeEventListener('keydown', onModalEscKeydown);
  // uploadFile.value = '';
};

// const openForm = function () {
//   const form = document.querySelector('img-upload__form');
//   const pristine = new Pristine(form);

//   form.addEventListener('submit', (evt) => {
//     evt.preventDefault();

//     const isValid = pristine.validate();
//     if (isValid) {
//       console.log('Отправляем');
//     } else {
//       console.log('Не отправляем');
//     }
//   });
// };

uploadFile.addEventListener('change', () => {
  openModal();
  // openForm();
});

buttonClose.addEventListener('click', () => {
  closeModal();
});
