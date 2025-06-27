// src/app/api/guru/agents/sugyaTreeAgent.js

export async function runSugyaTreeAgent(prompt) {
  const query = `
You are a Sugya Tree Agent for Ultimate Torah Assistant (UTA) in Guru Mode.

Build a structured Sugya Tree for the following topic:
"${prompt}"

1. Identify the starting Mishna or Gemara
2. Track the logical flow: daf/page → shakla v'tarya (give and take) → relevant machloket
3. Show how the sugya branches to:
   • Rishonim discussions (e.g. Tosafot, Rambam, Rosh)
   • Practical halacha via Tur, Beit Yosef, Shulchan Aruch
   • Achronim or poskim as appropriate

Return the Sugya Tree in this format:
{
  mishna: "Full quote or citation",
  gemara_flow: [
    { daf: "Avodah Zarah 29b", summary: "Short summary" },
    ...
  ],
  rishonim: ["Rambam Hilchot Maachalot 11:5", "Tosafot Avoda Zara 29b"],
  halachic_flow: ["Tur YD 123", "Shulchan Aruch YD 124", "Rema YD 124"]
}

Use no summaries. Quote or cite directly. Format clearly in JSON.
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
        { role: "system", content: "You build sugya trees for high-level Torah shiurim." },
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
    return { error: "❌ Failed to parse Sugya Tree output." };
  }
}