// Pure scoring. answers: array of chosen answer indexes (0–3), one per question.
import { QUESTIONS, PANELS, TIERS } from './data.js';

export const MAX_PER_QUESTION = 3;

export function total(answers) {
  if (!Array.isArray(answers) || answers.length !== QUESTIONS.length) {
    throw new Error(`Expected ${QUESTIONS.length} answers, got ${answers?.length}`);
  }
  return answers.reduce((sum, a) => {
    if (!Number.isInteger(a) || a < 0 || a > MAX_PER_QUESTION) throw new Error(`Bad answer: ${a}`);
    return sum + a;
  }, 0);
}

export function percent(answers) {
  return Math.round((100 * total(answers)) / (QUESTIONS.length * MAX_PER_QUESTION));
}

export function tierFor(p) {
  const t = TIERS.find((t) => p >= t.min && p <= t.max);
  if (!t) throw new Error(`No tier for ${p}`);
  return t;
}

// Panel score is the sum of its questions (0–6): normal ≤2, borderline 3–4, high ≥5.
export function flag(score) {
  return score >= 5 ? 'high' : score >= 3 ? 'borderline' : 'normal';
}

export function panels(answers) {
  total(answers); // validates
  return PANELS.map((p) => {
    const score = QUESTIONS.reduce((s, q, i) => (q.panel === p.id ? s + answers[i] : s), 0);
    const max = QUESTIONS.filter((q) => q.panel === p.id).length * MAX_PER_QUESTION;
    return { ...p, score, max, flag: flag(score) };
  });
}

export function result(answers) {
  const p = percent(answers);
  return { percent: p, tier: tierFor(p), panels: panels(answers) };
}
