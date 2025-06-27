"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function TeshuvaPage() {
  const [prompt, setPrompt] = useState("");
  const [derech, setDerech] = useState("default");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [guruCheck, setGuruCheck] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setOutput("🧠 Generating Teshuva with full Torah sources...");
    setGuruCheck(null);

    try {
      const res = await fetch("/api/guru", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, mode: "teshuva", derech }),
      });

      const data = await res.json();
      setOutput(data.output || "❌ No response.");
      if (data.guruCheck) setGuruCheck(data.guruCheck);
    } catch (err) {
      console.error(err);
      setOutput("❌ Error generating Teshuva.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">
        Halachic Teshuva Mode
      </h1>

      {/* Derech Selector */}
      <label className="block font-semibold mt-4" htmlFor="derech">
        Derech HaLimud:
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
        <option value="chabad">Chabad</option>
      </select>

      {/* Prompt Box */}
      <label className="block font-semibold mt-6" htmlFor="prompt">
        Enter Your Halachic Question:
      </label>
      <textarea
        id="prompt"
        className="w-full h-40 p-2 border rounded mt-1 font-mono"
        placeholder='e.g. Can one drink mevushal wine touched by a non-Jew in a factory?'
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        dir="auto"
        style={{ direction: "auto", unicodeBidi: "plaintext" }}
      />

      {/* Submit Button */}
      <button
        className={`w-full text-white py-2 rounded mt-4 ${
          loading ? "bg-gray-600" : "bg-blue-800"
        }`}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "🧠 Working..." : "Generate Teshuva with Guru Mode"}
      </button>

      {/* Output */}
      <div className="mt-8 p-4 bg-white border rounded shadow max-h-[70vh] overflow-auto whitespace-pre-wrap prose prose-lg">
        <ReactMarkdown>{output}</ReactMarkdown>
      </div>

      {/* GuruCheck */}
      {guruCheck && (
        <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 rounded">
          <h2 className="font-bold mb-2">🧪 GuruCheck Report</h2>
          <ul className="list-disc list-inside text-sm">
            <li>Hebrew Mekorot: {guruCheck.hebrewCount}</li>
            <li>
              Hebrew Present:{" "}
              {guruCheck.includesHebrew ? "✅ Yes" : "❌ Missing"}
            </li>
            <li>
              English Present:{" "}
              {guruCheck.includesEnglish ? "✅ Yes" : "❌ Missing"}
            </li>
            <li>
              Sugya Tree: {guruCheck.includesSugyaTree ? "✅" : "❌ Missing"}
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
