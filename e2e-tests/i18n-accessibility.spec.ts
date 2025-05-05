import { test, expect } from '@playwright/test';
import { AccessibilityHelper } from './helpers/accessibility';

test.describe('Testes de Acessibilidade do Seletor de Idiomas', () => {
  let a11y: AccessibilityHelper;

  test.beforeEach(async ({ page }) => {
    // Navega para a página inicial antes de cada teste
    await page.goto('/');
    a11y = new AccessibilityHelper(page);
  });

  test('seletor de idiomas deve ser acessível por teclado', async ({ page }) => {
    // Verifica se os botões de idioma estão presentes
    const enButton = page.getByRole('button', { name: 'English' });
    
    // Verifica se o botão pode receber foco
    await enButton.focus();
    
    // Confirma que o elemento recebeu foco
    const isFocused = await page.evaluate(() => {
      return document.activeElement?.tagName.toLowerCase() === 'button';
    });
    
    expect(isFocused, 'O botão de idioma deve receber foco').toBeTruthy();
    
    // Verifica navegação por teclado entre os botões
    await page.keyboard.press('Tab');
    
    // Confirma que o foco moveu para o próximo botão
    const secondButtonFocused = await page.evaluate(() => {
      return document.activeElement?.tagName.toLowerCase() === 'button' && 
             document.activeElement?.textContent?.trim() === 'PT';
    });
    
    expect(secondButtonFocused, 'Deve ser possível navegar entre botões com Tab').toBeTruthy();
  });

  test('botões de idioma devem ter rótulos adequados', async ({ page }) => {
    // Verifica se cada botão tem um aria-label
    const enButton = page.getByRole('button', { name: 'English' });
    const ptButton = page.getByRole('button', { name: 'Português' });
    const esButton = page.getByRole('button', { name: 'Español' });
    
    // Verifica se os botões têm aria-label
    const enHasAriaLabel = await enButton.evaluate(el => !!el.getAttribute('aria-label'));
    const ptHasAriaLabel = await ptButton.evaluate(el => !!el.getAttribute('aria-label'));
    const esHasAriaLabel = await esButton.evaluate(el => !!el.getAttribute('aria-label'));
    
    expect(enHasAriaLabel, 'O botão EN deve ter aria-label').toBeTruthy();
    expect(ptHasAriaLabel, 'O botão PT deve ter aria-label').toBeTruthy();
    expect(esHasAriaLabel, 'O botão ES deve ter aria-label').toBeTruthy();
  });

  test('alternar idioma não deve causar problemas de acessibilidade', async ({ page }) => {
    // Verifica a estrutura de cabeçalhos inicial
    await a11y.expectValidHeadingStructure();
    
    // Clica no botão PT
    const ptButton = page.getByRole('button', { name: 'Português' });
    await ptButton.click();
    
    // Aguarda a alteração do texto
    await page.waitForTimeout(500);
    
    // Verifica a estrutura de cabeçalhos após a mudança
    await a11y.expectValidHeadingStructure();
    
    // Verifica contraste de cores após a mudança
    await a11y.expectSufficientColorContrast(page.getByRole('heading', { level: 1 }));
    
    // Clica no botão ES
    const esButton = page.getByRole('button', { name: 'Español' });
    await esButton.click();
    
    // Aguarda a alteração do texto
    await page.waitForTimeout(500);
    
    // Repete verificações
    await a11y.expectValidHeadingStructure();
    await a11y.expectSufficientColorContrast(page.getByRole('heading', { level: 1 }));
  });

  test('botão ativo deve ser visualmente distinto', async ({ page }) => {
    // Verifica se o botão ativo tem a classe 'active'
    const ptButton = page.getByRole('button', { name: 'Português' });
    await ptButton.click();
    
    // Aguarda a alteração
    await page.waitForTimeout(500);
    
    // Verifica se o botão PT tem a classe 'active'
    const ptHasActiveClass = await ptButton.evaluate(el => el.classList.contains('active'));
    expect(ptHasActiveClass, 'O botão PT deve ter a classe active após ser clicado').toBeTruthy();
    
    // Verifica se o botão EN não tem a classe 'active'
    const enButton = page.getByRole('button', { name: 'English' });
    const enHasActiveClass = await enButton.evaluate(el => el.classList.contains('active'));
    expect(enHasActiveClass, 'O botão EN não deve ter a classe active após clicar em PT').toBeFalsy();
  });
});