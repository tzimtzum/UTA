// src/app/api/guru/guruEngine.js

import { fetchTorahSources } from "./agents/torahSourcesAgent";
import { runSugyaTreeAgent } from "./agents/sugyaTreeAgent";
import { runChakiraAgent } from "./agents/chakiraAgent";
import { runNafkaMinotAgent } from "./agents/nafkaMinotAgent";
import { runHalachicFlowAgent } from "./agents/halachicFlowAgent";
import { dvarTorahAgent } from "./agents/dvarTorahAgent";
import { teshuvaAgent } from "./agents/teshuvaAgent";

export async function runGuruEngine(prompt, mode, derech) {
  const topic = prompt.trim();

  switch (mode) {
    case "shiur": {
      const sources = await fetchTorahSources(topic, derech);
      const sugyaTree = await runSugyaTreeAgent(topic);
      const chakira = await runChakiraAgent(topic);
      const nafkaMinot = await runNafkaMinotAgent(topic);
      const halachicFlow = await runHalachicFlowAgent(topic);

      return `
## Shiur Mode (${derech} derech)

### 🧩 Sugya Tree:
\`\`\`json
${JSON.stringify(sugyaTree, null, 2)}
\`\`\`

### 📚 Primary Sources:
\`\`\`json
${JSON.stringify(sources, null, 2)}
\`\`\`

### 🧠 Chakira:
\`\`\`json
${JSON.stringify(chakira, null, 2)}
\`\`\`

### 🔍 Nafka Minot:
\`\`\`json
${JSON.stringify(nafkaMinot, null, 2)}
\`\`\`

### 📜 Halachic Flow:
\`\`\`json
${JSON.stringify(halachicFlow, null, 2)}
\`\`\`

### ✅ Compiled by Guru Engine
      `;
    }

    case "teshuva": {
      const { instructions } = await teshuvaAgent(prompt, derech);
      return instructions;
    }

    case "dvar-torah": {
      const { instructions } = await dvarTorahAgent(prompt, derech);
      return instructions;
    }

    case "chavruta": {
      const sources = await fetchTorahSources(topic, derech);
      const sugyaTree = await runSugyaTreeAgent(topic);

      return `
## 🧠 Chavruta Mode: Guided Study on "${topic}"

### 📚 Primary Sources:
\`\`\`json
${JSON.stringify(sources, null, 2)}
\`\`\`

### 🌳 Sugya Tree:
\`\`\`json
${JSON.stringify(sugyaTree, null, 2)}
\`\`\`

Study each source. After each Hebrew section, ask:
- What is the basic pshat?
- Why might the sages have ruled this way?
- Are there any contradictions to address?
- How do Rishonim/Poskim use this?

🗂 Derech HaLimud: ${derech}
      `;
    }

    default:
      return `${prompt}`;
  }
}
