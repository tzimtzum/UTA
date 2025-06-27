// src/app/api/guru/agents/torahSourcesAgent.js

export async function fetchTorahSources(prompt, derech) {
  const query = `
You are a Torah Sources Agent inside Ultimate Torah Assistant (UTA) using Guru Mode.
Your only task is to extract all primary sources from Torah Shebichtav and Torah Shebaal Peh related to this topic:
"${prompt}"

1. Search for:
   • Pesukim in Torah/Neviim/Ketuvim
   • Mishnaic sources
   • Gemara sugyot (daf/page, masechet)
   • Tosefta, Midrash if relevant

2. Return the results in this structure:
[
  {
    type: "Torah" | "Mishna" | "Gemara" | "Midrash" | "Tosefta",
    title: "e.g., Devarim 32:38",
    hebrew: "Full Hebrew Text",
    english: "Accurate Translation",
    notes: "Brief context and relevance to sugya"
  },
  ...
]

3. Use derech haTorah logic to prioritize relevance and avoid duplication.

If derech haLimud = "${derech}", favor formatting that suits:
- Brisk = source structure + machloket potential
- Mussar = aggadic tone
- Chabad = esoteric/kabbalistic resonance

Use only verifiable Torah texts. No summaries, no guesses.

Return full JSON array only.
`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a source-finding agent for a Torah research assistant." },
        { role: "user", content: query }
      ],
      max_tokens: 2048,
      temperature: 0.3
    })
  });

  const data = await res.json();
  let output = data.choices?.[0]?.message?.content;

  try {
    return JSON.parse(output);
  } catch {
    return [{ error: "❌ Failed to parse Torah sources output." }];
  }
}
