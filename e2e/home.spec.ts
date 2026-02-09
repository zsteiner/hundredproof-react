import { expect, test } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays the main heading', async ({ page }) => {
    await expect(
      page.getByText('Math for the modern mixologist.'),
    ).toBeVisible();
  });

  test('shows Dilute feature card', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Dilute' })).toBeVisible();
    await expect(
      page.getByText('Spirits at the perfect strength.'),
    ).toBeVisible();
  });

  test('shows Scale feature card', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Scale' })).toBeVisible();
    await expect(
      page.getByText('Cocktails for a thirsty crowd.'),
    ).toBeVisible();
  });

  test('Dilute "get started" link navigates to /dilute', async ({ page }) => {
    const diluteLink = page.getByRole('link', { name: 'get started' }).first();
    await diluteLink.click();
    await expect(page).toHaveURL('/dilute');
  });

  test('Scale "get started" link navigates to /scale', async ({ page }) => {
    const scaleLink = page.getByRole('link', { name: 'get started' }).nth(1);
    await scaleLink.click();
    await expect(page).toHaveURL('/scale');
  });
});
