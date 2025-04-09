import type { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object Model for https://translate.google.com
 */
export class TranslatePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to Google Translate homepage.
   */
  async gotoHome(): Promise<void> {
    await this.goto('https://translate.google.com');
  }

  /**
   * Enter text to be translated.
   * @param text - The input text.
   */
  async enterSourceText(text: string): Promise<void> {
    try {
      const input = this.page.locator('textarea[aria-label="Source text"], div[aria-label="Source text"][contenteditable="true"]');
      await input.fill(text);
    } catch (error) {
      console.error('Failed to enter source text:', error);
      await this.page.screenshot({ path: 'error-enter-text.png' });
      throw error;
    }
  }

  /**
   * Get the translated output text.
   * @returns The translated text.
   */
  async getTranslatedText(): Promise<string> {
    try {
      const output = this.page.locator('span[jsname="W297wb"]');
      await output.first().waitFor({ state: 'visible', timeout: 5000 });
      const parts = await output.allInnerTexts();
      return parts.join(' ').trim();
    } catch (error) {
      console.error('Failed to get translated text:', error);
      await this.page.screenshot({ path: 'error-get-translation.png' });
      throw error;
    }
  }

  /**
   * Swap source and target languages.
   */
  async swapLanguages(): Promise<void> {
    try {
      const swapButton = this.page.getByRole('button', { name: 'Swap languages' });
      await swapButton.click();
    } catch (error) {
      console.error('Failed to swap languages:', error);
      await this.page.screenshot({ path: 'error-swap-languages.png' });
      throw error;
    }
  }

  /**
   * Clear the input text.
   */
  async clearInput(): Promise<void> {
    try {
      const clearButton = this.page.getByRole('button', { name: 'Clear source text' });
      await clearButton.click();
    } catch (error) {
      console.error('Failed to clear input:', error);
      await this.page.screenshot({ path: 'error-clear-input.png' });
      throw error;
    }
  }

  /**
   * Select source language.
   * @param language - Language name, e.g., 'English'
   */
  async selectSourceLanguage(language: string): Promise<void> {
    try {
      const sourceLangButton = this.page.locator('[aria-label="Source language"] button').first();
      await sourceLangButton.click();
      const langOption = this.page.getByRole('option', { name: language });
      await langOption.click();
    } catch (error) {
      console.error(`Failed to select source language "${language}":`, error);
      await this.page.screenshot({ path: 'error-select-source-language.png' });
      throw error;
    }
  }

  /**
   * Select target language.
   * @param language - Language name, e.g., 'Spanish'
   */
  async selectTargetLanguage(language: string): Promise<void> {
    try {
      const targetLangButton = this.page.locator('[aria-label="Target language"] button').first();
      await targetLangButton.click();
      const langOption = this.page.getByRole('option', { name: language });
      await langOption.click();
    } catch (error) {
      console.error(`Failed to select target language "${language}":`, error);
      await this.page.screenshot({ path: 'error-select-target-language.png' });
      throw error;
    }
  }
}