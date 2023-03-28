import { dataPhotoGallery } from './get-photo-gallery-list.js';
import { renderPhoto } from './rendering-pictures.js';
import { debounce } from './utils.js';

const RENDER_DELAY = 500;

const filtersForm = document.querySelector('.img-filters__form');
const filters = filtersForm.querySelectorAll('.img-filters__button');
const filterDefault = filtersForm.querySelector('#filter-default');
const filterRandom = filtersForm.querySelector('#filter-random');
const filterDiscussed = filtersForm.querySelector('#filter-discussed');

const sortRandom = function () {
  return dataPhotoGallery.slice().sort(() => 0.5 - Math.random()).slice(0, 10);
};

const sortDiscussed = function () {
  return dataPhotoGallery.slice().sort((a, b) => parseFloat(b.comments.length) - parseFloat(a.comments.length));
};

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    filtersForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    filter.classList.add('img-filters__button--active');
  });
});

const getHandlerFilter = (type = 'default') => {
  let sorted;

  return debounce(() => {
    if (type === 'random') {
      sorted = sortRandom(dataPhotoGallery);
    } else if (type === 'discussed') {
      sorted = sortDiscussed(dataPhotoGallery);
    } else {
      sorted = dataPhotoGallery;
    }

    renderPhoto(sorted);
  }, RENDER_DELAY);
};

filterRandom.addEventListener('click', getHandlerFilter('random'));
filterDiscussed.addEventListener('click', getHandlerFilter('discussed'));
filterDefault.addEventListener('click', getHandlerFilter());
