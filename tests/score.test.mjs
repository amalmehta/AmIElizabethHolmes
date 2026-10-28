import { test } from 'node:test';
import assert from 'node:assert/strict';
import { QUESTIONS, PANELS, TIERS, OUTCOME } from '../js/data.js';
import { total, percent, tierFor, flag, panels, result } from '../js/score.js';

const all = (n) => QUESTIONS.map(() => n);

test('data: 10 questions, 4 answers each, every fact sourced', () => {
  assert.equal(QUESTIONS.length, 10);
  for (const q of QUESTIONS) {
    assert.equal(q.answers.length, 4, q.q);
    assert.ok(PANELS.some((p) => p.id === q.panel), q.panel);
    assert.match(q.source.url, /^https:\/\//);
    assert.ok(q.fact.length > 20 && q.source.name);
  }
  assert.match(OUTCOME.source.url, /^https:\/\//);
});

test('data: every panel has exactly 2 questions', () => {
  for (const p of PANELS) assert.equal(QUESTIONS.filter((q) => q.panel === p.id).length, 2, p.id);
});

test('data: tiers cover 0–100 with no gaps or overlaps', () => {
  for (let p = 0; p <= 100; p++) {
    assert.equal(TIERS.filter((t) => p >= t.min && p <= t.max).length, 1, `p=${p}`);
  }
});

test('extremes', () => {
  assert.equal(percent(all(0)), 0);
  assert.equal(percent(all(3)), 100);
  assert.equal(result(all(0)).tier.id, 'honest');
  assert.equal(result(all(3)).tier.id, 'holmes');
});

test('tier boundaries', () => {
  const cases = [[15, 'honest'], [16, 'roundsup'], [35, 'roundsup'], [36, 'prerev'],
    [55, 'prerev'], [56, 'audit'], [80, 'audit'], [81, 'holmes']];
  for (const [p, id] of cases) assert.equal(tierFor(p).id, id, `p=${p}`);
});

test('percent rounds: 5/30 = 16.7% → 17', () => {
  assert.equal(percent([3, 2, 0, 0, 0, 0, 0, 0, 0, 0]), 17);
});

test('panel flags', () => {
  assert.deepEqual([0, 2, 3, 4, 5, 6].map(flag),
    ['normal', 'normal', 'borderline', 'borderline', 'high', 'high']);
  const ps = panels([3, 3, 0, 0, 2, 1, 0, 0, 0, 0]);
  assert.equal(ps.find((p) => p.id === 'demo').flag, 'high');
  assert.equal(ps.find((p) => p.id === 'persona').flag, 'borderline');
  assert.equal(ps.find((p) => p.id === 'claims').max, 6);
});

test('rejects incomplete or invalid answers', () => {
  assert.throws(() => total([0, 1]));
  assert.throws(() => total(undefined));
  assert.throws(() => total([...all(0).slice(1), 4]));
  assert.throws(() => total([...all(0).slice(1), 1.5]));
  assert.throws(() => tierFor(101));
});
