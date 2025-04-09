import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

test.describe('Hotline Login UI Validation', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
    loginPage = await homePage.openLoginModal();
  });

  test('should display email and password inputs and submit button', async () => {
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
  });

  test('should have empty email and password fields initially', async () => {
    await expect(loginPage.emailInput).toHaveValue('');
    await expect(loginPage.passwordInput).toHaveValue('');
  });

  test('should not submit form with empty fields', async () => {
    // TODO: Replace with actual error message selector and ensure button is clickable
    // await loginPage.submitButton.click();
    // const errorLocator = loginPage.page.locator('.login-error-selector');
    // await expect(errorLocator).toBeVisible();
  });

  test('should show error if only email is filled', async () => {
    // TODO: Replace with actual error message selector and ensure button is clickable
    // await loginPage.emailInput.fill('degantlk@proton.me');
    // await loginPage.submitButton.click();
    // const errorLocator = loginPage.page.locator('.login-error-selector');
    // await expect(errorLocator).toBeVisible();
  });

  test('should show error if only password is filled', async () => {
    // TODO: Replace with actual error message selector and ensure button is clickable
    // await loginPage.passwordInput.fill('password123321');
    // await loginPage.submitButton.click();
    // const errorLocator = loginPage.page.locator('.login-error-selector');
    // await expect(errorLocator).toBeVisible();
  });
});