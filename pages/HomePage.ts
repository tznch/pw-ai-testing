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

  async goto(): Promise<void> {
    await super.goto('https://hotline.ua/');
    await this.waitForPageLoad(); // Wait for the page to be ready
  }

  async openLoginModal(): Promise<LoginPage> {
    await this.loginIcon.click();
    // Assuming clicking the icon opens a modal/form handled by LoginPage
    // Wait for a specific element of the login modal to be visible if necessary
    // e.g., await this.page.locator('#login-form-selector').waitFor({ state: 'visible' });
    return new LoginPage(this.page);
  }
}