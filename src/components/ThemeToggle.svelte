<script lang="ts">
  import { Switch } from '@skeletonlabs/skeleton-svelte';
  import IconMoon from '@lucide/svelte/icons/moon';
  import IconSun from '@lucide/svelte/icons/sun';
  import { onMount } from 'svelte';

  let isDarkMode = $state(false);

  // Função para aplicar o tema em todos os lugares necessários
  function setTheme(mode: string) {
    isDarkMode = mode === 'dark';
    document.documentElement.setAttribute('data-mode', mode);
    
    // Forçar a atualização de classes em elementos específicos
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'vintage');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'skeleton');
    }
    
    // Forçar atualização das variáveis CSS
    document.body.style.backgroundColor = 'var(--app-background)';
    document.body.style.color = 'var(--app-text)';
    
    // Forçar atualização imediata de elementos específicos
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      if (card instanceof HTMLElement) {
        card.style.backgroundColor = mode === 'dark' ? 'var(--card-bg)' : 'var(--card-bg)';
        card.style.color = mode === 'dark' ? 'var(--card-text)' : 'var(--card-text)';
      }
    });
    
    try {
      localStorage.setItem('mode', mode);
    } catch (e) {
      console.error('Não foi possível salvar o tema no localStorage:', e);
    }
  }

  function handleThemeChange() {
    const newMode = isDarkMode ? 'light' : 'dark';
    setTheme(newMode);
  }

  onMount(() => {
    // Sincroniza o estado do toggle com o modo atual do tema
    try {
      const storedMode = localStorage.getItem('mode') || 'light';
      // Inicializa o tema
      setTheme(storedMode);
    } catch (e) {
      // Fallback se localStorage não estiver disponível
      setTheme('light');
    }
  });

  // Garante que o componente exporte algo
  export {};
</script>

<svelte:head>
  <script>
    // Aplicar tema salvo no carregamento da página
    try {
      const mode = localStorage.getItem('mode') || 'light';
      document.documentElement.setAttribute('data-mode', mode);
      
      // Aplicar também o tema do Skeleton
      if (mode === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'vintage');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'skeleton');
      }
    } catch (e) {
      // Fallback se localStorage não estiver disponível
      document.documentElement.setAttribute('data-mode', 'light');
      document.documentElement.setAttribute('data-theme', 'skeleton');
    }
  </script>
</svelte:head>

<div aria-label="Theme toggle" class="theme-toggle-wrapper">
  <button 
    type="button"
    class="theme-toggle"
    id="theme-toggle"
    aria-pressed={isDarkMode}
    aria-label="Toggle light/dark theme"
    onclick={handleThemeChange}
  >
    <Switch
      name="theme"
      checked={isDarkMode}
    >
      {#snippet inactiveChild()}
        <IconMoon size="14" />
      {/snippet}
      {#snippet activeChild()}
        <IconSun size="14" />
      {/snippet}
    </Switch>
  </button>
</div>

<style>
  .theme-toggle-wrapper {
    display: inline-block;
  }
  
  .theme-toggle {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
  }
</style>