import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Trial Hero/);
});

test('has body', async ({ page }) => {
    await page.goto('/visual');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Interactive Body Search/);
});

