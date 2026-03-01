# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Hundred Proof is a client-only cocktail calculator built with Next.js 16, React 19, and TypeScript (strict mode). It has two features: **Dilute** (spirits dilution calculator) and **Scale** (recipe ingredient scaling). No API routes or backend.

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — Run ESLint + Stylelint
- `npm run lint:fix` — Auto-fix all lint issues
- `npm test` — Jest unit tests (80% coverage threshold on `src/utils/`)
- `npm run test:e2e` — Playwright E2E tests (Chromium only)
- `npm run test:e2e:headed` — Playwright in headed browser
- `npm run test:e2e:ui` — Playwright UI runner

Run a single Jest test: `npx jest path/to/file.test.ts`
Run a single Playwright test: `npx playwright test e2e/file.spec.ts`

## Environment

- **Node 24** required (`.nvmrc`). Run `source ~/.nvm/nvm.sh && nvm use` before commands.
- Port 3000 may be occupied — Playwright config uses port 3000 with `reuseExistingServer`.

## Architecture

### Routing (App Router)
- `/` — Home page with feature selector
- `/dilute` — Dilution calculator
- `/scale` — Recipe scaling tool

### State Management — XState 5
Two independent state machines, each with a React Context provider and custom hook:
- `src/components/DilutionTools/useDilution/` — `DilutionMachineProvider` + `useDilution()` hook
- `src/components/ScalingTools/useScaling/` — `ScalingMachineProvider` + `useScaling()` hook

Machines validate inputs in `assign()` actions and return numeric error codes (not strings). Use `useSelector()` for derived state, `useCallback()` wrapping event dispatch.

### Styling — CSS Modules
- All components use `.module.css` files with `classnames` utility for conditional classes
- **Logical CSS properties required** (`inline-size` not `width`, `block-size` not `height`) — enforced by Stylelint
- Alphabetical property ordering enforced
- Allowed units: ch, em, rem, vh, vw, vmin, deg, %, s, fr

### Key Directories
- `src/utils/` — All calculation logic with full test coverage (dilution math, unit conversions, ingredient processing)
- `src/components/` — Each component in its own folder with `.tsx` + `.module.css`
- `src/utils/types.ts` — Shared types (`Ingredient`, `Unit`, `Measure`, `VolumeDirection`)
- `e2e/` — Playwright test specs

## Code Conventions

- **JSX props sorted alphabetically** (`react/jsx-sort-props: error`)
- **Imports auto-sorted** via `eslint-plugin-simple-import-sort`
- **Single quotes**, trailing commas, one JSX attribute per line (Prettier)
- Interactive components require `'use client'` directive
- Fonts loaded via `next/font/google` in `layout.tsx`

## Gotchas

### IngredientItem + Playwright
`fill()` doesn't work on Scale ingredient inputs because `IngredientItem`'s `useEffect` auto-appends new rows on character input. Use `pressSequentially()` with a delay instead.

### Auto-Append Ingredients
The scaling machine's `applyAutoAppend()` automatically adds an empty ingredient row when the last one is filled — relevant when writing tests or modifying ingredient logic.
