// src/app/dvar-torah/page.js
"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function DvarTorahPage() {
  const [parsha, setParsha] = useState("");
  const [theme, setTheme] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setOutput("✍️ Generating your Dvar Torah...");
    setError(null);

    try {
      const res = await fetch("/api/guru", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "dvar-torah",
          prompt: `Generate a dvar Torah on Parshat ${parsha || "[unknown]"} focusing on the theme: ${theme}`,
          derech: "default"
        })
      });

      const data = await res.json();
      setOutput(data.output || "❌ No response.");
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-center text-2xl font-bold mb-6">Ultimate Torah Assistant: Dvar Torah Mode</h1>

      <label className="block font-semibold mt-4">Select Parsha:</label>
      <input
        type="text"
        value={parsha}
        onChange={(e) => setParsha(e.target.value)}
        placeholder="e.g., Vayikra"
        className="w-full p-2 border rounded"
      />

      <label className="block font-semibold mt-4">Enter Theme:</label>
      <input
        type="text"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        placeholder="e.g., Leadership, Teshuvah, Gratitude"
        className="w-full p-2 border rounded"
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className={`w-full mt-4 text-white py-2 rounded ${loading ? "bg-gray-500" : "bg-green-700"}`}
      >
        {loading ? "Generating..." : "Generate with Guru Mode"}
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      <div className="mt-8 p-4 bg-white border rounded shadow max-h-[75vh] overflow-auto whitespace-pre-wrap prose prose-lg">
        <ReactMarkdown>{output}</ReactMarkdown>
      </div>
    </main>
  );
}
