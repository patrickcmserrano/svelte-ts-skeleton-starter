# svelte-ts-skeleton-starter

Um template moderno para projetos Svelte utilizando TypeScript e Vite como bundler. Este repositório serve como ponto de partida para novos projetos Svelte com uma configuração otimizada e pronta para uso.

## Visão Geral

Este template inclui:
- Svelte 5 com suporte a TypeScript
- Vite para desenvolvimento rápido e build otimizado
- Integração com Skeleton UI
- Configuração de tema claro/escuro
- Estrutura de projeto organizada
- Suporte à internacionalização (i18n)
- Testes unitários e E2E abrangentes

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
- `svelte-i18n`: ^4.0.0 # Biblioteca de internacionalização

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
  - `/components`: Componentes da interface de usuário
    - `LanguageSelector.svelte`: Componente para troca de idiomas
    - `ThemeToggle.svelte`: Componente para alternar entre temas claro/escuro
  - `/lib`: Componentes reutilizáveis e funcionalidades compartilhadas
    - `i18n.ts`: Sistema de internacionalização
    - `/locales`: Arquivos de tradução para diferentes idiomas
      - `en.ts`: Traduções para inglês
      - `pt.ts`: Traduções para português
      - `es.ts`: Traduções para espanhol
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
- Testes mock para módulos externos

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

#### Testes de Internacionalização (i18n)

O sistema de internacionalização possui testes unitários abrangentes que verificam:

- Inicialização correta do sistema de i18n
- Detecção de idioma do navegador
- Persistência de preferências do usuário
- Carregamento e acesso às traduções
- Consistência das chaves de tradução entre diferentes idiomas
- Comportamento adequado quando chaves de tradução não existem

### Testes End-to-End (E2E)

Utilizamos o [Playwright](https://playwright.dev/) para testes E2E com as seguintes características:

- Suporte para múltiplos navegadores (Chrome, Firefox, Safari)
- Testes de acessibilidade
- Relatórios detalhados de execução
- Testes específicos para funcionalidades de internacionalização

Comandos disponíveis:

```bash
# Executar todos os testes E2E
npm run e2e

# Executar testes E2E com interface visual
npm run e2e:ui

# Visualizar relatório de testes E2E
npm run e2e:report
```

#### Testes E2E de Internacionalização

Os testes E2E para internacionalização garantem que:

- Os seletores de idioma estão presentes e funcionais na interface
- A mudança de idioma atualiza corretamente o conteúdo da página
- As preferências de idioma são persistidas entre recarregamentos
- Os elementos de texto aparecem corretamente no idioma selecionado
- A acessibilidade é mantida ao alternar entre idiomas

Estes testes usam a abordagem baseada em papel e nome dos elementos (`getByRole`, `getByText`), o que torna os testes mais robustos e menos suscetíveis a quebras devido a mudanças na estrutura HTML ou CSS.

### Testes de Acessibilidade

O projeto inclui testes específicos de acessibilidade para:

- Estrutura adequada de cabeçalhos
- Navegação por teclado
- Atributos ARIA adequados
- Contraste de cores
- Acessibilidade do seletor de idiomas

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
