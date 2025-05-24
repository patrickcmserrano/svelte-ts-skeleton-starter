# svelte-ts-skeleton-starter

A modern template for Svelte projects using TypeScript and Vite as a bundler. This repository serves as a starting point for new Svelte projects with an optimized, ready-to-use configuration.

## Overview

This template includes:
- Svelte 5 with TypeScript support
- Vite for fast development and optimized build
- Skeleton UI integration
- Enhanced dark/light theme system with CSS variables
- Organized project structure
- Internationalization (i18n) support
- Comprehensive unit and E2E tests
- CI/CD with GitHub Actions for GitHub Pages deployment

## Creating Projects from this Template

1. **Using GitHub**
   ```bash
   # Clone this template
   gh repo create my-project --template svelte-ts-skeleton-starter
   # or use GitHub's interface to create a new repository from this template
   ```

2. **Manually**
   ```bash
   # Clone the repository
   git clone https://github.com/your-username/svelte-ts-skeleton-starter.git my-project
   
   # Remove Git history
   cd my-project
   rm -rf .git
   
   # Initialize a new Git repository
   git init
   ```

## Project Creation

1. **Project Initialization**
   ```bash
   npm create vite@latest svelte-ts-skeleton-starter -- --template svelte-ts
   cd svelte-ts-skeleton-starter
   npm install
   ```

2. **Project Structure**
   ```
   📦 svelte-ts-skeleton-starter
   ├── 📂 public/
   │   └── vite.svg
   ├── 📂 src/
   │   ├── 📂 assets/
   │   │   └── svelte.svg
   │   ├── 📂 lib/
   │   │   └── Counter.svelte
   │   ├── 📂 styles/
   │   │   └── global.css
   │   ├── app.css
   │   ├── App.svelte
   │   ├── main.ts
   │   └── vite-env.d.ts
   ├── index.html
   ├── package.json
   ├── svelte.config.js
   ├── tsconfig.json
   ├── tsconfig.node.json
   └── vite.config.ts
   ```

## Project Dependencies

### Main Dependencies
- `svelte`: ^5.23.1
- `@skeletonlabs/skeleton`: ^3.1.3
- `svelte-i18n`: ^4.0.0 # Internationalization library

### Development Dependencies
- `@sveltejs/vite-plugin-svelte`: ^5.0.3
- `@tsconfig/svelte`: ^5.0.4
- `svelte-check`: ^4.1.5
- `typescript`: ~5.7.2
- `vite`: ^6.3.1

## Available Scripts

```json
{
  "dev": "vite",          // Starts the development server
  "build": "vite build",  // Generates production build
  "preview": "vite preview", // Preview production version
  "check": "svelte-check" // Runs TypeScript type checking
}
```

## Development Environment Setup

### Recommended IDE
- Visual Studio Code with Svelte for VS Code extension
- [VS Code](https://code.visualstudio.com/)
- [Svelte Extension](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)

### TypeScript Configuration

The project uses TypeScript with the following main configurations:
- Full TypeScript support in Svelte components
- Optimized configuration for Svelte development
- Integrated type checking

## How to Start Development

1. **Clone the repository**
   ```bash
   git clone [REPOSITORY-URL]
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the project**
   The project will be available at `http://localhost:5173`

## File Structure Explained

- `/public`: Static files that will be served directly
- `/src`: Application source code
  - `/assets`: Resources such as images and icons
  - `/components`: User interface components
    - `LanguageSelector.svelte`: Component for language switching
    - `ThemeToggle.svelte`: Enhanced component for toggling between light/dark themes with improved accessibility, theme persistence, and error handling
  - `/lib`: Reusable components and shared functionalities
    - `i18n.ts`: Internationalization system
    - `/locales`: Translation files for different languages
      - `en.ts`: English translations
      - `pt.ts`: Portuguese translations
      - `es.ts`: Spanish translations
  - `/styles`: Global style files
  - `App.svelte`: Root application component
  - `main.ts`: Application entry point

## Technical Considerations

### Why Vite?
- Extremely fast Hot Module Replacement (HMR)
- Zero configuration to start
- Native TypeScript support
- Optimized production build

### TypeScript
The project uses TypeScript for:
- Better development experience
- Real-time type checking
- Better IDE support
- More secure and maintainable code

## Tests

This project includes a complete setup for unit and end-to-end (E2E) tests.

### Unit Tests

We use [Vitest](https://vitest.dev/) for unit tests with the following features:

- Integration with the Svelte ecosystem
- Support for Svelte components
- Code coverage report generation
- JSDOM-based test environment
- Mock tests for external modules

Available commands:

```bash
# Run tests in watch mode (development)
npm test

# Run tests once
npm run test:run

# Run tests with coverage report
npm run test:coverage
npm run coverage
```

#### Internationalization (i18n) Tests

The internationalization system has comprehensive unit tests that verify:

- Correct initialization of the i18n system
- Browser language detection
- User preferences persistence
- Loading and access to translations
- Consistency of translation keys across different languages
- Appropriate behavior when translation keys don't exist

### End-to-End (E2E) Tests

We use [Playwright](https://playwright.dev/) for E2E tests with the following features:

- Support for multiple browsers (Chrome, Firefox, Safari)
- Accessibility tests
- Detailed execution reports
- Specific tests for internationalization functionalities

Available commands:

```bash
# Run all E2E tests
npm run e2e

# Run E2E tests with visual interface
npm run e2e:ui

# View E2E test report
npm run e2e:report
```

#### E2E Internationalization Tests

The E2E tests for internationalization ensure that:

- Language selectors are present and functional in the interface
- Language changes correctly update the page content
- Language preferences are persisted between reloads
- Text elements appear correctly in the selected language
- Accessibility is maintained when switching between languages

These tests use an approach based on the role and name of elements (`getByRole`, `getByText`), which makes the tests more robust and less susceptible to breaking due to changes in HTML or CSS structure.

### Accessibility Tests

The project includes specific accessibility tests for:

- Appropriate header structure
- Keyboard navigation
- Appropriate ARIA attributes
- Color contrast
- Language selector accessibility

### Run All Tests

To run all tests (unit and E2E) at once:

```bash
npm run test:all
```

## Build and Deploy

### Local Build

To build the project for production:

```bash
npm run build
```

The built files will be available in the `dist/` directory.

### Automated Deployment with GitHub Pages

This template supports automatic deployment to GitHub Pages with comprehensive testing integration.

#### Configuration Setup

1. **Configure GitHub Pages** in your repository settings:
   - Go to repository **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save the configuration

2. **Update `vite.config.ts`** with your repository name:
   ```ts
   export default defineConfig({
     plugins: [svelte()],
     base: '/your-repository-name/', // Replace with your repository name
     // other configurations
   });
   ```

#### Automatic Deployment Workflow

The deployment workflow (`.github/workflows/deploy.yml`) automatically:

- ✅ **Triggers on every push** to `main` branch
- ✅ **Runs comprehensive tests** before deployment
- ✅ **Deploys only when tests pass**
- ✅ **Includes unit and E2E testing**
- ✅ **Provides complete deployment history**
- ✅ **Supports manual triggering** via GitHub Actions interface

#### Deployment Process

The automated deployment includes:

1. **Environment Setup**: Node.js 20 with npm caching
2. **Dependency Installation**: `npm ci` for reproducible builds
3. **Unit Testing**: Validates component functionality
4. **E2E Testing**: End-to-end testing with Playwright across multiple browsers
5. **Build Generation**: Production-optimized build
6. **GitHub Pages Deployment**: Automatic publishing to GitHub Pages

#### Manual Deployment Option

You can also trigger deployment manually:

1. Go to repository **Actions** tab
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**
4. Confirm the deployment

### Deployment Configuration

#### Base URL Configuration

For GitHub Pages deployment, ensure your `vite.config.ts` includes the correct base path:

```ts
export default defineConfig({
  plugins: [svelte()],
  base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
  // other configurations
});
```

#### Environment Variables

For different deployment environments:

```ts
// vite.config.ts
export default defineConfig({
  plugins: [svelte()],
  base: process.env.VITE_BASE_URL || '/',
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
});
```

### Testing Before Deployment

The deployment process includes comprehensive testing:

1. **Unit Tests**: Component functionality and logic validation using Vitest
2. **E2E Tests**: End-to-end user interaction testing with Playwright
3. **Cross-Browser Testing**: Validation across Chromium, Firefox, and WebKit
4. **Accessibility Tests**: Automated accessibility validation with axe-core
5. **Build Validation**: Ensures the application builds successfully

### Troubleshooting Deployment

#### Common Issues

1. **Base URL Problems**: Ensure the `base` configuration matches your repository name
2. **Asset Loading**: Use relative paths for assets and images
3. **Test Failures**: Check the Actions tab for detailed test failure logs
4. **Permission Issues**: Ensure GitHub Actions has proper permissions

#### Debugging Failed Deployments

1. Check the **Actions** tab in your GitHub repository
2. Review the workflow logs for specific error messages
3. Ensure all tests pass locally before pushing:
   ```bash
   npm run test:run  # Run unit tests
   npm run e2e      # Run E2E tests
   npm run build    # Test build process
   ```
4. Verify the `base` URL configuration

### Advanced Deployment Features

#### Custom Domain

To use a custom domain with GitHub Pages:

1. Add a `CNAME` file to the `public/` directory with your domain
2. Configure DNS settings with your domain provider
3. Update the `base` configuration if needed

#### Branch Strategy

- `main`: Main development branch with automatic deployment
- `gh-pages`: Automatically managed deployment branch (do not edit manually)

The workflow uses GitHub's native Pages deployment action, eliminating the need for manual branch management.

## Contributing

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

For questions and support, please open an issue in the project repository.

## Recent Template Updates

### Enhanced Theme System (May 2025)

The template now includes an improved theme system with the following features:

- **Robust Dark/Light Mode**: Implements theme switching using multiple approaches simultaneously:
  - CSS Variables with `data-mode` attribute
  - Tailwind Dark Mode with `dark` class
  - Skeleton UI themes with `data-theme` attribute
  - Automatic theme persistence using localStorage
  
- **Flash Prevention**: Includes script in HTML to apply theme immediately during page load, preventing flash of wrong theme
  
- **Error Handling**: Built-in fallbacks if localStorage is unavailable
  
- **Accessibility**: Improved accessibility with proper ARIA attributes on theme toggle controls
  
- **Comprehensive Tests**: Enhanced test coverage for theme functionality including error handling

### Example Usage

The theme system provides a simple API through the ThemeToggle component:

```svelte
<script>
  import ThemeToggle from './components/ThemeToggle.svelte';
</script>

<ThemeToggle />
```

Custom styling can be applied using the CSS variables defined in `src/styles/global.css`:

```css
:root {
  --app-background: #ffffff;
  --app-text: #1a202c;
  /* other variables */
}

[data-mode="dark"] {
  --app-background: #0f172a;
  --app-text: #f8fafc;
  /* other dark mode variables */
}
```

## Theme System Technical Details

The theme system uses a multi-layered approach to ensure comprehensive theming:

1. **CSS Custom Properties (Variables)**
   - Defined in `src/styles/global.css`
   - Allows custom styling with semantic variables like `--app-background` and `--app-text`
   - Variables change based on the `data-mode` attribute

2. **HTML Data Attributes**
   - `data-mode`: Controls the main theme ('light' or 'dark')
   - `data-theme`: Controls the Skeleton UI theme ('skeleton' for light, 'vintage' for dark)

3. **CSS Class**
   - The `dark` class is added to `html` element for Tailwind dark mode
   - Enables the use of `dark:` variant in Tailwind classes

4. **Local Storage Persistence**
   - Theme preference is saved in `localStorage` as 'mode'
   - Automatically restored on page load
   - Includes error handling for privacy modes

5. **Initialization**
   - Theme is applied immediately during page load in `index.html`
   - Prevents flash of incorrect theme on initial load

6. **Accessibility**
   - Theme toggle uses proper ARIA attributes
   - Keyboard navigable
   - Maintains color contrast standards

See `src/components/ThemeToggle.example.ts` for examples of how to extend the theme system.

## Atualizações Recentes de Correção (Maio 2025)

1. **Correção da API de Eventos do Svelte 5**
   - Atualizado o uso de `on:click` para `onclick` conforme recomendado pela API do Svelte 5
   - Esta mudança afeta os componentes ThemeToggle e LanguageSelector

2. **Ajustes no Sistema de Temas**
   - Removidas importações problemáticas de temas específicos do Skeleton UI
   - Mantida a funcionalidade de tema usando variáveis CSS e atributos data-mode/data-theme
   - Corrigida a forma como o ThemeToggle é renderizado no App.svelte

3. **Compatibilidade com Testes E2E**
   - Garantido que os elementos esperados pelos testes E2E estão presentes no DOM
   - Mantida a estrutura correta de cabeçalhos para testes de acessibilidade

Para executar os testes após estas correções:
```bash
# Teste unitários
npm run test:run

# Testes E2E
npm run e2e
```
