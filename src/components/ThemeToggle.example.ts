// Theme Configuration Example
// This file shows how to extend the theme system in your project

// 1. Adding Custom Theme Variables
// You can add your own variables to src/styles/global.css:

/*
:root {
  // Light theme variables
  --custom-accent: #0ea5e9;
  --custom-border: #e2e8f0;
  --custom-shadow: rgba(0, 0, 0, 0.05);
}

[data-mode="dark"] {
  // Dark theme variables 
  --custom-accent: #38bdf8;
  --custom-border: #334155;
  --custom-shadow: rgba(0, 0, 0, 0.2);
}
*/

// 2. Using Theme Variables in Components
// In your Svelte components, you can use the variables like this:

/*
<style>
  .custom-element {
    color: var(--app-text);
    background-color: var(--app-background);
    border: 1px solid var(--custom-border);
    box-shadow: 0 4px 6px var(--custom-shadow);
  }
  
  .accent {
    color: var(--custom-accent);
  }
</style>
*/

// 3. Extending the Theme Toggle Component
// If you need to add custom behavior to the theme toggle,
// you can extend it like this:

/*
import { onMount } from 'svelte';

// Function to set theme with additional customizations
function setCustomTheme(mode: string) {
  // Call the base setTheme function first
  setTheme(mode);
  
  // Add your custom logic here
  const customElement = document.getElementById('my-custom-element');
  if (customElement) {
    customElement.className = mode === 'dark' ? 'dark-custom' : 'light-custom';
  }
  
  // You could also trigger animations or other effects
}

// Hook into theme changes
onMount(() => {
  // Listen for theme changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'data-mode') {
        const mode = document.documentElement.getAttribute('data-mode');
        // Respond to theme changes
        console.log('Theme changed to:', mode);
      }
    });
  });
  
  observer.observe(document.documentElement, { attributes: true });
  
  return () => {
    // Clean up
    observer.disconnect();
  };
});
*/

// 4. Using with Tailwind
// The theme system works with Tailwind dark mode
// Use dark: variant in your classes:

/*
<div class="bg-white text-gray-800 dark:bg-gray-900 dark:text-white">
  This text will adapt to the theme
</div>
*/

// 5. Using with Skeleton UI
// The theme system automatically switches between Skeleton UI themes
// You can customize which themes are used by modifying the ThemeToggle component:

/*
function setTheme(mode: string) {
  isDarkMode = mode === 'dark';
  document.documentElement.setAttribute('data-mode', mode);
  
  if (mode === 'dark') {
    // Use different Skeleton themes if needed
    document.documentElement.setAttribute('data-theme', 'gold-nouveau');
  } else {
    document.documentElement.setAttribute('data-theme', 'modern');
  }
  
  // Other code...
}
*/
