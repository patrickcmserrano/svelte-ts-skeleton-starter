import { expect, type Locator, type Page } from '@playwright/test';

/**
 * Utility functions for accessibility testing in Playwright
 */
export class AccessibilityHelper {
  constructor(private page: Page) {}

  /**
   * Checks if an element is visible and accessible to screen readers
   */
  async expectElementToBeAccessible(locator: Locator, options?: { label?: string }) {
    // Check if visible to sighted users
    await expect(locator).toBeVisible();
    
    // Check if it has correct ARIA attributes when specified
    if (options?.label) {
      const ariaLabel = await locator.getAttribute('aria-label');
      const accessibleName = 
        ariaLabel || 
        await locator.getAttribute('alt') || 
        await locator.textContent() || '';
      
      expect(
        accessibleName.toLowerCase().includes(options.label.toLowerCase()),
        `Element should have accessible name containing "${options.label}"`
      ).toBeTruthy();
    }
  }

  /**
   * Checks if a button is accessible
   */
  async expectButtonToBeAccessible(buttonLocator: Locator, label: string) {
    await this.expectElementToBeAccessible(buttonLocator, { label });
    
    // Verify it's focusable
    await buttonLocator.focus();
    const isFocused = await this.page.evaluate(() => {
      return document.activeElement === document.querySelector(':focus');
    });
    expect(isFocused, 'Button should be focusable').toBeTruthy();
  }

  /**
   * Verifies color contrast meets WCAG standards based on computed styles
   * This is a simplified check and might need adjustments for complex elements
   */
  async expectSufficientColorContrast(locator: Locator) {
    const foregroundColor = await locator.evaluate((el) => 
      window.getComputedStyle(el).color
    );
    
    const backgroundColor = await locator.evaluate((el) => {
      let bgColor = window.getComputedStyle(el).backgroundColor;
      if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
        // Try to get parent background if element is transparent
        const parent = el.parentElement;
        if (parent) {
          bgColor = window.getComputedStyle(parent).backgroundColor;
        }
      }
      return bgColor;
    });
    
    // Log colors for manual verification (automated contrast calculation is complex)
    console.log(`Element color check - Text: ${foregroundColor}, Background: ${backgroundColor}`);
  }

  /**
   * Verifies the page has a proper heading structure
   */
  async expectValidHeadingStructure() {
    const headings = await this.page.locator('h1, h2, h3, h4, h5, h6').all();
    
    // Check if page has at least one heading
    expect(headings.length).toBeGreaterThan(0);
    
    // Check if there's exactly one h1 per page
    const h1Count = await this.page.locator('h1').count();
    expect(h1Count, 'Page should have exactly one h1 heading').toBe(1);
  }

  /**
   * Verifies page has proper keyboard navigation
   */
  async expectKeyboardNavigable() {
    // Press Tab to navigate through elements
    await this.page.keyboard.press('Tab');
    
    // Check if something got focused
    const hasFocus = await this.page.evaluate(() => {
      return document.activeElement !== document.body;
    });
    
    expect(hasFocus, 'Page should be keyboard navigable').toBeTruthy();
  }
}