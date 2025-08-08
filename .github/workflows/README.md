# GitHub Actions Workflows

Diese Repository enthält spezialisierte GitHub Actions Workflows für die verschiedenen Module des Lernspiel-Projekts.

## 🚀 Workflow Übersicht

### 1. Backend CI/CD (`backend.yml`)
**Triggers**: Push/PR auf `backend` und `master` Branch bei Backend-Änderungen
- ✅ **Tests**: Unit-Tests, E2E-Tests, Linting
- ✅ **Build**: NestJS Build, Docker Image
- ✅ **Database**: PostgreSQL Service für Tests
- ✅ **Security**: npm audit, Snyk Scan
- 🚀 **Deploy**: Staging Deployment (Backend Branch)

### 2. Frontend CI/CD (`frontend.yml`) 
**Triggers**: Push/PR auf `frontend` und `master` Branch bei Frontend-Änderungen
- ✅ **Tests**: Unit-Tests, E2E-Tests (Playwright), Linting
- ✅ **Performance**: Lighthouse CI
- ✅ **Build**: Next.js Build, Docker Image
- ✅ **Security**: npm audit, Snyk Scan
- 🚀 **Deploy**: Vercel/Netlify Deployment (Frontend Branch)

### 3. CMS CI/CD (`cms.yml`)
**Triggers**: Push/PR auf `cms` und `master` Branch bei CMS-Änderungen
- ✅ **Tests**: Unit-Tests, Integration-Tests, E2E-Tests
- ✅ **Build**: Payload CMS Build, Docker Image
- ✅ **Database**: PostgreSQL Service für Tests
- ✅ **Package Manager**: pnpm Support
- 🚀 **Deploy**: CMS Hosting Deployment

### 4. Full-Stack CI/CD (`fullstack.yml`)
**Triggers**: Push/PR auf `master` Branch
- 🔍 **Smart Detection**: Erkennt geänderte Module automatisch
- 🧪 **Integration Tests**: Vollständige Service-Integration mit Docker Compose
- ✅ **Multi-Service Build**: Alle Services parallel
- 🚀 **Production Deploy**: Vollständige Stack-Bereitstellung

### 5. Security Analysis (`codeql.yml`)
**Triggers**: Push/PR, wöchentlich (Sonntags)
- 🔒 **CodeQL**: Statische Code-Analyse für JavaScript/TypeScript
- 🛡️ **Security Scanning**: Automatische Vulnerabilities-Erkennung

## 📋 Setup Anweisungen

### 1. Repository Secrets einrichten
```bash
# Security Scanning (optional)
SNYK_TOKEN=your_snyk_token

# Docker Registry (für Production)
DOCKER_USERNAME=your_docker_username
DOCKER_PASSWORD=your_docker_password

# Deployment Tokens (optional)
VERCEL_TOKEN=your_vercel_token
```

### 2. Dependabot aktivieren
Die `dependabot.yml` Konfiguration überwacht automatisch:
- NPM Dependencies für alle Module
- Docker Image Updates  
- GitHub Actions Updates

### 3. Branch Protection Rules
Empfohlene Einstellungen für jeden Branch:
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ Restrict pushes
- ✅ Require pull request reviews

## 🔄 Workflow-Strategien

### Development Workflow
1. **Feature Development**: Arbeite in Feature-Branches
2. **Module Testing**: Push zu spezifischen Module-Branches (`backend`, `frontend`, `cms`)
3. **Integration**: Merge zu `master` für Full-Stack-Tests
4. **Production**: Deploy von `master` Branch

### Branch-spezifische Entwicklung
```bash
# Backend Entwicklung
git checkout backend
git pull origin backend
# ... Änderungen machen
git push origin backend  # Triggert backend.yml

# Frontend Entwicklung  
git checkout frontend
git pull origin frontend
# ... Änderungen machen
git push origin frontend  # Triggert frontend.yml

# CMS Entwicklung
git checkout cms
git pull origin cms
# ... Änderungen machen
git push origin cms  # Triggert cms.yml

# Full-Stack Integration
git checkout master
git merge backend
git merge frontend
git merge cms
git push origin master  # Triggert fullstack.yml
```

## 🎯 Workflow Features

### Performance Optimierungen
- **Caching**: Node.js Dependencies, Docker Layers
- **Parallel Jobs**: Tests laufen parallel wo möglich
- **Conditional Execution**: Nur relevante Tests bei Änderungen
- **Artifact Storage**: Test-Reports, Build-Outputs

### Monitoring & Reporting
- **Test Coverage**: Automatische Coverage-Reports
- **Performance Metrics**: Lighthouse CI für Frontend
- **Security Reports**: Snyk + CodeQL Integration
- **Deployment Status**: Slack/Teams Notifications (konfigurierbar)

### Error Handling
- **Fail-Fast**: Stopp bei kritischen Fehlern
- **Continue-on-Error**: Weiter bei optionalen Schritten
- **Retry Logic**: Automatische Wiederholung bei Netzwerkfehlern
- **Artifact Upload**: Error-Reports bei Fehlschlag

## 🛠️ Anpassungen

### Environment Variables
Jeder Workflow unterstützt umgebungsspezifische Konfiguration über:
- Repository Secrets
- Environment Files
- Build-time Variables

### Custom Steps hinzufügen
Erweitere die Workflows für deine spezifischen Bedürfnisse:
- Custom Test Frameworks
- Additional Security Scans  
- Deployment Targets
- Notification Services

## 📊 Monitoring

### GitHub Actions Dashboard
- Workflow-Status in GitHub UI
- Build-Zeiten und Erfolgsraten
- Resource Usage Tracking

### Integration mit Tools
- Slack/Teams Notifications
- JIRA Issue Linking
- Monitoring Dashboards (Grafana, etc.)

---

> **Hinweis**: Alle Workflows sind darauf ausgelegt, sowohl in Public als auch Private Repositories zu funktionieren. Security-Features wie Snyk und CodeQL erfordern entsprechende Berechtigungen.
