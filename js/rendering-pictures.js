import {generatePhotoGallery} from './generate-photo-gallery/generate-photo-gallery.js';

const pictureGallery = document.querySelector('.pictures');
const newPicture = document.querySelector('#picture').content.querySelector('.picture');
const createPicture = generatePhotoGallery(25);

const createGalleyFragment = document.createDocumentFragment();

createPicture.forEach(({url, comments, likes }) => {
  const pictureElement = newPicture.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureGallery.appendChild(pictureElement);
});

pictureGallery.appendChild(createGalleyFragment);
