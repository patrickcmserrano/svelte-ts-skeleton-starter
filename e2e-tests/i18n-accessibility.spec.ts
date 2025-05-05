import { test, expect } from '@playwright/test';
import { AccessibilityHelper } from './helpers/accessibility';

test.describe('Language Selector Accessibility Tests', () => {
  let a11y: AccessibilityHelper;

  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto('/');
    a11y = new AccessibilityHelper(page);
  });

  test('language selector should be accessible by keyboard', async ({ page }) => {
    // Check if language buttons are present
    const enButton = page.getByRole('button', { name: 'English' });
    
    // Check if the button can receive focus
    await enButton.focus();
    
    // Confirm that the element received focus
    const isFocused = await page.evaluate(() => {
      return document.activeElement?.tagName.toLowerCase() === 'button';
    });
    
    expect(isFocused, 'The language button should receive focus').toBeTruthy();
    
    // Check keyboard navigation between buttons
    await page.keyboard.press('Tab');
    
    // Confirm that focus moved to the next button
    const secondButtonFocused = await page.evaluate(() => {
      return document.activeElement?.tagName.toLowerCase() === 'button' && 
             document.activeElement?.textContent?.trim() === 'PT';
    });
    
    expect(secondButtonFocused, 'It should be possible to navigate between buttons with Tab').toBeTruthy();
  });

  test('language buttons should have appropriate labels', async ({ page }) => {
    // Check if each button has an aria-label
    const enButton = page.getByRole('button', { name: 'English' });
    const ptButton = page.getByRole('button', { name: 'Português' });
    const esButton = page.getByRole('button', { name: 'Español' });
    
    // Check if buttons have aria-label
    const enHasAriaLabel = await enButton.evaluate(el => !!el.getAttribute('aria-label'));
    const ptHasAriaLabel = await ptButton.evaluate(el => !!el.getAttribute('aria-label'));
    const esHasAriaLabel = await esButton.evaluate(el => !!el.getAttribute('aria-label'));
    
    expect(enHasAriaLabel, 'The EN button should have aria-label').toBeTruthy();
    expect(ptHasAriaLabel, 'The PT button should have aria-label').toBeTruthy();
    expect(esHasAriaLabel, 'The ES button should have aria-label').toBeTruthy();
  });

  test('changing language should not cause accessibility issues', async ({ page }) => {
    // Check initial heading structure
    await a11y.expectValidHeadingStructure();
    
    // Click on the PT button
    const ptButton = page.getByRole('button', { name: 'Português' });
    await ptButton.click();
    
    // Wait for text change
    await page.waitForTimeout(500);
    
    // Check heading structure after change
    await a11y.expectValidHeadingStructure();
    
    // Check color contrast after change
    await a11y.expectSufficientColorContrast(page.getByRole('heading', { level: 1 }));
    
    // Click on the ES button
    const esButton = page.getByRole('button', { name: 'Español' });
    await esButton.click();
    
    // Wait for text change
    await page.waitForTimeout(500);
    
    // Repeat checks
    await a11y.expectValidHeadingStructure();
    await a11y.expectSufficientColorContrast(page.getByRole('heading', { level: 1 }));
  });

  test('active button should be visually distinct', async ({ page }) => {
    // Check if the active button has the 'active' class
    const ptButton = page.getByRole('button', { name: 'Português' });
    await ptButton.click();
    
    // Wait for the change
    await page.waitForTimeout(500);
    
    // Check if the PT button has the 'active' class
    const ptHasActiveClass = await ptButton.evaluate(el => el.classList.contains('active'));
    expect(ptHasActiveClass, 'The PT button should have the active class after being clicked').toBeTruthy();
    
    // Check if the EN button does not have the 'active' class
    const enButton = page.getByRole('button', { name: 'English' });
    const enHasActiveClass = await enButton.evaluate(el => el.classList.contains('active'));
    expect(enHasActiveClass, 'The EN button should not have the active class after clicking PT').toBeFalsy();
  });
});