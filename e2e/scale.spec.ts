import { expect, test } from '@playwright/test';

test.describe('Scale Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/scale');
  });

  test('displays page heading and description', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Scale', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText('Enter each ingredient like'),
    ).toBeVisible();
  });

  test('shows default serving count input', async ({ page }) => {
    await expect(page.getByText("I'm serving")).toBeVisible();
    await expect(page.getByText('people.')).toBeVisible();
  });

  test('shows Original Recipe and Scaled Recipe headings', async ({
    page,
  }) => {
    await expect(
      page.getByRole('heading', { name: 'Original Recipe' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Scaled Recipe' }),
    ).toBeVisible();
  });

  test.describe('Happy Path - Scale a Recipe', () => {
    test('scales ingredients and shows results', async ({ page }) => {
      // Use pressSequentially to simulate real typing (needed for
      // IngredientItem's useEffect to properly update ingredient values)
      const firstInput = page.locator('ul input[type="text"]').first();
      await firstInput.pressSequentially('1 oz gin', { delay: 30 });
      await page.waitForTimeout(500);

      const secondInput = page.locator('ul input[type="text"]').nth(1);
      await secondInput.pressSequentially('1 oz Campari', { delay: 30 });
      await page.waitForTimeout(500);

      const thirdInput = page.locator('ul input[type="text"]').nth(2);
      await thirdInput.pressSequentially('1 oz sweet vermouth', {
        delay: 30,
      });
      await page.waitForTimeout(500);

      await page.getByRole('button', { name: 'Scale Recipe' }).click();

      // Default scaling factor is 2, so results should show scaled amounts
      await expect(page.locator('ul').last().getByText('gin')).toBeVisible();
    });
  });

  test.describe('Auto-add ingredient row', () => {
    test('adds a new empty row when user types in the last row', async ({
      page,
    }) => {
      const initialInputs = await page
        .locator('ul input[type="text"]')
        .count();

      await page
        .locator('ul input[type="text"]')
        .first()
        .pressSequentially('1 oz gin', { delay: 30 });
      await page.waitForTimeout(500);

      const updatedInputs = await page
        .locator('ul input[type="text"]')
        .count();
      expect(updatedInputs).toBeGreaterThan(initialInputs);
    });
  });

  test.describe('Remove ingredient', () => {
    test('removes an ingredient when X button is clicked', async ({
      page,
    }) => {
      await page
        .locator('ul input[type="text"]')
        .first()
        .pressSequentially('1 oz gin', { delay: 30 });
      await page.waitForTimeout(500);

      const inputsBefore = await page
        .locator('ul input[type="text"]')
        .count();

      // Click the first remove button (close icon)
      await page.locator('ul li button').first().click();
      await page.waitForTimeout(300);

      const inputsAfter = await page
        .locator('ul input[type="text"]')
        .count();
      expect(inputsAfter).toBeLessThan(inputsBefore);
    });
  });

  test.describe('Error Handling', () => {
    test('shows error for incomplete ingredients', async ({ page }) => {
      await page
        .locator('ul input[type="text"]')
        .first()
        .pressSequentially('gin', { delay: 30 });

      // Wait for React effects (processIngredients) to settle
      await page.waitForTimeout(1000);

      await page.getByRole('button', { name: 'Scale Recipe' }).click();

      await expect(page.getByText('valid ingredients')).toBeVisible({
        timeout: 5000,
      });
    });
  });

  test.describe('Serving count', () => {
    test('can change serving count', async ({ page }) => {
      // The serving count input is the autosize input in the ScalingHeader
      const servingInputs = page.locator('input[type="text"]');
      // The first text input on the page should be the serving count
      await servingInputs.first().fill('8');

      // Verify the value was set
      await expect(servingInputs.first()).toHaveValue('8');
    });
  });
});
