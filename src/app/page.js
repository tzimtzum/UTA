'use client';
import { useState, useEffect, useRef } from 'react';
import { HDate } from '@hebcal/core';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState('');
  const [topic, setTopic] = useState('');
  const [derech, setDerech] = useState('');
  const [output, setOutput] = useState('');
  const [hebrewDate, setHebrewDate] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const [profile, setProfile] = useState({ level: '', affiliation: '', years: '', notes: '' });
  const [progress, setProgress] = useState(0);
  const [placeholder, setPlaceholder] = useState('Describe your request...');
  const outputRef = useRef(null);

  const [shiurAudience, setShiurAudience] = useState('');
  const [chavrutaPartner, setChavrutaPartner] = useState('');
  const [storyType, setStoryType] = useState('');
  const [storyAudience, setStoryAudience] = useState('');
  const [simchaType, setSimchaType] = useState('');
  const [simchaTone, setSimchaTone] = useState('');
  const [dvarOccasion, setDvarOccasion] = useState('');
  const [dvarStyle, setDvarStyle] = useState('');
  const [gematriaType, setGematriaType] = useState('');
  const [deliverables, setDeliverables] = useState({ sourceSheet: false, audio: false, chart: false, summary: false, teacherGuide: false });

  const derechOptions = {
    Tanach: ["No Specific Derech", "Choose For Me", "Other", "Nechama Leibowitz", "Rav Menachem Leibtag", "Shani Taragin", "Rav Yaakov Medan"],
    Halacha: ["No Specific Derech", "Choose For Me", "Other", "Rav Asher Weiss", "Rav Hershel Schachter", "Rav Willig", "Rav Ovadia Yosef"],
    Iyyun: ["No Specific Derech", "Choose For Me", "Other", "Brisk", "Rav Aharon Lichtenstein", "Rav Rosensweig", "Rav Shach"],
    Chassidus: ["No Specific Derech", "Choose For Me", "Other", "Lubavitcher Rebbe", "Rav Yitzchak Ginsburgh", "Rav Moshe Weinberger", "Rav Elimelech of Lizhensk"],
    Mussar: ["No Specific Derech", "Choose For Me", "Other", "Rav Dessler", "Rav Yisrael Salanter", "Rav Shlomo Wolbe"],
    Other: ["No Specific Derech", "Choose For Me", "Other", "General Style"]
  };

  useEffect(() => {
    try {
      const today = new Date();
      const hdate = new HDate(today);
      setHebrewDate(hdate.renderGematriya());
    } catch (err) {
      setHebrewDate('⚠️ Error calculating date.');
    }
  }, []);

  useEffect(() => {
    if (mode === 'shiur') setPlaceholder('Enter a sugya or shiur topic...');
    else if (mode === 'story') setPlaceholder('Describe the story goal or characters...');
    else if (mode === 'gematria') setPlaceholder('Enter a Hebrew word or phrase...');
    else if (mode === 'dvar') setPlaceholder('What theme or occasion is the Dvar Torah for?');
    else setPlaceholder('Describe your request...');
  }, [mode]);

  const handleSubmit = async () => {
    setOutput('⏳ Processing with Guru Mode...');
    setProgress(10);
    try {
      const res = await fetch('/api/guru', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          mode,
          topic,
          derech,
          profile,
          shiurAudience,
          chavrutaPartner,
          storyType,
          storyAudience,
          simchaType,
          simchaTone,
          dvarOccasion,
          dvarStyle,
          gematriaType,
          deliverables
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

  const handleCopy = () => {
    if (outputRef.current) {
      navigator.clipboard.writeText(outputRef.current.innerText);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`<pre>${outputRef.current.innerText}</pre>`);
    printWindow.document.close();
    printWindow.print();
  };

  const handleDownload = () => {
    const blob = new Blob([outputRef.current.innerText], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'guru-output.txt';
    link.click();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-1">Ultimate Torah Assistant (Guru Mode)</h1>
      <p className="text-center italic mb-1">
        מה־אהבתי תורתך כל־היום היא שיחתי<br />
        <span className="text-sm">"How I love Your Torah; all day it is my meditation" (תהילים קי״ט:צ״ז)</span>
      </p>
      <p className="text-center text-sm mb-4">📅 {hebrewDate}</p>

      <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded mb-4" onClick={() => setProfileOpen(!profileOpen)}>
        {profileOpen ? "Hide Learner Profile" : "Edit Learner Profile"}
      </button>

      {profileOpen && (
        <div className="border p-3 rounded mb-4 bg-gray-50">
          <label>Level:</label>
          <input type="text" className="w-full mb-2 p-1 border" value={profile.level} onChange={(e) => setProfile({ ...profile, level: e.target.value })} />
          <label>Affiliation:</label>
          <input type="text" className="w-full mb-2 p-1 border" value={profile.affiliation} onChange={(e) => setProfile({ ...profile, affiliation: e.target.value })} />
          <label>Years of Learning:</label>
          <input type="text" className="w-full mb-2 p-1 border" value={profile.years} onChange={(e) => setProfile({ ...profile, years: e.target.value })} />
          <label>Notes:</label>
          <textarea className="w-full mb-2 p-1 border" rows={2} value={profile.notes} onChange={(e) => setProfile({ ...profile, notes: e.target.value })} />
        </div>
      )}

      <label>Mode:</label>
      <select className="w-full mb-4 p-2 border" value={mode} onChange={(e) => setMode(e.target.value)}>
        <option value="">-- Select Mode --</option>
        <option value="shiur">Shiur Developer</option>
        <option value="chavruta">Chavruta Mode</option>
        <option value="quick">Quick Question</option>
        <option value="dvar">Dvar Torah</option>
        <option value="story">Story</option>
        <option value="simcha">Simcha Speech</option>
        <option value="gematria">Gematria</option>
        <option value="transcription">Transcription</option>
        <option value="random">Random Teaching</option>
      </select>

      <label>Topic:</label>
      <select className="w-full mb-4 p-2 border" value={topic} onChange={(e) => setTopic(e.target.value)}>
        <option value="">-- Select Topic --</option>
        {Object.keys(derechOptions).map((key) => (
          <option key={key} value={key}>{key}</option>
        ))}
      </select>

      <label>Derech Halimud:</label>
      <select className="w-full mb-4 p-2 border" value={derech} onChange={(e) => setDerech(e.target.value)}>
        {(derechOptions[topic] || ["Choose a topic first"]).map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      <label>Prompt:</label>
      <textarea className="w-full mb-4 p-2 border font-hebrew" rows={5} placeholder={placeholder} value={prompt} onChange={(e) => setPrompt(e.target.value)} />

      <div className="mb-4">
        <label className="block font-semibold mb-1">Deliverables:</label>
        {Object.keys(deliverables).map((key) => (
          <div key={key} className="flex items-center mb-1">
            <input type="checkbox" className="mr-2" checked={deliverables[key]} onChange={(e) => setDeliverables({ ...deliverables, [key]: e.target.checked })} />
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
          </div>
        ))}
      </div>

      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full" onClick={handleSubmit} disabled={!prompt}>
        Submit to Guru
      </button>

      {progress > 0 && progress < 100 && (
        <div className="w-full bg-gray-200 rounded-full mt-4">
          <div className="bg-green-600 text-xs text-white text-center p-1 rounded-full" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}

      {output && (
        <div className="mt-4">
          <div className="flex gap-2 mb-2">
            <button className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded" onClick={handleCopy}>Copy</button>
            <button className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded" onClick={handlePrint}>Print</button>
            <button className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded" onClick={handleDownload}>Download</button>
            <button className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded">Source Sheet</button>
            <button className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded">Audio</button>
          </div>
          <pre ref={outputRef} className="bg-gray-100 p-4 rounded whitespace-pre-wrap font-mono">{output}</pre>
        </div>
      )}
    </div>
  );
}


























