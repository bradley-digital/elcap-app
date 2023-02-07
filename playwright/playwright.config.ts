import type { PlaywrightTestConfig } from "@playwright/test";

export const baseURL =
  process.env.VITE_REACT_APP_FRONTEND_HOST || "http://localhost:3021/";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  reporter: [["html", { open: "never" }], ["list"]],
  timeout: 60000,
  testDir: "./src",
  workers: 2,
  fullyParallel: true,
  screenshotDir: "./playwright/screenshots",
  use: {
    actionTimeout: 30 * 1000,
    baseURL,
    headless: true,
    locale: "en-US",
    screenshot: "only-on-failure",
    // video: "retain-on-failure",
    trace: "retain-on-failure",
  },
};

export default config;
