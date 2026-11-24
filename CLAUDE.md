# Repository guide

This repository contains a vanilla CSS/JavaScript UI library, its documentation, three static product prototypes, and the bilingual Pdei+ portfolio case study.

## Build and routes

- `npm run build` regenerates committed `lib/` and `site/` output from `src/`.
- The landing source is `src/landing/`; English publishes at `/`, Spanish at `/es/`.
- Component documentation publishes at `/docs/`.
- Prototypes publish at `/demo/web-mock/`, `/demo/ui-kit/`, and `/demo/screens/`.
- The static library remains available at `/lib/`; release downloads are under `/downloads/`.
- `npm run capture` is manual and requires the site server at `http://127.0.0.1:4179` plus Playwright Chromium.

Keep landing JavaScript out of the regular-expression minifier in `scripts/build.js`. Generated `lib/` and `site/` are committed and must match a fresh build.
