<script lang="ts">
  import './styles/global.css';
  import ThemeToggle from './components/ThemeToggle.svelte';
</script>

<main class="p-10 space-y-8">
  <div class="theme-toggle flex justify-end">
    <ThemeToggle />
  </div>
  
  <div class="text-center">
    <h1 class="h1 text-3xl font-bold mb-4">Template Svelte com Tema</h1>
    <p class="text-lg mb-6">Um modelo básico de aplicação Svelte com suporte a tema claro/escuro.</p>
  </div>
  
  <div class="content-container flex justify-center">
    <div class="card p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md w-full">
      <h2 class="text-xl font-semibold mb-4">Recursos Incluídos</h2>
      <ul class="list-disc pl-5 space-y-2">
        <li>Alternância de tema claro/escuro</li>
        <li>Acessibilidade básica</li>
        <li>Suporte ao TypeScript</li>
        <li>Testes unitários e e2e</li>
      </ul>
    </div>
  </div>
  
  <footer class="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
    <p class="text-sm text-gray-600 dark:text-gray-400">© 2025 Template Svelte. Construído com Svelte.</p>
  </footer>
</main>
