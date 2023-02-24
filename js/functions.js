const isCompareString = (string, sign) => string.length <= sign;

isCompareString('проверяемая строка', 20);


const isPalindromeCompare = (string) => {
  const tempString = string.toLowerCase().replaceAll(' ', '');
  return tempString === tempString.split('').reverse().join('');
};

isPalindromeCompare('Лёша на полке клопа нашёл');

const getNumberFromString = (value) => {

  const stringValue = value.toString();
  let result = '';

  for (let i = 0; i < stringValue.length; i++) {
    if (!isNaN(parseInt(stringValue[i], 10))) {
      result += stringValue[i];
    }
  }

  return parseInt(result, 10);
};

getNumberFromString(-1);
getNumberFromString('1 кефир, 0.5 батона');


const addСharacter = (string, length, incremental) => {
  const difference = length - string.length;

  if (difference <= 0) {
    return string;
  }

  return incremental.slice(0, difference % incremental.length) + incremental.repeat(difference / incremental.length) + string;
};

addСharacter('q', 4, '12');
