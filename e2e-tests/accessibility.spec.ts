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
    // Verificar se o toggle de tema está na página usando um seletor mais específico
    const themeToggleButton = page.getByRole('button', { name: 'Toggle light/dark theme' });
    const isVisible = await themeToggleButton.isVisible();
    expect(isVisible, 'Theme toggle button should be visible').toBeTruthy();
    
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

  test('should toggle theme correctly', async ({ page }) => {
    // Verificar o tema inicial
    const initialTheme = await page.evaluate(() => 
      document.documentElement.getAttribute('data-mode')
    );
    
    // Clicar no botão de alternar tema
    const themeToggleButton = page.getByRole('button', { name: 'Toggle light/dark theme' });
    await themeToggleButton.click();
    
    // Verificar se o tema foi alterado
    const newTheme = await page.evaluate(() => 
      document.documentElement.getAttribute('data-mode')
    );
    
    // Se começou como light, deve ter mudado para dark e vice-versa
    expect(newTheme).not.toBe(initialTheme);
    
    // Verificar se o tema foi alterado no Skeleton UI também
    if (newTheme === 'dark') {
      const hasVintageTheme = await page.evaluate(() => 
        document.documentElement.getAttribute('data-theme') === 'vintage'
      );
      expect(hasVintageTheme).toBeTruthy();
    } else {
      const hasSkeletonTheme = await page.evaluate(() => 
        document.documentElement.getAttribute('data-theme') === 'skeleton'
      );
      expect(hasSkeletonTheme).toBeTruthy();
    }
    
    // Verificar se a classe dark também foi aplicada corretamente
    const hasDarkClass = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    expect(hasDarkClass).toBe(newTheme === 'dark');
  });
});