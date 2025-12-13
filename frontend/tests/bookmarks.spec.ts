import { test, expect } from '@playwright/test';

test('bookmark functionality', async ({ page }) => {
    // 1. Go to home page
    await page.goto('/');

    // 2. Search for trials
    const searchInput = page.locator('.trialSearchBar');
    await searchInput.fill('cancer');
    await searchInput.press('Enter');

    // 3. Wait for results
    await expect(page.locator('.trialCard').first()).toBeVisible();

    // 4. Bookmark the first trial
    const firstCard = page.locator('.trialCard').first();
    const bookmarkButton = firstCard.locator('button[aria-label="Add bookmark"]');
    await bookmarkButton.click();

    // 5. Verify button state changes
    await expect(firstCard.locator('button[aria-label="Remove bookmark"]')).toBeVisible();

    // 6. Go to bookmarks page
    await page.click('text=My Bookmarks');

    // 7. Verify trial is present
    await expect(page.locator('.trialCard')).toHaveCount(1);
    await expect(page.locator('h4')).toHaveText('Search Results: Bookmarks');

    // 8. Remove bookmark
    const removeButton = page.locator('button[aria-label="Remove bookmark"]');
    await removeButton.click();

    // 9. Verify trial is removed
    await expect(page.locator('.trialCard')).toHaveCount(0);
    await expect(page.getByText("You haven't bookmarked any trials yet.")).toBeVisible();
});
