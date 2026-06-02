const { expect, test } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

test("docs page has no serious or critical axe violations", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .disableRules(["color-contrast"])
    .analyze();

  const blockingViolations = results.violations
    .filter((violation) => ["critical", "serious"].includes(violation.impact))
    .map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      help: violation.help,
      nodes: violation.nodes.map((node) => node.target.join(" "))
    }));

  expect(blockingViolations).toEqual([]);
});
