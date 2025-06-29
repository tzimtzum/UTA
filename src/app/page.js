'use client';
import { useState, useEffect } from 'react';
import { HDate } from '@hebcal/core';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState('');
  const [derech, setDerech] = useState('');
  const [output, setOutput] = useState('');
  const [hebrewDate, setHebrewDate] = useState('');

  useEffect(() => {
    try {
      const today = new Date();
      const hdate = new HDate(today);
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

  const getPlaceholder = () => {
    switch (mode) {
      case 'shiur':
        return 'e.g., Give a shiur on chazaka including Reb Chaim’s chakira.';
      case 'quick':
        return 'e.g., What is a shaliach l’dvar aveirah?';
      case 'dvar':
        return 'e.g., A Dvar Torah for Shabbat with a moral lesson and story.';
      case 'teshuva':
        return 'e.g., Can I eat meat cooked in a dairy pot?';
      case 'chavruta':
        return 'e.g., What would you like to learn together? Or ask me to choose!';
      case 'story':
        return 'e.g., A funny chassidic story connected to this week’s parsha.';
      case 'simcha':
        return 'e.g., Speech for a bar mitzvah boy who loves basketball.';
      case 'sugyaTree':
        return 'e.g., Create a sugya tree for yayin touched by a non-Jew.';
      default:
        return 'Enter your Torah query or request...';
    }
  };

  return (
    <main className="p-6 max-w-3xl mx-auto font-serif text-lg">
      <h1 className="text-3xl font-bold text-center mb-2">Ultimate Torah Assistant (Guru Mode)</h1>
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
        <option value="teshuva">Teshuva (Halachic Q&A)</option>
        <option value="chavruta">Chavruta Mode</option>
        <option value="story">Heimishe Story</option>
        <option value="simcha">Simcha Speech Builder</option>
        <option value="sugyaTree">Sugya Tree Mode</option>
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
        placeholder={getPlaceholder()}
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










