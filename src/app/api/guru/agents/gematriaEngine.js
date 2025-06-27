// src/app/api/guru/agents/gematriaEngine.js

import { hebrewToNumber, numberToMatchingWords } from './gematriaUtils.js';

export async function generateGematriaDvarTorah(input) {
  const { type, value } = input;

  if (type === 'number') {
    const matches = await numberToMatchingWords(value);
    return `🔢 Gematria ${value} Matches:\n\n${matches.join('\n')}`;
  }

  if (type === 'hebrew') {
    const numericValue = hebrewToNumber(value);
    const matches = await numberToMatchingWords(numericValue);
    return `🔡 Hebrew: ${value}\n🔢 Gematria: ${numericValue}\n\n📖 Matches:\n${matches.join('\n')}`;
  }

  return "❌ Invalid input. Provide either a Hebrew word or number.";
}


