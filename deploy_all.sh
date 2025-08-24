#!/bin/bash
# Automated script to rebuild frontend, redeploy backend, and open frontend in Chrome with Internet Identity

set -e

# Step 1: Rebuild frontend
cd "$(dirname "$0")/frontend"
echo "Building frontend..."
pnpm install
pnpm build
cd ..

# Step 2: Use correct DFX identity
IDENTITY="ICPH"
echo "Switching to DFX identity: $IDENTITY"
dfx identity use "$IDENTITY"

# Step 3: Deploy backend canisters to IC mainnet
echo "Deploying canisters to IC mainnet..."
dfx deploy --network=ic

# Step 4: Open frontend in Chrome (assumes Vercel/Netlify or local preview)
# If using local preview, uncomment the following lines:
# cd frontend
# pnpm preview &
# sleep 3
# xdg-open http://localhost:4173 &

# If deployed to a public URL, replace with your deployed URL:
# xdg-open "https://your-frontend-url.com" &

echo "All done! Frontend rebuilt, backend redeployed, and browser opened."
