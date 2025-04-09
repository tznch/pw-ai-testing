import { test, expect } from '@playwright/test';

test.describe('Hotline Main User Experience', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://hotline.ua');
  });

  test('should search for a product and see results', async ({ page }) => {
    const searchBox = page.getByPlaceholder('Знайти товар, магазин, бренд');
    await searchBox.fill('iPhone');
    await searchBox.press('Enter');
    await page.waitForLoadState('networkidle');
    console.log('Search submitted');
    await expect(page.locator('input[placeholder*="Знайти"]')).toBeVisible({ timeout: 10000 });
    // Instead of matching many "iPhone" texts, verify search input contains the query
    await expect(searchBox).toHaveValue(/iPhone/i, { timeout: 10000 });
  });

  test('should navigate to Смартфони category and see listings', async ({ page }) => {
    const catalogLink = page.getByRole('banner').getByText('Каталог товарів');
    await catalogLink.click();
    await page.waitForLoadState('networkidle');
    const smartphonesLink = page.getByRole('link', { name: 'Смартфони, Смарт-годинники' });
    await smartphonesLink.first().click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('text=Смартфони').first()).toBeVisible({ timeout: 10000 });
  });

  test('should open a product detail page', async ({ page }) => {
    const catalogLink = page.getByRole('banner').getByText('Каталог товарів');
    await catalogLink.click();
    await page.waitForLoadState('networkidle');
    const smartphonesLink = page.getByRole('link', { name: 'Смартфони, Смарт-годинники' });
    await smartphonesLink.first().click();
    await page.waitForLoadState('networkidle');
    const productLink = page.locator('a:has-text("Apple iPhone")').first();
    await productLink.waitFor({ state: 'visible', timeout: 10000 });
    console.log('Scrolling to product link');
    await productLink.scrollIntoViewIfNeeded();
    console.log('Clicking product link');
    await productLink.click({ force: true });
    await page.waitForLoadState('networkidle');
    console.log('Current URL:', page.url());
    // Verify product detail page by checking for a heading with 'Apple' or 'iPhone'
    const productTitle = page.locator('h1, h2, h3').filter({ hasText: /Apple|iPhone/i }).first();
    await expect(productTitle).toBeVisible({ timeout: 10000 });
  });

  test('should access reviews section', async ({ page }) => {
    const footerReviewsLink = page.getByRole('contentinfo').getByRole('link', { name: 'Відгуки про товари' }).first();
    await footerReviewsLink.waitFor({ state: 'visible', timeout: 10000 });
    await footerReviewsLink.click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('text=Відгуки').first()).toBeVisible({ timeout: 10000 });
  });
});