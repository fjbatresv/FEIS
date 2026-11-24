const fs = require("fs");
const path = require("path");
const { chromium } = require("@playwright/test");
const sharp = require("sharp");
const root = path.resolve(__dirname, "..");
const assets = path.join(root, "src/landing/assets");
const shots = path.join(assets, "shots");
const base = process.env.CAPTURE_URL || "http://127.0.0.1:4179/demo/web-mock/";

(async () => {
  fs.mkdirSync(shots, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await page.goto(base);
  for (const [name, open] of [
    ["login", () => page.locator('[data-view-target="login"]').first().click()],
    ["registration", () => page.evaluate(() => showView("register"))],
    ["dashboard", () => page.evaluate(() => showView("dashboard"))],
    ["portfolio", () => page.evaluate(() => showView("portfolio"))]
  ]) {
    await open();
    await page.waitForTimeout(300);
    const png = path.join(shots, `${name}.png`);
    await page.screenshot({ path: png, fullPage: false });
    await sharp(png).resize({ width: 1440 }).webp({ quality: 84 }).toFile(path.join(shots, `${name}.webp`));
    await sharp(png).webp({ quality: 84 }).toFile(path.join(shots, `${name}@2x.webp`));
    fs.unlinkSync(png);
  }
  const og = (locale, headline, subhead) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#2b2b5e"/><path d="M760 100h400v390H760z" fill="#f6f7fb"/><path d="M805 190h290M805 240h180M805 330h310M805 390h250M805 450h180" stroke="#00cde5" stroke-width="8"/><text x="70" y="150" fill="#00cde5" font-family="Arial" font-size="28">PDEI+ / CASE STUDY</text><text x="70" y="260" fill="white" font-family="Arial" font-weight="700" font-size="58">${headline}</text><text x="70" y="345" fill="#d9d9eb" font-family="Arial" font-size="28">${subhead}</text><text x="70" y="555" fill="white" font-family="Arial" font-size="22">JAVIER BATRES · FINTECH · GUATEMALA</text></svg>`;
  for (const [lang, headline, subhead] of [["en", "From brand to code", "An investment portal built as a shippable UI system"], ["es", "De la marca al código", "Un portal de inversión convertido en sistema UI"]]) {
    await sharp(Buffer.from(og(lang, headline, subhead))).png().toFile(path.join(assets, `og-${lang}.png`));
  }
  await browser.close();
})().catch((error) => { console.error(error); process.exitCode = 1; });
