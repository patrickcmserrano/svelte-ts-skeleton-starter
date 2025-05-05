import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as i18nModule from './i18n';

describe('i18n Setup', () => {
  let localStorageMock: { [key: string]: string } = {};
  
  beforeEach(() => {
    // Limpa os mocks
    vi.clearAllMocks();
    
    // Mock para localStorage
    localStorageMock = {};
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(
      (key: string) => localStorageMock[key] || null
    );
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(
      (key: string, value: string) => {
        localStorageMock[key] = value;
      }
    );
    
    // Mock para navigator.language
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('en-US');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('deve inicializar com inglês como padrão quando não há preferência salva ou do navegador', () => {
    // Simula idioma de navegador não suportado
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('invalid-lang');
    
    // Espia o método de implementação real
    const i18n = i18nModule.createI18nStore();
    const setLanguageSpy = vi.spyOn(i18n, 'setLanguage');
    
    i18n.initialize();
    
    expect(setLanguageSpy).toHaveBeenCalledWith('en');
  });

  it('deve usar a preferência salva do localStorage se disponível', () => {
    // Define uma preferência salva
    localStorageMock['preferredLanguage'] = 'es';
    
    const i18n = i18nModule.createI18nStore();
    const setLanguageSpy = vi.spyOn(i18n, 'setLanguage');
    
    i18n.initialize();
    
    expect(setLanguageSpy).toHaveBeenCalledWith('es');
  });

  it('deve usar o idioma do navegador se não houver preferência salva e o idioma for suportado', () => {
    // Define o idioma do navegador como espanhol
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('pt');
    
    // Cria uma nova instância de i18n para evitar problemas de estado compartilhado
    const i18n = i18nModule.createI18nStore();
    const setLanguageSpy = vi.spyOn(i18n, 'setLanguage');
    
    i18n.initialize();
    
    expect(setLanguageSpy).toHaveBeenCalledWith('pt');
  });

  it('deve verificar se todos os arquivos de idioma estão registrados corretamente', () => {
    // Testa se os idiomas principais têm traduções
    const i18n = i18nModule.createI18nStore();
    expect(Object.keys(i18n.translations)).toContain('en');
    expect(Object.keys(i18n.translations)).toContain('es');
    expect(Object.keys(i18n.translations)).toContain('pt');
    
    // Testa algumas traduções
    expect(i18n.t('greeting', 'en')).toBe('Hello');
    expect(i18n.t('welcome', 'es')).toBe('Bienvenido a la aplicación');
    expect(i18n.t('language', 'pt')).toBe('Idioma');
  });
});