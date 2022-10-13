import { test, expect } from '@playwright/test';
import { config, screenshot } from './libs/utils';

test.describe('Page dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(config.url);

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
          created_at: '2022-07-19T15:21:03.725Z',
          updated_at: '2022-07-19T15:21:03.725Z',
          user_conference: [],
          clinics: null,
        }),
      }),
    );

    await page.locator('.welcome-content ion-button').nth(1).click();
    await page.locator('input[name="email"]').fill('jgatjens@mergeworld.com');
    await page.locator('ion-button').click();
  });

  test('user is able to navigate to learn and earn', async ({ page }) => {
    page.locator('ion-list ion-item').nth(0).click();
    const title = page.locator('.LearnAndEarn-page h1');
    await expect(title).toHaveText('Learn & Earn game');
  });

  test('user is able to navigate to schedule', async ({ page }) => {
    page.locator('ion-list ion-item').nth(1).click();
    const title = page.locator('.Schedule-page h1');
    await expect(title).toHaveText('Event schedule');
  });

  test('user is able to navigate to contact-us', async ({ page }) => {
    page.locator('ion-list ion-item').nth(3).click();
    const title = page.locator('.ContactUs-page h1');
    await expect(title).toHaveText('Contact a rep');
  });

  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(200);
    await screenshot(page);
  });
});
