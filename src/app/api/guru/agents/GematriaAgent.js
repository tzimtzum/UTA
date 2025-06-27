// src/app/api/guru/agents/GematriaAgent.js

import { calculateGematria, normalize } from "./utils/gematriaUtils";

/**
 * Guru-level Gematria analysis engine.
 * Accepts Hebrew text or number queries and returns matching values, insights, and correlations.
 */
export default async function GematriaAgent(input) {
  if (!input) return { error: "No input provided." };

  // Normalize input
  const cleanInput = normalize(input);

  // Calculate values using different systems
  const standard = calculateGematria(cleanInput, 'standard');
  const gadol = calculateGematria(cleanInput, 'gadol');
  const katan = calculateGematria(cleanInput, 'katan');
  const ordinal = calculateGematria(cleanInput, 'ordinal');

  // Guru interpretation layer (stubbed — can expand later with commentary)
  const commentary = `Guru Insight: The standard gematria of '${input}' is ${standard}.

This number can correspond to significant pesukim, names, or midrashic symbols. Deeper correlations can be explored via Torah databases.`;

  return {
    input: cleanInput,
    methods: {
      standard,
      gadol,
      katan,
      ordinal
    },
    commentary
  };
}
