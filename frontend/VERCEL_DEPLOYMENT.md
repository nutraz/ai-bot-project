# Vercel Deployment Configuration

This frontend is configured for deployment on Vercel with the following settings:

## Vercel Project Settings

When importing the project in Vercel, use these configuration settings:

- **Root Directory**: `frontend`
- **Build Command**: `pnpm build`
- **Output Directory**: `dist`

## Configuration Files

- `vercel.json`: Contains build and routing configuration
- `package.json`: Includes `packageManager` field for pnpm and engine requirements
- `.vercelignore`: Excludes unnecessary files from deployment
- `pnpm-lock.yaml`: Lock file for reproducible builds

## Build Process

The build process uses Vite and outputs a static site to the `dist` directory that can be served by Vercel's CDN.

## SPA Routing

The `vercel.json` includes rewrites to support client-side routing, directing all routes to `index.html`.