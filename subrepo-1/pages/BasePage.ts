import { type Page, type Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   */
  async goto(url: string): Promise<void> {
    try {
      await this.page.goto(url);
    } catch (error) {
      console.error(`Failed to navigate to ${url}:`, error);
      await this.page.screenshot({ path: 'error-goto.png' });
      throw error;
    }
  }

  /**
   * Wait until the page has fully loaded (network idle)
   */
  async waitForPageLoad(): Promise<void> {
    try {
      await this.page.waitForLoadState('networkidle');
    } catch (error) {
      console.error('Failed while waiting for page load:', error);
      await this.page.screenshot({ path: 'error-waitForPageLoad.png' });
      throw error;
    }
  }
}