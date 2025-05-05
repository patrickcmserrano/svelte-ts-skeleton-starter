import { test, expect } from '@playwright/test';
import { AccessibilityHelper } from './helpers/accessibility';

test.describe('Breathing App Accessibility Tests', () => {
  let a11y: AccessibilityHelper;

  test.beforeEach(async ({ page }) => {
    // Go to the app's homepage before each test
    await page.goto('/');
    a11y = new AccessibilityHelper(page);
  });

  test('should have accessible heading structure', async ({ page }) => {
    // Check if the page has a valid heading structure
    await a11y.expectValidHeadingStructure();
    
    // Check if main heading is accessible - Look for any main heading text
    const mainHeading = page.getByRole('heading', { level: 1 });
    await a11y.expectElementToBeAccessible(mainHeading);
  });

  test('should have accessible breathing control buttons', async ({ page }) => {
    // Check if start button is accessible
    const startButton = page.getByRole('button', { name: /start/i });
    await a11y.expectButtonToBeAccessible(startButton, 'start');
  });

  test('should be navigable by keyboard', async ({ page }) => {
    // Verify keyboard navigation
    await a11y.expectKeyboardNavigable();
  });

  test('should have accessible navigation', async ({ page }) => {
    // Look for navigation elements
    const navLinks = page.getByRole('link');
    
    // Verify at least one link is accessible
    const aboutLink = navLinks.filter({ hasText: /about/i });
    if (await aboutLink.count() > 0) {
      await a11y.expectElementToBeAccessible(aboutLink);
    }
  });

  test('should maintain sufficient color contrast for main elements', async ({ page }) => {
    // Test key elements for sufficient color contrast
    await a11y.expectSufficientColorContrast(page.getByRole('heading', { level: 1 }));
    await a11y.expectSufficientColorContrast(page.getByRole('button').first());
  });
});