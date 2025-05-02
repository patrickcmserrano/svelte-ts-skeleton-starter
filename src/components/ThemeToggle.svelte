<script lang="ts">
  import { Switch } from '@skeletonlabs/skeleton-svelte';
  import IconMoon from '@lucide/svelte/icons/moon';
  import IconSun from '@lucide/svelte/icons/sun';

  let isDarkMode = $state(false);

  function handleThemeChange(checked: boolean) {
    isDarkMode = checked;
    document.documentElement.setAttribute('data-theme', checked ? 'mona-dark' : 'mona');
  }
</script>

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