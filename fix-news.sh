#!/bin/bash
# Quick fix script untuk News

echo "🧹 Cleaning cache..."
rm -rf .next

echo "🔄 Restarting development server..."
npm run dev

echo "✅ Server restarted!"
echo ""
echo "📱 Akses halaman news:"
echo "   - User: http://localhost:3000/news"
echo "   - Debug API: http://localhost:3000/api/news-debug"
echo ""
echo "📖 Console logs:"
echo "   - Watch server console untuk debug info"
echo "   - Logs dimulai dengan [NEWS SERVICE] dan [NEWS PAGE]"
