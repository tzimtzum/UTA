// src/app/api/guruOrchestrator.js

export async function orchestrateGuruResponse({ prompt, mode, derech }) {
  if (!prompt || !mode) {
    return {
      fullPrompt: "⚠️ Missing essential parameters for Guru Mode.",
      strategy: { agents: [], mode }
    };
  }

  let fullPrompt = '';
  let agents = [];

  switch (mode.toLowerCase()) {
    case 'shiur':
      agents = ['sources', 'sugyaTree', 'chakira', 'nafkaMinot', 'halachicFlow', 'guruCheck'];
      fullPrompt = `
You are an elite Torah scholar operating in Guru Mode. Prepare a shiur (Torah lecture) using the derech halimud of ${derech || "default"}.

Topic: "${prompt}"

Output Format:
1. 📚 Sugya Tree
2. 📖 Mekorot (Full Hebrew + English)
3. 🧠 Chakira (e.g., birur vs din)
4. ⚖️ Nafka Minot
5. 📐 Halachic Flow (Talmud → Rishonim → Acharonim)
6. ✅ GuruCheck Self-Audit
      `.trim();
      break;

    case 'quick':
    case 'quick-question':
      agents = ['sources', 'guruCheck'];
      fullPrompt = `
Answer the following Torah question in Guru Mode:

"${prompt}"

Rules:
- Full Hebrew + English sources
- Precise Halachic reasoning
- No speculation
- Include GuruCheck validation
      `.trim();
      break;

    case 'dvar':
    case 'dvar-torah':
      agents = ['sources', 'gematriaBridge', 'storyAgent', 'simchaAgent', 'guruCheck'];
      fullPrompt = `
Write a Dvar Torah in Guru Mode based on:

"${prompt}"

Structure:
- Central Torah idea with source texts
- Application to life or simcha
- Hebrew pesukim and mefarshim
- Flow suitable for oral or printed delivery
- GuruCheck at the end
Length: 400–600 words
      `.trim();
      break;

    case 'gematria':
      agents = ['gematriaCalc', 'gematriaBridge', 'sources', 'guruCheck'];
      fullPrompt = `
Calculate and interpret the gematria for:

"${prompt}"

Duties:
- Return numeric value (all methods: regular, mispar gadol, etc.)
- List words/pesukim with same value
- Note any known traditional connections (with sources)
- Add Guru insight if applicable
      `.trim();
      break;

    case 'simcha-speech':
      agents = ['simchaAgent', 'sources', 'storyAgent', 'guruCheck'];
      fullPrompt = `
Craft a Simcha Speech in Guru Mode based on:

"${prompt}"

Guidelines:
- Include structured message and tone
- Incorporate Torah + personality
- Reflect relationship and setting
- End with blessings or call to action
- GuruCheck self-audit
      `.trim();
      break;

    case 'numbers-in-torah':
      agents = ['gematriaBridge', 'sources', 'guruCheck'];
      fullPrompt = `
Analyze the number or theme in Torah:

"${prompt}"

Tasks:
- Explore gematria, pesukim, numbers in context
- List possible Torah references, sources
- Comment if any meforshim highlight this
- Offer interpretive insight
      `.trim();
      break;

    case 'bible-code':
    case 'its-in-the-torah':
      agents = ['sources', 'patternMatcher', 'guruCheck'];
      fullPrompt = `
Investigate potential prophetic or thematic fulfillment based on:

"${prompt}"

Instructions:
- Search Torah for direct/indirect textual hints
- Include citations, gematrias, parshiyot, or commentary
- Offer possible modern parallels with caution
- Validate through GuruCheck
      `.trim();
      break;

    default:
      agents = ['sources', 'guruCheck'];
      fullPrompt = `
You are in Guru Mode. Respond to:

"${prompt}"

Include full mekorot in Hebrew and English, derech haTorah logic, and conclude with GuruCheck.
      `.trim();
      break;
  }

  return {
    fullPrompt,
    strategy: {
      mode,
      agents,
      derech: derech || null
    }
  };
}

}









