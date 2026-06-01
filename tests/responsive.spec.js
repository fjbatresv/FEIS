const { expect, test } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  page.consoleErrors = consoleErrors;

  await page.goto("/");
  await page.waitForLoadState("networkidle");
});

test.afterEach(async ({ page }) => {
  expect(page.consoleErrors).toEqual([]);
});

test("loads distributed assets and core docs sections", async ({ page }) => {
  await expect(page).toHaveTitle("Pdei+ UI Library");

  const responseChecks = await page.evaluate(async () => {
    const paths = [
      "/lib/pdei.min.css",
      "/lib/icons/pdei-icons.css",
      "/lib/icons/lucide.woff2",
      "/lib/pdei.min.js",
      "/lib/logos/logo-navy.png"
    ];

    return Promise.all(paths.map(async (path) => {
      const response = await fetch(path, { cache: "no-store" });
      return { path, ok: response.ok, status: response.status };
    }));
  });

  expect(responseChecks).toEqual(responseChecks.map((item) => ({ ...item, ok: true, status: 200 })));

  for (const id of ["install", "colors", "typography", "inputs", "buttons", "dialogs", "feedback", "footer", "logos", "icons"]) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
});

test("supports progressive vanilla interactions", async ({ page }) => {
  const password = page.locator("#docs-password");
  await expect(password).toHaveAttribute("type", "password");
  await page.locator('[data-pdei-password-toggle="#docs-password"]').click();
  await expect(password).toHaveAttribute("type", "text");

  await page.getByRole("button", { name: "Ver modal interactivo" }).click();
  await expect(page.locator("#docs-confirm-modal")).toHaveClass(/show/);
  await page.locator("#docs-confirm-modal [data-pdei-close-modal]").first().click();
  await expect(page.locator("#docs-confirm-modal")).not.toHaveClass(/show/);

  await page.locator("[data-docs-toast]").click();
  await expect(page.locator(".toast-region.top-right .toast")).toContainText("Operación completada.");

  await page.getByLabel("Dígito 1").fill("7");
  await expect(page.getByLabel("Dígito 1")).toHaveClass(/filled/);
  await expect(page.getByLabel("Dígito 2")).toBeFocused();
});
