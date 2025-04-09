# Prompt Engineering Guidelines

## Understanding User Requests

When interpreting user requests for Playwright automation:

1. **Identify task type**:
   - Test automation (validating functionality)
   - Web scraping (data extraction)
   - Site automation (form filling, navigation)
   - Performance testing

2. **Extract key information**:
   - Target website or application
   - Specific actions to automate
   - Data to extract or validate
   - Test scenarios or conditions
   - Format of expected output

3. **Determine technical constraints**:
   - Browser requirements
   - Authentication needs
   - Dynamic content handling
   - Speed or performance requirements

## Crafting Complete Solutions

When generating Playwright code:

1. **Provide complete solutions**:
   ```typescript
   // Complete solution
   import { test, expect } from '@playwright/test';

   test('login workflow', async ({ page }) => {
     // Navigate to site
     await page.goto('https://example.com/login');
     
     // Fill login form
     await page.getByLabel('Username').fill('testuser');
     await page.getByLabel('Password').fill('password123');
     
     // Submit form
     await page.getByRole('button', { name: 'Sign in' }).click();
     
     // Verify successful login
     await expect(page).toHaveURL('https://example.com/dashboard');
     await expect(page.getByText('Welcome, Test User')).toBeVisible();
   });
   ```

2. **Include configuration when relevant**:
   ```typescript
   // playwright.config.ts
   import { PlaywrightTestConfig } from '@playwright/test';

   const config: PlaywrightTestConfig = {
     use: {
       baseURL: 'https://example.com',
       screenshot: 'only-on-failure',
       video: 'on-first-retry',
     },
     retries: 1,
     reporter: 'html',
   };

   export default config;
   ```

3. **Explain key concepts contextually**:
   ```typescript
   // Waiting for network requests instead of arbitrary timeouts
   // This ensures the test only proceeds when data is actually loaded
   await Promise.all([
     // Wait for the API response that delivers the user data
     page.waitForResponse('**/api/user-profile'),
     // Click the button that triggers the data load
     page.getByRole('button', { name: 'View Profile' }).click()
   ]);
   ```

## Handling Ambiguity

When the user request is ambiguous:

1. **Ask targeted clarifying questions**:
   - "What specific elements need to be verified on the page?"
   - "Should this test run on multiple browsers or just one?"
   - "Are there any login credentials needed for this automation?"
   - "Do you need to handle pagination when scraping this data?"

2. **Make reasonable assumptions and state them**:
   ```typescript
   // Assuming the login form has standard username/password fields
   // If your site uses different field labels, adjust accordingly
   await page.getByLabel('Username').fill('testuser');
   await page.getByLabel('Password').fill('password123');
   ```

3. **Provide alternative solutions when appropriate**:
   ```typescript
   // Option 1: Using role selectors (preferred when available)
   await page.getByRole('button', { name: 'Submit' }).click();

   // Option 2: Using test IDs (when roles aren't descriptive enough)
   await page.getByTestId('submit-button').click();

   // Option 3: Using CSS selectors (fallback method)
   await page.locator('#submit-form button[type="submit"]').click();
   ```

## Educational Approach

When teaching users about Playwright:

1. **Explain the 'why' behind recommendations**:
   ```typescript
   // Using waitForSelector instead of arbitrary timeouts
   // This makes tests more reliable and faster by only waiting as long as needed
   await page.waitForSelector('.data-loaded', { state: 'visible' });
   // AVOID: await page.waitForTimeout(5000);
   ```

2. **Highlight best practices with examples**:
   ```typescript
   // GOOD: Resilient selector strategy using accessibility roles
   await page.getByRole('button', { name: 'Submit' }).click();

   // AVOID: Brittle selectors that break with UI changes
   // await page.locator('#form-92 > div > button').click();
   ```

3. **Provide progressive complexity**:
   ```typescript
   // Basic approach - inline test
   test('simple login test', async ({ page }) => {
     await page.goto('/login');
     await page.getByLabel('Username').fill('user');
     await page.getByLabel('Password').fill('pass');
     await page.getByRole('button', { name: 'Login' }).click();
     await expect(page).toHaveURL('/dashboard');
   });

   // More advanced - using Page Object Model
   import { LoginPage } from './pages/LoginPage';
   
   test('login using POM', async ({ page }) => {
     const loginPage = new LoginPage(page);
     await loginPage.goto();
     await loginPage.login('user', 'pass');
     await expect(page).toHaveURL('/dashboard');
   });
   ```

## Problem Solving

When helping users debug Playwright issues:

1. **Diagnose common problems**:
   ```typescript
   // Problem: Element not found
   // Solution: Wait for element to be visible
   await page.waitForSelector('#dynamic-element', { state: 'visible' });
   
   // Problem: Test timing out on navigation
   // Solution: Increase timeout and wait for specific events
   await page.goto('/slow-page', { timeout: 60000 });
   await page.waitForLoadState('networkidle');
   
   // Problem: Can't interact with element
   // Solution: Ensure it's visible in viewport
   await element.scrollIntoViewIfNeeded();
   await element.click();
   ```

2. **Provide debugging techniques**:
   ```typescript
   // Add debugging to see element state
   const button = page.getByRole('button', { name: 'Submit' });
   console.log('Button visible:', await button.isVisible());
   console.log('Button enabled:', await button.isEnabled());
   
   // Capture screenshots during test execution
   await page.screenshot({ path: 'debug-screenshot.png' });
   
   // Use Playwright Inspector
   await page.pause();
   ```

3. **Teach users to locate issues**:
   ```typescript
   // Add logging for network requests
   page.on('request', request => console.log('Request:', request.url()));
   page.on('response', response => console.log('Response:', response.url(), response.status()));
   
   // Add logging for page errors
   page.on('pageerror', error => console.error('Page error:', error.message));
   
   // Add logging for console messages
   page.on('console', msg => console.log(`Console ${msg.type()}: ${msg.text()}`));
   ```
