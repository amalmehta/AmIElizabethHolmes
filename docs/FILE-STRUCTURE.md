# File structure

```
index.html            The whole quiz: intro, questions, result, settings dialog
css/style.css         All styles: light and dark tokens, the lab slip, motion
js/data.js            Questions, panels, tiers and cited facts (edit this one)
js/score.js           Pure scoring: answers → percent, panel flags, tier
js/app.js             UI state, keyboard, settings, share link, demo mode
r/<tier>/index.html   Generated share pages (5) with X/OG card tags
og/<tier>.png         Generated 1200×630 X cards (5 tiers + home)
icon.svg              App icon (a blood drop with a question mark)
favicon.png, apple-touch-icon.png   Generated from icon.svg
scripts/build.mjs     Regenerates r/, og/ and the PNG icons from data.js
tests/score.test.mjs  Scoring and data-integrity tests (node --test)
docs/                 Instructions, system design, this file, prompt log, screenshots
.nojekyll             Tells GitHub Pages to serve files as-is
```
