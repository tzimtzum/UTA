// src/app/api/guru/agents/nafkaMinotAgent.js

export async function runNafkaMinotAgent(prompt) {
  const query = `
You are the Nafka Minot Agent for the Ultimate Torah Assistant (Guru Mode).

Given this topic:
"${prompt}"

Your mission:
1. Identify 3–5 nafka minot (practical differences) between key halachic positions.
2. Each nafka mina must be tied to a major chakira or machloket in the sugya.
3. Include example cases (e.g. wine touched by a child, mevushal wine, gentile factory worker).
4. Return JSON in this structure:

[
  {
    label: "Short title (e.g. Mevushal Wine)",
    scenario: "Brief real-life description",
    halachic_difference: "How Rishonim/Achronim would rule differently",
    relevant_sources: ["Rambam 11:9", "Shulchan Aruch YD 124:1"]
  },
  ...
]

Use real examples. Be exacting in halachic flow. JSON only.
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
        { role: "system", content: "You extract nafka minot from halachic sugyot with precision." },
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
    return { error: "❌ Failed to parse Nafka Minot output." };
  }
}
