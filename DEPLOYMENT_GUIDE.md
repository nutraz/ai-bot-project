# Quick Deployment Guide

This guide provides step-by-step instructions for deploying OpenKeyHub to free hosting platforms.

## Option 1: Netlify (Recommended)

### Automatic Deployment from GitHub

1. **Sign up/Login to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up or login with your GitHub account

2. **Deploy from Git**
   - Click "New site from Git"
   - Choose "GitHub" as your Git provider
   - Select the `nutraz/ai-bot-project` repository
   - Netlify will automatically detect the `netlify.toml` configuration
   - Click "Deploy site"

3. **Done!**
   - Netlify will build and deploy your site automatically
   - You'll get a free subdomain (e.g., `amazing-project-abc123.netlify.app`)
   - Automatic redeployment on every push to main branch

### Manual Deployment

1. Build the project locally:
   ```bash
   npm run build
   ```

2. Go to [netlify.com](https://netlify.com) and drag/drop the `frontend/src/icp-hub-frontend/dist` folder to deploy

## Option 2: Vercel

### Automatic Deployment from GitHub

1. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up or login with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Import the `nutraz/ai-bot-project` repository
   - Vercel will automatically detect the `vercel.json` configuration
   - Click "Deploy"

3. **Done!**
   - You'll get a free subdomain (e.g., `ai-bot-project.vercel.app`)
   - Automatic redeployment on every push

### Manual Deployment

1. Install Vercel CLI and deploy:
   ```bash
   npm install -g vercel
   vercel --prod
   ```

## Option 3: Other Free Platforms

### GitHub Pages
1. Enable GitHub Pages in repository settings
2. Use GitHub Actions to build and deploy to `gh-pages` branch

### Surge.sh
```bash
npm install -g surge
npm run build
cd frontend/src/icp-hub-frontend/dist
surge
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## Configuration Files

The repository includes pre-configured files for easy deployment:

- **`netlify.toml`** - Netlify configuration with build settings and redirects
- **`vercel.json`** - Vercel configuration with build command and SPA redirects  
- **`public/_redirects`** - Client-side routing redirects for Single Page Applications

## Troubleshooting

### Build Fails
- Ensure Node.js version 18 or higher
- Check that all dependencies are listed in `package.json`

### Routing Issues
- Make sure `_redirects` file is in the build output
- Verify your hosting platform supports SPA redirects

### Environment Variables
- Add any required environment variables in your hosting platform's dashboard
- Variables should be prefixed with `VITE_` for Vite to include them in the build

## Live Demo

Once deployed, your application will be accessible at your chosen platform's provided URL.