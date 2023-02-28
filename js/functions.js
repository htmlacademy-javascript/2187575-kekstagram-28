const isValidLength = function (string, symbolAmount) {
  if (isNaN(string) || Number(symbolAmount)) {
    return (symbolAmount >= string.length);
  }
  return 'Неверные данные';
};

isValidLength('текст', 5);

const isPalindrome = function (string) {
  string = string.toLowerCase().replaceAll(' ', ''); // Убирает пробелы и переводит текст в нижний регистр.
  const lastIndex = string.length - 1;
  for (let i = 0; i < string.length / 2; i++) {
    return (string[i] === string[lastIndex - i]);
  }
};

isPalindrome('Довод тОпот довод');

const extractionNumber = function (string) {
  if (Number(string)) {
    return `Число ${string}`;
  }
  const number = string.replace(/\D/g, ''); // "\D" - Любой знак (не цифра) заменяется пустой строкой. "g" - Литерал заменяющий все совпадения в строке. '' - Заменяемое значение.
  return number ? number : NaN;
};

extractionNumber('I grid, 0.5 beer = -100rubles');

const generateFileAdress = function (initialString, minLength, addSymbols) {
  if (initialString.length >= minLength) {
    return initialString;
  }

  let result = initialString;

  /* Цикл, который добавляет добавочные символы столько раз, сколько нужно.
  И если при последнем витке цикла добавочных символов больше минимальной длины -
  обрезаем добавочные символы с конца на количество необходимых добавочных символов + результат.
  Возвращаем результат процесса*/
  while (result.length !== minLength) {
    const symbolsToAdd = minLength - result.length;
    if (addSymbols.length > symbolsToAdd) {
      result = addSymbols.slice(0, symbolsToAdd) + result;
    } else {
      result = addSymbols + result;
    }
  }
  return result;
};

generateFileAdress('q', 6, 'we3');
