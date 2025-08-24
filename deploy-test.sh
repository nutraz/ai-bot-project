#!/bin/bash
# Local deployment test script for AI Bot Project
# This script builds the project and prepares it for deployment

set -e

echo "🚀 AI Bot Project - Local Deployment Test"
echo "========================================"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'  
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "frontend" ]; then
    print_error "Please run this script from the root of the ai-bot-project repository"
    exit 1
fi

print_status "Checking dependencies..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_warning "Node.js version is $NODE_VERSION. Version 18 or higher is recommended."
fi

print_success "Node.js $(node --version) found"

# Navigate to frontend directory
cd frontend/src/icp-hub-frontend

print_status "Installing dependencies..."
npm install

print_status "Running build..."
npm run build

if [ $? -eq 0 ]; then
    print_success "Build completed successfully!"
    print_status "Build output located at: frontend/src/icp-hub-frontend/dist"
    
    # Show build stats
    echo ""
    echo "📊 Build Statistics:"
    echo "==================="
    du -sh dist/
    find dist/ -type f -name "*.html" -o -name "*.js" -o -name "*.css" | wc -l | xargs echo "Total files:"
    
    echo ""
    print_success "Your project is ready for deployment!"
    echo ""
    echo "🌐 Next Steps:"
    echo "=============="
    echo "1. For Netlify: Connect your GitHub repo at https://app.netlify.com/start"
    echo "2. For Vercel: Connect your GitHub repo at https://vercel.com/import"
    echo "3. Both platforms will automatically detect and use the configuration files:"
    echo "   - netlify.toml (for Netlify)"
    echo "   - vercel.json (for Vercel)" 
    echo ""
    echo "🔧 GitHub Actions:"
    echo "=================="
    echo "Automated deployment workflows are configured in .github/workflows/"
    echo "They will trigger automatically when you push to main/master branch."
    echo ""
    print_success "Deployment test completed! 🎉"
else
    print_error "Build failed! Please check the error messages above."
    exit 1
fi