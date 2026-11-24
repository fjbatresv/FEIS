const fs = require("fs");
const path = require("path");
const { execFileSync, spawnSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const src = path.join(root, "src");
const lib = path.join(root, "lib");
const site = path.join(root, "site");
const zipPath = path.join(root, "pdei-ui-lib.zip");

const args = new Set(process.argv.slice(2));

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function remove(target) {
  fs.rmSync(target, { recursive: true, force: true });
}

function copyFile(from, to) {
  ensureDir(path.dirname(to));
  fs.copyFileSync(from, to);
}

function copyDir(from, to) {
  ensureDir(to);
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const source = path.join(from, entry.name);
    const target = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(source, target);
    else copyFile(source, target);
  }
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content);
}

function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>~])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
}

function minifyJs(js) {
  return js
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}();,:=<>+\-*\/])\s*/g, "$1")
    .trim();
}

function findGraphicDir() {
  return fs.readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .find((name) => name.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().includes("linea grafica"));
}

function copyFonts() {
  const graphicDirName = findGraphicDir();
  if (!graphicDirName) throw new Error("No se encontro la carpeta de Linea Grafica.");
  const fontsDir = path.join(root, graphicDirName, "FONTS");
  const targets = [
    ["Neulis Sans Regular.ttf", "NeulisSans-Regular.ttf"],
    ["Neulis Sans Bold.ttf", "NeulisSans-Bold.ttf"],
    ["Neulis Sans Semi Bold Italic.ttf", "NeulisSans-SemiBoldItalic.ttf"],
    ["Futura PT Medium.ttf", "FuturaPT-Medium.ttf"],
    ["TT Norms Pro Trial Condensed Black Italic.ttf", "TTNormsPro-CondensedBlackItalic.ttf"]
  ];
  for (const [sourceName, targetName] of targets) {
    copyFile(path.join(fontsDir, sourceName), path.join(lib, "fonts", targetName));
  }
}

function copyLogos() {
  const logosDir = path.join(root, "Logos");
  for (const file of ["Pdei+ Azul.png", "Pdei+ Blanco.png", "P+ Azul.png", "P+ Blanco.png", "Pdei+ Logo.svg"]) {
    const source = path.join(logosDir, file);
    if (fs.existsSync(source)) copyFile(source, path.join(lib, "logos", file));
  }
  const aliases = [
    ["Pdei+ Blanco.png", "logo-white.png"],
    ["Pdei+ Azul.png", "logo-navy.png"],
    ["P+ Blanco.png", "isotype-white.png"],
    ["P+ Azul.png", "isotype-navy.png"],
    ["Pdei+ Logo.svg", "logo.svg"]
  ];
  for (const [sourceName, aliasName] of aliases) {
    const source = path.join(logosDir, sourceName);
    if (fs.existsSync(source)) copyFile(source, path.join(lib, "logos", aliasName));
  }
}

function buildIcons() {
  const lucideFontDir = path.join(root, "node_modules", "lucide-static", "font");
  if (!fs.existsSync(lucideFontDir)) {
    throw new Error("No se encontro lucide-static. Ejecuta npm install.");
  }
  for (const file of ["lucide.eot", "lucide.ttf", "lucide.woff", "lucide.woff2", "lucide.svg"]) {
    copyFile(path.join(lucideFontDir, file), path.join(lib, "icons", file));
  }
  let css = read(path.join(lucideFontDir, "lucide.css"));
  css = css
    .replace(/url\('lucide\.(eot|woff2|woff|ttf|svg)\?t=\d+(#iefix)?'\)/g, "url('lucide.$1$2')")
    .replace(/\[class\^="icon-"\], \[class\*=" icon-"\]\s*\{[\s\S]*?\n\}/,
      ".pdei-icon{display:inline-block;font-family:'lucide' !important;font-size:1em;font-style:normal;line-height:1;vertical-align:-0.125em;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}")
    .replace(/\.icon-/g, ".pdei-icon-");
  write(path.join(lib, "icons", "pdei-icons.css"), css);
  write(path.join(lib, "icons", "pdei-icons.min.css"), minifyCss(css));
  copyFile(path.join(lucideFontDir, "codepoints.json"), path.join(lib, "icons", "codepoints.json"));
}

function buildLib() {
  remove(lib);
  ensureDir(lib);

  const css = read(path.join(src, "styles", "pdei.css"));
  const js = read(path.join(src, "js", "pdei.js"));
  write(path.join(lib, "pdei.css"), css);
  write(path.join(lib, "pdei.min.css"), minifyCss(css));
  write(path.join(lib, "pdei.js"), js);
  write(path.join(lib, "pdei.min.js"), minifyJs(js));
  copyFonts();
  copyLogos();
  buildIcons();
  write(path.join(lib, "README.md"), `# Pdei+ UI Library

Importa los archivos en tu plantilla HTML, PHP o Livewire:

\`\`\`html
<link rel="stylesheet" href="lib/pdei.min.css">
<link rel="stylesheet" href="lib/icons/pdei-icons.min.css">
<script src="lib/pdei.min.js" defer></script>
\`\`\`

Node/npm solo se usa para construir este directorio. El runtime final es CSS, JS, fuentes, logos e iconos locales.

## Logos

Usa clases de logo para evitar depender de nombres con espacios:

\`\`\`html
<span class="pdei-logo logo-white logo-lg" role="img" aria-label="Pdei+"></span>
<span class="pdei-logo logo-navy logo-lg" role="img" aria-label="Pdei+"></span>
<span class="pdei-logo isotype-white logo-sm" role="img" aria-label="Pdei+"></span>
<span class="pdei-logo isotype-navy logo-lg" role="img" aria-label="Pdei+"></span>
\`\`\`

Tamanos disponibles: \`logo-sm\`, \`logo-md\`, \`logo-lg\`, \`logo-xl\`.

## Toasts

\`\`\`html
<script>
  Pdei.showToast("Guardado.", { position: "top-right" });
</script>
\`\`\`

Posiciones: \`top-right\`, \`top-left\`, \`top-center\`, \`bottom-right\`, \`bottom-left\`, \`bottom-center\`.

## Iconos

Los iconos vienen de Lucide en formato icon font local:

\`\`\`html
<i class="pdei-icon pdei-icon-wallet"></i>
<i class="pdei-icon pdei-icon-alert-triangle"></i>
\`\`\`

Convencion: \`pdei-icon pdei-icon-{nombre-lucide-en-kebab-case}\`.
El listado completo queda en \`lib/icons/codepoints.json\`.

## Sitio publicado

La documentación se publica en \`/docs/\`, con demos en \`/demo/\` y el bundle estático en \`/lib/\`.
`);
}

function buildSite() {
  remove(site);
  ensureDir(site);
  copyDir(lib, path.join(site, "lib"));
  copyDir(path.join(src, "docs"), path.join(site, "docs"));
  const docsIndex = path.join(site, "docs", "index.html");
  write(docsIndex, read(docsIndex).replace(/\.\.\/\.\.\/lib\//g, "../lib/"));
  buildLanding();
  buildDemos();
}

function renderTemplate(template, data) {
  return template.replace(/{{#([\w.]+)}}([\s\S]*?){{\/\1}}/g, (_, key, block) => {
    const rows = key.split(".").reduce((value, part) => value?.[part], data);
    return (rows || []).map((row) => renderTemplate(block, { ...data, ...(typeof row === "string" ? { ".": row } : row) })).join("");
  }).replace(/{{([\w.]+)}}/g, (_, key) => {
    const value = key.split(".").reduce((item, part) => item?.[part], data);
    if (value == null) return "";
    if (key === "jsonLd") return String(value);
    return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  });
}

function buildLanding() {
  const landingSrc = path.join(src, "landing");
  const template = read(path.join(landingSrc, "template.html"));
  for (const lang of ["en", "es"]) {
    const data = JSON.parse(read(path.join(landingSrc, `copy.${lang}.json`)));
    write(path.join(site, lang === "en" ? "index.html" : "es/index.html"), renderTemplate(template, data));
  }
  copyDir(path.join(landingSrc, "assets"), path.join(site, "assets/landing"));
  write(path.join(site, "version.txt"), `${require(path.join(root, "package.json")).version}\n`);
  if (fs.existsSync(zipPath)) copyFile(zipPath, path.join(site, "downloads/pdei-ui-lib.zip"));
  write(path.join(site, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://pdei.fjbatresv.com/sitemap.xml\n");
  write(path.join(site, "CNAME"), "pdei.fjbatresv.com\n");
  write(path.join(site, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${["", "es/", "docs/"].map((route) => `  <url><loc>https://pdei.fjbatresv.com/${route}</loc>${route !== "docs/" ? `\n    <xhtml:link rel="alternate" hreflang="en" href="https://pdei.fjbatresv.com/"/><xhtml:link rel="alternate" hreflang="es" href="https://pdei.fjbatresv.com/es/"/><xhtml:link rel="alternate" hreflang="x-default" href="https://pdei.fjbatresv.com/"/>` : ""}</url>`).join("\n")}\n</urlset>\n`);
  write(path.join(site, "404.html"), `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>No encontrado · Pdei+</title><link rel="stylesheet" href="/assets/landing/landing.css"></head><body class="not-found"><main><p>404</p><h1>Página no encontrada</h1><a href="/">English</a> · <a href="/es/">Español</a></main></body></html>`);
}

function buildDemos() {
  for (const [id, source, title] of [["web-mock", "Pdei+ Web Mock.html", "Pdei+ · Web Mock"], ["ui-kit", "Pdei+ Componentes.html", "Pdei+ · Componentes"], ["screens", "Pdei+ Pantallas.html", "Pdei+ · Pantallas"]]) {
    let html = read(path.join(root, source));
    if (id === "screens") html = html.replace(/DERCAS/gi, "institución financiera");
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
    html = html.replace(/<head([^>]*)>/i, `<head$1><meta name="robots" content="noindex"><style>.prototype-ribbon{position:fixed;z-index:99999;top:0;left:0;right:0;min-height:44px;display:flex;align-items:center;justify-content:center;background:#2b2b5e;color:#fff;font:600 14px/1.3 Arial,sans-serif;text-decoration:none;text-align:center;padding:8px 16px;box-shadow:0 2px 12px #14142b33}.prototype-ribbon:focus-visible{outline:3px solid #00cde5;outline-offset:-4px}body{padding-top:44px!important}</style>`);
    html = html.replace(/<body([^>]*)>/i, `<body$1><a class="prototype-ribbon" href="/">Prototipo con datos ficticios · ← Volver al caso de estudio</a>`);
    write(path.join(site, "demo", id, "index.html"), html);
    copyDir(path.join(root, "Logos"), path.join(site, "demo", id, "Logos"));
    copyDir(path.join(root, findGraphicDir(), "FONTS"), path.join(site, "demo", id, "Línea Gráfica", "FONTS"));
  }
}

function buildZip() {
  if (!fs.existsSync(lib)) buildLib();
  remove(zipPath);
  const zipCheck = spawnSync("zip", ["-v"], { stdio: "ignore" });
  if (zipCheck.error && zipCheck.error.code === "ENOENT") {
    throw new Error("No se encontro la utilidad 'zip'. Instalela para generar pdei-ui-lib.zip.");
  }
  if (zipCheck.error) throw zipCheck.error;
  execFileSync("zip", ["-qr", zipPath, "lib"], { cwd: root, stdio: "inherit" });
}

function main() {
  if (args.has("--zip-only")) {
    buildZip();
    return;
  }
  buildLib();
  buildSite();
  if (!args.has("--docs-only")) {
    // Full build intentionally does not create the zip; use npm run zip when needed.
  }
}

main();
