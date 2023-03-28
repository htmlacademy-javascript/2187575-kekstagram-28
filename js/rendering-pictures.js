import { dataPhotoGallery } from './get-photo-gallery-list.js';

const photoGallery = document.querySelector('.pictures');

const photoContainer = document.createElement('div');
photoContainer.style.display = 'contents';
photoGallery.appendChild(photoContainer);

const renderPhoto = function (array) {

  const newPhoto = document.querySelector('#picture').content.querySelector('.picture');
  const galleryFragment = document.createDocumentFragment();
  photoContainer.innerHTML = '';

  array.forEach(({url, comments, likes }) => {
    const photoElement = newPhoto.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoElement.querySelector('.picture__likes').textContent = likes;
    galleryFragment.appendChild(photoElement);
  });

  photoContainer.appendChild(galleryFragment);
};

renderPhoto(dataPhotoGallery);

export { renderPhoto };
