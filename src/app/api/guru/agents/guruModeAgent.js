// src/app/api/guru/agents/'use client';
import { useState, useEffect } from 'react';
import { HDate, Location } from '@hebcal/core';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState('');
  const [derech, setDerech] = useState('');
  const [output, setOutput] = useState('');
  const [hebrewDate, setHebrewDate] = useState('');

  useEffect(() => {
    try {
      const today = new Date();
      const jerusalem = new Location({
        name: 'Jerusalem',
        latitude: 31.7767,
        longitude: 35.2345,
        elevation: 800,
        tzid: 'Asia/Jerusalem'
      });
      const hdate = new HDate(today, jerusalem);
      setHebrewDate(hdate.renderGematriya());
    } catch (err) {
      console.error('🧨 Error setting Hebrew date:', err);
      setHebrewDate('⚠️ Error calculating date.');
    }
  }, []);

  const handleSubmit = async () => {
    setOutput('⏳ Processing with Guru Mode...');
    try {
      const res = await fetch('/api/guru', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, mode, derech }),
      });
      const data = await res.json();
      setOutput(data.output || '❌ No response.');
    } catch (err) {
      console.error(err);
      setOutput('❌ Error submitting to Guru.');
    }
  };

  return (
    <main className="p-6 max-w-3xl mx-auto font-serif text-lg">
      <h1 className="text-3xl font-bold text-center mb-2">Ultimate Torah Assistant</h1>
      <p className="text-center italic mb-1">
        מה־אהבתי תורתך כל־היום היא שיחתי<br />
        <span className="text-sm">"How I love Your Torah; all day it is my meditation" (תהילים קי״ט:צ״ז)</span>
      </p>
      <p className="text-center text-sm mb-6">📅 {hebrewDate}</p>

      {/* Mode Selection */}
      <label className="block font-semibold mb-1">Select Mode:</label>
      <select
        className="w-full p-2 border rounded mb-4"
        value={mode}
        onChange={(e) => {
          setMode(e.target.value);
          if (e.target.value !== 'shiur') setDerech('');
        }}
      >
        <option value="">-- Choose --</option>
        <option value="shiur">Shiur Developer</option>
        <option value="quick">Quick Question</option>
        <option value="dvar">Dvar Torah</option>
        {/* Placeholder for future modes */}
        {/* <option value="gematria">Gematria Explorer</option> */}
        {/* <option value="simcha-speech">Simcha Speech Builder</option> */}
      </select>

      {/* Conditional Derech HaLimud */}
      {mode === 'shiur' && (
        <>
          <label className="block font-semibold mb-1">Derech HaLimud:</label>
          <select
            className="w-full p-2 border rounded mb-4"
            value={derech}
            onChange={(e) => setDerech(e.target.value)}
          >
            <option value="">-- Choose Derech --</option>
            <option value="Brisk">Brisk</option>
            <option value="Chabad">Chabad</option>
            <option value="Rav Lichtenstein">Rav Lichtenstein</option>
            <option value="Rambam">Rambam</option>
            <option value="Mussar">Mussar</option>
            <option value="Kabbalistic">Kabbalistic</option>
          </select>
        </>
      )}

      {/* Prompt */}
      <label className="block font-semibold mb-1">Your Request:</label>
      <textarea
        className="w-full p-3 border rounded mb-4"
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={`e.g., Give a shiur on chazaka including the chakira of Reb Chaim Soloveitchik.`}
      />

      {/* Submit */}
      <button
        className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded w-full"
        onClick={handleSubmit}
        disabled={!prompt || !mode}
      >
        Generate with Guru Mode
      </button>

      {/* Output */}
      <pre className="mt-6 bg-gray-100 p-4 rounded whitespace-pre-wrap font-mono">
        {output}
      </pre>
    </main>
  );
}

import { runGuruCheck } from "../utils/guruUtils";
import guruProtocol from "../utils/guruProtocol.json";

export async function guruModeAgent({ compiledOutput, strategy }) {
  const { violations, passed } = await runGuruCheck(compiledOutput, strategy, guruProtocol);

  if (!passed) {
    return {
      type: "guruViolation",
      content: `❌ Guru Mode Violation Detected:\n${violations.join("\n")}`,
      rerun: true,
      log: {
        strategy,
        time: new Date().toISOString(),
        error: violations
      }
    };
  }

  return {
    type: "guruValidated",
    content: "✅ Output passed Guru Mode validation.",
    rerun: false,
    log: {
      strategy,
      time: new Date().toISOString(),
      confirmation: "Passed"
    }
  };
} 

// This agent must always run last.
// It determines whether to allow final response or rerun agents with stricter enforcement.
// It also logs metadata for accountability and future analysis.
