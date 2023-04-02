const form = document.querySelector('.img-upload__form');
const hashtag = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');
const editablePictureContainer = document.querySelector('.img-upload__preview');
const editablePicture = editablePictureContainer.querySelector('img');

const buttonSubmit = document.querySelector('.img-upload__submit');

export { form, hashtag, description, buttonSubmit, editablePicture };
