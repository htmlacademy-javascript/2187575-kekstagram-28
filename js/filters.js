import { dataPhotoGallery} from './get-photo-gallery-list.js';
import { renderPhoto } from './rendering-pictures.js';
import { debounce } from './utils.js';

const RENDER_DELAY = 500;

const filtersForm = document.querySelector('.img-filters__form');
const filters = filtersForm.querySelectorAll('.img-filters__button');
const filterDefault = filtersForm.querySelector('#filter-default');
const filterRandom = filtersForm.querySelector('#filter-random');
const filterDiscussed = filtersForm.querySelector('#filter-discussed');

const getDefaultPhotos = function () {
  return dataPhotoGallery.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
};

const getRandomPhotos = function () {
  return dataPhotoGallery.sort(() => 0.5 - Math.random()).slice(0, 10);
};

const getDiscussedPhotos = function () {
  return dataPhotoGallery.sort((a, b) => parseFloat(b.comments.length) - parseFloat(a.comments.length));
};

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    filtersForm.querySelector('.img-filters__button--active').disabled = false;
    filtersForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    filter.classList.add('img-filters__button--active');
    filtersForm.querySelector('.img-filters__button--active').disabled = true;
  });
});

const getSortedPhotos = function (type) {
  let sorted;

  return debounce(() => {
    switch (type) {
      case 'random':
        sorted = getRandomPhotos(dataPhotoGallery);
        break;
      case 'discussed':
        sorted = getDiscussedPhotos(dataPhotoGallery);
        break;
      default:
        sorted = getDefaultPhotos(dataPhotoGallery);
        break;
    }

    renderPhoto(sorted);
  }, RENDER_DELAY);
};

filterRandom.addEventListener('click', getSortedPhotos('random'));
filterDiscussed.addEventListener('click', getSortedPhotos('discussed'));
filterDefault.addEventListener('click', getSortedPhotos('default'));
