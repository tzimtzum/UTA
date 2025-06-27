// src/app/api/guru/agents/composerAgent.js

export async function runComposerAgent({
  topic,
  mode,
  derech,
  sources,
  sugyaTree,
  chakira,
  nafkaMinot,
  halachicFlow
}) {
  const query = `
You are the Composer Agent for the Ultimate Torah Assistant (Guru Mode).

Your job is to take all of the following structured data and compose a final response, appropriate to the user's selected mode and derech.

Inputs:
Topic: "${topic}"
Mode: ${mode}
Derech HaLimud: ${derech}
Torah Sources: ${JSON.stringify(sources)}
Sugya Tree: ${JSON.stringify(sugyaTree)}
Chakira: ${JSON.stringify(chakira)}
Nafka Minot: ${JSON.stringify(nafkaMinot)}
Halachic Flow: ${JSON.stringify(halachicFlow)}

Instructions:
- Structure the output as a proper shiur if mode is 'shiur'.
- Begin with a clear **Title**, then an **Introduction**.
- Present full Hebrew mekorot followed by English translation.
- Lay out the sugya flow in order.
- Interweave chakira + nafka minot into shiur.
- Include a **Halachic Flow** section.
- End with a **Summary** and a **Comparison Chart** (if data present).
- Format clearly with markdown.

Do not summarize the inputs. Construct a flowing, natural shiur that uses the data.
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
        { role: "system", content: "You are a Torah shiur composer. Output full shiurim from data." },
        { role: "user", content: query }
      ],
      max_tokens: 4096,
      temperature: 0.4
    })
  });

  const data = await res.json();
  let output = data.choices?.[0]?.message?.content;

  return output || "❌ Shiur composition failed.";
}
