import {dataPhotoGallery} from './api.js';

const photoGallery = document.querySelector('.pictures');
const newPhoto = document.querySelector('#picture').content.querySelector('.picture');

const galleryFragment = document.createDocumentFragment();

dataPhotoGallery.forEach(({url, comments, likes }) => {
  const photoElement = newPhoto.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoElement.querySelector('.picture__likes').textContent = likes;
  galleryFragment.appendChild(photoElement);
});

photoGallery.appendChild(galleryFragment);
