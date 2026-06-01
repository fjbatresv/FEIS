const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function extractRefs(html) {
  const withoutCode = html
    .replace(/<pre[\s\S]*?<\/pre>/g, "")
    .replace(/<code[\s\S]*?<\/code>/g, "");

  return [...withoutCode.matchAll(/(?:href|src)="([^"]+)"/g)]
    .map((match) => match[1])
    .filter((ref) => !ref.startsWith("#") && !ref.startsWith("http") && !ref.startsWith("mailto:"));
}

function check(baseDir, file) {
  const refs = extractRefs(read(file));
  const missing = refs.filter((ref) => !fs.existsSync(path.join(root, baseDir, ref)));

  if (missing.length) {
    throw new Error(`${file} has missing references:\n${missing.map((ref) => `- ${ref}`).join("\n")}`);
  }

  console.log(`${file}: ${refs.length} asset references ok`);
}

check("src/docs", "src/docs/index.html");
check("site", "site/index.html");
