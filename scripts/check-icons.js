const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const docsHtml = fs.readFileSync(path.join(root, "src/docs/index.html"), "utf8");
const iconCss = fs.readFileSync(path.join(root, "lib/icons/pdei-icons.css"), "utf8");

const iconNames = [...new Set(
  [...docsHtml.matchAll(/pdei-icon-([a-z0-9-]+)/g)].map((match) => match[1])
)];

const missing = iconNames.filter((name) => !iconCss.includes(`.pdei-icon-${name}::before`));

if (missing.length) {
  throw new Error(`Missing icon definitions:\n${missing.map((name) => `- pdei-icon-${name}`).join("\n")}`);
}

console.log(`icons ok: ${iconNames.length}`);
