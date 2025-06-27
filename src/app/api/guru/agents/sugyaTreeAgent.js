// src/app/api/guru/agents/sugyaTreeAgent.js

export async function runSugyaTreeAgent(prompt) {
  const query = `
You are the Sugya Tree Agent inside Ultimate Torah Assistant (UTA) operating in Guru Mode.

Your task is to construct a detailed sugya tree for the following topic:
"${prompt}"

Instructions:
1. Identify the flow of discussion in the Gemara across all relevant masechtot.
2. Show how each sugya leads to the next:
   - Mishna ➝ Gemara ➝ Beraita ➝ Tosafot/contradictions ➝ Rishonim ➝ Acharonim
3. Structure as an outline or indented list, showing the logical or thematic connections.
4. Each node should include:
   - Reference (e.g., Avodah Zarah 30b)
   - Hebrew quote (1–2 lines)
   - Accurate English translation
   - 1-sentence explanation of how it connects to the sugya
5. Include Tosafot, if they introduce major chakirot or contradictions

Output Format:
{
  "sugyaTree": [
    {
      "ref": "Avodah Zarah 30b",
      "hebrew": "אמר רב... יין שנגע בו גוי...",
      "english": "Rav said... wine touched by a gentile...",
      "explanation": "This sugya introduces the root prohibition on stam yeinam."
    },
    ...
  ]
}

Return only valid JSON. No commentary. No summaries. Just the sugyaTree array.
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
        { role: "system", content: "You are a Torah research sugya tree extractor." },
        { role: "user", content: query }
      ],
      max_tokens: 3000,
      temperature: 0.3
    })
  });

  const data = await res.json();
  const output = data.choices?.[0]?.message?.content;

  try {
    const parsed = JSON.parse(output);
    return parsed.sugyaTree || [{ error: "❌ Sugya tree parsing failed or missing." }];
  } catch {
    return [{ error: "❌ Sugya tree output not valid JSON." }];
  }
}

