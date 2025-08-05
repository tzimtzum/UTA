// src/app/api/guru/agents/gematriaEngine.js

const {
  calculateGematria,
  breakdownHebrewWord,
  numberToMatchingWords,
  getDvarTorah
} = require('./utils/gematriaUtils.js');

export async function generateGematriaOutput(input) {
  const {
    type,
    value,
    gematriaType = 'standard',
    createDvarTorah = false
  } = input;

  if (!value) {
    return "❌ No input provided.";
  }

  let numericValue;
  let breakdown = '';
  let matches = [];

  if (type === 'number') {
    numericValue = parseInt(value, 10);
    matches = await numberToMatchingWords(numericValue, gematriaType);
  }

  if (type === 'hebrew') {
    numericValue = calculateGematria(value, gematriaType);
    breakdown = breakdownHebrewWord(value, gematriaType);
    matches = await numberToMatchingWords(numericValue, gematriaType);
  }

  let response = `🔡 Hebrew: ${value}\n🔢 Gematria (${gematriaType}): ${numericValue}\n\n🧩 Breakdown:\n${breakdown}\n\n📖 Matches:\n${matches.join('\n')}`;

  if (createDvarTorah) {
    const dvar = await getDvarTorah(value, numericValue, matches);
    response += `\n\n💬 Dvar Torah:\n${dvar}`;
  }

  return response;
}



