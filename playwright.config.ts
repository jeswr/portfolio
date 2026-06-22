// AUTHORED-BY Claude Opus 4.8
import { defineConfig, devices } from "@playwright/test";

// Core-path Playwright suite. Its job is to catch a bad dependency bump before
// automerge lands it: the homepage rendering, the load-bearing WebID content
// negotiation, and the SEO/metadata routes. The suite runs against the PRODUCTION
// build (`npm run build && npm run start`) because the middleware-driven RDF
// content negotiation (the WebID contract) only runs in a real server, not `next dev`.
const PORT = 3000;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: process.env.CI
    ? [["html", { open: "never" }], ["github"], ["list"]]
    : [["list"]],

  timeout: 30_000,
  expect: { timeout: 5_000 },

  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],

  // Build then serve the production bundle. The WebID/Turtle conneg lives in
  // middleware.ts, which only runs under `next start` — so we MUST build+start,
  // not `next dev`. Locally we reuse a running server for fast iteration; in CI
  // we always boot a fresh one.
  webServer: {
    command: "npm run build && npm run start",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    stdout: "pipe",
    stderr: "pipe",
  },
});
