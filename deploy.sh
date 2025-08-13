#!/bin/bash

# Production Deployment Script for Sarvodaya Dental Clinic

echo "🚀 Starting production deployment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Run tests
echo "🧪 Running tests..."
npm test -- --watchAll=false --coverage

if [ $? -ne 0 ]; then
    echo "❌ Tests failed. Deployment aborted."
    exit 1
fi

echo "✅ All tests passed"

# Build for production
echo "🏗️  Building for production..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Deployment aborted."
    exit 1
fi

echo "✅ Build completed successfully"

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo "❌ Build directory 'dist' not found."
    exit 1
fi

echo "📊 Build statistics:"
du -sh dist/
echo "📁 Files in dist:"
ls -la dist/

echo "🎉 Production build ready!"
echo "📂 Build files are in the 'dist' directory"
echo ""
echo "Next steps:"
echo "1. Deploy the 'dist' folder to your hosting provider"
echo "2. Ensure environment variables are set on your hosting platform"
echo "3. Test the deployed site thoroughly"
echo ""
echo "For Vercel deployment:"
echo "  - Connect your repository to Vercel"
echo "  - Set build command: npm run build"
echo "  - Set output directory: dist"
echo "  - Add environment variables in Vercel dashboard"
echo ""
echo "For Netlify deployment:"
echo "  - Connect your repository to Netlify"
echo "  - Set build command: npm run build"
echo "  - Set publish directory: dist"
echo "  - Add environment variables in Netlify dashboard"