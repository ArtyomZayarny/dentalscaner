#!/bin/bash

echo "🔍 Checking build status..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

echo "📝 Running lint check..."
if ! npm run lint; then
    echo "❌ Lint check failed!"
    exit 1
fi

echo "🔧 Running type check..."
if ! npm run typecheck; then
    echo "❌ Type check failed!"
    exit 1
fi

echo "🧪 Running tests..."
if ! npm test; then
    echo "❌ Tests failed!"
    exit 1
fi

echo "🏗️ Building application..."
if ! npm run build; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ All checks passed! Build is ready for deployment."
