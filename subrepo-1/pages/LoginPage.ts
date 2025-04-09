import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  // Add other relevant locators like error messages if needed

  constructor(page: Page) {
    super(page);
    // Locators for login form elements - Found via snapshot [ref=s2e15, s2e18, s2e23]
    this.emailInput = page.getByPlaceholder('E-mail або номер мобільного телефону');
    this.passwordInput = page.getByPlaceholder('Пароль');
    // More specific selector might be needed for the submit button within the form
    this.submitButton = page.getByRole('button', { name: 'Увійти' });
  }

  /**
   * Perform login with provided credentials
   */
  async login(email: string, password: string): Promise<void> {
    try {
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await this.submitButton.click({ force: true });
      // Optionally, wait for navigation or success indicator here
    } catch (error) {
      console.error('Failed to perform login:', error);
      await this.page.screenshot({ path: 'error-login.png' });
      throw error;
    }
  }

  // Optional: Add methods to check for login errors
  // async getLoginErrorMessage(): Promise<string | null> {
  //   const errorLocator = this.page.locator('.login-error-selector'); // Placeholder
  //   if (await errorLocator.isVisible()) {
  //     return errorLocator.textContent();
  //   }
  //   return null;
  // }
}