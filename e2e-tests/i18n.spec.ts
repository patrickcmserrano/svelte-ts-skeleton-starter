import { test, expect } from '@playwright/test';

test.describe('Internationalization (i18n) Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto('/');
  });

  test('should display the language selector', async ({ page }) => {
    // Check if language buttons are present
    const enButton = page.getByRole('button', { name: 'English' });
    const ptButton = page.getByRole('button', { name: 'Português' });
    const esButton = page.getByRole('button', { name: 'Español' });
    
    await expect(enButton).toBeVisible();
    await expect(ptButton).toBeVisible();
    await expect(esButton).toBeVisible();
  });

  test('should allow changing the language', async ({ page }) => {
    // Record the main heading text for later comparison
    const initialTitle = await page.getByRole('heading', { level: 1 }).textContent();
    
    // Change to Portuguese
    const ptButton = page.getByRole('button', { name: 'Português' });
    await ptButton.click();
    
    // Wait for the text to change (may need to adjust this time)
    await page.waitForTimeout(500);
    
    // Check if the text has been updated
    const titleAfterChange = await page.getByRole('heading', { level: 1 }).textContent();
    expect(titleAfterChange).not.toBe(initialTitle);
    
    // Change to Spanish
    const esButton = page.getByRole('button', { name: 'Español' });
    await esButton.click();
    
    // Wait for the text to change
    await page.waitForTimeout(500);
    
    // Check if the text has been updated again
    const titleAfterSecondChange = await page.getByRole('heading', { level: 1 }).textContent();
    expect(titleAfterSecondChange).not.toBe(initialTitle);
    expect(titleAfterSecondChange).not.toBe(titleAfterChange);
  });

  test('should display texts corresponding to the selected language', async ({ page }) => {
    // Expected texts in each language (based on i18n.ts file)
    const expectedTexts = {
      en: {
        title: 'Svelte Template with Theme',
        subtitle: 'A basic Svelte application template with light/dark theme support.'
      },
      pt: {
        title: 'Template Svelte com Tema',
        subtitle: 'Um modelo básico de aplicação Svelte com suporte a tema claro/escuro.'
      },
      es: {
        title: 'Plantilla Svelte con Tema',
        subtitle: 'Un modelo básico de aplicación Svelte con soporte para tema claro/oscuro.'
      }
    };
    
    // Test each language
    const languages = [
      { code: 'en', button: page.getByRole('button', { name: 'English' }) },
      { code: 'pt', button: page.getByRole('button', { name: 'Português' }) },
      { code: 'es', button: page.getByRole('button', { name: 'Español' }) }
    ];
    
    for (const lang of languages) {
      // Change to the language
      await lang.button.click();
      
      // Wait for the text to change
      await page.waitForTimeout(500);
      
      // Check the title
      const title = await page.getByRole('heading', { level: 1 }).textContent();
      expect(title).toContain(expectedTexts[lang.code].title);
      
      // Check the subtitle
      const subtitle = page.getByText(expectedTexts[lang.code].subtitle, { exact: true });
      await expect(subtitle).toBeVisible();
    }
  });

  test('should persist language preference between reloads', async ({ page }) => {
    // Change to Portuguese
    const ptButton = page.getByRole('button', { name: 'Português' });
    await ptButton.click();
    
    // Wait for the text to change
    await page.waitForTimeout(500);
    
    // Record the heading text in Portuguese
    const titleInPortuguese = await page.getByRole('heading', { level: 1 }).textContent();
    
    // Reload the page
    await page.reload();
    
    // Wait for the page to fully load after reload
    await page.waitForLoadState('networkidle');
    
    // Check if the text is still in Portuguese after reload
    const titleAfterReload = await page.getByRole('heading', { level: 1 }).textContent();
    expect(titleAfterReload).toBe(titleInPortuguese);
  });
});