const getPhotoGalleryList = function () {
  return fetch('https://28.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => photos);
};

const dataPhotoGallery = await getPhotoGalleryList();

export {dataPhotoGallery};
