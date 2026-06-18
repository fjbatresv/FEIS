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
`);
}

function buildSite() {
  remove(site);
  ensureDir(site);
  copyDir(lib, path.join(site, "lib"));
  copyDir(path.join(src, "docs"), site);
  const siteIndex = path.join(site, "index.html");
  write(siteIndex, read(siteIndex).replace(/\.\.\/\.\.\/lib\//g, "lib/"));
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
