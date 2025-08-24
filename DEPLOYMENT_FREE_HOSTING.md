# Free Hosting Deployment Guide

This guide provides step-by-step instructions for deploying your AI Bot Project to free hosting platforms like Netlify and Vercel.

## 🚀 Quick Start

1. **Test your build locally:**
   ```bash
   ./deploy-test.sh
   ```

2. **Push your code to GitHub**

3. **Choose your hosting platform:**
   - [Netlify](#netlify-deployment) (Recommended for static sites)
   - [Vercel](#vercel-deployment) (Optimized for React/Next.js)

## 📋 Prerequisites

- Node.js 18 or higher
- GitHub repository with your code
- Account on [Netlify](https://netlify.com) or [Vercel](https://vercel.com)

## 🌐 Netlify Deployment

### Option 1: Manual Deployment (Quick Start)

1. **Visit [Netlify](https://app.netlify.com/start)**
2. **Connect your GitHub repository**
3. **Configure build settings:**
   - Build command: `cd frontend/src/icp-hub-frontend && npm install && npm run build`
   - Publish directory: `frontend/src/icp-hub-frontend/dist`
4. **Deploy!**

The `netlify.toml` file in the root directory will automatically configure:
- Build settings
- Client-side routing redirects
- Security headers
- Static asset caching

### Option 2: Automated with GitHub Actions

GitHub Actions will automatically deploy to Netlify when you push to main/master.

**Setup:**
1. Add these secrets to your GitHub repository:
   - `NETLIFY_AUTH_TOKEN`: Your Netlify personal access token
   - `NETLIFY_SITE_ID`: Your Netlify site ID

2. Push to main/master branch - deployment happens automatically!

## ⚡ Vercel Deployment

### Option 1: Manual Deployment

1. **Visit [Vercel](https://vercel.com/import)**
2. **Import your GitHub repository**
3. **Framework Detection:** Vercel will auto-detect Vite
4. **Configure build settings** (or let Vercel use `vercel.json`):
   - Build Command: `cd frontend/src/icp-hub-frontend && npm install && npm run build`
   - Output Directory: `frontend/src/icp-hub-frontend/dist`
5. **Deploy!**

### Option 2: Automated with GitHub Actions

**Setup:**
1. Add these secrets to your GitHub repository:
   - `VERCEL_TOKEN`: Your Vercel token
   - `ORG_ID`: Your Vercel team/organization ID
   - `PROJECT_ID`: Your Vercel project ID

2. Push to main/master branch - deployment happens automatically!

## 🔧 Configuration Files

### netlify.toml
```toml
[build]
  command = "cd frontend/src/icp-hub-frontend && npm install && npm run build"
  publish = "frontend/src/icp-hub-frontend/dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### vercel.json
```json
{
  "buildCommand": "cd frontend/src/icp-hub-frontend && npm install && npm run build",
  "outputDirectory": "frontend/src/icp-hub-frontend/dist",
  "routes": [
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

## 🤖 GitHub Actions Workflows

Three workflow files are configured in `.github/workflows/`:

1. **`build-and-deploy.yml`** - Main workflow that builds and deploys to both platforms
2. **`deploy-netlify.yml`** - Netlify-specific deployment
3. **`deploy-vercel.yml`** - Vercel-specific deployment

## 🛠️ Troubleshooting

### Build Fails
```bash
# Test build locally
cd frontend/src/icp-hub-frontend
npm install
npm run build
```

### Environment Variables
If your app needs environment variables:

**Netlify:**
- Go to Site Settings > Environment variables
- Add your variables

**Vercel:**
- Go to Project Settings > Environment Variables
- Add your variables

### Custom Domain
Both platforms support custom domains in their free tiers:
- **Netlify:** Site Settings > Domain management
- **Vercel:** Project Settings > Domains

## 🔐 Security Features

Both deployments include:
- HTTPS encryption (automatic)
- Security headers (XSS protection, content type sniffing prevention)
- CORS handling
- Static asset caching

## 💡 Best Practices

1. **Always test locally first** using `./deploy-test.sh`
2. **Use environment variables** for sensitive data
3. **Enable branch previews** for testing
4. **Monitor build logs** for issues
5. **Set up custom domains** for production

## 📊 Cost Breakdown

Both platforms offer generous free tiers:

**Netlify Free:**
- 100GB bandwidth/month
- 300 build minutes/month
- Unlimited personal sites

**Vercel Free:**
- 100GB bandwidth/month
- 6000 build seconds/month
- Unlimited personal projects

## 🆘 Need Help?

1. Check the [deployment troubleshooting guide](DEPLOYMENT_STEPS.md)
2. Review build logs in your hosting platform dashboard
3. Test builds locally with `./deploy-test.sh`
4. Check GitHub Actions logs for automated deployments

---

*Ready to deploy? Run `./deploy-test.sh` to verify everything works locally, then push to GitHub and watch the magic happen! 🚀*