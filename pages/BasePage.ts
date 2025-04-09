import { type Page, type Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async waitForPageLoad(): Promise<void> {
    // Example: Wait for network idle, adjust as needed for the specific site
    await this.page.waitForLoadState('networkidle');
  }
}