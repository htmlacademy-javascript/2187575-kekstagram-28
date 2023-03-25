const PHOTO_URL = 'https://28.javascript.pages.academy/kekstagram';

const fetchData = (url, settings) => (
  fetch(url, settings)
    .then((responce) => {
      if (!responce.ok) {
        throw new Error(`Fetch error -> ${url}`);
      }

      return responce;
    })
    .then((responce) => responce.json())
);

const sendPhotoData = (data) => fetchData(PHOTO_URL, {
  method: 'POST',
  body: data,
});

const getPhotoData = () => fetchData(`${PHOTO_URL}/data`, {
  method: 'GET',
});

getPhotoData()
  .then(() => {
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  });


const getPhotoGalleryList = function () {
  return getPhotoData()
    .then((photos) => photos);
};

const dataPhotoGallery = await getPhotoGalleryList();

export { dataPhotoGallery, sendPhotoData };
