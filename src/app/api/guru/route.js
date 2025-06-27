// src/app/api/guru/route.js

import { orchestrateGuruResponse } from "./guruOrchestrator";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const { prompt, mode, derech } = await request.json();

    if (!prompt || !mode) {
      return new Response(
        JSON.stringify({ error: "Missing prompt or mode." }),
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Missing OpenAI API key." }),
        { status: 500 }
      );
    }

    // 🧠 Invoke orchestrator — now returns prompt AND agent strategy
    const { fullPrompt, strategy } = await orchestrateGuruResponse({ prompt, mode, derech });

    const messages = [
      {
        role: "system",
        content: `You are Guru Mode, the Ultimate Torah Assistant. You must:
- Act as a true Talmid Chacham
- Quote all Hebrew mekorot in full
- Provide authentic English translations
- Follow derech haTorah + derech halimud logic
- Use agents: ${strategy.agents.join(", ")}
- Structure content to match '${strategy.mode}' and '${strategy.derech || "none"}' style
- Conclude with GuruCheck verification`
      },
      { role: "user", content: fullPrompt }
    ];

    const apiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
        temperature: 0.7,
        max_tokens: 4096,
        messages
      })
    });

    const json = await apiRes.json();
    const output = json.choices?.[0]?.message?.content || "❌ No response.";

    return new Response(JSON.stringify({ output }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error("Guru API error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error." }),
      { status: 500 }
    );
  }
}



