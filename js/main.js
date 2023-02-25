const generatePhotoGallery = function (count) {
  const commentMessages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  ];

  const commentNames = ['Егор', 'Виктория', 'Марина', 'Алексей', 'Ева', 'Ксения', 'Дмитрий', 'Леонид', 'Георгий', 'Алисия', 'Никита', 'Игорь', 'Таисия', 'София', 'Сергей', 'Роман', 'Лев', 'Юлия', 'Артём'];

  const photoDescription = [
    'Момент сохранен в этом фото',
    'Фотография-это способ отразить мысли',
    'В этом фото каждый может увидеть свой смысл',
    'Фотографировать это искусство, но каждый ли может',
    'Сохраняйте воспоминания, запечатляя их',
    'Я очень много сил вложил в это фото',
    'Я начинающий фотограф, оцените мое первое фото',
  ];

  const getRandomNumber = function (min, max) {
    const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
    const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
    const result = Math.random() * (upper - lower + 1) + lower;
    return Math.floor(result);
  };

  const getRandomUniqueNumber = function (min, max) {
    const previousValues = [];

    return function () {
      let currentValue = getRandomNumber(min, max);
      while (previousValues.includes(currentValue)) {
        currentValue = getRandomNumber(min, max);
      }
      previousValues.push(currentValue);
      return currentValue;
    };
  };

  const generateIdComments = getRandomUniqueNumber(1, 999);
  const generateIdObject = getRandomUniqueNumber(1, 25);
  const generateUrl = getRandomUniqueNumber(1, 25);

  // Цикл создания фотографии
  const createPhoto = [];
  for (let i = 1; i <= count; i++) {
    // Цикл создания комментариев
    const createComments = [];
    for (let j = 1; j <= getRandomNumber(1, 5); j++) {
      createComments.push({
        'id': generateIdComments(),
        'avatar': `img/avatar-${getRandomNumber(1, 6)}.svg`,
        'message': commentMessages[getRandomNumber(0, commentMessages.length - 1)],
        'name': commentNames[getRandomNumber(0, commentNames.length - 1)]
      });
    }

    createPhoto.push({
      'id': generateIdObject(),
      'url':`photos/${generateUrl()}.jpg`,
      'description': photoDescription[getRandomNumber(0, photoDescription.length - 1)],
      'likes': getRandomNumber(15, 200),
      'comments': JSON.stringify(createComments)
    });
  }
  return createPhoto;
};

// eslint-disable-next-line no-console
console.log(generatePhotoGallery(25));

