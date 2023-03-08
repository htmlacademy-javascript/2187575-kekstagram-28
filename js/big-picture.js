import {isEscapeKey} from './util.js';
import {generatedPhotoGallery} from './rendering-pictures.js';

const bigPicture = document.querySelector('.big-picture');

const photo = document.querySelectorAll('.picture');
const commentsList = document.querySelector('.social__comments');
const comment = document.querySelector('.social__comment');
// Для следующего дз
const commentCount = document.querySelector('.social__comment-count');
const commentLoader = document.querySelector('.comments-loader');

const buttonClose = bigPicture.querySelector('#picture-cancel');

const onModalEscKeydown = function (evt) {
  if(isEscapeKey(evt)) {
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

for (let i = 0; i < photo.length; i++) {
  photo[i].addEventListener('click', () => {
    openModal();
    document.querySelector('.big-picture__img').getElementsByTagName('img')[0].src = generatedPhotoGallery[i].url;
    document.querySelector('.likes-count').textContent = generatedPhotoGallery[i].likes;
    document.querySelector('.comments-count').textContent = generatedPhotoGallery[i].comments.length;
    document.querySelector('.social__caption').textContent = generatedPhotoGallery[i].description;

    const createComments = generatedPhotoGallery[i].comments;

    commentsList.innerHTML = '';
    createComments.forEach(({avatar, name, message}) => {
      const commentElement = comment.cloneNode(true);
      commentElement.getElementsByTagName('img')[0].src = avatar;
      commentElement.getElementsByTagName('img')[0].alt = name;
      commentElement.getElementsByTagName('p')[0].textContent = message;
      commentsList.appendChild(commentElement);
    });
  });
}

buttonClose.addEventListener('click', () => {
  closeModal();
});
