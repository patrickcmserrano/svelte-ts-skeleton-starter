<script lang="ts">
  import './styles/global.css';
  import ThemeToggle from './components/ThemeToggle.svelte';
  import LanguageSelector from './components/LanguageSelector.svelte';
  import { _ } from './lib/i18n';

  // Inicializa o suporte a idiomas
  import { i18n } from './lib/i18n';
  i18n.initialize();
</script>

<main class="p-10 space-y-8">
  <div class="flex justify-between items-center">
    <div class="language-selector">
      <LanguageSelector />
    </div>
    <div class="theme-toggle">
      <ThemeToggle />
    </div>
  </div>
  
  <div class="text-center">
    <h1 class="h1 text-3xl font-bold mb-4">{$_('app.title')}</h1>
    <p class="text-lg mb-6">{$_('app.subtitle')}</p>
  </div>
  
  <div class="content-container flex justify-center">
    <div class="card p-6 bg-surface-100 rounded-lg shadow-md max-w-md w-full text-primary-700 dark:text-primary-300">
      <h2 class="text-xl font-semibold mb-4">{$_('features.title')}</h2>
      <ul class="list-disc pl-5 space-y-2">
        <li>{$_('features.theme')}</li>
        <li>{$_('features.accessibility')}</li>
        <li>{$_('features.typescript')}</li>
        <li>{$_('features.testing')}</li>
        <li>{$_('features.i18n')}</li>
      </ul>
    </div>
  </div>
  
  <footer class="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
    <p class="text-sm text-primary-700 dark:text-primary-300">{$_('footer.copyright')}</p>
  </footer>
</main>
