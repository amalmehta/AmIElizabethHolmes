import { QUESTIONS, PANELS, OUTCOME, SITE_URL } from './data.js';
import { result } from './score.js';

const $ = (id) => document.getElementById(id);
const state = { i: 0, answers: new Array(QUESTIONS.length).fill(null) };

// ---------- Rendering ----------

export function slipHTML(r, { stamp = true } = {}) {
  const rows = r.panels.map((p) => `
    <div class="slip-row" data-flag="${p.flag}">
      <span>${p.name}</span>
      <span class="meter"><i style="width:${Math.max(4, (100 * p.score) / p.max)}%"></i></span>
      <span class="flag">${p.flag === 'high' ? 'High ▲' : p.flag}</span>
      <span class="n">${p.score}/${p.max}</span>
    </div>`).join('');
  return `
    <div class="slip-head"><span>Fraud panel · specimen: you</span><span>1 drop · 2 min</span></div>
    <div class="slip-rows">${rows}</div>
    <div class="slip-foot">
      <div class="verdict-num">${r.percent}<small>%</small></div>
      <div class="verdict-name">${r.tier.name}</div>
      <p class="verdict-line">${r.tier.line}</p>
      ${stamp ? '<span class="stamp">For fun · not a diagnosis</span>' : ''}
    </div>`;
}

function show(id) {
  for (const s of document.querySelectorAll('.screen')) s.classList.toggle('on', s.id === id);
  window.scrollTo({ top: 0 });
}

function renderQuestion() {
  const q = QUESTIONS[state.i];
  const chosen = state.answers[state.i];
  $('count').textContent = `${state.i + 1} / ${QUESTIONS.length}`;
  $('bar').style.transform = `scaleX(${(state.i + (chosen !== null ? 1 : 0)) / QUESTIONS.length})`;
  $('question').textContent = q.q;
  $('answers').innerHTML = q.answers.map((a, k) => `
    <li><button class="answer" data-k="${k}" aria-pressed="${chosen === k}"><kbd>${k + 1}</kbd><span>${a}</span></button></li>`).join('');
  $('fact-text').textContent = q.fact;
  $('fact-src').textContent = `Source: ${q.source.name}`;
  $('fact-src').href = q.source.url;
  $('quiz').classList.toggle('answered', chosen !== null);
  $('next').innerHTML = state.i === QUESTIONS.length - 1 ? 'See my results <kbd>↵</kbd>' : 'Next <kbd>↵</kbd>';
  $('back').hidden = state.i === 0;
  // Restart the screen-in animation so each question eases in.
  const s = $('quiz'); s.classList.remove('on'); void s.offsetWidth; s.classList.add('on');
}

function choose(k) {
  state.answers[state.i] = k;
  for (const b of $('answers').querySelectorAll('.answer')) b.setAttribute('aria-pressed', String(+b.dataset.k === k));
  $('quiz').classList.add('answered');
  $('bar').style.transform = `scaleX(${(state.i + 1) / QUESTIONS.length})`;
}

function next() {
  if (state.answers[state.i] === null) return;
  if (state.i < QUESTIONS.length - 1) { state.i++; renderQuestion(); window.scrollTo({ top: 0 }); }
  else renderResult();
}

function back() {
  if (state.i > 0) { state.i--; renderQuestion(); }
  else show('intro');
}

function shareURL(r) { return `${SITE_URL}r/${r.tier.id}/?p=${r.percent}`; }

function renderResult() {
  const r = result(state.answers);
  $('slip').innerHTML = slipHTML(r);
  const text = `I’m ${r.percent}% Elizabeth Holmes. “${r.tier.line}”\n\nTake the fraud panel (1 drop, 2 min):`;
  $('share').href = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareURL(r))}`;
  $('copy').onclick = () => copy(shareURL(r));
  show('result');
}

function start() {
  state.i = 0; state.answers.fill(null);
  show('quiz'); renderQuestion();
}

async function copy(text) {
  try { await navigator.clipboard.writeText(text); toast('Link copied'); }
  catch { prompt('Copy this link:', text); }
}

let toastTimer;
function toast(msg) {
  const t = $('toast'); t.textContent = msg; t.classList.add('on');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('on'), 1600);
}

// ---------- Settings ----------

const store = {
  get(k) { try { return localStorage.getItem(k) || 'auto'; } catch { return 'auto'; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} },
};
function applyPref(name, v) {
  const el = document.documentElement;
  if (v === 'auto') delete el.dataset[name]; else el.dataset[name] = v;
}
function openSettings() {
  const d = $('settings');
  for (const name of ['theme', 'motion']) {
    const v = store.get(`aieh-${name}`);
    d.querySelector(`input[name=${name}][value=${v}]`).checked = true;
  }
  d.showModal();
}
$('settings').addEventListener('change', (e) => {
  const { name, value } = e.target;
  store.set(`aieh-${name}`, value); applyPref(name, value);
});

// ---------- Wiring ----------

$('start').onclick = start;
$('next').onclick = next;
$('back').onclick = back;
$('again').onclick = start;
$('open-settings').onclick = openSettings;
$('answers').addEventListener('click', (e) => {
  const b = e.target.closest('.answer'); if (b) choose(+b.dataset.k);
});

document.addEventListener('keydown', (e) => {
  if ($('settings').open || e.altKey || e.ctrlKey) return;
  if (e.key === ',' ) { e.preventDefault(); openSettings(); return; }
  if (e.metaKey) return;
  const on = document.querySelector('.screen.on')?.id;
  if (e.key === 'Enter' && e.target.closest?.('button, a, summary')) return; // native click handles it
  if (on === 'intro' && e.key === 'Enter') { e.preventDefault(); start(); }
  else if (on === 'quiz') {
    if (/^[1-4]$/.test(e.key)) choose(+e.key - 1);
    else if (e.key === 'Enter') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft') back();
  }
});

$('sample-slip').innerHTML = slipHTML(result([3, 2, 1, 2, 3, 2, 0, 2, 1, 2]), { stamp: false });
$('sources').innerHTML = [...QUESTIONS, OUTCOME].map((q) =>
  `<li><a href="${q.source.url}" target="_blank" rel="noopener">${q.source.name}</a>: ${q.fact}</li>`).join('');

// Debug hook for end-to-end checks; harmless in production.
window.__aieh = { state, start, choose, next };

// Demo mode for screenshots and testing: #answers=3,2,1,2,3,2,0,2,1,2 jumps to that result;
// #q=1 opens question 1 with answer 4 picked.
const demo = location.hash.match(/^#answers=([0-3](?:,[0-3]){9})$/);
const q1 = location.hash === '#q=1';
if (demo) { state.answers = demo[1].split(',').map(Number); renderResult(); }
else if (q1) { start(); choose(3); }
