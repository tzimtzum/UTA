// src/app/api/guru/agents/guruCheckAgent.js

export async function runGuruCheckAgent(finalOutput, gvw) {
  const errors = [];

  const {
    sources,
    sugyaTree,
    chakira,
    nafkaMinot,
    halachicFlow,
    mode,
    derech,
    trace
  } = gvw;

  // === Content Quality Verification ===

  if (!sources || sources.length < 3) {
    errors.push("📘 Too few Torah sources (<3).");
  }

  if (!Array.isArray(sugyaTree) || sugyaTree.length < 2) {
    errors.push("🌲 Sugya tree is missing or shallow.");
  }

  if (!chakira || (!chakira.chakira && !chakira.question)) {
    errors.push("🔎 Chakira section is missing.");
  }

  if (!nafkaMinot || nafkaMinot.length < 2) {
    errors.push("⚖️ Too few nafka minot.");
  }

  if (!halachicFlow || Object.keys(halachicFlow).length < 2) {
    errors.push("📜 Halachic flow incomplete.");
  }

  // === Output Formatting Check ===
  const hasHebrew = finalOutput.match(/[\u0590-\u05FF]/);
  const hasEnglish = /Rambam|Shulchan Aruch|Translation|Mishna/i.test(finalOutput);

  if (!hasHebrew) errors.push("🈚 Hebrew text not detected in final output.");
  if (!hasEnglish) errors.push("🈯 English translation or terms not detected.");

  // === Final Verification ===
  if (errors.length) {
    return {
      verified: false,
      message: `🛑 GuruCheck failed:\n\n${errors.join("\n")}`
    };
  }

  return {
    verified: true,
    message: "✅ GuruCheck passed. All components validated."
  };
}

