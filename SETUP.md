# Project Setup Guide: React + TypeScript + Vite + Tailwind CSS

How this portfolio was set up, step by step, so you can repeat it manually for any new project.

## Tools and what they do

| Tool | Purpose |
|---|---|
| **Node.js / npm** | Node runs JavaScript tooling on your computer; npm installs packages. |
| **Vite** | Dev server and bundler. Instant reload while coding, optimized build for production. |
| **React** | Library for building the UI from components. |
| **TypeScript** | JavaScript with types. Catches mistakes before you run the code. |
| **Tailwind CSS (v4)** | Utility classes (e.g. `text-4xl font-bold`) written directly in JSX. |

## Prerequisites

Check that Node and npm are installed:

```bash
node -v
npm -v
```

This project was built with Node 24 and npm 11.

## Steps

### 1. Create the project

```bash
npm create vite@latest my-app -- --template react-ts
```

- `my-app` is the new folder name. Use `.` to build in the current folder.
- `--template react-ts` selects React + TypeScript.
- Vite needs the target folder to be **empty or non-existent**. If the folder already has files (like `.git`), scaffold in a temporary folder and copy the files over, keeping your own `.gitignore` and `README.md`.

### 2. Install dependencies

```bash
cd my-app
npm install
```

Reads `package.json` and creates `node_modules/` and `package-lock.json`.

### 3. Install Tailwind CSS

```bash
npm install tailwindcss @tailwindcss/vite
```

> **Order matters.** Run this only *after* the Vite project exists. Running it in an empty folder creates a stray `package.json` that you then have to delete.

### 4. Add the Tailwind plugin to `vite.config.ts`

```ts
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

Only two changes from the template: the new `import tailwindcss` line and `tailwindcss()` in the `plugins` array.

### 5. Import Tailwind in `src/index.css`

Replace the entire file contents with:

```css
@import "tailwindcss";
```

Tailwind v4 needs no `tailwind.config.js` or `postcss.config.js`; the Vite plugin handles it.

### 6. Make sure the CSS is loaded

`src/main.tsx` must import the stylesheet (the template already does):

```tsx
import './index.css'
```

### 7. Clean up the demo and use Tailwind

Delete the demo files:

- `src/App.css`
- `src/assets/`

Then replace `src/App.tsx`:

```tsx
function App() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">Hubert's Portfolio</h1>
    </main>
  )
}

export default App
```

### 8. Run it

```bash
npm run dev      # development server with live reload
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build locally
```

## Project structure

```
Hubert-Portfolio/
├── index.html            # The single HTML page, contains <div id="root">
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite config (React + Tailwind plugins)
├── tsconfig.json         # TypeScript root config
├── tsconfig.app.json     # TypeScript settings for src/
├── tsconfig.node.json    # TypeScript settings for vite.config.ts
├── .oxlintrc.json        # Linter settings
├── public/               # Static files served as-is
└── src/
    ├── main.tsx          # Entry point: mounts React into #root
    ├── App.tsx           # Top-level component
    └── index.css         # Global styles (Tailwind import)
```

## Common problems

| Problem | Cause / fix |
|---|---|
| `Operation cancelled` from `npm create vite` | Target folder isn't empty. Use a fresh folder or the temp-folder approach in step 1. |
| `Could not read package.json` | You ran `npm install` outside a project folder. `cd` into it first. |
| Tailwind classes have no effect | Check the plugin is in `vite.config.ts`, `@import "tailwindcss";` is in `src/index.css`, and `main.tsx` imports `./index.css`. |
| Stray `package.json` / `node_modules` | Installed packages before creating the project. Delete them and redo from step 1. |

## Next steps

- To understand how the finished site works (pages, navigation, buttons, data flow, styling), read [HOW-IT-WORKS.md](HOW-IT-WORKS.md).
