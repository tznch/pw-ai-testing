import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { LoginPage } from './LoginPage'; // Import LoginPage

export class HomePage extends BasePage {
  readonly loginIcon: Locator;
  // Add other relevant locators for the home page as needed

  constructor(page: Page) {
    super(page);
    // Locator for the user/login link
    this.loginIcon = page.getByRole('link', { name: 'Вхід' }); // Refined selector to be unique
  }

  /**
   * Navigate to the Hotline home page and wait for it to load
   */
  async goto(): Promise<void> {
    try {
      await super.goto('https://hotline.ua/');
      await this.waitForPageLoad();
    } catch (error) {
      console.error('Failed to open Hotline home page:', error);
      await this.page.screenshot({ path: 'error-homepage-goto.png' });
      throw error;
    }
  }

  /**
   * Click the login icon to open the login modal
   * @returns {LoginPage} instance representing the login modal
   */
  async openLoginModal(): Promise<LoginPage> {
    try {
      await this.loginIcon.click();
      // Optionally, wait for login modal to appear here
      return new LoginPage(this.page);
    } catch (error) {
      console.error('Failed to open login modal:', error);
      await this.page.screenshot({ path: 'error-openLoginModal.png' });
      throw error;
    }
  }
}