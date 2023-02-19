const checkLength = function (string, symbolAmount) {
  symbolAmount = string.length;
  return (symbolAmount > 10);
};

checkLength('текст');
// console.log(checkLength('текст')); //Проверка

const checkPalindrome = function (string) {
  string = string.toLowerCase().replaceAll(' ', ''); // Убирает пробелы и переводит текст в нижний регистр.
  const lastIndex = string.length - 1;
  for (let i = 0; i < string.length / 2; i++) {
    return (string[i] === string[lastIndex - i]);
  }
};

checkPalindrome('Довод тОпот довод');
// console.log(checkPalindrome('Довод тОпот довод')); //Проверка

const extractionNumber = function (string) {
  const number = string.replace(/\D/g, ''); // "\D" - Любой знак (не цифра) заменяется пустой строкой. "g" - Литерал заменяющий все совпадения в строке. '' - Заменяемое значение.
  return number ? number : NaN;
};

extractionNumber('I grid, 0.5 beer = -100rubles');
// console.log(extractionNumber('I grid, 0.5 beer = -100rubles')); //Проверка
// console.log(extractionNumber('Text Text')); //Проверка

const formationAdress = function (initialString, minLength, addSymbols) {
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

formationAdress('q', 6, 'we3');
// console.log(formationAdress('q', 6, 'we3')); // Проверка
