const { expect, test } = require("@playwright/test");

async function loadPdei(page, body) {
  await page.goto("/");
  await page.setContent(`<!doctype html>
    <html>
      <head>
        <link rel="stylesheet" href="/lib/pdei.min.css">
        <link rel="stylesheet" href="/lib/icons/pdei-icons.css">
      </head>
      <body>
        ${body}
        <script src="/lib/pdei.min.js"></script>
      </body>
    </html>`, { waitUntil: "load" });
  await page.waitForFunction(() => Boolean(window.Pdei));
}

test("exposes the public Pdei API", async ({ page }) => {
  await loadPdei(page, "");

  await expect.poll(async () => page.evaluate(() => Object.keys(window.Pdei).sort())).toEqual([
    "closeModal",
    "init",
    "openModal",
    "showToast"
  ]);
});

test("initializes toggles once and supports click and keyboard changes", async ({ page }) => {
  await loadPdei(page, '<span class="toggle" data-pdei-toggle></span>');

  const toggle = page.locator("[data-pdei-toggle]");
  await expect(toggle).toHaveAttribute("role", "switch");
  await expect(toggle).toHaveAttribute("tabindex", "0");
  await expect(toggle).toHaveAttribute("aria-checked", "false");

  await page.evaluate(() => {
    window.Pdei.init(document);
    window.Pdei.init(document);
  });

  await toggle.dispatchEvent("click");
  await expect(toggle).toHaveClass(/on/);
  await expect(toggle).toHaveAttribute("aria-checked", "true");

  await toggle.focus();
  await toggle.press("Enter");
  await expect(toggle).not.toHaveClass(/on/);
  await expect(toggle).toHaveAttribute("aria-checked", "false");

  await toggle.press("Space");
  await expect(toggle).toHaveClass(/on/);
  await expect(toggle).toHaveAttribute("aria-checked", "true");
});

test("supports single and multiple chip groups", async ({ page }) => {
  await loadPdei(page, `
    <div id="single" data-pdei-chip-group="single">
      <button class="chip active" type="button">Uno</button>
      <button class="chip" type="button">Dos</button>
    </div>
    <div id="multiple" data-pdei-chip-group="multiple">
      <button class="chip active" type="button">A</button>
      <button class="chip" type="button">B</button>
    </div>
  `);

  await page.locator("#single .chip", { hasText: "Dos" }).click();
  await expect(page.locator("#single .chip.active")).toHaveText("Dos");

  await page.locator("#multiple .chip", { hasText: "B" }).click();
  await expect(page.locator("#multiple .chip.active")).toHaveCount(2);

  await page.locator("#multiple .chip", { hasText: "A" }).click();
  await expect(page.locator("#multiple .chip.active")).toHaveText("B");
});

test("opens and closes modals from data attributes and public methods", async ({ page }) => {
  await loadPdei(page, `
    <button type="button" data-pdei-open-modal="confirm-modal">Abrir</button>
    <div class="modal-overlay" id="confirm-modal">
      <div class="modal-box">
        <div class="modal-title">Confirmar</div>
        <button type="button" data-pdei-close-modal>Cancelar</button>
      </div>
    </div>
  `);

  const modal = page.locator("#confirm-modal");
  await expect(modal).toHaveAttribute("aria-hidden", "true");

  await page.getByRole("button", { name: "Abrir" }).click();
  await expect(modal).toHaveClass(/show/);
  await expect(modal).toHaveAttribute("aria-hidden", "false");

  await page.getByRole("button", { name: "Cancelar" }).click();
  await expect(modal).not.toHaveClass(/show/);
  await expect(modal).toHaveAttribute("aria-hidden", "true");

  await page.evaluate(() => window.Pdei.openModal("confirm-modal"));
  await expect(modal).toHaveClass(/show/);

  await page.locator("#confirm-modal").dispatchEvent("click");
  await expect(modal).not.toHaveClass(/show/);

  await page.evaluate(() => {
    window.Pdei.openModal("confirm-modal");
    window.Pdei.closeModal(document.getElementById("confirm-modal"));
  });
  await expect(modal).not.toHaveClass(/show/);
});

test("toggles sidebar state on desktop and mobile", async ({ page }) => {
  await loadPdei(page, `
    <div class="pdei-shell" id="app-shell">
      <aside class="pdei-sidebar">
        <a class="sb-item active" href="#"><i class="pdei-icon pdei-icon-home sb-icon"></i><span class="sb-item-text">Dashboard</span></a>
      </aside>
      <div class="sidebar-backdrop" data-pdei-sidebar-close></div>
      <header class="pdei-header">
        <button class="icon-btn" type="button" data-pdei-sidebar-toggle="#app-shell">
          <i class="pdei-icon pdei-icon-sidebar-close"></i>
        </button>
      </header>
    </div>
  `);

  const shell = page.locator("#app-shell");
  const toggle = page.locator("[data-pdei-sidebar-toggle]");
  const isMobile = await page.evaluate(() => window.matchMedia("(max-width: 900px)").matches);

  await expect(toggle).toHaveAttribute("aria-expanded", isMobile ? "false" : "true");
  await toggle.click();

  if (isMobile) {
    await expect(shell).toHaveClass(/sidebar-open/);
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    const viewport = page.viewportSize();
    await page.mouse.click((viewport?.width || 390) - 12, Math.floor((viewport?.height || 844) / 2));
    await expect(shell).not.toHaveClass(/sidebar-open/);
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  } else {
    await expect(shell).toHaveClass(/sidebar-collapsed/);
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle.locator(".pdei-icon")).toHaveClass(/pdei-icon-sidebar-open/);
  }
});

test("dismisses the closest matching component", async ({ page }) => {
  await loadPdei(page, `
    <div class="alert" id="alert-a">
      <span>Alerta A</span>
      <button type="button" data-pdei-dismiss=".alert">Cerrar</button>
    </div>
    <div class="alert" id="alert-b"><span>Alerta B</span></div>
  `);

  await page.getByRole("button", { name: "Cerrar" }).click();
  await expect(page.locator("#alert-a")).toHaveCount(0);
  await expect(page.locator("#alert-b")).toHaveCount(1);
});

test("toggles password visibility and icon state", async ({ page }) => {
  await loadPdei(page, `
    <div class="input-wrap">
      <input id="password" type="password" value="secret">
      <button class="input-icon-right" type="button" data-pdei-password-toggle="#password" aria-label="Mostrar contraseña">
        <i class="pdei-icon pdei-icon-eye"></i>
      </button>
    </div>
  `);

  const input = page.locator("#password");
  const button = page.locator("[data-pdei-password-toggle]");
  const icon = button.locator(".pdei-icon");

  await button.click();
  await expect(input).toHaveAttribute("type", "text");
  await expect(button).toHaveAttribute("aria-pressed", "true");
  await expect(button).toHaveAttribute("aria-label", "Ocultar contraseña");
  await expect(icon).toHaveClass(/pdei-icon-eye-off/);

  await button.click();
  await expect(input).toHaveAttribute("type", "password");
  await expect(button).toHaveAttribute("aria-pressed", "false");
  await expect(button).toHaveAttribute("aria-label", "Mostrar contraseña");
  await expect(icon).toHaveClass(/pdei-icon-eye$/);
});

test("prevents default scroll links and calls scrollIntoView", async ({ page }) => {
  await loadPdei(page, `
    <a href="#target" data-pdei-scroll>Ir</a>
    <section id="target">Destino</section>
  `);

  await page.evaluate(() => {
    window.__scrolled = false;
    Element.prototype.scrollIntoView = function(options) {
      window.__scrolled = { id: this.id, options };
    };
  });

  await page.getByRole("link", { name: "Ir" }).click();

  await expect.poll(async () => page.evaluate(() => window.__scrolled)).toEqual({
    id: "target",
    options: { behavior: "smooth", block: "start" }
  });
  await expect(page).toHaveURL(/\/$/);
});

test("shows positioned variant toasts and removes them after timeout", async ({ page }) => {
  await loadPdei(page, "");

  const variants = [
    ["success", "check-circle"],
    ["warning", "alert-triangle"],
    ["danger", "circle-x"],
    ["info", "info"]
  ];

  for (const [variant, icon] of variants) {
    await page.evaluate(({ variant }) => {
      window.Pdei.showToast(`Toast ${variant}`, { variant, position: "top-center", timeout: 1000 });
    }, { variant });

    const toast = page.locator(".toast-region.top-center .toast").last();
    await expect(toast).toContainText(`Toast ${variant}`);
    await expect(toast.locator(".pdei-icon")).toHaveClass(new RegExp(`pdei-icon-${icon}`));
  }

  await expect(page.locator(".toast-region.top-center .toast")).toHaveCount(0, { timeout: 2000 });
});
