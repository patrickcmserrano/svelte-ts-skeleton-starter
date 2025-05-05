import { test, expect } from '@playwright/test';
import { AccessibilityHelper } from './helpers/accessibility';

test.describe('Theme Toggle Accessibility Tests', () => {
  let a11y: AccessibilityHelper;

  test.beforeEach(async ({ page }) => {
    // Go to the app's homepage before each test
    await page.goto('/');
    a11y = new AccessibilityHelper(page);
  });

  test('should have accessible heading structure', async ({ page }) => {
    // Check if the page has a valid heading structure
    await a11y.expectValidHeadingStructure();
    
    // Check if main heading is accessible
    const mainHeading = page.getByRole('heading', { level: 1 });
    await a11y.expectElementToBeAccessible(mainHeading);
  });

  test('should have proper theme toggle functionality', async ({ page }) => {
    // Verificar se o toggle de tema está na página
    const hasThemeToggle = await page.locator('.theme-toggle').isVisible();
    expect(hasThemeToggle, 'Theme toggle should be visible').toBeTruthy();
    
    // Verificar se é possível navegar com teclado até o elemento
    await page.keyboard.press('Tab');
    
    // Verifique se algo recebeu foco
    const hasFocus = await page.evaluate(() => {
      return document.activeElement !== document.body;
    });
    expect(hasFocus, 'Page should be keyboard navigable').toBeTruthy();
  });

  test('should maintain sufficient color contrast', async ({ page }) => {
    // Test contrast for heading
    await a11y.expectSufficientColorContrast(page.getByRole('heading', { level: 1 }));
  });
});