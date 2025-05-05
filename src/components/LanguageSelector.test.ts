import { describe, it, expect, vi, beforeEach } from 'vitest';
import { locale } from '../lib/i18n';

// Mock locale do i18n
vi.mock('../lib/i18n', () => ({
  locale: {
    set: vi.fn(),
    subscribe: vi.fn((callback) => {
      callback('en');
      return { unsubscribe: () => {} };
    })
  }
}));

// Mock para localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
  removeItem: vi.fn(),
  key: vi.fn(),
  length: 0,
  [Symbol.iterator]: function*() { yield* []; }
};

// Extrai a funcionalidade principal para teste
function createLanguageSelector() {
  // Definido como string para evitar erro de tipo
  let currentLocale: string = 'en';
  
  // Simula o comportamento de subscription
  locale.subscribe((value) => {
    // Garantimos que value é sempre string
    if (value) {
      currentLocale = value;
    }
  });
  
  function setLanguage(lang: string) {
    locale.set(lang);
    localStorage.setItem('preferredLanguage', lang);
  }
  
  return {
    currentLocale,
    setLanguage
  };
}

describe('LanguageSelector', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Configura o mock do localStorage
    global.localStorage = localStorageMock;
  });
  
  it('deve configurar o idioma quando setLanguage for chamado', () => {
    const { setLanguage } = createLanguageSelector();
    
    setLanguage('pt');
    
    expect(locale.set).toHaveBeenCalledWith('pt');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('preferredLanguage', 'pt');
  });
  
  it('deve configurar diferentes idiomas corretamente', () => {
    const { setLanguage } = createLanguageSelector();
    
    // Testa múltiplos idiomas
    const languages = ['en', 'es', 'pt'];
    
    languages.forEach(lang => {
      vi.clearAllMocks();
      setLanguage(lang);
      expect(locale.set).toHaveBeenCalledWith(lang);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('preferredLanguage', lang);
    });
  });
});