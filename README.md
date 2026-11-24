# Pdei+ UI Library & Portfolio case study

The repository publishes a bilingual case study at `/` (English) and `/es/` (Spanish), the UI Library documentation at `/docs/`, and static prototypes at `/demo/web-mock/`, `/demo/ui-kit/`, and `/demo/screens/`.

## Build

```sh
npm ci
npm run lint
npm run build
npm run zip
npm test
```

`npm run build` regenerates the committed `lib/` bundle and all of `site/`. `npm run capture` is a manual task: start `python3 -m http.server 4179 --directory site`, then capture Web Mock screenshots and Open Graph images into `src/landing/assets/`. Run the build again to copy the assets into `site/`.

Deployment is handled by GitHub Pages workflows. The production domain is `pdei.fjbatresv.com`.
