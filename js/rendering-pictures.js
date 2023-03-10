import {generatePhotoGallery} from './generate-photo-gallery/generate-photo-gallery.js';

const photoGallery = document.querySelector('.pictures');
const newPhoto = document.querySelector('#picture').content.querySelector('.picture');
const generatedPhotoGallery = generatePhotoGallery(25);

const galleryFragment = document.createDocumentFragment();

generatedPhotoGallery.forEach(({url, comments, likes }) => {
  const photoElement = newPhoto.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoElement.querySelector('.picture__likes').textContent = likes;
  galleryFragment.appendChild(photoElement);
});

photoGallery.appendChild(galleryFragment);

export {generatedPhotoGallery};
