# Copilot Instructions for ai-bot-project

## Project Overview
- **Monorepo** with multiple apps: `frontend` (Vite/React/Tailwind), `backend` (Motoko/IC), and `chadnext` (Next.js/Prisma).
- Main user-facing app is in `frontend/` (Vite + React + Tailwind CSS 4).
- Backend logic and canister code is in `frontend/src/Icp_hub_backend/` (Motoko).
- `chadnext/` is a Next.js template, not the main app.

## Key Workflows
- **Install dependencies:**
  - `pnpm install` (from repo root)
- **Build frontend:**
  - `cd frontend && pnpm build`
- **Dev server:**
  - `cd frontend && pnpm dev` (runs Vite on port 5173+)
- **Deploy:**
  - Vercel deploys from `frontend/` with output in `frontend/dist`.
- **Backend (Motoko):**
  - Motoko code in `frontend/src/Icp_hub_backend/` and `backend/`.
  - Use DFINITY tools for local canister dev/deploy.

## Project Conventions & Patterns
- **Tailwind CSS:**
  - Uses CSS variables for color theming in `index.css` and `tailwind.config.js`.
  - Custom utility classes like `border-border` map to CSS vars (see `tailwind.config.js`).
- **Routing:**
  - React Router v7 in `frontend/src/main.jsx`.
- **Demo Data:**
  - Demo repo CRUD in `frontend/src/lib/demoStore.js`.
- **Component Organization:**
  - Main components in `frontend/src/components/`.
  - Backup/legacy components in `frontend/src/components_backup/`.
- **Motoko Patterns:**
  - Controllers and logic in `frontend/src/Icp_hub_backend/controllers/`.
  - Data flows via public query/update methods.

## Integration Points
- **IC/DFINITY:**
  - Motoko backend integrates with Internet Computer canisters.
- **Vercel:**
  - `vercel.json` sets build command and rewrites for SPA routing.
- **Tailwind:**
  - Uses `@tailwindcss/postcss` for PostCSS v4+ compatibility.

## Examples
- See `frontend/src/pages/RepositoriesPage.jsx` for CRUD UI patterns.
- See `frontend/tailwind.config.js` for color and utility conventions.
- See `frontend/src/Icp_hub_backend/main.mo` for Motoko canister entrypoint.

---

**If you are an AI agent:**
- Always check for project-specific conventions in `tailwind.config.js` and `index.css`.
- Use Vite/Tailwind/React idioms for new UI.
- For backend, follow Motoko controller patterns.
- Reference this file and `README.md` for up-to-date workflows.
