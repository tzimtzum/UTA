// src/app/api/guru/agents/utils/gematriaUtils.js

const hebrewAlphabet = {
  'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5, 'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9,
  'י': 10, 'כ': 20, 'ך': 20, 'ל': 30, 'מ': 40, 'ם': 40,
  'נ': 50, 'ן': 50, 'ס': 60, 'ע': 70, 'פ': 80, 'ף': 80,
  'צ': 90, 'ץ': 90, 'ק': 100, 'ר': 200, 'ש': 300, 'ת': 400
};

const finalLetterValues = {
  'ך': 500, 'ם': 600, 'ן': 700, 'ף': 800, 'ץ': 900
};

const normalize = (text) => {
  return text.replace(/[^\u0590-\u05FF]/g, '').replace(/[\u0591-\u05C7]/g, '');
};

const calculateGematria = (text, method = 'standard') => {
  const cleanText = normalize(text);

  switch (method) {
    case 'katan':
      return cleanText
        .split('')
        .map(letter => hebrewAlphabet[letter] || 0)
        .reduce((sum, val) => sum + (val % 10), 0);

    case 'gadol':
      return cleanText
        .split('')
        .map(letter => finalLetterValues[letter] || hebrewAlphabet[letter] || 0)
        .reduce((sum, val) => sum + val, 0);

    case 'ordinal':
      return cleanText
        .split('')
        .map(letter => Object.keys(hebrewAlphabet).indexOf(letter) + 1)
        .reduce((sum, val) => sum + val, 0);

    case 'standard':
    default:
      return cleanText
        .split('')
        .map(letter => hebrewAlphabet[letter] || 0)
        .reduce((sum, val) => sum + val, 0);
  }
};

module.exports = {
  calculateGematria,
  normalize
};
