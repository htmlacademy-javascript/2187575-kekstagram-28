import { getPhotoData } from './api.js';

const getPhotoGalleryList = function () {
  return getPhotoData()
    .then((photos) => photos);
};

const dataPhotoGallery = await getPhotoGalleryList();

export { dataPhotoGallery };
