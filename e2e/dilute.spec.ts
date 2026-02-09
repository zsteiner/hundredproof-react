import { expect, test } from '@playwright/test';

test.describe('Dilute Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dilute');
  });

  test('displays page heading and description', async ({ page }) => {
    await expect(page.getByText('Dilute')).toBeVisible();
    await expect(
      page.getByText('Enter your quantity and starting proof or ABV'),
    ).toBeVisible();
  });

  test('shows default state with Proof selected and Start Amount', async ({
    page,
  }) => {
    const proofRadio = page.locator('input[name="measure"][value="proof"]');
    await expect(proofRadio).toBeChecked();

    const startRadio = page.locator('input[name="volume"][value="start"]');
    await expect(startRadio).toBeChecked();

    await expect(page.getByText('I have')).toBeVisible();
  });

  test.describe('Happy Path - Start Amount with Proof', () => {
    test('calculates dilution and shows results', async ({ page }) => {
      const amountInput = page.locator('input[type="text"]').first();
      await amountInput.fill('10');

      const startingInput = page
        .locator('input[type="text"]')
        .nth(1);
      await startingInput.fill('100');

      const desiredInput = page
        .locator('input[type="text"]')
        .nth(2);
      await desiredInput.fill('50');

      await page.getByRole('button', { name: 'calculate' }).click();

      await expect(page.getByText('You Should Add')).toBeVisible();
      await expect(page.getByText('water')).toBeVisible();
    });
  });

  test.describe('End Amount mode', () => {
    test('switches label to "I want" and shows Combine heading', async ({
      page,
    }) => {
      await page.getByText('End Amount').click();
      await expect(page.getByText('I want', { exact: true })).toBeVisible();

      const amountInput = page.locator('input[type="text"]').first();
      await amountInput.fill('10');

      const startingInput = page.locator('input[type="text"]').nth(1);
      await startingInput.fill('100');

      const desiredInput = page.locator('input[type="text"]').nth(2);
      await desiredInput.fill('50');

      await page.getByRole('button', { name: 'calculate' }).click();

      await expect(page.getByText('You Should Combine')).toBeVisible();
      await expect(page.getByText('spirits')).toBeVisible();
    });
  });

  test.describe('ABV mode', () => {
    test('switches to ABV mode', async ({ page }) => {
      await page.getByText('ABV', { exact: true }).click();

      const abvRadio = page.locator('input[name="measure"][value="abv"]');
      await expect(abvRadio).toBeChecked();
    });
  });

  test.describe('Unit Selection', () => {
    test('can select jigger unit', async ({ page }) => {
      const jiggerRadio = page.locator('input[name="bg2"][value="jigger"]');
      await jiggerRadio.check({ force: true });
      await expect(jiggerRadio).toBeChecked();
    });

    test('can select cup unit', async ({ page }) => {
      const cupRadio = page.locator('input[name="bg2"][value="cup"]');
      await cupRadio.check({ force: true });
      await expect(cupRadio).toBeChecked();
    });
  });

  test.describe('Error Handling', () => {
    test('shows error when amount is cleared', async ({ page }) => {
      const amountInput = page.locator('input[type="text"]').first();
      await amountInput.fill('');

      await expect(page.getByText('You need an amount.')).toBeVisible();
    });

    test('shows error when desired ABV >= starting ABV', async ({ page }) => {
      const startingInput = page.locator('input[type="text"]').nth(1);
      await startingInput.fill('50');

      const desiredInput = page.locator('input[type="text"]').nth(2);
      await desiredInput.fill('80');

      await expect(
        page.getByText('Your starting ABV needs to be higher'),
      ).toBeVisible();
    });

    test('shows error when proof is too high (>200)', async ({ page }) => {
      const startingInput = page.locator('input[type="text"]').nth(1);
      await startingInput.fill('250');

      await expect(
        page.getByText('That proof is too high'),
      ).toBeVisible();
    });

    test('calculate button has disabled styling when there is an error', async ({
      page,
    }) => {
      const amountInput = page.locator('input[type="text"]').first();
      await amountInput.fill('');

      const calculateButton = page.getByRole('button', { name: 'calculate' });
      await expect(calculateButton).toHaveClass(/disabled/);
    });
  });
});
