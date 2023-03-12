import {generatedPhotoGallery} from './rendering-pictures.js';

const bigPicture = document.querySelector('.big-picture');

const photos = document.querySelectorAll('.picture');
const commentsList = document.querySelector('.social__comments');
const comment = document.querySelector('.social__comment');
// Для следующего дз
const commentCount = document.querySelector('.social__comment-count');
const commentLoader = document.querySelector('.comments-loader');

const totalComment = document.querySelector('.comments-count'); // Типо общее кол-во комментов

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
};

const closeModal = function () {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onModalEscKeydown);
};

const renderingComments = function () {
  commentLoader.classList.add('hidden');
  commentCount.textContent = `${5} из ${totalComment.textContent} комментариев`; // Вот тут вопросики

  const comments = document.querySelectorAll('.social__comment');

  comments.forEach((commentElement, i) => {
    if (i > 4) {
      commentElement.classList.add('hidden');
      commentLoader.classList.remove('hidden');
    }
    // Вот тут вопросики

    // ____________________________
  });

  // let hiddenComments = commentsList.querySelectorAll('.hidden'); // ВТОРОЙ ВАРИАНТ
  commentLoader.addEventListener('click', () => {

    const hiddenComments = commentsList.querySelectorAll('.hidden'); // НЕДОДЕЛАННЫЙ ВАРИАНТ
    for (let j = 0; j < 5; j++) {

      hiddenComments[j].classList.remove('hidden');

      if (hiddenComments.length < 5) {
        commentCount.textContent = `${comments.length} из ${totalComment.textContent} комментариев`; // ВТОРОЙ ВАРИАНТ
      } else {
        commentCount.textContent = `${comments.length - hiddenComments.length} из ${totalComment.textContent} комментариев`; // ВТОРОЙ ВАРИАНТ
      }
    }
    // hiddenComments = commentsList.querySelectorAll('.hidden'); // ВТОРОЙ ВАРИАНТ
    // console.log(hiddenComments);
    commentCount.textContent = `${comments.length - hiddenComments.length} из ${totalComment.textContent} комментариев`;
  });
};

const renderingBigPicture = function (i) {
  const {url, likes, comments, description} = generatedPhotoGallery[i];
  document.querySelector('.big-picture__img').getElementsByTagName('img')[0].src = url;
  document.querySelector('.likes-count').textContent = likes;
  totalComment.textContent = comments.length;
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
    openModal();
    renderingComments();
  });
});

buttonClose.addEventListener('click', () => {
  closeModal();
});
