// Generates the share pages (r/<tier>/index.html), the X cards (og/*.png) and the icons
// from js/data.js. Needs rsvg-convert (brew install librsvg). Run: npm run build
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TIERS, SITE_URL } from '../js/data.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const png = (svg, out, w, h) => execFileSync('rsvg-convert', ['-w', String(w), '-h', String(h), '-o', join(root, out)], { input: svg });

const DROP = 'M32 7C32 7 13 29.5 13 41.5a19 19 0 0 0 38 0C51 29.5 32 7 32 7Z';

function card({ kicker, title, line, cta = 'Am I Elizabeth Holmes? Take the test →' }) {
  // Long titles step down a size so they never overflow 1200px.
  const size = title.length > 20 ? 76 : 92;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FAF7F2"/>
  <rect x="60" y="60" width="1080" height="510" rx="10" fill="#FFFDF8" stroke="#E7E0D5" stroke-width="2"/>
  <line x1="100" y1="150" x2="1100" y2="150" stroke="#E7E0D5" stroke-width="2" stroke-dasharray="8 8"/>
  <g transform="translate(100 82) scale(0.9)"><path d="${DROP}" fill="#B5573B"/></g>
  <text x="168" y="122" font-family="Menlo, monospace" font-size="24" letter-spacing="3" fill="#6B645B">FRAUD PANEL · 1 DROP · 2 MIN</text>
  <text x="100" y="250" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#6B645B">${esc(kicker)}</text>
  <text x="100" y="${250 + size + 10}" font-family="Georgia, serif" font-size="${size}" fill="#1F1B16">${esc(title)}</text>
  <text x="100" y="${250 + size + 80}" font-family="Helvetica, Arial, sans-serif" font-size="34" fill="#6B645B">${esc(line)}</text>
  <text x="100" y="520" font-family="Georgia, serif" font-size="30" fill="#3E5C76">${esc(cta)}</text>
  <g transform="rotate(-8 990 505)"><rect x="880" y="480" width="220" height="48" rx="6" fill="none" stroke="#B5573B" stroke-width="3"/>
  <text x="990" y="512" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="18" letter-spacing="3" fill="#B5573B">FOR FUN ONLY</text></g>
</svg>`;
}

function page(t) {
  const url = `${SITE_URL}r/${t.id}/`;
  const img = `${SITE_URL}og/${t.id}.png`;
  const title = `Verdict: ${t.name}`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} · Am I Elizabeth Holmes?</title>
<meta name="description" content="${esc(t.line)} Take the 10-question fraud panel.">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(t.line)} Take the 10-question fraud panel.">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${img}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(t.line)}">
<meta name="twitter:image" content="${img}">
<link rel="icon" href="../../icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="../../apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:opsz,wght@6..72,400;6..72,500&display=swap">
<link rel="stylesheet" href="../../css/style.css">
<script>try{const t=localStorage.getItem('aieh-theme');if(t&&t!=='auto')document.documentElement.dataset.theme=t}catch(e){}</script>
</head>
<body>
<main>
  <section class="screen intro on">
    <img class="mark" src="../../icon.svg" alt="" width="56" height="56">
    <div class="after-mark">
      <p class="small" id="who">Someone you know took the fraud panel.</p>
      <h1>${esc(t.name)}</h1>
      <p class="lede">${esc(t.line)}</p>
      <div class="row">
        <a class="btn primary" href="../../">Take the test yourself</a>
        <span class="small">10 questions, 2 minutes. Every joke is a cited fact.</span>
      </div>
    </div>
  </section>
</main>
<footer><span>Satire. Not affiliated with anyone. Scores are invented; facts are cited.</span></footer>
<script>
  const p = Number(new URLSearchParams(location.search).get('p'));
  if (Number.isInteger(p) && p >= ${t.min} && p <= ${t.max}) document.getElementById('who').textContent = 'Someone you know scored ' + p + '% Elizabeth Holmes.';
</script>
</body>
</html>
`;
}

mkdirSync(join(root, 'og'), { recursive: true });
for (const t of TIERS) {
  mkdirSync(join(root, 'r', t.id), { recursive: true });
  writeFileSync(join(root, 'r', t.id, 'index.html'), page(t));
  png(card({ kicker: 'Verdict', title: t.name, line: t.line }), `og/${t.id}.png`, 1200, 630);
}
png(card({ kicker: 'A 10-question fraud panel', title: 'Am I Elizabeth Holmes?', line: 'Results guaranteed. Unlike some.', cta: 'Ten questions, two minutes →' }), 'og/home.png', 1200, 630);

const icon = readFileSync(join(root, 'icon.svg'));
png(icon, 'favicon.png', 64, 64);
png(icon, 'apple-touch-icon.png', 180, 180);
console.log(`Built ${TIERS.length} share pages, ${TIERS.length + 1} cards, 2 icons.`);
