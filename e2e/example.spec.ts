import { test, expect } from '@playwright/test';

test('homepage has expected sections', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/PODMO|Lovable|Digital Marketing/);
  await expect(page.locator('header')).toBeVisible();
});
