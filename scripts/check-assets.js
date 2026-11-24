const fs = require("fs");
const path = require("path");
const root = path.resolve(__dirname, "..");
function refs(file) {
  const html = fs.readFileSync(path.join(root, file), "utf8").replace(/<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>/g, "");
  const urls = [...html.matchAll(/(?:href|src)=["']([^"']+)["']/g)].map((match) => match[1]);
  for (const [, candidates] of html.matchAll(/srcset=["']([^"']+)["']/g)) {
    urls.push(...candidates.split(",").map((candidate) => candidate.trim().split(/\s+/)[0]));
  }
  return urls.filter((ref) => !/^(#|https?:|mailto:|tel:|javascript:|data:|blob:)/.test(ref));
}
function check(file, base) {
  const missing = refs(file).filter((ref) => {
    const local = ref.startsWith("/") ? path.join(root, "site", ref.slice(1)) : path.resolve(root, path.dirname(file), ref);
    return !fs.existsSync(local);
  });
  if (missing.length) throw new Error(`${file} has missing references:\n${missing.map((ref) => `- ${ref}`).join("\n")}`);
  console.log(`${file}: ${refs(file).length} asset references ok`);
}
["src/docs/index.html", "site/index.html", "site/es/index.html", "site/404.html", "site/docs/index.html", "site/demo/web-mock/index.html", "site/demo/ui-kit/index.html", "site/demo/screens/index.html"].forEach((file) => check(file));
