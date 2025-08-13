
import { qcFeedbackBasic } from '../domain/qc';

export async function runFeedbackQC(input: {
  stars: [number, number, number];
  text: string;
  actions: string[];
}) {
  // Basic checks first
  const base = qcFeedbackBasic(input);
  if (!process.env.FEATURE_QC_LLM || process.env.FEATURE_QC_LLM === 'false') {
    return base;
  }

  // Placeholder for LLM-powered clarity/specificity checks
  // Intentionally provider-agnostic; wire your LLM of choice here.
  // Example shape:
  /*
  const llmVerdict = await callLLM({
    task: 'Evaluate clarity/specificity/professional tone of feedback',
    input,
  });
  */
  return base; // Merge LLM verdict when implemented
}
