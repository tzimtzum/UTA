'use client';
import { useState, useEffect } from 'react';
import { HDate } from '@hebcal/core';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState('');
  const [derech, setDerech] = useState('');
  const [output, setOutput] = useState('');
  const [hebrewDate, setHebrewDate] = useState('');
  const [profile, setProfile] = useState({ level: '', affiliation: '', years: '', notes: '' });
  const [storyType, setStoryType] = useState('');
  const [storyAudience, setStoryAudience] = useState('');
  const [simchaType, setSimchaType] = useState('');
  const [simchaTone, setSimchaTone] = useState('');
  const [dvarOccasion, setDvarOccasion] = useState('');
  const [dvarStyle, setDvarStyle] = useState('');
  const [gematriaPhrase, setGematriaPhrase] = useState('');
  const [gematriaTarget, setGematriaTarget] = useState('');
  const [gematriaType, setGematriaType] = useState('');
  const [shiurAudience, setShiurAudience] = useState('');
  const [chavrutaPartner, setChavrutaPartner] = useState('');
  const [linkInput, setLinkInput] = useState('');
  const [progress, setProgress] = useState(0);

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
    setProgress(10);
    try {
      const res = await fetch('/api/guru', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt, mode, derech, profile, storyType, storyAudience, simchaType, simchaTone, dvarOccasion, dvarStyle, gematriaPhrase, gematriaTarget, gematriaType, shiurAudience, chavrutaPartner, linkInput 
        }),
      });
      setProgress(60);
      const data = await res.json();
      setProgress(100);
      setOutput(data.output || '❌ No response.');
    } catch (err) {
      console.error(err);
      setOutput('❌ Error submitting to Guru.');
      setProgress(0);
    }
  };

  const handleTeachMe = async () => {
    setOutput('⏳ Guru is teaching you Torah...');
    setProgress(20);
    try {
      const randomPrompts = [
        "Give me a short Dvar Torah on this week's parsha.",
        "Tell me an inspiring chassidic story.",
        "Summarize a famous machloket in halacha.",
        "Provide a quick halachic question and answer.",
        "Share a unique gematria insight."
      ];
      const randomPrompt = randomPrompts[Math.floor(Math.random() * randomPrompts.length)];
      setPrompt(randomPrompt);
      await handleSubmit();
    } catch (err) {
      console.error(err);
      setOutput('❌ Error generating Torah teaching.');
      setProgress(0);
    }
  };

  const getPlaceholder = () => {
    switch (mode) {
      case 'shiur': return 'e.g., Give a shiur on chazaka including Reb Chaim’s chakira.';
      case 'quick': return 'e.g., What is a shaliach l’dvar aveirah?';
      case 'dvar': return 'e.g., A Dvar Torah for Shabbat with a moral lesson and story.';
      case 'teshuva': return 'e.g., Can I eat meat cooked in a dairy pot?';
      case 'chavruta': return 'e.g., What would you like to learn together?';
      case 'story': return 'e.g., A funny chassidic story connected to this week’s parsha.';
      case 'simcha': return 'e.g., Speech for a bar mitzvah boy who loves basketball.';
      case 'sugyaTree': return 'e.g., Create a sugya tree for yayin touched by a non-Jew.';
      case 'gematria': return 'e.g., Calculate gematria for "שלום"';
      default: return 'Enter your Torah query or request...';
    }
  };

  return (
    <main className="p-6 max-w-3xl mx-auto font-serif text-lg">
      <h1 className="text-3xl font-bold text-center mb-2">Ultimate Torah Assistant (Guru Mode)</h1>
      <p className="text-center italic mb-1">
        מה־אהבתי תורתך כל־היום היא שיחתי<br />
        <span className="text-sm">"How I love Your Torah; all day it is my meditation" (תהילים קי״ט:צ״ז)</span>
      </p>
      <p className="text-center text-sm mb-4">📅 {hebrewDate}</p>

      <div className="border p-2 rounded mb-4 bg-gray-50">
        <strong>Learner Profile:</strong> {profile.level || "N/A"} | {profile.affiliation || "N/A"} | {profile.years ? `${profile.years} years` : "N/A"}
      </div>

      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full mb-4" onClick={handleTeachMe}>
        Teach Me Torah
      </button>

      <label className="block font-semibold mb-1">Transcription or Audio Link:</label>
      <input type="text" className="w-full p-2 border rounded mb-4" value={linkInput} onChange={(e) => setLinkInput(e.target.value)} placeholder="Paste shiur link here..." />

      <label className="block font-semibold mb-1">Select Mode:</label>
      <select className="w-full p-2 border rounded mb-4" value={mode} onChange={(e) => { setMode(e.target.value); if (e.target.value !== 'shiur') setDerech(''); }}>
        <option value="">-- Choose --</option>
        <option value="shiur">Shiur Developer</option>
        <option value="quick">Quick Question</option>
        <option value="dvar">Dvar Torah</option>
        <option value="teshuva">Teshuva (Halachic Q&A)</option>
        <option value="chavruta">Chavruta Mode</option>
        <option value="story">Heimishe Story</option>
        <option value="simcha">Simcha Speech Builder</option>
        <option value="sugyaTree">Sugya Tree Mode</option>
        <option value="gematria">Gematria Calculator</option>
      </select>

      {mode === 'shiur' && (
        <>
          <label className="block font-semibold mb-1">Derech HaLimud:</label>
          <select className="w-full p-2 border rounded mb-4" value={derech} onChange={(e) => setDerech(e.target.value)}>
            <option value="">-- Choose Derech --</option>
            <option value="Brisk">Brisk</option>
            <option value="Chabad">Chabad</option>
            <option value="Rav Lichtenstein">Rav Lichtenstein</option>
            <option value="Rambam">Rambam</option>
            <option value="Mussar">Mussar</option>
            <option value="Kabbalistic">Kabbalistic</option>
          </select>

          <label className="block font-semibold mb-1">Who is this shiur for?</label>
          <select className="w-full p-2 border rounded mb-4" value={shiurAudience} onChange={(e) => setShiurAudience(e.target.value)}>
            <option value="">-- Choose Audience --</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced Yeshiva">Advanced Yeshiva</option>
            <option value="Mixed">Mixed Audience</option>
            <option value="Teens">Kids/Teens</option>
            <option value="Women">Women’s Group</option>
            <option value="Other">Other</option>
          </select>
        </>
      )}

      {mode === 'chavruta' && (
        <>
          <label className="block font-semibold mb-1">Who am I learning with?</label>
          <select className="w-full p-2 border rounded mb-4" value={chavrutaPartner} onChange={(e) => setChavrutaPartner(e.target.value)}>
            <option value="">-- Choose --</option>
            <option value="Peer">Peer (equal level)</option>
            <option value="Mentor">Mentor (higher level)</option>
            <option value="Student">Student (lower level)</option>
            <option value="Mixed">Mixed group</option>
            <option value="Child">Child/Teen</option>
            <option value="Other">Other</option>
          </select>
        </>
      )}

      {/* Add Story, Simcha, Dvar, Gematria conditional dropdowns as in previous code snippet */}

      {/* Progress Bar */}
      {progress > 0 && progress < 100 && (
        <div className="w-full bg-gray-200 rounded-full mb-4">
          <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${progress}%` }}>{progress}%</div>
        </div>
      )}

      <label className="block font-semibold mb-1">Your Request:</label>
      <textarea className="w-full p-3 border rounded mb-4" rows={5} value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={getPlaceholder()} />

      <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded w-full" onClick={handleSubmit} disabled={!prompt || !mode}>
        Generate with Guru Mode
      </button>

      <div className="flex flex-wrap gap-2 mt-4">
        <button className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded">Export PDF</button>
        <button className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded">Export Word</button>
        <button className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded">Source Sheet</button>
        <button className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded">Audio Shiur</button>
        <button className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded">Print</button>
      </div>

      <pre className="mt-6 bg-gray-100 p-4 rounded whitespace-pre-wrap font-mono">{output}</pre>
    </main>
  );
}











