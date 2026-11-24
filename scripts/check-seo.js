const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const root = path.resolve(__dirname, "..");
const site = path.join(root, "site");
function files(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? files(path.join(dir, entry.name)) : entry.name.endsWith(".html") ? [path.join(dir, entry.name)] : []); }
function attr(html, name) { return html.match(new RegExp(`<meta\\s+[^>]*${name}=["']([^"']+)`, "i"))?.[1] || ""; }
function check(file) {
  const html = fs.readFileSync(file, "utf8");
  const relative = path.relative(site, file);
  const noindex = /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html);
  if (relative === "404.html") {
    if (!noindex || /rel=["']canonical/i.test(html)) throw new Error("404 must be noindex and omit canonical");
    return;
  }
  if (noindex) return;
  const lang = html.match(/<html[^>]+lang=["']([^"']+)/i)?.[1];
  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() || "";
  const description = attr(html, "name=[\"']description[\"'] content");
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1];
  const og = attr(html, "property=[\"']og:image[\"'] content");
  const landing = relative === "index.html" || relative === path.join("es", "index.html");
  if (!lang || !/<meta[^>]+name=["']viewport/i.test(html) || !canonical || !og) throw new Error(`${relative}: missing lang, viewport, canonical, or og:image`);
  if (!title || title.length > 60 || description.length < 70 || description.length > 160) throw new Error(`${relative}: title/description outside SEO length limits (${title.length}/${description.length})`);
  if ((html.match(/<h1\b/gi) || []).length !== 1) throw new Error(`${relative}: expected one h1`);
  const levels = [...html.matchAll(/<h([1-6])\b/gi)].map((match) => Number(match[1]));
  if (levels.some((level, index) => index && level > levels[index - 1] + 1)) throw new Error(`${relative}: heading level jump`);
  if (/<img\b(?![^>]*\balt=)(?![^>]*\baria-hidden)/i.test(html) || /<img\b(?![^>]*\bwidth=)(?![^>]*\baria-hidden)/i.test(html) || /<img\b(?![^>]*\bheight=)(?![^>]*\baria-hidden)/i.test(html)) throw new Error(`${relative}: image missing alt or dimensions`);
  if (landing) {
    const stackItems = [...html.matchAll(/<span class="stack-item">([^<]+)<\/span>/g)];
    if (stackItems.length !== 14 || stackItems.some(([, item]) => !item.trim())) throw new Error(`${relative}: expected 14 nonempty stack labels`);
    for (const marker of ['property="og:title"', 'property="og:description"', 'property="og:url"', 'property="og:image:alt"', 'property="og:locale"', 'name="twitter:card" content="summary_large_image"', 'name="twitter:title"', 'name="twitter:description"', 'name="twitter:image"', 'name="theme-color"', 'rel="icon"']) {
      if (!html.includes(marker)) throw new Error(`${relative}: missing ${marker}`);
    }
    for (const [hreflang, href] of [["en", "https://pdei.fjbatresv.com/"], ["es", "https://pdei.fjbatresv.com/es/"], ["x-default", "https://pdei.fjbatresv.com/"]]) {
      if (!html.includes(`hreflang="${hreflang}" href="${href}"`)) throw new Error(`${relative}: missing hreflang ${hreflang}`);
    }
    const structuredData = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i)?.[1] || "null");
    const types = structuredData?.["@graph"]?.map((entry) => entry["@type"]) || [];
    if (!["WebSite", "WebPage", "Person", "SoftwareSourceCode", "BreadcrumbList"].every((type) => types.includes(type))) throw new Error(`${relative}: incomplete JSON-LD graph`);
    const images = [...html.matchAll(/<img\b[^>]*>/gi)].map(([image]) => image);
    if (!images.some((image) => /fetchpriority="high"/.test(image) && /srcset=/.test(image))) throw new Error(`${relative}: hero image needs high fetch priority and a srcset`);
    if (images.some((image) => !/fetchpriority="high"/.test(image) && !/loading="lazy"/.test(image))) throw new Error(`${relative}: below-fold images must be lazy-loaded`);
  }
}
const pages = files(site);
pages.forEach(check);
const indexed = pages.map((file) => fs.readFileSync(file, "utf8")).filter((html) => !/name=["']robots["'][^>]*noindex/i.test(html));
const titles = indexed.map((html) => html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim());
const descriptions = indexed.map((html) => attr(html, "name=[\"']description[\"'] content"));
if (new Set(titles).size !== titles.length || new Set(descriptions).size !== descriptions.length) throw new Error("Duplicate title or description");
if (fs.readFileSync(path.join(site, "CNAME"), "utf8").trim() !== "pdei.fjbatresv.com") throw new Error("CNAME is missing or incorrect");
for (const file of ["robots.txt", "sitemap.xml"]) if (!fs.existsSync(path.join(site, file))) throw new Error(`Missing ${file}`);
const robots = fs.readFileSync(path.join(site, "robots.txt"), "utf8");
const sitemap = fs.readFileSync(path.join(site, "sitemap.xml"), "utf8");
if (!robots.includes("https://pdei.fjbatresv.com/sitemap.xml") || !["https://pdei.fjbatresv.com/", "https://pdei.fjbatresv.com/es/", "https://pdei.fjbatresv.com/docs/"].every((url) => sitemap.includes(`<loc>${url}</loc>`))) throw new Error("robots.txt and sitemap.xml are inconsistent");
if (/\/demo\//.test(sitemap) || /\/404\.html/.test(sitemap)) throw new Error("sitemap includes a noindex route");
Promise.all(["og-en.png", "og-es.png"].map(async (name) => {
  const file = path.join(site, "assets/landing", name);
  const metadata = await sharp(file).metadata();
  if (metadata.width !== 1200 || metadata.height !== 630 || fs.statSync(file).size > 100 * 1024) throw new Error(`${name} must be 1200x630 and smaller than 100 KB`);
})).then(() => console.log(`SEO checks passed for ${pages.length} pages`)).catch((error) => { console.error(error); process.exitCode = 1; });
