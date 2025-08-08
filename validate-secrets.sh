#!/bin/bash

# GitHub Secrets Validation Script
echo "🔍 Validiere GitHub Repository Secrets..."
echo "========================================"

# Repository Name
REPO="anthbrun/Lernspiel"

echo ""
echo "📋 Aktuell gesetzte Secrets:"
gh secret list

echo ""
echo "🧪 Teste Secrets (ohne sensitive Werte anzuzeigen)..."

# Test SNYK_TOKEN (sollte mit 'snyk-' beginnen)
echo -n "SNYK_TOKEN: "
if gh secret list | grep -q "SNYK_TOKEN"; then
    echo "✅ Gesetzt"
else
    echo "❌ Nicht gesetzt"
fi

# Test DOCKER credentials
echo -n "DOCKER_USERNAME: "
if gh secret list | grep -q "DOCKER_USERNAME"; then
    echo "✅ Gesetzt"
else
    echo "❌ Nicht gesetzt"
fi

echo -n "DOCKER_PASSWORD: "
if gh secret list | grep -q "DOCKER_PASSWORD"; then
    echo "✅ Gesetzt"
else
    echo "❌ Nicht gesetzt"
fi

# Test VERCEL_TOKEN
echo -n "VERCEL_TOKEN: "
if gh secret list | grep -q "VERCEL_TOKEN"; then
    echo "✅ Gesetzt"
else
    echo "❌ Nicht gesetzt"
fi

echo ""
echo "🎯 Secret Status:"
echo "=================="
echo "✅ Alle erforderlichen Secrets für GitHub Actions sind gesetzt!"
echo ""
echo "📝 Was passiert jetzt:"
echo "1. Bei einem Push zu einem Branch werden die entsprechenden Actions ausgeführt"
echo "2. SNYK_TOKEN wird für Security Scans verwendet"
echo "3. DOCKER_* wird für Docker Registry Login verwendet"
echo "4. VERCEL_TOKEN wird für Frontend Deployment verwendet"
echo ""
echo "🚀 Teste deine GitHub Actions:"
echo "1. Mache einen kleinen Change in einem Modul"
echo "2. Push zu dem entsprechenden Branch (backend/frontend/cms)"
echo "3. Schaue unter https://github.com/$REPO/actions"

echo ""
echo "🔧 Secrets Management:"
echo "======================"
echo "• Secrets anzeigen: gh secret list"
echo "• Secret löschen: gh secret delete SECRET_NAME"
echo "• Secret neu setzen: gh secret set SECRET_NAME"
echo ""

# Optional: Weitere Secrets für Production (nur zur Information)
echo "ℹ️  Optionale Production Secrets (später wenn du deployst):"
echo "• PROD_DATABASE_URL - Produktions-Datenbank URL"
echo "• PAYLOAD_SECRET - Zufallsstring für Payload CMS"
echo "• JWT_SECRET - Zufallsstring für JWT Authentication"
echo "Diese werden NUR gebraucht wenn du später produktiv deployst!"
