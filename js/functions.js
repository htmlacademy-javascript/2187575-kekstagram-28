const checkLength = function (string, symbolAmount) {
  symbolAmount = string.length;
  return (symbolAmount > 10);
};

checkLength('текст');
// console.log(checkLength('текст')); //Проверка

const checkPalindrome = function (string) {
  string = string.replaceAll(' ', ''); // Убирает пробелы
  string = string.toLowerCase(); // Переводит текст в нижний регистр
  const reverse = string.split('').reverse().join(''); // Создает переменную с перевернутым значением string (split - разбиваем на массив, reverse - переворачиваем массив, join - склеиваем назад в строку)
  return (string === reverse);
};

checkPalindrome('Топот довод тОпот');
// console.log(checkPalindrome('Топот довод тОпот')); //Проверка

const extractionNumber = function (string) {
  const number = string.replace(/\D/g, ''); // "\D" - Любой знак (не цифра) заменяется пустой строкой. "g" - Литерал заменяющий все совпадения в строке. '' - Заменяемое значение.
  return number ? number : NaN;
};

extractionNumber('I grid, 0.5 beer = -100rubles');
// console.log(extractionNumber('I grid, 0.5 beer = -100rubles')); //Проверка
// console.log(extractionNumber('Text Text')); //Проверка


const formationAdress = function (initialString, minLength, addSymbols) {
  // Если начальная строка >= длине, возвращаем целую строку
  if (initialString.length >= minLength) {
    return initialString;
  }

  // Создаем переменную будущего результата
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
