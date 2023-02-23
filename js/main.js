const COMMENTS_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const COMMENTS_NAME = [
  'Егор',
  'Тимофей',
  'Виктория',
  'Марина',
  'Арсений',
  'Григорий',
  'Алексей',
  'Ева',
  'Захар',
  'Илья',
  'Ксения',
  'Дмитрий',
  'Леонид',
  'Георгий',
  'Алисия',
  'Никита',
  'Игорь',
  'Иван',
  'Таисия',
  'София',
  'Сергей',
  'Роман',
  'Лев',
  'Юлия',
  'Артём',
];

const DESCRIPTION_OBJECT = [
  'Момент сохранен в этом фото',
  'Фотография-это способ отразить мысли',
  'В этом фото каждый может увидеть свой смысл',
  'Фотографировать это искусство, но каждый ли может',
  'Сохраняйте воспоминания, запечатляя их',
  'Я очень много сил вложил в это фото',
  'Я начинающий фотограф, оцените мое первое фото',
];

const SIMULAR_OBJECT_COUNT = 25;

// Создает случайное число в промежутке
const createRandomNumber = function (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

// Генерирует неповторяющиеся числа в промежутке
const createRandomNumberGenerator = function (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = createRandomNumber(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = createRandomNumber(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};


const generateIdComments = createRandomNumberGenerator(1, 999);
const generateIdObject = createRandomNumberGenerator(1, 25);
const generateUrl = createRandomNumberGenerator(1, 25);

const getRandomArrayElement = function (elements) {
  return elements[createRandomNumber(0, elements.length - 1)];
};

const createComments = function () {
  return {
    id: generateIdComments(),
    avatar: `img/avatar-${createRandomNumber(1, 6)}.jpg`,
    message: getRandomArrayElement(COMMENTS_MESSAGE),
    name: getRandomArrayElement(COMMENTS_NAME)
  };
};

const createObject = function () {
  const simularComments = JSON.stringify(Array.from({length: createRandomNumber(1, 5)}, createComments));
  return {
    id: generateIdObject(),
    url: `photos/${generateUrl()}.jpg`,
    description: getRandomArrayElement(DESCRIPTION_OBJECT),
    likes: createRandomNumber(15, 200),
    comments: simularComments
  };
};

const simularObject = Array.from({length: SIMULAR_OBJECT_COUNT}, createObject);
// eslint-disable-next-line no-console
console.log(simularObject); // Проверка
