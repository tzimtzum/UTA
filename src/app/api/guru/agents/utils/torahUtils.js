// src/app/api/guru/agents/utils/torahUtils.js

export async function fetchTorahSources(prompt) {
  // Placeholder function for fetching Torah sources
  return `📖 Torah Sources for: "${prompt}"
- בראשית א:א
- שמות כ:ב
- דברים ו:ד

(Full source fetching functionality pending full database/API integration)`;
}

export async function fetchBiblicalSources(prompt) {
  // Placeholder for deeper biblical text pattern matching
  return [
    `בראשית א:1 – בריאת העולם`,
    `ישעיהו ב:4 – וחִתְּתוּ חַרְבוֹתָם לְאִתִּים`,
    `דניאל י״ב – קץ הימין`
  ];
} 


// src/app/api/guru/agents/utils/simchaUtils.js

export function generateToneIntro(tone = "balanced", relationship = "friend", typeOfSimcha = "wedding") {
  const toneText = {
    funny: `Let's begin with a smile, because today we're not just celebrating a ${typeOfSimcha}, we're celebrating joy itself!`,
    serious: `This is a sacred moment, and I'd like to reflect on the deep meaning of this ${typeOfSimcha}.`,
    balanced: `As we gather for this special ${typeOfSimcha}, let us balance joy with reflection.`,
    inspiring: `This ${typeOfSimcha} reminds us all of our higher purpose and the blessings we carry.`,
    "over-the-top": `I can barely contain my excitement for this incredible ${typeOfSimcha} – it's legendary!`,
    risque: `With holy chutzpah, let me say something a bit bold about this unforgettable ${typeOfSimcha}...`
  };

  return `${toneText[tone] || toneText["balanced"]}\nAs a proud ${relationship}, it's a privilege to share this moment.`;
}

export function generateBlessings(typeOfSimcha = "wedding") {
  const blessingMap = {
    wedding: `🕊 May the couple be blessed with bayit ne'eman b'Yisrael, joy, and enduring love.`,
    barMitzvah: `🕍 May the Bar Mitzvah boy grow in Torah, mitzvot, and greatness.`,
    batMitzvah: `🌸 May she shine in Torah, kindness, and inner strength.`,
    britMilah: `✡️ May this child enter the covenant with strength and merit a life of Torah and mitzvot.`,
    pidyonHaBen: `💰 May this redemption be a sign of spiritual and physical abundance.`,
    shabbatChatan: `🕯 May this Shabbat bring light and unity to the couple's new journey.`,
    shabbatKallah: `🕯 May this gathering elevate the kallah and bless her path ahead.`,
    upsherin: `✂️ May this milestone mark the start of Torah learning and joyful growth.`,
    general: `🎉 May this simcha overflow with joy, connection, and divine blessing.`
  };

  return blessingMap[typeOfSimcha] || blessingMap["general"];
}
