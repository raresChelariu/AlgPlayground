# Local Build Guide

## VitePress-specific files

| File | Purpose |
|------|---------|
| `package.json` | Defines npm scripts (`docs:dev`, `docs:build`, `docs:preview`) and dependencies (`vitepress`, `vitepress-plugin-mermaid`, `mermaid`) |
| `package-lock.json` | Locks exact dependency versions for reproducible installs |
| `docs/.vitepress/config.mts` | VitePress configuration — site title, navigation bar, sidebar structure, and mermaid plugin setup |
| `docs/index.md` | Landing page using VitePress `home` layout with hero section and feature cards |
| `docs/.vitepress/dist/` | Build output (generated, gitignored) |
| `docs/.vitepress/cache/` | Build cache (generated, gitignored) |

## Prerequisites

- [Node.js](https://nodejs.org/) version 18 or higher

## Setup

```bash
npm install
```

## Local development

Start a dev server with hot reload:

```bash
npm run docs:dev
```

Opens at `http://localhost:5173`. Changes to markdown files or config are reflected instantly.

## Production build

```bash
npm run docs:build
```

Generates static HTML in `docs/.vitepress/dist/`.

## Preview production build

```bash
npm run docs:preview
```

Serves the built site locally at `http://localhost:4173` so you can verify the production output before deploying.
