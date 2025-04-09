# Google Translate Playwright Tests

This subproject contains automated Playwright tests for [Google Translate](https://translate.google.com).

## Structure

- `playwright.config.ts` - Playwright configuration specific to Google Translate
- `pages/` - Page Object Models for Google Translate UI components
- `tests/` - Automated test cases covering core translation features

## Coverage Plan

- Verify page loads successfully
- Test language selection (source and target)
- Enter text and verify translation output
- Swap languages and verify translation updates
- Clear input and verify reset
- Test popular language pairs (English-Spanish, English-French, etc.)
- Validate UI elements presence and responsiveness

## How to run tests

```bash
# From the monorepo root
npx playwright test --config=google-translate/playwright.config.ts
```

## Notes

- Tests run on Chromium, Firefox, and WebKit by default
- Traces, screenshots, and videos are collected on failures