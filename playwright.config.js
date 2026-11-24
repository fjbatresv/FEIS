const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 30000,
  fullyParallel: true,
  workers: 2,
  reporter: [["list"]],
  use: {
    baseURL: "http://127.0.0.1:4179",
    trace: "retain-on-failure"
  },
  webServer: {
    command: "python3 -c \"from functools import partial; from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer; ThreadingHTTPServer(('127.0.0.1', 4179), partial(SimpleHTTPRequestHandler, directory='site')).serve_forever()\"",
    url: "http://127.0.0.1:4179",
    reuseExistingServer: !process.env.CI,
    timeout: 10000
  },
  projects: [
    {
      name: "desktop",
      use: { browserName: "chromium", viewport: { width: 1440, height: 900 } }
    },
    {
      name: "tablet",
      use: { browserName: "chromium", viewport: { width: 768, height: 1024 }, isMobile: true }
    },
    {
      name: "mobile",
      use: { browserName: "chromium", viewport: { width: 375, height: 812 }, isMobile: true }
    }
  ]
});
