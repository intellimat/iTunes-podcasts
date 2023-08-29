# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# iTunes Podcasts

An app that lets you view and play top 100 us podcasts from iTunes.

## Engines

- Node ^18.14.0
- NPM ^9.3.1

## Run Locally

Clone the project

```bash
  git clone https://github.com/intellimat/iTunes-podcasts.git
```

Go to the project directory

```bash
  cd iTunes-podcasts
```

Install dependencies

```bash
  npm install
```

Start the dev server

```bash
  npm run dev
```

## Build it and serve it

Install dependencies

```bash
  npm install
```

Build (dist folder will be created)

```bash
  npm run build
```

Serve it locally

```bash
  npm run preview
```

## Stack

- vite
- react 18
- react-router-dom
- react-query (@tanstack)
- persistQueryClient (@tanstack)
- chakraUI
