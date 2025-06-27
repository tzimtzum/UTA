// src/app/api/guru/agents/chavrutaAgent.js

export async function runChavrutaAgent(prompt, derech) {
  const query = `
You are the Chavruta Mode Agent for the Ultimate Torah Assistant (Guru Mode).

Given this prompt:
"${prompt}"

Return a breakdown of a sugya for chavruta study:
- Hebrew phrase or sentence (1–3 lines)
- English explanation/commentary
- Repeat for the whole sugya
- Include full mekorot: Gemara, Rishonim, Shulchan Aruch, etc.
- At least 6–10 cycles of source/commentary pairs
- Maintain derech halimud: "brisk" = conceptual framing, "mussar" = ethical insight, "chabad" = chassidus/kabbalah layer

🧠 Format:
### 🔹 [Source Name] — Hebrew
> Hebrew line

**💬 Explanation:**
> English explanation/commentary

Repeat the above structure.

Markdown only.
No summary. No footnotes. Full interleaved format.
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
        {
          role: "system",
          content: "You are an expert chavruta-style sugya breakdown engine for Torah learning."
        },
        { role: "user", content: query }
      ],
      max_tokens: 2048,
      temperature: 0.5
    })
  });

  const data = await res.json();
  let output = data.choices?.[0]?.message?.content;

  return output || "❌ Failed to generate Chavruta breakdown.";
}
