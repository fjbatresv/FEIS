/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

const source = fs.readFileSync(path.join(__dirname, "..", "src", "js", "pdei.js"), "utf8");

function installMatchMedia(matches = false) {
  const listeners = [];
  window.matchMedia = jest.fn().mockImplementation(() => ({
    matches,
    media: "(max-width: 900px)",
    addEventListener: jest.fn((event, callback) => {
      if (event === "change") listeners.push(callback);
    }),
    removeEventListener: jest.fn(),
    addListener: jest.fn((callback) => listeners.push(callback)),
    removeListener: jest.fn(),
    dispatch(matchesValue) {
      listeners.forEach((callback) => callback({ matches: matchesValue }));
    }
  }));
}

function loadPdei(html = "", matches = false) {
  document.body.innerHTML = html;
  delete window.Pdei;
  delete document.documentElement.dataset.pdeiSidebarEscapeReady;
  installMatchMedia(matches);
  window.eval(source);
}

describe("src/js/pdei.js", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    document.body.innerHTML = "";
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test("exposes the public API from source before build", () => {
    loadPdei();

    expect(Object.keys(window.Pdei).sort()).toEqual([
      "closeModal",
      "init",
      "openModal",
      "showToast"
    ]);
  });

  test("initializes toggle controls idempotently", () => {
    loadPdei('<button type="button" data-pdei-toggle></button>');

    const toggle = document.querySelector("[data-pdei-toggle]");
    window.Pdei.init(document);
    window.Pdei.init(document);

    toggle.click();
    expect(toggle.classList.contains("on")).toBe(true);
    expect(toggle.getAttribute("aria-checked")).toBe("true");

    toggle.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    expect(toggle.classList.contains("on")).toBe(false);
    expect(toggle.getAttribute("aria-checked")).toBe("false");
  });

  test("opens and closes modals from the source API", () => {
    loadPdei('<div id="modal" class="modal-overlay"></div>');

    const modal = document.getElementById("modal");
    window.Pdei.openModal("modal");
    expect(modal.classList.contains("show")).toBe(true);
    expect(modal.getAttribute("aria-hidden")).toBe("false");

    window.Pdei.closeModal(modal);
    expect(modal.classList.contains("show")).toBe(false);
    expect(modal.getAttribute("aria-hidden")).toBe("true");
  });

  test("toggles desktop sidebar collapsed state", () => {
    loadPdei(`
      <div class="pdei-shell" id="app-shell">
        <button type="button" data-pdei-sidebar-toggle="#app-shell"><i class="pdei-icon pdei-icon-sidebar-close"></i></button>
      </div>
    `);

    const shell = document.getElementById("app-shell");
    const button = document.querySelector("[data-pdei-sidebar-toggle]");

    expect(button.getAttribute("aria-expanded")).toBe("true");
    button.click();
    expect(shell.classList.contains("sidebar-collapsed")).toBe(true);
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(button.querySelector(".pdei-icon").className).toContain("pdei-icon-sidebar-open");
  });

  test("toggles and closes mobile sidebar", () => {
    loadPdei(`
      <div class="pdei-shell" id="app-shell">
        <button type="button" data-pdei-sidebar-toggle="#app-shell"><i class="pdei-icon pdei-icon-sidebar-open"></i></button>
        <div data-pdei-sidebar-close></div>
      </div>
    `, true);

    const shell = document.getElementById("app-shell");
    const button = document.querySelector("[data-pdei-sidebar-toggle]");
    const close = document.querySelector("[data-pdei-sidebar-close]");

    expect(button.getAttribute("aria-expanded")).toBe("false");
    button.click();
    expect(shell.classList.contains("sidebar-open")).toBe(true);
    expect(button.getAttribute("aria-expanded")).toBe("true");

    close.click();
    expect(shell.classList.contains("sidebar-open")).toBe(false);
    expect(button.getAttribute("aria-expanded")).toBe("false");
  });

  test("creates and removes toast notifications", () => {
    loadPdei();

    window.Pdei.showToast("Guardado", { variant: "info", position: "top-left", timeout: 25 });
    expect(document.querySelector(".toast-region.top-left .toast-info").textContent).toContain("Guardado");

    jest.advanceTimersByTime(25);
    expect(document.querySelector(".toast-region.top-left .toast")).toBeNull();
  });
});
