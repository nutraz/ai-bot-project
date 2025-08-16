#!/bin/bash
echo "=== Repo Analysis Script ==="
echo ""

# 1. Check directory structure
echo "Checking directories..."
[ -d "frontend" ] && echo "✅ frontend folder exists" || echo "❌ frontend folder missing"
[ -d "backend" ] && echo "✅ backend folder exists" || echo "❌ backend folder missing"
[ -d ".dfx" ] && echo "✅ .dfx folder exists" || echo "⚠ .dfx folder not found, try dfx start"
echo ""

# 2. Check Node.js dependencies
if [ -f "frontend/package.json" ]; then
  echo "Checking frontend Node dependencies..."
  npm --prefix frontend ls >/dev/null 2>&1 && echo "✅ All frontend dependencies installed" || echo "⚠ Run npm install in frontend"
else
  echo "❌ frontend/package.json missing"
fi
echo ""

# 3. Check DFX and Motoko
if command -v dfx >/dev/null 2>&1; then
  echo "DFX installed: $(dfx --version)"
else
  echo "❌ DFX not installed"
fi
echo "Attempting to build canisters..."
dfx build || echo "⚠ Build errors detected, check backend/main.mo"
echo ""

# 4. Git status
echo "Checking Git status..."
git status
echo ""

# 5. Frontend bundle size
if [ -f "frontend/dist/index.html" ]; then
  echo "Checking frontend bundle size..."
  du -h frontend/dist | sort -hr | head -n 10
else
  echo "⚠ Frontend not built yet"
fi

echo ""
echo "=== Analysis Complete ==="
