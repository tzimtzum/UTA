// src/app/chavruta/page.js
"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ChavrutaModePage() {
  const [prompt, setPrompt] = useState("");
  const [derech, setDerech] = useState("default");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [guruCheck, setGuruCheck] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setOutput("🧠 Learning chavruta-style...");
    setGuruCheck(null);

    try {
      const res = await fetch("/api/guru", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, mode: "chavruta", derech }),
      });

      const data = await res.json();
      setOutput(data.output || "❌ No response.");
      if (data.guruCheck) setGuruCheck(data.guruCheck);
    } catch (err) {
      console.error(err);
      setOutput("❌ Error while generating response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-center text-2xl font-bold mb-6">🧠 Chavruta Mode</h1>

      <label className="block font-semibold mt-4" htmlFor="derech">
        Choose Derech HaLimud:
      </label>
      <select
        id="derech"
        className="w-full p-2 border rounded"
        value={derech}
        onChange={(e) => setDerech(e.target.value)}
      >
        <option value="default">Classic</option>
        <option value="brisk">Brisk</option>
        <option value="mussar">Mussar</option>
        <option value="chabad">Chabad / Chassidus</option>
      </select>

      <textarea
        className="w-full h-40 p-2 mt-4 border rounded font-mono"
        placeholder="e.g., Analyze the sugya of yayin touched by a non-Jew"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        dir="auto"
        style={{ direction: "auto", unicodeBidi: "plaintext" }}
      />

      <button
        className={`w-full text-white py-2 rounded mt-2 ${
          loading ? "bg-gray-600" : "bg-blue-900"
        }`}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "⏳ Generating..." : "Generate with Guru Mode"}
      </button>

      <div className="mt-8 p-4 bg-white border rounded shadow max-h-[75vh] overflow-auto whitespace-pre-wrap prose prose-lg">
        <ReactMarkdown>{output}</ReactMarkdown>
      </div>

      {guruCheck && (
        <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 rounded">
          <h2 className="font-bold mb-2">🧪 GuruCheck Report</h2>
          <ul className="list-disc list-inside text-sm">
            <li>📝 Hebrew Source Count: {guruCheck.hebrewCount}</li>
            <li>
              ✅ Hebrew Present:{" "}
              {guruCheck.includesHebrew ? "Yes" : "❌ Missing"}
            </li>
            <li>
              ✅ English Present:{" "}
              {guruCheck.includesEnglish ? "Yes" : "❌ Missing"}
            </li>
            <li>
              📊 Chart Detected:{" "}
              {guruCheck.includesChart ? "✅" : "❌ Missing"}
            </li>
            {guruCheck.issues.length > 0 && (
              <>
                <li className="mt-2 font-bold">⚠️ Issues:</li>
                {guruCheck.issues.map((issue, i) => (
                  <li key={i} className="text-red-600">
                    {issue}
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
      )}
    </main>
  );
}
