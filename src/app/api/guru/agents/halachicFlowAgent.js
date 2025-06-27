// src/app/api/guru/agents/halachicFlowAgent.js

export async function runHalachicFlowAgent(prompt) {
  const query = `
You are the Halachic Flow Agent for Ultimate Torah Assistant (Guru Mode).

Given this topic:
"${prompt}"

Your goal:
1. Track the halachic flow from Talmud → Rishonim → Shulchan Aruch → Acharonim → Modern Poskim.
2. Provide citations in full for each major source.
3. Identify which opinions were codified by Shulchan Aruch and Rema.
4. List post-Shulchan Aruch positions (e.g. Chazon Ish, Rav Ovadia, Igros Moshe).
5. Format your output in this structure:

{
  talmud: [{ source: "Avodah Zarah 29b", summary: "Summary of sugya" }],
  rishonim: [
    { name: "Rambam", source: "Maachalos Asuros 11:9", view: "Short description" },
    ...
  ],
  shulchan_aruch: [
    { seif: "YD 124:1", ruling: "Quoted psak", aligned_rishonim: ["Tosafot"] }
  ],
  acharonim: [
    { name: "Chazon Ish", view: "Psak and context" },
    ...
  ]
}

JSON only. Use complete, accurate references. Do not summarize in general terms — cite and quote.
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
        { role: "system", content: "You trace halachic development from sugya to modern day." },
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
    return { error: "❌ Failed to parse Halachic Flow output." };
  }
}
