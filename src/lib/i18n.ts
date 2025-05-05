// Sistema de internacionalização (i18n) simplificado
import { addMessages, init, locale, _ } from 'svelte-i18n';
import { writable } from 'svelte/store';

// Definições de idiomas
export const SUPPORTED_LANGUAGES = ['en', 'pt', 'es'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

// Traduções básicas (usado principalmente para testes)
export const translations = {
  en: {
    greeting: 'Hello',
    welcome: 'Welcome to the application',
    language: 'Language',
    'app.title': 'Svelte Template with Theme',
    'app.subtitle': 'A basic Svelte application template with light/dark theme support.',
    'features.title': 'Included Features',
    'features.theme': 'Light/dark theme toggle',
    'features.accessibility': 'Basic accessibility',
    'features.typescript': 'TypeScript support',
    'features.testing': 'Unit and e2e tests',
    'features.i18n': 'Internationalization support',
    'footer.copyright': '© 2025 Svelte Template. Built with Svelte.'
  },
  pt: {
    greeting: 'Olá',
    welcome: 'Bem-vindo ao aplicativo',
    language: 'Idioma',
    'app.title': 'Template Svelte com Tema',
    'app.subtitle': 'Um modelo básico de aplicação Svelte com suporte a tema claro/escuro.',
    'features.title': 'Recursos Incluídos',
    'features.theme': 'Alternância de tema claro/escuro',
    'features.accessibility': 'Acessibilidade básica',
    'features.typescript': 'Suporte ao TypeScript',
    'features.testing': 'Testes unitários e e2e',
    'features.i18n': 'Suporte à internacionalização',
    'footer.copyright': '© 2025 Template Svelte. Construído com Svelte.'
  },
  es: {
    greeting: 'Hola',
    welcome: 'Bienvenido a la aplicación',
    language: 'Idioma',
    'app.title': 'Plantilla Svelte con Tema',
    'app.subtitle': 'Un modelo básico de aplicación Svelte con soporte para tema claro/oscuro.',
    'features.title': 'Características Incluidas',
    'features.theme': 'Alternancia de tema claro/oscuro',
    'features.accessibility': 'Accesibilidad básica',
    'features.typescript': 'Soporte para TypeScript',
    'features.testing': 'Pruebas unitarias y e2e',
    'features.i18n': 'Soporte para internacionalización',
    'footer.copyright': '© 2025 Plantilla Svelte. Construido con Svelte.'
  }
};

// Adiciona as mensagens ao dicionário
addMessages('en', translations.en);
addMessages('pt', translations.pt);
addMessages('es', translations.es);

// Inicializa i18n com as configurações apropriadas
export function setupI18n() {
  const initialLocale = getInitialLocale();
  
  init({
    fallbackLocale: 'en',
    initialLocale: initialLocale,
  });
}

type TranslationKey = keyof typeof translations['en'];

// Função para obter o locale inicial com base no navegador ou localStorage
function getInitialLocale() {
  if (typeof window === 'undefined') {
    return 'en';
  }
  
  // Verifica se há um idioma preferido armazenado no localStorage
  const savedLocale = localStorage.getItem('preferredLanguage');
  
  if (savedLocale && SUPPORTED_LANGUAGES.includes(savedLocale as SupportedLanguage)) {
    return savedLocale;
  }
  
  // Usa o idioma do navegador se disponível
  const browserLocale = navigator.language.split('-')[0];
  return SUPPORTED_LANGUAGES.includes(browserLocale as SupportedLanguage) ? browserLocale : 'en';
}

export function createI18nStore() {
  const { subscribe, set } = writable<SupportedLanguage>('en');

  const store = {
    subscribe,
    setLanguage(lang: SupportedLanguage) {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('preferredLanguage', lang);
      }
      locale.set(lang);
      set(lang);
      return lang;
    },
    initialize() {
      // Obtém a preferência salva, se houver
      const savedLang = typeof localStorage !== 'undefined' 
        ? localStorage.getItem('preferredLanguage') as SupportedLanguage 
        : null;
      
      if (savedLang && SUPPORTED_LANGUAGES.includes(savedLang)) {
        this.setLanguage(savedLang);
        return;
      }
      
      // Tenta usar o idioma do navegador
      if (typeof navigator !== 'undefined') {
        const browserLang = navigator.language.split('-')[0] as SupportedLanguage;
        if (SUPPORTED_LANGUAGES.includes(browserLang)) {
          this.setLanguage(browserLang);
          return;
        }
      }
      
      // Usa inglês como padrão
      this.setLanguage('en');
    },
    t(key: TranslationKey, lang: SupportedLanguage = 'en') {
      return translations[lang]?.[key] || key;
    },
    translations // Exporta traduções para testes
  };

  return store;
}

export const i18n = createI18nStore();

// Configura ao carregar
setupI18n();

export { _, locale };