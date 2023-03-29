import { getRandomNumber, getRandomUniqueNumber } from '../utils.js';
import { commentMessages, commentNames, photoDescription } from './data.js';

const generatePhotoGallery = function (count) {
  const generateUrl = getRandomUniqueNumber(1, 25);
  const generateIdComments = getRandomUniqueNumber(1, 999);

  const generatePhoto = function (id) {
    return {
      id,
      url: `photos/${generateUrl()}.jpg`,
      description: photoDescription[getRandomNumber(0, photoDescription.length - 1)],
      likes: getRandomNumber(15, 200),
      comments: []
    };
  };

  const generateComment = function () {
    return {
      id: generateIdComments(),
      avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
      message: commentMessages[getRandomNumber(0, commentMessages.length - 1)],
      name: commentNames[getRandomNumber(0, commentNames.length - 1)]
    };
  };

  const photos = [];
  const MIN_COMMENTS_QUANTITY = 12;
  const MAX_COMMENTS_QUANTITY = 20;

  for (let i = 1; i <= count; i++) {
    const photo = generatePhoto(i);

    for (let j = 1; j <= getRandomNumber(MIN_COMMENTS_QUANTITY, MAX_COMMENTS_QUANTITY); j++) {
      photo.comments.push(generateComment(j));
    }
    photos.push(photo);
  }

  return photos;
};

export {generatePhotoGallery};
