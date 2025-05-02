# Breathing App - Svelte + TypeScript + Vite

Este é um projeto Svelte moderno que utiliza TypeScript e Vite como bundler. Aqui está um guia detalhado de como este projeto foi criado e configurado.

## Criação do Projeto

1. **Inicialização do Projeto**
   ```bash
   npm create vite@latest breathing-app-svelte -- --template svelte-ts
   cd breathing-app-svelte
   npm install
   ```

2. **Estrutura do Projeto**
   ```
   📦 breathing-app-svelte
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

## Build e Deploy

Para criar uma build de produção:
```bash
npm run build
```

Isso gerará uma versão otimizada do projeto na pasta `dist/`.

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Suporte

Para questões e suporte, por favor abra uma issue no repositório do projeto.
