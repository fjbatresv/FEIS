const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

test("English and Spanish landing pages expose their localized case study", async ({ page, request }) => {
  for (const route of ["/", "/es/"]) {
    await page.goto(route);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute("href", "https://pdei.fjbatresv.com/");
    await expect(page.locator('link[hreflang="es"]')).toHaveAttribute("href", "https://pdei.fjbatresv.com/es/");
    for (const href of ["/demo/web-mock/", "/demo/ui-kit/", "/demo/screens/", "/docs/"]) {
      expect((await request.get(href)).ok(), `${href} should respond successfully`).toBeTruthy();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
    await page.evaluate(async () => {
      document.documentElement.style.scrollBehavior = "auto";
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 80));
      }
      await new Promise((resolve) => setTimeout(resolve, 350));
      window.scrollTo(0, 0);
      await new Promise((resolve) => setTimeout(resolve, 450));
    });
    const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(axe.violations).toEqual([]);
  }
});

test("legacy documentation hashes redirect into /docs/", async ({ page }) => {
  await page.goto("/#inputs");
  await expect(page).toHaveURL(/\/docs\/#inputs$/);
});

test("reduced motion disables smooth scrolling", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.locator("html").evaluate((element) => getComputedStyle(element).scrollBehavior)).toBe("auto");
});
