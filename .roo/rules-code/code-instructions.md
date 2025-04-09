# Code Instruction Guidelines

## Code Generation Principles

When generating Playwright code, follow these principles:

1. **Complete and executable**: Provide full, working solutions that can be copied and run directly
2. **Typed**: Always use proper TypeScript typing for better code quality
3. **Error-handled**: Include try/catch blocks and error handling
4. **Well-commented**: Add concise, meaningful comments for key logic
5. **Follow idiomatic patterns**: Structure code according to Playwright best practices

## Code Style Guidelines

```typescript
// Preferred style for Playwright tests
import { test, expect } from '@playwright/test';

// Use descriptive test names that explain the scenario
test('user can log in with valid credentials', async ({ page }) => {
  // Arrange: Set up the test environment
  await page.goto('/login');

  // Act: Perform the actions
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Assert: Verify the expected outcome
  await expect(page).toHaveURL('/dashboard');
  await expect(page.getByText('Welcome back')).toBeVisible();
});
```

## Selector Priority

In order of preference, use these selector types:

1. **Role selectors**:
   ```typescript
   page.getByRole('button', { name: 'Submit' });
   page.getByRole('textbox', { name: 'Email' });
   ```

2. **Test ID selectors**:
   ```typescript
   page.getByTestId('submit-button');
   ```

3. **Accessible text/label selectors**:
   ```typescript
   page.getByLabel('Email');
   page.getByText('Create account');
   ```

4. **CSS selectors** (only when necessary):
   ```typescript
   page.locator('.submit-button');
   ```

## Error Handling Patterns

```typescript
// Proper error handling in Playwright
try {
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForURL('/success', { timeout: 5000 });
} catch (error) {
  // Log the error with context
  console.error('Failed to submit form:', error);
  
  // Take screenshot on error
  await page.screenshot({ path: 'error-screenshot.png' });
  
  // Re-throw or handle appropriately
  throw error;
}
```

## Async/Await Usage

```typescript
// Correct async/await pattern
test('demonstrates proper async/await usage', async ({ page }) => {
  // Always await Playwright actions
  await page.goto('/products');
  
  // Chain promises correctly
  const productCount = await page.locator('.product-card').count();
  
  // Handle multiple parallel operations
  const [response] = await Promise.all([
    page.waitForResponse('**/api/products'),
    page.getByRole('button', { name: 'Load more' }).click()
  ]);
  
  // Verify the result
  expect(await response.json()).toHaveProperty('products');
});
```

## TypeScript Best Practices

```typescript
// Define proper interfaces for your data
interface User {
  username: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

// Use type annotations for variables and parameters
async function loginUser(page: Page, user: User): Promise<void> {
  await page.goto('/login');
  await page.getByLabel('Username').fill(user.username);
  await page.getByLabel('Email').fill(user.email);
  
  // Use enums or union types for limited options
  if (user.role === 'admin') {
    await page.getByLabel('Admin access').check();
  }
}

// Export types and interfaces for reuse
export type { User };
```

## Component Extraction

```typescript
// Extract reusable components
async function fillContactForm(page: Page, data: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  await page.getByLabel('Name').fill(data.name);
  await page.getByLabel('Email').fill(data.email);
  await page.getByLabel('Message').fill(data.message);
}

// Use in tests
test('contact form submission', async ({ page }) => {
  await page.goto('/contact');
  
  // Use extracted component
  await fillContactForm(page, {
    name: 'John Doe',
    email: 'john@example.com',
    message: 'This is a test message'
  });
  
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.getByText('Message sent')).toBeVisible();
});
```

## Advanced TypeScript Patterns

```typescript
// Use generics for flexible functions
async function getTableData<T>(page: Page, selector: string): Promise<T[]> {
  const rows = page.locator(`${selector} tbody tr`);
  const count = await rows.count();
  
  const results: T[] = [];
  
  for (let i = 0; i < count; i++) {
    const cells = rows.nth(i).locator('td');
    const rowData: Record<string, any> = {};
    
    // Get column headers
    const headers = await page.locator(`${selector} thead th`).allInnerTexts();
    
    // Map cell values to column headers
    const cellValues = await cells.allInnerTexts();
    headers.forEach((header, index) => {
      rowData[header.toLowerCase().replace(/\s+/g, '_')] = cellValues[index];
    });
    
    results.push(rowData as T);
  }
  
  return results;
}

// Usage with type
interface Product {
  name: string;
  price: string;
  stock: string;
}

test('product table data', async ({ page }) => {
  await page.goto('/products');
  const products = await getTableData<Product>(page, '#product-table');
  
  expect(products.length).toBeGreaterThan(0);
  expect(products[0].name).toBeDefined();
});
```
