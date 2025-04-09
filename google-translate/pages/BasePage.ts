import type { Page } from '@playwright/test';

/**
 * BasePage provides common utilities for all pages.
 */
export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a given URL.
   * @param url - The URL to navigate to.
   */
  async goto(url: string): Promise<void> {
    try {
      await this.page.goto(url);
    } catch (error) {
      console.error(`Navigation to ${url} failed:`, error);
      await this.page.screenshot({ path: 'error-navigation.png' });
      throw error;
    }
  }
}