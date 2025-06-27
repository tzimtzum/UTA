// src/app/api/guru/agents/dvarTorahAgent.js

export async function runDvarTorahAgent(prompt, derech) {
  const query = `
You are the Dvar Torah Agent for the Ultimate Torah Assistant (Guru Mode).

Given this prompt:
"${prompt}"

Your task is to generate a full Dvar Torah using derech haTorah logic, in this structure:

1. Pasuk: Quote a relevant verse (Hebrew + translation).
2. Rashi/Ramban: Bring at least one classical commentary.
3. Midrash: Add insight from Midrash Rabbah or Tanchuma.
4. Chassidus (if derech = "chabad" or "chassidus"): Add teaching from Tanya, Torah Ohr, or similar.
5. Insight: Tie them together with a clear and powerful takeaway.
6. Relevance: Conclude with a life message for the reader.

🧠 Use these constraints:
- Full Hebrew text followed by English
- Avoid vague summaries. Quote sources.
- 500–800 words total
- Include Parsha name or theme if mentioned
- Format using markdown for ReactMarkdown rendering

Return the **full formatted markdown** Dvar Torah only.
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
          content: "You create structured divrei Torah with Hebrew sources, classic commentaries, and Chassidus overlay."
        },
        { role: "user", content: query }
      ],
      max_tokens: 2048,
      temperature: 0.6
    })
  });

  const data = await res.json();
  let output = data.choices?.[0]?.message?.content;

  return output || "❌ Failed to generate Dvar Torah.";
}
