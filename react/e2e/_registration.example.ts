import { test, expect } from '@playwright/test';
import { config, screenshot, user } from './libs/utils';

test.describe('welcome flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(config.url);
  });

  test('user should be able to fill the form', async ({ page }) => {
    await page.locator('.welcome-content ion-button').nth(0).click();
    await page.locator('input[name="first_name"]').fill(user.firstName);
    await page.locator('input[name="last_name"]').fill(user.lastName);
    await page.locator('input[name="email"]').fill(user.email);
    await page.locator('input[name="zip"]').fill('40503');
    await page.locator('ion-select[name="state"]').click();
    // dropdown states
    const randomState = Math.round(Math.random() * 40);
    await page.locator('ion-popover ion-item').nth(randomState).click();
    // clinic modal
    await page.locator('input[name="clinic"]').click();
    await page.locator('ion-list ion-item').nth(1).click();
    // checkbox
    await page.locator('ion-checkbox').click();
    // Wait for modal to popiup
    await page.waitForTimeout(500);
    await screenshot(page, 'fillinform');
  });

  test('user should be able to register', async ({ page }) => {
    // mock request
    await page.route('**/api/user', (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          user_id: 66,
          first_name: 'Esteban',
          last_name: 'Gatjens',
          email: 'esteban@gmail.com',
          state_cd: 'AK',
          clinic_crm_id: null,
          clinic_other_name: 'Student',
          clinic_other_zip: '34534',
          created_at: '2022-07-19T15:09:21.014Z',
          updated_at: '2022-07-19T15:09:21.014Z',
          user_conference: [],
          clinics: null,
        }),
      }),
    );

    await page.locator('.welcome-content ion-button').nth(0).click();
    await page.locator('input[name="first_name"]').fill(user.firstName);
    await page.locator('input[name="last_name"]').fill(user.lastName);
    await page.locator('input[name="email"]').fill(user.email);
    await page.locator('input[name="zip"]').fill('40503');
    await page.locator('ion-select[name="state"]').click();
    // dropdown states
    const randomState = Math.round(Math.random() * 40);
    await page.locator('ion-popover ion-item').nth(randomState).click();
    // clinic modal
    await page.locator('input[name="clinic"]').click();
    await page.locator('ion-list ion-item').nth(1).click();
    // checkbox
    await page.locator('ion-checkbox').click();
    // submit form
    await page.locator('ion-button').click();
    // wait for modal to popiup
    await page.waitForTimeout(200);
    await screenshot(page, 'registermodal');
  });

  test('user cant register a email twice', async ({ page }) => {
    // mock request
    await page.route('**/api/user', (route) =>
      route.fulfill({
        status: 409,
        body: JSON.stringify({
          error: 'There is already a user registered with this email',
          code: 'P2002',
        }),
      }),
    );

    await page.locator('.welcome-content ion-button').nth(0).click();
    await page.locator('input[name="first_name"]').fill(user.firstName);
    await page.locator('input[name="last_name"]').fill(user.lastName);
    await page.locator('input[name="email"]').fill(user.email);
    await page.locator('input[name="zip"]').fill('40404');
    await page.locator('ion-select[name="state"]').click();
    // dropdown states
    const randomState = Math.round(Math.random() * 40);
    await page.locator('ion-popover ion-item').nth(randomState).click();
    // clinic modal
    await page.locator('input[name="clinic"]').click();
    await page.locator('ion-list ion-item').nth(1).click();
    // checkbox
    await page.locator('ion-checkbox').click();
    // submit form
    await page.locator('ion-button').click();

    // wait for modal to popiup
    await page.waitForTimeout(200);

    const title = await page.locator('ion-alert h2');
    await expect(title).toHaveText('Email already registered');

    await screenshot(page, 'registeralready');
  });

  test('user should be able to login', async ({ page }) => {
    // mock request
    await page.route('**/api/user', (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          user_id: 69,
          first_name: 'Jairo',
          last_name: 'Gatjens',
          email: 'jgatjens@mergeworld.com',
          state_cd: 'AK',
          clinic_crm_id: null,
          clinic_other_name: 'Student',
          clinic_other_zip: '34534',
          user_conference: [],
          clinics: null,
        }),
      }),
    );

    await page.locator('.welcome-content ion-button').nth(1).click();
    await page.locator('input[name="email"]').fill('jgatjens@mergeworld.com');
    await page.locator('ion-button').click();
    await page.waitForTimeout(200);

    const title = await page.locator('.Dashboard-page h1');
    await expect(title).toContainText('Welcome to');

    await screenshot(page, 'success_login');
  });
});
