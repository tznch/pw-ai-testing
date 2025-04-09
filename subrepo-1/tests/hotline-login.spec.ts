import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage'; // Ensure LoginPage is imported if needed directly, though openLoginModal returns it

// Test suite for Hotline Login functionality
test.describe('Hotline Login', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;

  // Use beforeEach to navigate and initialize pages for each test
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  // Test case for successful login
  test('should login successfully with valid credentials', async ({ page }) => {
    // Credentials - Consider using environment variables for sensitive data in real projects
    const email = process.env.LOGIN_EMAIL!;
    const password = process.env.LOGIN_PASSWORD!;

    // 1. Open the login modal from the home page
    loginPage = await homePage.openLoginModal();

    // 2. Perform login using the LoginPage object
    await loginPage.login(email, password);

    // 3. Assertion: Verify successful login
    // **IMPORTANT:** This selector needs verification. Inspect the page after login
    // to find a reliable element indicating the user is logged in.
    // Example: Check if the user icon changes state or a specific welcome message appears.
    const loggedInUserIcon = page.locator('div[data-dropdown-target="auth"].is-authorized'); // Placeholder selector - VERIFY THIS
    // const myProfileLink = page.locator('a:has-text("Мій кабінет")'); // Alternative placeholder - VERIFY THIS

    // Use a suitable assertion based on the verified element
    // TODO: Replace with actual selector indicating successful login
    // await expect(loggedInUserIcon, 'User should be logged in successfully').toBeVisible({ timeout: 10000 });
    // await expect(myProfileLink, 'User should be logged in successfully').toBeVisible({ timeout: 10000 });
  });

  // Add more test cases as needed (e.g., invalid login, password recovery)
});