import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Hotline Home Page UI', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should load the home page successfully', async ({ page }) => {
    await expect(page).toHaveURL(/hotline/i); // Adjust URL pattern as needed
  });

  test('should display the login icon', async () => {
    await expect(homePage.loginIcon).toBeVisible();
  });

  // Add more UI element checks as needed
  test('should display the search bar', async ({ page }) => {
    // TODO: Replace with actual selector for search input
    // const searchInput = page.locator('input[placeholder*="Пошук"]');
    // await expect(searchInput).toBeVisible();
  });

  test('should display the cart icon', async ({ page }) => {
    // TODO: Replace with actual selector for cart icon
    // const cartIcon = page.locator('.cart-icon-selector');
    // await expect(cartIcon).toBeVisible();
  });
});