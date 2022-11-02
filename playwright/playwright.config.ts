import type { PlaywrightTestConfig } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  reporter: [  ['html', { open: 'never' }],['list']],
  timeout: 60000,
  testDir: './src',
  workers: 2,
  fullyParallel: true,
  use: {
      actionTimeout: 30 * 1000,
      headless: true,
      locale : "en-US",
      screenshot: 'only-on-failure',
      // video: 'retain-on-failure',
      trace: 'retain-on-failure'
  }
};

export default config;
