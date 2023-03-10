import {generatedPhotoGallery} from './rendering-pictures.js';

const bigPicture = document.querySelector('.big-picture');

const photos = document.querySelectorAll('.picture');
const commentsList = document.querySelector('.social__comments');
const comment = document.querySelector('.social__comment');
// Для следующего дз
const commentCount = document.querySelector('.social__comment-count');
const commentLoader = document.querySelector('.comments-loader');


const buttonClose = bigPicture.querySelector('#picture-cancel');

const onModalEscKeydown = function (evt) {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    document.body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
  }
};

const openModal = function () {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  document.addEventListener('keydown', onModalEscKeydown);
  // Для следующего дз
  commentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
};

const closeModal = function () {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onModalEscKeydown);
};

// const renderingComments = function () {
//   const comments = document.querySelectorAll('.social__comment');
//   for (let i = 0; i <= comments.length; i++) {
//     if (i > 4) {
//       comments[i].classList.add('hidden');
//       commentLoader.classList.remove('hidden');
//     }

//     let hiddenComments = document.querySelector('.social__comments').querySelectorAll('.hidden');

//     commentLoader.addEventListener('click', () => {
//       for (let j = 0; j < 5; j++) {
//         hiddenComments[j].classList.remove('hidden');
//       }
//       hiddenComments = document.querySelector('.social__comments').querySelectorAll('.hidden');
//     });
//   }
// };

const renderingBigPicture = function (i) {
  const {url, likes, comments, description} = generatedPhotoGallery[i];
  document.querySelector('.big-picture__img').getElementsByTagName('img')[0].src = url;
  document.querySelector('.likes-count').textContent = likes;
  document.querySelector('.comments-count').textContent = comments.length;
  document.querySelector('.social__caption').textContent = description;

  const createComments = comments;

  commentsList.innerHTML = '';
  createComments.forEach(({avatar, name, message}) => {
    const commentElement = comment.cloneNode(true);
    commentElement.getElementsByTagName('img')[0].src = avatar;
    commentElement.getElementsByTagName('img')[0].alt = name;
    commentElement.getElementsByTagName('p')[0].textContent = message;
    commentsList.appendChild(commentElement);
  });
};

photos.forEach((photo, i) => {
  photo.addEventListener('click', () => {
    renderingBigPicture(i);
    // commentLoader.classList.add('hidden');
    openModal();
    // renderingComments();
  });
});

buttonClose.addEventListener('click', () => {
  closeModal();
});
