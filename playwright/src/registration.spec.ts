import { test, expect } from "@playwright/test";
import { screenshot, user } from "./lib/utils";
import { baseURL } from "../playwright.config";

test.describe("Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });

  test("user navigates to login", async ({ page }) => {
    const title = page.locator("h1");
    const logo = page.locator("ion-content svg");
    await expect(title).toHaveText("Login");
    await expect(logo).toBeDefined();
  });

  test("user can't submit form without fill in email and password", async ({
    page,
  }) => {
    const button = page.locator("form ion-button");
    await button.click();
    const title = page.locator("h1");
    await expect(title).toHaveText("Login");
  });

  test("user cant fill in email and password", async ({ page }) => {
    const email = page.locator("input[type=email]");
    const password = page.locator("input[type=password]");

    await email.fill(user.email);
    await password.fill(user.password);

    await expect(email).toHaveValue(user.email);
    await expect(password).toHaveValue(user.password);
  });

  test("user navigates to Create account", async ({ page }) => {
    const button = page.locator("text=Create Account");
    await button.click();
    const title = page.locator("h1");
    await expect(title).toHaveText("Sign Up");
  });

  test.afterEach(async ({ page }) => {
    await screenshot(page);
  });
});
