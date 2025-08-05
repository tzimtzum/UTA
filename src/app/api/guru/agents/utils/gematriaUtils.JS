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
        .reduce((sum, val) => sum + (val % 10 === 0 ? 10 : val % 10), 0);

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

const breakdownHebrewWord = (text, method = 'standard') => {
  const cleanText = normalize(text);

  let parts = cleanText.split('').map(letter => {
    let value;
    if (method === 'katan') {
      value = hebrewAlphabet[letter] % 10 === 0 ? 10 : hebrewAlphabet[letter] % 10;
    } else if (method === 'gadol') {
      value = finalLetterValues[letter] || hebrewAlphabet[letter] || 0;
    } else if (method === 'ordinal') {
      value = Object.keys(hebrewAlphabet).indexOf(letter) + 1;
    } else {
      value = hebrewAlphabet[letter] || 0;
    }
    return `${letter} (${value})`;
  });

  const total = calculateGematria(text, method);
  return `${parts.join(' + ')} = ${total}`;
};

const numberToMatchingWords = async (number, method = 'standard') => {
  // Placeholder: In real version, lookup from pre-built dictionary or DB
  if (number === 376) {
    return ['שלום (Peace)', 'ישמעאל (Ishmael)'];
  }
  return ['ExampleWord1', 'ExampleWord2'];
};

const getDvarTorah = async (word, numericValue, matches) => {
  return `The word ${word} has a gematria value of ${numericValue}, connecting it to ${matches[0]} and offering a deeper insight into the concept of harmony and divine connection.`;
};

module.exports = {
  calculateGematria,
  normalize,
  breakdownHebrewWord,
  numberToMatchingWords,
  getDvarTorah
};

