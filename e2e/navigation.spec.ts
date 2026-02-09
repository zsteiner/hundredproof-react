import { expect, test } from '@playwright/test';

test.describe('Navigation', () => {
  test('navigates from home to dilute and back', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'get started' }).first().click();
    await expect(page).toHaveURL('/dilute');

    // Click header logo to go home
    await page.locator('header a').first().click();
    await expect(page).toHaveURL('/');
  });

  test('navigates from home to scale and back', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'get started' }).nth(1).click();
    await expect(page).toHaveURL('/scale');

    // Click header logo to go home
    await page.locator('header a').first().click();
    await expect(page).toHaveURL('/');
  });

  test('header is visible on all pages', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header')).toBeVisible();

    await page.goto('/dilute');
    await expect(page.locator('header')).toBeVisible();

    await page.goto('/scale');
    await expect(page.locator('header')).toBeVisible();
  });

  test('footer is visible on all pages', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer')).toBeVisible();

    await page.goto('/dilute');
    await expect(page.locator('footer')).toBeVisible();

    await page.goto('/scale');
    await expect(page.locator('footer')).toBeVisible();
  });
});
