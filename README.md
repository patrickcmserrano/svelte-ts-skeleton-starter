# svelte-ts-skeleton-starter

Um template moderno para projetos Svelte utilizando TypeScript e Vite como bundler. Este repositório serve como ponto de partida para novos projetos Svelte com uma configuração otimizada e pronta para uso.

## Visão Geral

Este template inclui:
- Svelte 5 com suporte a TypeScript
- Vite para desenvolvimento rápido e build otimizado
- Integração com Skeleton UI
- Configuração de tema claro/escuro
- Estrutura de projeto organizada

## Criação de Projetos a partir deste Template

1. **Usando GitHub**
   ```bash
   # Clone este template
   gh repo create meu-projeto --template svelte-ts-skeleton-starter
   # ou use a interface do GitHub para criar um novo repositório a partir deste template
   ```

2. **Manualmente**
   ```bash
   # Clone o repositório
   git clone https://github.com/seu-usuario/svelte-ts-skeleton-starter.git meu-projeto
   
   # Remova o histórico Git
   cd meu-projeto
   rm -rf .git
   
   # Inicialize um novo repositório Git
   git init
   ```

## Criação do Projeto

1. **Inicialização do Projeto**
   ```bash
   npm create vite@latest svelte-ts-skeleton-starter -- --template svelte-ts
   cd svelte-ts-skeleton-starter
   npm install
   ```

2. **Estrutura do Projeto**
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

## Dependências do Projeto

### Dependências Principais
- `svelte`: ^5.23.1
- `@skeletonlabs/skeleton`: ^3.1.3

### Dependências de Desenvolvimento
- `@sveltejs/vite-plugin-svelte`: ^5.0.3
- `@tsconfig/svelte`: ^5.0.4
- `svelte-check`: ^4.1.5
- `typescript`: ~5.7.2
- `vite`: ^6.3.1

## Scripts Disponíveis

```json
{
  "dev": "vite",          // Inicia o servidor de desenvolvimento
  "build": "vite build",  // Gera build de produção
  "preview": "vite preview", // Prévia da versão de produção
  "check": "svelte-check" // Executa verificação de tipos TypeScript
}
```

## Configuração do Ambiente de Desenvolvimento

### IDE Recomendada
- Visual Studio Code com a extensão Svelte para VS Code
- [VS Code](https://code.visualstudio.com/)
- [Extensão Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)

### Configuração do TypeScript

O projeto utiliza TypeScript com as seguintes configurações principais:
- Suporte total ao TypeScript em componentes Svelte
- Configuração otimizada para desenvolvimento Svelte
- Verificação de tipos integrada

## Como Iniciar o Desenvolvimento

1. **Clone o repositório**
   ```bash
   git clone [URL-DO-REPOSITÓRIO]
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Acesse o projeto**
   O projeto estará disponível em `http://localhost:5173`

## Estrutura de Arquivos Explicada

- `/public`: Arquivos estáticos que serão servidos diretamente
- `/src`: Código fonte da aplicação
  - `/assets`: Recursos como imagens e ícones
  - `/lib`: Componentes reutilizáveis
  - `/styles`: Arquivos de estilo globais
  - `App.svelte`: Componente raiz da aplicação
  - `main.ts`: Ponto de entrada da aplicação

## Considerações Técnicas

### Por que Vite?
- Hot Module Replacement (HMR) extremamente rápido
- Configuração zero para começar
- Suporte nativo a TypeScript
- Build otimizado para produção

### TypeScript
O projeto usa TypeScript para:
- Melhor experiência de desenvolvimento
- Verificação de tipos em tempo real
- Melhor suporte da IDE
- Código mais seguro e manutenível

## Testes

Este projeto inclui uma configuração completa para testes unitários e end-to-end (E2E).

### Testes Unitários

Utilizamos o [Vitest](https://vitest.dev/) para testes unitários com as seguintes características:

- Integração com o ecossistema Svelte
- Suporte para componentes Svelte
- Geração de relatórios de cobertura de código
- Ambiente de teste baseado em JSDOM

Comandos disponíveis:

```bash
# Executar testes em modo watch (desenvolvimento)
npm test

# Executar testes uma única vez
npm run test:run

# Executar testes com relatório de cobertura
npm run test:coverage
npm run coverage
```

### Testes End-to-End (E2E)

Utilizamos o [Playwright](https://playwright.dev/) para testes E2E com as seguintes características:

- Suporte para múltiplos navegadores (Chrome, Firefox, Safari)
- Testes de acessibilidade
- Relatórios detalhados de execução

Comandos disponíveis:

```bash
# Executar todos os testes E2E
npm run e2e

# Executar testes E2E com interface visual
npm run e2e:ui

# Visualizar relatório de testes E2E
npm run e2e:report
```

### Executar Todos os Testes

Para executar todos os testes (unitários e E2E) de uma só vez:

```bash
npm run test:all
```

## Build e Deploy

### Build Local

Para criar uma build de produção:
```bash
npm run build
```

Isso gerará uma versão otimizada do projeto na pasta `dist/`.

### Deploy Automático

Este projeto está configurado para deploy automático no GitHub Pages através de GitHub Actions.

#### Workflow de Deploy

O workflow de CI/CD está configurado para:

1. Ser acionado em pushes para as branches `main` e `theme-implementation`
2. Executar build da aplicação
3. Publicar automaticamente no GitHub Pages

Para fazer deploy manual:

```bash
# Build e deploy para GitHub Pages
npm run deploy
```

#### Workflow de Testes e Cobertura

Um workflow adicional executa testes e gera relatórios de cobertura:

1. Executa testes unitários com cobertura
2. Executa testes E2E
3. Publica relatórios de cobertura no GitHub Pages
4. Opcionalmente, envia resultados para Codecov (para repositórios públicos)

#### Verificação de Pull Requests

Os workflows também são executados em pull requests para as branches principais, garantindo que apenas código que passa em todos os testes seja integrado.

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Suporte

Para questões e suporte, por favor abra uma issue no repositório do projeto.
