const { expect, test } = require("@playwright/test");

test("UI kit filters and modal work with keyboard and accessible names", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/demo/ui-kit/");
  const toggle = page.getByRole("switch", { name: "Autenticación de dos factores" });
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-checked", "true");

  const filter = page.getByRole("button", { name: "3M" }).last();
  await filter.click();
  await expect(filter).toHaveAttribute("aria-pressed", "true");

  const opener = page.getByRole("button", { name: "Ver modal interactivo" });
  await opener.click();
  const dialog = page.getByRole("dialog", { name: "Confirmar inversión" });
  await expect(dialog).toBeVisible();
  const cancel = dialog.getByRole("button", { name: "Cancelar", exact: true });
  const confirm = dialog.getByRole("button", { name: "Confirmar", exact: true });
  await expect(cancel).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(confirm).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(cancel).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
  expect(await page.locator("#header").evaluate((el) => el.getBoundingClientRect().top)).toBeGreaterThanOrEqual(44);
});

test("registration currency and featured fund actions use the selected product", async ({ page }) => {
  await page.goto("/demo/web-mock/");
  await page.evaluate(() => { authState.registerStep = 5; showView("register"); });
  await page.locator("#register-fund-product").selectOption("USD");
  await expect(page.locator("#register-fund-prefix")).toHaveText("$");
  await expect(page.locator("#register-summary-fund")).toContainText("Dólares");

  await page.evaluate(() => showView("dashboard"));
  await page.locator('.featured-funds [data-fund-id="bursatil-usd"] [data-view-target="fund-detail"]').click();
  await expect(page.locator("#fund-detail-title")).toContainText("Dólares");
});

test("portfolio filters stay applied at mobile width", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/demo/web-mock/");
  await page.evaluate(() => showView("portfolio"));
  await page.locator("#portfolio-filter-state").selectOption("pending-funds");
  await expect(page.locator('.portfolio-fund-row[data-fund-state="pending-funds"]')).toBeVisible();
  await expect(page.locator('.portfolio-fund-row[data-fund-state="active"]').first()).toBeHidden();
});

test("beneficiary edits stay with their original fund and invalid shares are rejected", async ({ page }) => {
  await page.goto("/demo/web-mock/");
  await page.evaluate(() => {
    showView("beneficiaries");
    loadBeneficiaryIntoForm(0);
    authState.selectedFund = "bursatil-usd";
    document.getElementById("beneficiary-first-name").value = "Editada";
  });
  await page.getByRole("button", { name: "Guardar beneficiario" }).click();
  expect(await page.evaluate(() => beneficiariesByFund["bursatil-gtq"][0].firstName)).toBe("Editada");

  const validation = await page.evaluate(() => {
    authState.newFund.beneficiariesMode = "yes";
    authState.newFund.beneficiary1 = "Uno"; authState.newFund.beneficiary1Pct = "110";
    authState.newFund.beneficiary2 = "Dos"; authState.newFund.beneficiary2Pct = "-10";
    return validateNewFundStep(2);
  });
  expect(validation).toContain("entre 0 y 100");
});

test("profile account list renders accounts from mock state", async ({ page }) => {
  await page.goto("/demo/web-mock/");
  await page.evaluate(() => {
    profileAccounts["review-account"] = { id: "review-account", bank: "Banco Demo", type: "Ahorro", currency: "GTQ", masked: "000-000", alias: "Cuenta de revisión", primary: false };
    showView("profile");
  });
  await expect(page.getByText("Banco Demo")).toBeVisible();
  await expect(page.getByRole("button", { name: "Ver detalle de cuenta Cuenta de revisión" })).toBeVisible();
});
