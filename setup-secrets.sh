#!/bin/bash

# GitHub Repository Secrets Setup Script
# Führe dieses Script aus, nachdem du alle Tokens erstellt hast

echo "🔐 GitHub Secrets Setup für Lernspiel Repository"
echo "=================================================="

# Repository Name (passe an)
REPO="anthbrun/Lernspiel"  # Ersetze mit deinem GitHub Username/Repository

echo ""
echo "📋 Erforderliche Tokens:"
echo "1. SNYK_TOKEN - Gehe zu: https://app.snyk.io/account"
echo "2. DOCKER_USERNAME - Dein Docker Hub Username"
echo "3. DOCKER_PASSWORD - Docker Hub Password oder Access Token"
echo "4. VERCEL_TOKEN - Gehe zu: https://vercel.com/account/tokens"
echo ""

read -p "Hast du alle Tokens erstellt? (y/N): " confirm
if [[ $confirm != [yY] ]]; then
    echo "❌ Bitte erstelle erst alle Tokens und führe dann das Script erneut aus."
    exit 1
fi

echo ""
echo "🚀 Setze Repository Secrets..."

# Überprüfe ob GitHub CLI installiert ist
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) ist nicht installiert."
    echo "Installation:"
    echo "  Ubuntu/Debian: sudo apt install gh"
    echo "  macOS: brew install gh"
    echo "  Windows: winget install GitHub.cli"
    exit 1
fi

# Login Check
if ! gh auth status &> /dev/null; then
    echo "🔐 GitHub Login erforderlich..."
    gh auth login
fi

echo ""
echo "📝 Bitte gib deine Tokens ein:"

read -s -p "SNYK_TOKEN (beginnt mit 'snyk-'): " snyk_token
echo
read -p "DOCKER_USERNAME: " docker_username
read -s -p "DOCKER_PASSWORD: " docker_password
echo
read -s -p "VERCEL_TOKEN: " vercel_token
echo

echo ""
echo "⬆️ Setze Secrets in Repository..."

# Set secrets
gh secret set SNYK_TOKEN -b "$snyk_token" -R "$REPO"
gh secret set DOCKER_USERNAME -b "$docker_username" -R "$REPO"
gh secret set DOCKER_PASSWORD -b "$docker_password" -R "$REPO"
gh secret set VERCEL_TOKEN -b "$vercel_token" -R "$REPO"

echo "✅ Alle Secrets erfolgreich gesetzt!"
echo ""
echo "🎉 GitHub Actions sind jetzt vollständig konfiguriert!"
echo ""
echo "📊 Nächste Schritte:"
echo "1. Push deine Änderungen zu GitHub"
echo "2. GitHub Actions werden automatisch bei Push/PR ausgeführt"
echo "3. Überprüfe die Actions unter: https://github.com/$REPO/actions"
echo ""
echo "🔍 Secret Überprüfung:"
gh secret list -R "$REPO"
