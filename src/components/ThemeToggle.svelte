<script lang="ts">
  import { Switch } from '@skeletonlabs/skeleton-svelte';
  import IconMoon from '@lucide/svelte/icons/moon';
  import IconSun from '@lucide/svelte/icons/sun';
  import { onMount } from 'svelte';

  let isDarkMode = $state(false);

  onMount(() => {
    // Sincroniza o estado do toggle com o modo atual do tema
    const storedMode = localStorage.getItem('mode') || 'light';
    isDarkMode = storedMode === 'dark';
  });

  function handleThemeChange(checked: boolean) {
    isDarkMode = checked;
    const mode = checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-mode', mode);
    localStorage.setItem('mode', mode);
  }

  // Garante que o componente exporte algo
  export {};
</script>

<svelte:head>
  <script>
    const mode = localStorage.getItem('mode') || 'light';
    document.documentElement.setAttribute('data-mode', mode);
  </script>
</svelte:head>

<div aria-label="Theme toggle">
  <Switch
    name="theme"
    checked={isDarkMode}
    onCheckedChange={(e) => handleThemeChange(e.checked)}
    controlActive="bg-surface-200"
  >
    {#snippet inactiveChild()}
      <IconMoon size="14" />
    {/snippet}
    {#snippet activeChild()}
      <IconSun size="14" />
    {/snippet}
  </Switch>
</div>