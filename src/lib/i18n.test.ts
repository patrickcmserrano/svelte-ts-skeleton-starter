import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as i18nModule from './i18n';

// Precisamos mockar o módulo antes de importar
vi.mock('svelte-i18n', () => {
  return {
    addMessages: vi.fn(),
    init: vi.fn(),
    locale: {
      set: vi.fn(),
      subscribe: vi.fn()
    },
    _: vi.fn()
  };
});

// Reimportamos o módulo svelte-i18n para acessar os mocks
import { init, locale } from 'svelte-i18n';

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
    // Define o idioma do navegador como português
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

  it('deve atualizar localStorage e svelte-i18n locale quando setLanguage é chamado', () => {
    const i18n = i18nModule.createI18nStore();
    
    i18n.setLanguage('pt');
    
    expect(localStorageMock['preferredLanguage']).toBe('pt');
    expect(locale.set).toHaveBeenCalledWith('pt');
  });

  it('deve retornar a própria chave quando não encontra uma tradução', () => {
    const i18n = i18nModule.createI18nStore();
    const chaveInexistente = 'chave.inexistente' as any;
    
    expect(i18n.t(chaveInexistente, 'en')).toBe(chaveInexistente);
    expect(i18n.t(chaveInexistente, 'pt')).toBe(chaveInexistente);
    expect(i18n.t(chaveInexistente, 'es')).toBe(chaveInexistente);
  });

  it('deve ter todas as chaves de tradução consistentes em todos os idiomas', () => {
    const i18n = i18nModule.createI18nStore();
    const enKeys = Object.keys(i18n.translations.en);
    const ptKeys = Object.keys(i18n.translations.pt);
    const esKeys = Object.keys(i18n.translations.es);
    
    // Verifica se todas as chaves do inglês existem nos outros idiomas
    enKeys.forEach(key => {
      expect(ptKeys).toContain(key);
      expect(esKeys).toContain(key);
    });
    
    // Verifica se não existem chaves extras em pt ou es
    expect(ptKeys.length).toBe(enKeys.length);
    expect(esKeys.length).toBe(enKeys.length);
  });

  it('deve inicializar o i18n corretamente através da função setupI18n', () => {
    // Define uma preferência salva para testar o getInitialLocale
    localStorageMock['preferredLanguage'] = 'es';
    
    // Executa setupI18n
    i18nModule.setupI18n();
    
    // Verifica se init foi chamado com as configurações corretas
    expect(init).toHaveBeenCalledWith({
      fallbackLocale: 'en',
      initialLocale: 'es'
    });
  });

  it('deve utilizar a preferência do localStorage quando disponível', () => {
    // Define uma preferência de idioma no localStorage
    localStorageMock['preferredLanguage'] = 'pt';
    
    // Cria uma nova instância de i18n e inicializa
    const i18n = i18nModule.createI18nStore();
    i18n.initialize();
    
    // Verifica se o método do localStorage foi chamado e se o locale foi configurado
    expect(Storage.prototype.getItem).toHaveBeenCalledWith('preferredLanguage');
    expect(locale.set).toHaveBeenCalledWith('pt');
  });

  it('deve utilizar o idioma do navegador quando não há preferência no localStorage', () => {
    // Garante que não há preferência salva
    localStorageMock = {};
    
    // Define idioma do navegador
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('es-ES');
    
    // Cria nova instância e inicializa
    const i18n = i18nModule.createI18nStore();
    i18n.initialize();
    
    // Verifica se armazenou a preferência com base no idioma do navegador
    expect(Storage.prototype.setItem).toHaveBeenCalledWith('preferredLanguage', 'es');
    expect(locale.set).toHaveBeenCalledWith('es');
  });
});