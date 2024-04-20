import { encoded, translations } from './data.js'

const EXCEPTIONS = ['groupId', 'service', 'formatSize', 'ca'];
const deepCopyEncoded = JSON.parse(JSON.stringify(encoded));

const getListWithTranslationValue = (encoded, translations) => {
  if (!encoded.length) {
    throw new Error('Encoded list is empty');
  }

  const currentList = encoded.map((encodedItem) => {
    for (const key in encodedItem) {
      if (!isException(key) && hasEndId(key)) {
        const encodedValue = encodedItem[key];
        const translationsValue = translations[encodedValue];

        if (translationsValue) {
          encodedItem[key] = translationsValue
        }
      }
    }
    return encodedItem;
  });

  return currentList;
};

const isException = (value) => {
  return EXCEPTIONS.find((exceptionValue) => value === exceptionValue);
};

const hasEndId = (value) => {
  return value.endsWith('Id');
};


const getUniqueGroupIds = (encoded) => {
  const uniqueGroupIds = new Set();

  encoded.forEach((item) => {
    const keys = Object.keys(item);

    keys.forEach((key) => {
      if (hasEndId(key)) {
        const value = item[key];
        if (translations[value] !== undefined && translations[value] !== '') {
          uniqueGroupIds.add(value);
        }
      }
    });
  });

  return Array.from(uniqueGroupIds);
};

const uniqueGroupIds = getUniqueGroupIds(deepCopyEncoded);
const decoded = getListWithTranslationValue(deepCopyEncoded, translations);

console.log("Let's rock");
console.log(encoded, translations);

console.log(decoded);
console.log('Уникальные groupId из массива encoded: ', uniqueGroupIds);
