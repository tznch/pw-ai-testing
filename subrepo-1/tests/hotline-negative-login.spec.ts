import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

test.describe('Hotline Negative Login Scenarios', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
    loginPage = await homePage.openLoginModal();
  });

  test('should show error with invalid email', async () => {
    await loginPage.login('invalid@example.com', 'password123321');
    const errorLocator = loginPage.page.locator('.login-error-selector'); // Replace with actual selector
    // TODO: Replace with actual error message selector
    // await expect(errorLocator).toBeVisible();
  });

  test('should show error with invalid password', async () => {
    await loginPage.login('degantlk@proton.me', 'wrongpassword');
    const errorLocator = loginPage.page.locator('.login-error-selector'); // Replace with actual selector
    // TODO: Replace with actual error message selector
    // await expect(errorLocator).toBeVisible();
  });

  test('should show error with empty email', async () => {
    await loginPage.login('', 'password123321');
    const errorLocator = loginPage.page.locator('.login-error-selector'); // Replace with actual selector
    // TODO: Replace with actual error message selector
    // await expect(errorLocator).toBeVisible();
  });

  test('should show error with empty password', async () => {
    await loginPage.login('degantlk@proton.me', '');
    const errorLocator = loginPage.page.locator('.login-error-selector'); // Replace with actual selector
    // TODO: Replace with actual error message selector
    // await expect(errorLocator).toBeVisible();
  });

  test('should show error with both fields empty', async () => {
    await loginPage.login('', '');
    const errorLocator = loginPage.page.locator('.login-error-selector'); // Replace with actual selector
    // TODO: Replace with actual error message selector
    // await expect(errorLocator).toBeVisible();
  });
});