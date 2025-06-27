// src/app/api/guru/agents/chakiraAgent.js

export async function runChakiraAgent(prompt) {
  const query = `
You are the Chakira Agent for Ultimate Torah Assistant (Guru Mode).

Your task: Identify the key conceptual dilemma (chakira) in this sugya:
"${prompt}"

Then:
1. Articulate both sides of the chakira like a Brisker.
2. Provide 2–3 major nafka minot (practical implications).
3. Point to which Rishonim align with each side.
4. Format the output in this structure:

{
  chakira: "One sentence description of the dilemma",
  sideA: {
    label: "Approach A",
    description: "Explanation",
    aligned_rishonim: ["Rambam", "Rashba"]
  },
  sideB: {
    label: "Approach B",
    description: "Explanation",
    aligned_rishonim: ["Tosafot", "Ritva"]
  },
  nafka_minot: [
    { scenario: "X", difference: "According to A vs B" },
    ...
  ]
}

Use clear Brisker-style thinking. Be rigorous. No filler or fluff. JSON only.
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
        { role: "system", content: "You extract and structure deep Torah chakiras." },
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
    return { error: "❌ Failed to parse Chakira output." };
  }
}