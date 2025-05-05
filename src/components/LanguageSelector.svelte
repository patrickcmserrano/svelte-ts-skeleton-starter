<script lang="ts">
  import { locale } from '../lib/i18n';
  
  function setLanguage(lang: string) {
    locale.set(lang);
    // Saves the preference in localStorage
    localStorage.setItem('preferredLanguage', lang);
  }

  // Gets the current language
  let currentLocale: string = 'en'; // Initially defined as string
  
  locale.subscribe(value => {
    // Ensures that value is always string
    if (value) {
      currentLocale = value;
    }
  });
</script>

<div class="language-selector">
  <button 
    class={currentLocale === 'en' ? 'active' : ''} 
    on:click={() => setLanguage('en')}
    aria-label="English"
  >
    EN
  </button>
  <button 
    class={currentLocale === 'pt' ? 'active' : ''} 
    on:click={() => setLanguage('pt')}
    aria-label="Português"
  >
    PT
  </button>
  <button 
    class={currentLocale === 'es' ? 'active' : ''} 
    on:click={() => setLanguage('es')}
    aria-label="Español"
  >
    ES
  </button>
</div>

<style>
  .language-selector {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
  }

  button {
    background: transparent;
    border: 1px solid var(--border-color, #ddd);
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.85rem;
    min-width: 2.2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button.active {
    background: var(--active-bg, #f0f0f0);
    font-weight: bold;
    border-color: var(--active-border, #888);
  }

  :global(.dark) button {
    border-color: var(--dark-border, #555);
  }

  :global(.dark) button.active {
    background: var(--dark-active-bg, #444);
  }

  @media (max-width: 480px) {
    button {
      padding: 0.25rem 0.45rem;
      min-width: 2rem;
      height: 1.8rem;
      font-size: 0.8rem;
    }
  }
</style>