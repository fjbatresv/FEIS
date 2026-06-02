const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const requiredFiles = [
  "lib/pdei.css",
  "lib/pdei.min.css",
  "lib/pdei.js",
  "lib/pdei.min.js",
  "lib/icons/pdei-icons.css",
  "lib/icons/lucide.woff2",
  "lib/logos/logo-navy.png",
  "lib/logos/logo-white.png",
  "lib/fonts/NeulisSans-Regular.ttf"
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  throw new Error(`Missing bundle files:\n${missing.map((file) => `- ${file}`).join("\n")}`);
}

new Function(fs.readFileSync(path.join(root, "lib/pdei.js"), "utf8"));
new Function(fs.readFileSync(path.join(root, "lib/pdei.min.js"), "utf8"));

const css = fs.readFileSync(path.join(root, "lib/pdei.css"), "utf8");
const requiredSelectors = [
  ".btn-primary",
  ".input-field",
  ".alert-warning",
  ".status-badge",
  ".modal-overlay",
  ".toast-region",
  ".pdei-footer",
  ".pdei-logo.logo-lg"
];

const missingSelectors = requiredSelectors.filter((selector) => !css.includes(selector));
if (missingSelectors.length) {
  throw new Error(`Missing public selectors:\n${missingSelectors.map((selector) => `- ${selector}`).join("\n")}`);
}

console.log("bundle smoke ok");
