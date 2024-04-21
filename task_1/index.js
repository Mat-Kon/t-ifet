import { encoded, translations } from './data.js'

const IGNORED_KEYS = ['groupId', 'service', 'formatSize', 'ca'];
const deepCopyEncoded = structuredClone(encoded);

const decode = (encoded, translations) => {
  return encoded.map((encodedItem) => {
    for (const key in encodedItem) {

      if (key.endsWith('Id') && IGNORED_KEYS.includes(key)) {
        const encodedValue = encodedItem[key];
        const translationsValue = translations[encodedValue];

        if (translationsValue) {
          encodedItem[key] = translationsValue
        }
      }
    }
    return encodedItem;
  });
};

const getUniqueIds = (encoded) => {
  const uniqueGroupIds = new Set();

  encoded.forEach((item) => {
    const keys = Object.keys(item);

    keys.forEach((key) => {
      if (key.endsWith('Id')) {
        const value = item[key];
        if (translations[value] !== undefined && translations[value] !== '') {
          uniqueGroupIds.add(value);
        }
      }
    });
  });

  return Array.from(uniqueGroupIds);
};

const uniqueGroupIds = getUniqueIds(deepCopyEncoded);
const decoded = decode(deepCopyEncoded, translations);

console.log("Let's rock");
console.log(encoded, translations);

console.log(decoded);
console.log('Уникальные groupId из массива encoded: ', uniqueGroupIds);
