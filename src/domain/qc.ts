
/**
 * Feedback QC checks
 * - ≥200 words
 * - 3 distinct actions
 * - Three star categories provided (1..5)
 * - Tone & boilerplate checks (basic heuristic; optional LLM enrichment)
 */
export type FeedbackInput = {
  stars: [number, number, number];
  text: string;
  actions: string[];
};

export type QCReport = {
  ok: boolean;
  status: 'PASSED' | 'REVISE' | 'FAILED';
  reasons: string[];
  wordCount: number;
};

export function qcFeedbackBasic(input: FeedbackInput): QCReport {
  const reasons: string[] = [];
  const wordCount = input.text.trim().split(/\s+/).filter(Boolean).length;

  // stars
  const starsOk = input.stars.length === 3 && input.stars.every(s => Number.isFinite(s) && s >= 1 && s <= 5);
  if (!starsOk) reasons.push('All three star categories must be filled 1–5.');

  // words
  if (wordCount < 200) reasons.push('Feedback must be at least 200 words.');

  // actions
  const dedup = Array.from(new Set(input.actions.map(a => a.trim()).filter(Boolean)));
  if (dedup.length < 3) reasons.push('Provide at least 3 concrete, distinct action items.');

  // boilerplate heuristic
  const boilerplateSignals = ['great candidate', 'good job', 'nice conversation', 'keep it up', 'N/A', 'na'];
  const boilerplateHits = boilerplateSignals.filter(sig => input.text.toLowerCase().includes(sig));
  if (boilerplateHits.length >= 2) {
    reasons.push('Feedback seems boilerplate. Add specifics about strengths, gaps, and next steps.');
  }

  const ok = reasons.length === 0;
  return { ok, status: ok ? 'PASSED' : 'REVISE', reasons, wordCount };
}
