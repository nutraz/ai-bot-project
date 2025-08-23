# OpenKeyHub - AI Bot Project

A template repository for building Internet Computer (ICP) smart contracts and dApps, primarily using Motoko. This project is designed to be cloned or forked for rapid development and deployment of web3 applications.

## Features
- Motoko-based smart contract (canister) development
- React + TypeScript frontend with Vite
- Internet Computer (ICP) integration  
- Deployment guides for Vercel, Netlify, and popular blockchain testnets
- Multi-contributor support and template repository setup

## Getting Started

### Development Setup

1. **Clone the repository:**
```bash
git clone https://github.com/nutraz/ai-bot-project.git
cd ai-bot-project
```

2. **Install dependencies and start development:**
```bash
npm run dev
```

This will start both frontend and backend development servers.

### Frontend Only Development
```bash
npm run dev:frontend
```

## Building for Production

```bash
npm run build
```

## Deployment to Cost-Free Platforms

### Deploy to Netlify (Recommended - Free)

1. **Automatic Deployment:**
   - Connect your GitHub repository to [Netlify](https://netlify.com)
   - Netlify will automatically use the `netlify.toml` configuration
   - No additional setup required!

2. **Manual Deployment:**
   - Build the project: `npm run build`
   - Upload the `frontend/src/icp-hub-frontend/dist` folder to Netlify

### Deploy to Vercel (Alternative - Free)

1. **Automatic Deployment:**
   - Connect your GitHub repository to [Vercel](https://vercel.com)
   - Vercel will automatically use the `vercel.json` configuration

2. **Manual Deployment:**
   ```bash
   npx vercel --prod
   ```

### Other Free Hosting Options

- **GitHub Pages**: Build and deploy to `gh-pages` branch
- **Surge.sh**: `npm install -g surge && surge frontend/src/icp-hub-frontend/dist`
- **Firebase Hosting**: Use Firebase CLI to deploy the dist folder

## Configuration Files

- `netlify.toml` - Netlify deployment configuration
- `vercel.json` - Vercel deployment configuration  
- `frontend/src/icp-hub-frontend/public/_redirects` - SPA routing redirects

## Project Structure

```
├── frontend/src/icp-hub-frontend/    # Main React application
├── backend/                          # Internet Computer canisters  
├── netlify.toml                     # Netlify configuration
├── vercel.json                      # Vercel configuration
└── package.json                     # Root package configuration
```

## Documentation
- See [DEPLOYMENT_STEPS.md](./DEPLOYMENT_STEPS.md) for detailed deployment instructions
- Motoko code and canister logic are in `src/Icp_hub_backend/`

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request. For major changes, open an issue first to discuss your ideas.

## Maintainers
- nutraz
- Icphub-web3  
- biswas2200
- aryarathoree
