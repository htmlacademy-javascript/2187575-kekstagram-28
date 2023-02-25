import {getRandomNumber, getRandomUniqueNumber} from '../util.js';
import {commentMessages, commentNames, photoDescription} from './data.js';

const generatePhotoGallery = function (count) {

  const generatePhoto = function (id) {
    return {id,
      url: `photos/${(getRandomUniqueNumber(1, 25))()}.jpg`,
      description: photoDescription[getRandomNumber(0, photoDescription.length - 1)],
      likes: getRandomNumber(15, 200),
      comments: []
    };
  };

  const generateComment = function (id) {
    return {
      id,
      avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
      message: commentMessages[getRandomNumber(0, commentMessages.length - 1)],
      name: commentNames[getRandomNumber(0, commentNames.length - 1)]
    };
  };

  const photos = [];

  for (let i = 1; i <= count; i++) {
    const photo = generatePhoto(i);

    // Цикл создания комментариев
    for (let j = 1; j <= getRandomNumber(1, 5); j++) {
      photo.comments.push(generateComment(j));
    }
    photos.push(photo);
  }

  return photos;
};

// eslint-disable-next-line no-console
console.log(generatePhotoGallery(25));
