# Instructions

## Run it locally

The site is plain static files, so any static server works. It needs no install.

```bash
python3 -m http.server 8643
```

Then open http://localhost:8643. (Opening `index.html` as a `file://` page won't work, because browsers block ES modules there.)

## Use it

1. **Start the test**, or press Enter.
2. Answer with a click or with the keys **1–4**. The real fact behind the question appears straight away, with its source.
3. Go on with **Next** (Enter), or go back with **←**.
4. On the result, **Post to X** opens a draft post with your percent and a link to your verdict's share page. **Copy link** copies just that link.

Settings (the gear in the footer, or press **,**) cover the theme (Auto, Light or Dark) and motion (System or Reduce). They're saved in this browser only.

**Demo mode** is for testing and screenshots:
- `/#answers=3,2,1,2,3,2,0,2,1,2` jumps straight to that result (10 answers, each 0–3).
- `/#q=1` opens question 1 with an answer picked.

## Change the questions or tiers

Everything lives in `js/data.js`. After editing it:

```bash
npm test
```

```bash
npm run build
```

`npm test` checks the scoring and the data's shape (every fact needs a source). `npm run build` regenerates the five share pages in `r/`, the X cards in `og/` and the PNG icons. It needs `rsvg-convert` (`brew install librsvg`).

## Deploy

The site is served by GitHub Pages from the `main` branch root. Push to `main` and it goes live in about a minute. X caches cards, so to see a changed card, run the link through X's post composer again or wait.

## Manual review checklist (what the tests can't check)

- [ ] **Feel:** answering feels instant, and the fact card eases in with no jump. Next/Enter is never doubled.
- [ ] **Smoothness:** the opening animation is under a second and runs once, and input works during it. With Reduce Motion on, everything is a plain fade.
- [ ] **Phone:** at 375 px wide nothing scrolls sideways, the slip reads cleanly, and Feedback sits in the footer.
- [ ] **Dark mode:** the slip, the flags (normal, borderline, high), the stamp, the dialog and the buttons are all legible.
- [ ] **Live X card:** post a real link (or paste it into the composer) and the tier card unfurls with the right title.
- [ ] **Sources:** every source link opens. WSJ links are paywalled, so check that the headline matches.
- [ ] **Tone:** read every answer aloud. Is it funny? Does it punch at the behavior, not at people who feel like frauds?
