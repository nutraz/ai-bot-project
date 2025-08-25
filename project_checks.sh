#!/bin/bash
# Automated project checks for local and CI environments
set -e

# 1. Check current git branch and status
echo "\n--- GIT STATUS ---"
git status
git branch

echo "\n--- GIT REMOTE ---"
git remote -v

# 2. Check for merge conflicts
echo "\n--- MERGE CONFLICTS ---"
grep -r '<<<<<<<\|======\|>>>>>>>' . || echo "No merge conflicts found."

# 3. Check for missing or uncommitted files
echo "\n--- UNCOMMITTED CHANGES ---"
git status --short

# 4. Check for missing build output files
echo "\n--- BUILD OUTPUT FILES ---"
if [ -d "frontend/dist" ]; then
  find frontend/dist
else
  echo "frontend/dist does not exist. Run build first."
fi

# 5. Check for _redirects in dist
echo "\n--- _redirects FILE ---"
if [ -f "frontend/dist/_redirects" ]; then
  echo "_redirects file found in dist."
else
  echo "_redirects file NOT found in dist!"
fi

# 6. Run frontend build and lint
echo "\n--- FRONTEND BUILD & LINT ---"
cd frontend
pnpm install
pnpm build
pnpm lint || echo "Lint warnings/errors found."
cd ..

# 7. Check for 404s in deployed site (if URL provided)
if [ ! -z "$1" ]; then
  echo "\n--- CHECKING DEPLOYED SITE FOR 404s ---"
  curl -s "$1" | grep '404' && echo "404 found on $1" || echo "No 404 found on $1"
fi

echo "\nAll checks complete."
