// src/app/api/guru/agents/simchaAgent.js

import { fetchTorahSources } from "../utils/torahUtils";
import { generateBlessings, generateToneIntro } from "../utils/simchaUtils";

export async function simchaAgent({ prompt, context }) {
  const { tone, relationship, typeOfSimcha, length, theme } = context || {};

  const intro = generateToneIntro(tone, relationship, typeOfSimcha);
  const sources = await fetchTorahSources(prompt);
  const blessings = generateBlessings(typeOfSimcha);

  const body = `
${intro}

${sources}

Theme: ${theme || "Meaningful life reflections and Torah message"}

${blessings}
  `;

  return {
    type: "simchaSpeech",
    content: body.trim()
  };
}


// src/app/api/guru/agents/patternMatcherAgent.js

import { fetchBiblicalSources } from "../utils/torahUtils";
import { findPatternsInText, relateToModernEvent } from "../utils/patternUtils";

export async function patternMatcherAgent({ prompt }) {
  const sources = await fetchBiblicalSources(prompt);
  const patternMatches = findPatternsInText(sources, prompt);
  const modernLink = relateToModernEvent(prompt);

  const result = `
🔍 Torah Pattern Analysis

🕎 Sources scanned: ${sources.length}

📜 Matched Patterns:
${patternMatches.join("\n")}

🌍 Possible Modern Fulfillment:
${modernLink}

📏 All findings are speculative and reviewed under GuruCheck.
  `;

  return {
    type: "patternMatch",
    content: result.trim()
  };
}
