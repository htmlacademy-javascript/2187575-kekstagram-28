import { getPhotoData } from './api.js';
import { getShowAlert } from './utils.js';

const getPhotoGalleryList = function () {
  return getPhotoData()
    .then((photos) => photos)
    .catch(() => {
      getShowAlert();
    });
};

const dataPhotoGallery = await getPhotoGalleryList();

export { dataPhotoGallery };
