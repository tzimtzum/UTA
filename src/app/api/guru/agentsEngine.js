// src/app/api/guru/agentsEngine.js

import { fetchTorahSources } from "./agents/torahSourcesAgent";
import { runSugyaTreeAgent } from "./agents/sugyaTreeAgent";
import { runChakiraAgent } from "./agents/chakiraAgent";
import { runNafkaMinotAgent } from "./agents/nafkaMinotAgent";
import { runHalachicFlowAgent } from "./agents/halachicFlowAgent";
import { runChavrutaAgent } from "./agents/chavrutaAgent";
import { runTeshuvaAgent } from "./agents/teshuvaAgent";
import { runDvarTorahAgent } from "./agents/dvarTorahAgent";
import { composeGuruResponse } from "./guruComposer";

export async function runGuruEngine(prompt, mode, derech) {
  const topic = prompt;

  try {
    const sources = await fetchTorahSources(topic, derech);
    const sugyaTreeRaw = await runSugyaTreeAgent(topic);
    const chakiraRaw = await runChakiraAgent(topic);
    const nafkaMinot = await runNafkaMinotAgent(topic);
    const halachicFlow = await runHalachicFlowAgent(topic);

    const sugyaTree = sugyaTreeRaw?.sugyaTree || sugyaTreeRaw;
    const chakira = chakiraRaw?.chakira || chakiraRaw;

    // 🔀 Dynamic Mode Handling
    if (mode === "chavruta") {
      const chavrutaOutput = await runChavrutaAgent(prompt, derech);
      return chavrutaOutput || "❌ Chavruta Agent failed.";
    }

    if (mode === "teshuva") {
      const teshuvaOutput = await runTeshuvaAgent(prompt, derech);
      return teshuvaOutput || "❌ Teshuva Agent failed.";
    }

    if (mode === "dvar-torah") {
      const dvarOutput = await runDvarTorahAgent(prompt, derech);
      return dvarOutput || "❌ Dvar Torah Agent failed.";
    }

    // 🧠 Default: Shiur Mode (multi-agent composition)
    const composed = composeGuruResponse({
      sources,
      sugyaTree,
      chakira,
      nafkaMinot,
      halachicFlow,
      mode
    });

    return composed || "❌ Composition failed.";
  } catch (err) {
    console.error("Guru Engine failure:", err);
    return "❌ Guru Engine crashed.";
  }
}

}

