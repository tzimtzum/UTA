'use client';
import { useState, useEffect } from 'react';
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

  const [shiurAudience, setShiurAudience] = useState('');
  const [chavrutaPartner, setChavrutaPartner] = useState('');
  const [storyType, setStoryType] = useState('');
  const [storyAudience, setStoryAudience] = useState('');
  const [simchaType, setSimchaType] = useState('');
  const [simchaTone, setSimchaTone] = useState('');
  const [dvarOccasion, setDvarOccasion] = useState('');
  const [dvarStyle, setDvarStyle] = useState('');
  const [gematriaType, setGematriaType] = useState('');
  const [deliverables, setDeliverables] = useState({});

  const derechOptions = {
    Tanach: ["No Specific Derech", "Choose For Me", "Other", "Nechama Leibowitz", "Rav Menachem Leibtag", "Shani Taragin", "Rav Yaakov Medan"],
    Halacha: ["No Specific Derech", "Choose For Me", "Other", "Rav Asher Weiss", "Rav Hershel Schachter", "Rav Willig", "Rav Ovadia Yosef"],
    Iyyun: ["No Specific Derech", "Choose For Me", "Other", "Brisk", "Rav Aharon Lichtenstein", "Rav Rosensweig", "Rav Shach"],
    Chassidus: ["No Specific Derech", "Choose For Me", "Other", "Lubavitcher Rebbe", "Rav Yitzchak Ginsburgh", "Rav Moshe Weinberger", "Rav Elimelech of Lizhensk"],
    Mussar: ["No Specific Derech", "Choose For Me", "Other", "Rav Dessler", "Rav Yisrael Salanter", "Rav Shlomo Wolbe"],
    Other: ["No Specific Derech", "Choose For Me", "Other", "General Style"]
  };

  const hebrewKeyboardRows = [
    ["ק", "ר", "א", "ט", "ו", "ן", "ם", "פ"],
    ["ש", "ד", "ג", "כ", "ע", "י", "ח", "ל", "ך", "ף"],
    ["ז", "ס", "ב", "ה", "נ", "מ", "צ", "ת", "ץ"]
  ];

  useEffect(() => {
    try {
      const today = new Date();
      const hdate = new HDate(today);
      setHebrewDate(hdate.renderGematriya());
    } catch (err) {
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

  const renderDeliverables = () => {
    let options = [];
    if (mode === 'shiur') {
      options = [
        'Source sheets (with/without translation)',
        'Teaching materials & worksheets',
        'Tests & quizzes',
        'Discussion questions',
        'Svaras & nafka minot',
        'Moral lessons',
        'Sugya trees & charts',
        'Maps & timelines',
        'Biographies of authors',
        'Curriculum breakdown',
        'Audio shiur',
      ];
    } else if (mode === 'chavruta') {
      options = [
        'Full Hebrew text',
        'English translation',
        'Interwoven explanations',
        'Sugya trees',
        'Charts',
        'Review questions',
        'Audio shiur',
      ];
    } else if (mode === 'gematria') {
      options = [
        'Numeric breakdown chart',
        'Matching words & pesukim',
        'Create Dvar Torah from result',
        'Printable summary',
      ];
    } else if (mode === 'simcha' || mode === 'story' || mode === 'dvar') {
      options = [
        'Printable text',
        'Talking points summary',
        'Key moral lessons',
        'Emotional highlights',
        'Halachic sources if relevant',
        'Story integration',
        'Audio shiur',
      ];
    }
    return options.map((item) => (
      <div key={item} className="flex items-center mb-1">
        <input
          type="checkbox"
          className="mr-2"
          checked={deliverables[item] || false}
          onChange={(e) => setDeliverables({ ...deliverables, [item]: e.target.checked })}
        />
        <label>{item}</label>
      </div>
    ));
  };

  const getPlaceholder = () => {
    if (mode === 'shiur' || mode === 'chavruta') {
      if (topic === 'Tanach' && derech === "Other") return `Develop a shiur on Tanach. Please add the teacher's style in the text box if you'd like.`;
      if (topic === 'Halacha' && derech === "Other") return `Build a shiur on Halacha. Please specify teacher style in text box if desired.`;
      if (topic === 'Iyyun' && derech === "Other") return `Analyze a sugya. Please specify teacher style in text box if desired.`;
      if (topic === 'Chassidus' && derech === "Other") return `Prepare a chassidic shiur. Please specify teacher style in text box if desired.`;
      if (topic === 'Mussar' && derech === "Other") return `Deliver a mussar shiur. Please specify teacher style in text box if desired.`;
      return "Describe your shiur idea...";
    }
    switch (mode) {
      case 'quick': return 'e.g., What is a shaliach l’dvar aveirah?';
      case 'dvar': return 'e.g., A Dvar Torah for Shabbat with moral lesson.';
      case 'story': return 'e.g., A chassidic story for Parshat Toldot.';
      case 'simcha': return 'e.g., Speech for a Bar Mitzvah.';
      case 'gematria': return 'Insert a Hebrew word, number, or passuk here.';
      default: return 'Enter your Torah query or request...';
    }
  };

  return (
    <main className="p-6 max-w-3xl mx-auto font-serif text-lg">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-2">Ultimate Torah Assistant (Guru Mode)</h1>
      <p className="text-center italic mb-1">
        מה־אהבתי תורתך כל־היום היא שיחתי<br />
        <span className="text-sm">"How I love Your Torah; all day it is my meditation" (תהילים קי״ט:צ״ז)</span>
      </p>
      <p className="text-center text-sm mb-6">📅 {hebrewDate}</p>

      {/* Learner Profile */}
      <button
        className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded mb-4"
        onClick={() => setProfileOpen(!profileOpen)}
      >
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

      {/* Mode selection */}
      <label className="block font-semibold mb-1">Select Mode:</label>
      <select
        className="w-full p-2 border rounded mb-4"
        value={mode}
        onChange={(e) => setMode(e.target.value)}
      >
        <option value="">-- Choose --</option>
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

      {/* Deliverables */}
      {renderDeliverables().length > 0 && (
        <div className="border p-3 rounded mb-4 bg-gray-50">
          <p className="font-semibold mb-2">Select Deliverables:</p>
          {renderDeliverables()}
        </div>
      )}

      {/* Explanation for gematria */}
      {mode === 'gematria' && (
        <p className="mb-2 text-sm bg-yellow-100 p-2 rounded">
          Gematria is a form of learning Torah by assigning numerical value to a name, word, or phrase, or by reading a number as text. You can enter a number, Hebrew word, or passuk. Example: "What is the gematria of Shemot 13:3? What other words have the same value and why?"
        </p>
      )}

      {/* Request box */}
      <label className="block font-semibold mb-1">Your Request:</label>
      <textarea
        className="w-full p-3 border rounded mb-2"
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={getPlaceholder()}
      />

      {/* Hebrew keyboard */}
      {mode === 'gematria' && hebrewKeyboardRows.map((row, idx) => (
        <div key={idx} className="flex justify-center mb-1">
          {row.map((letter) => (
            <button
              key={letter}
              className="border px-2 py-1 mx-0.5 rounded"
              onClick={() => setPrompt((prev) => prev + letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}

      {/* Progress bar */}
      {progress > 0 && progress < 100 && (
        <div className="w-full bg-gray-200 rounded-full mb-4">
          <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${progress}%` }}>{progress}%</div>
        </div>
      )}

      <button
        className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded w-full"
        onClick={handleSubmit}
        disabled={!prompt}
      >
        Generate with Guru Mode
      </button>

      {output && (
        <div className="flex flex-wrap gap-2 mt-4">
          <button className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded">Export PDF</button>
          <button className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded">Export Word</button>
          <button className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded">Source Sheet</button>
          <button className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded">Audio Shiur</button>
          <button className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded">Print</button>
        </div>
      )}

      <pre className="mt-6 bg-gray-100 p-4 rounded whitespace-pre-wrap font-mono">{output}</pre>
    </main>
  );
}



























