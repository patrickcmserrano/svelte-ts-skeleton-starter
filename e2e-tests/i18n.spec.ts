import { test, expect } from '@playwright/test';

test.describe('Testes de Internacionalização (i18n)', () => {
  test.beforeEach(async ({ page }) => {
    // Navega para a página inicial antes de cada teste
    await page.goto('/');
  });

  test('deve exibir o seletor de idiomas', async ({ page }) => {
    // Verifica se os botões de idioma estão presentes
    const enButton = page.getByRole('button', { name: 'English' });
    const ptButton = page.getByRole('button', { name: 'Português' });
    const esButton = page.getByRole('button', { name: 'Español' });
    
    await expect(enButton).toBeVisible();
    await expect(ptButton).toBeVisible();
    await expect(esButton).toBeVisible();
  });

  test('deve permitir trocar de idioma', async ({ page }) => {
    // Registra o texto do cabeçalho principal para comparação posterior
    const initialTitle = await page.getByRole('heading', { level: 1 }).textContent();
    
    // Muda para português
    const ptButton = page.getByRole('button', { name: 'Português' });
    await ptButton.click();
    
    // Aguarda a alteração do texto (pode ser necessário ajustar este tempo)
    await page.waitForTimeout(500);
    
    // Verifica se o texto foi atualizado
    const titleAfterChange = await page.getByRole('heading', { level: 1 }).textContent();
    expect(titleAfterChange).not.toBe(initialTitle);
    
    // Muda para espanhol
    const esButton = page.getByRole('button', { name: 'Español' });
    await esButton.click();
    
    // Aguarda a alteração do texto
    await page.waitForTimeout(500);
    
    // Verifica se o texto foi atualizado novamente
    const titleAfterSecondChange = await page.getByRole('heading', { level: 1 }).textContent();
    expect(titleAfterSecondChange).not.toBe(initialTitle);
    expect(titleAfterSecondChange).not.toBe(titleAfterChange);
  });

  test('deve exibir textos correspondentes ao idioma selecionado', async ({ page }) => {
    // Textos esperados em cada idioma (baseados no arquivo i18n.ts)
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
    
    // Testa cada idioma
    const languages = [
      { code: 'en', button: page.getByRole('button', { name: 'English' }) },
      { code: 'pt', button: page.getByRole('button', { name: 'Português' }) },
      { code: 'es', button: page.getByRole('button', { name: 'Español' }) }
    ];
    
    for (const lang of languages) {
      // Muda para o idioma
      await lang.button.click();
      
      // Aguarda a alteração do texto
      await page.waitForTimeout(500);
      
      // Verifica o título
      const title = await page.getByRole('heading', { level: 1 }).textContent();
      expect(title).toContain(expectedTexts[lang.code].title);
      
      // Verifica o subtítulo
      const subtitle = page.getByText(expectedTexts[lang.code].subtitle, { exact: true });
      await expect(subtitle).toBeVisible();
    }
  });

  test('deve persistir a preferência de idioma entre recarregamentos', async ({ page }) => {
    // Muda para português
    const ptButton = page.getByRole('button', { name: 'Português' });
    await ptButton.click();
    
    // Aguarda a alteração do texto
    await page.waitForTimeout(500);
    
    // Registra o texto do cabeçalho em português
    const titleInPortuguese = await page.getByRole('heading', { level: 1 }).textContent();
    
    // Recarrega a página
    await page.reload();
    
    // Aguarda que a página carregue completamente após o reload
    await page.waitForLoadState('networkidle');
    
    // Verifica se o texto ainda está em português após o recarregamento
    const titleAfterReload = await page.getByRole('heading', { level: 1 }).textContent();
    expect(titleAfterReload).toBe(titleInPortuguese);
  });
});