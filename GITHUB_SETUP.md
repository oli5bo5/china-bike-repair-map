# 📚 GitHub Setup Anleitung

Diese Anleitung zeigt Ihnen, wie Sie das Projekt auf GitHub hochladen und mit Vercel deployen.

## 🎯 Schritt 1: GitHub Repository erstellen

### Option A: Über die GitHub Website

1. **GitHub öffnen**: Gehen Sie zu [github.com](https://github.com) und melden Sie sich an

2. **Neues Repository erstellen**:
   - Klicken Sie auf das "+" Symbol oben rechts
   - Wählen Sie "New repository"
   - Repository Name: `china-bike-repair-map`
   - Beschreibung: "Interaktive Karte für Händler und Werkstätten, die chinesische Fahrräder und E-Bikes reparieren"
   - Wählen Sie "Public" (oder "Private" wenn gewünscht)
   - **NICHT** "Initialize this repository with a README" ankreuzen
   - Klicken Sie auf "Create repository"

3. **Repository URL kopieren**: 
   - Sie sehen eine URL wie: `https://github.com/IHR-USERNAME/china-bike-repair-map.git`
   - Diese URL benötigen Sie im nächsten Schritt

### Option B: Über GitHub CLI

```bash
# GitHub CLI installieren (falls noch nicht vorhanden)
# Windows: winget install GitHub.cli
# Mac: brew install gh

# In GitHub einloggen
gh auth login

# Repository erstellen
gh repo create china-bike-repair-map --public --description "Interaktive Karte für Händler und Werkstätten, die chinesische Fahrräder und E-Bikes reparieren"
```

## 🚀 Schritt 2: Lokales Projekt mit GitHub verbinden

Öffnen Sie ein Terminal im Projektordner `china-bike-repair-map` und führen Sie folgende Befehle aus:

```bash
# Git initialisieren (falls noch nicht geschehen)
git init

# Alle Dateien zum Staging hinzufügen
git add .

# Ersten Commit erstellen
git commit -m "Initial commit: China Bike Repair Map"

# Remote Repository hinzufügen (ersetzen Sie IHR-USERNAME mit Ihrem GitHub-Benutzernamen)
git remote add origin https://github.com/IHR-USERNAME/china-bike-repair-map.git

# Branch umbenennen (optional, aber empfohlen)
git branch -M main

# Code zu GitHub pushen
git push -u origin main
```

### Fehlerbehebung

**Fehler: "remote origin already exists"**
```bash
git remote remove origin
git remote add origin https://github.com/IHR-USERNAME/china-bike-repair-map.git
```

**Fehler: "Authentication failed"**
```bash
# Verwenden Sie ein Personal Access Token anstelle Ihres Passworts
# Token erstellen unter: https://github.com/settings/tokens
```

## 🌐 Schritt 3: Mit Vercel deployen

### Methode 1: Über Vercel Website (Empfohlen)

1. **Vercel Account erstellen**:
   - Gehen Sie zu [vercel.com](https://vercel.com)
   - Klicken Sie auf "Sign Up"
   - Wählen Sie "Continue with GitHub"
   - Autorisieren Sie Vercel

2. **Projekt importieren**:
   - Klicken Sie auf "Add New..." → "Project"
   - Wählen Sie Ihr GitHub Repository `china-bike-repair-map`
   - Klicken Sie auf "Import"

3. **Projekt konfigurieren**:
   - **Framework Preset**: Next.js (wird automatisch erkannt)
   - **Root Directory**: `./` (Standard)
   - **Build Command**: `npm run build` (Standard)
   - **Output Directory**: `.next` (Standard)
   - Klicken Sie auf "Deploy"

4. **Deployment abwarten**:
   - Der Build-Prozess dauert ca. 1-2 Minuten
   - Nach erfolgreichem Deployment erhalten Sie eine URL wie:
     `https://china-bike-repair-map.vercel.app`

5. **Fertig!** 🎉
   - Ihre Website ist jetzt live
   - Jeder Push zu GitHub triggert automatisch ein neues Deployment

### Methode 2: Über Vercel CLI

```bash
# Vercel CLI installieren
npm install -g vercel

# In Vercel einloggen
vercel login

# Projekt deployen
vercel

# Folgen Sie den Anweisungen im Terminal:
# - Set up and deploy? Yes
# - Which scope? (Ihr Account)
# - Link to existing project? No
# - What's your project's name? china-bike-repair-map
# - In which directory is your code located? ./
# - Want to override the settings? No

# Für Production-Deployment
vercel --prod
```

## 🔧 Schritt 4: Vercel-Einstellungen optimieren

### Custom Domain hinzufügen (Optional)

1. Gehen Sie zu Ihrem Projekt auf Vercel
2. Klicken Sie auf "Settings" → "Domains"
3. Fügen Sie Ihre Domain hinzu (z.B. `www.china-bike-repair.de`)
4. Folgen Sie den DNS-Anweisungen

### Environment Variables (Optional)

Falls Sie später APIs oder Datenbanken nutzen:

1. Gehen Sie zu "Settings" → "Environment Variables"
2. Fügen Sie Variablen hinzu (z.B. `NEXT_PUBLIC_API_URL`)
3. Klicken Sie auf "Save"
4. Redeploy das Projekt

## 📊 Schritt 5: GitHub Actions für automatische Tests (Optional)

Erstellen Sie `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Lint
      run: npm run lint
```

## 🔄 Workflow für Updates

### Lokale Änderungen zu GitHub pushen

```bash
# Änderungen vornehmen...

# Status prüfen
git status

# Dateien hinzufügen
git add .

# Commit erstellen
git commit -m "Beschreibung der Änderungen"

# Zu GitHub pushen
git push
```

### Automatisches Deployment

- Jeder Push zu `main` triggert automatisch ein Vercel-Deployment
- Sie erhalten eine E-Mail, wenn das Deployment erfolgreich war
- Die Website wird automatisch aktualisiert

## 📝 Nützliche Git-Befehle

```bash
# Aktuellen Status anzeigen
git status

# Änderungen anzeigen
git diff

# Commit-Historie anzeigen
git log --oneline

# Branch erstellen
git checkout -b feature/neue-funktion

# Branch wechseln
git checkout main

# Branches anzeigen
git branch -a

# Remote-URL anzeigen
git remote -v

# Letzte Änderungen rückgängig machen
git reset --hard HEAD~1

# Änderungen von GitHub holen
git pull
```

## 🛡️ Best Practices

### .gitignore erweitern

Stellen Sie sicher, dass `.gitignore` folgende Einträge enthält:

```
# dependencies
node_modules/

# next.js
.next/
out/

# environment variables
.env*.local
.env

# debug
npm-debug.log*

# IDE
.vscode/
.idea/
```

### Branch-Strategie

```bash
# Für neue Features
git checkout -b feature/neue-funktion
# ... Änderungen vornehmen ...
git push origin feature/neue-funktion
# Pull Request auf GitHub erstellen

# Für Bugfixes
git checkout -b fix/bug-beschreibung
# ... Änderungen vornehmen ...
git push origin fix/bug-beschreibung
```

### Commit-Messages

Gute Commit-Messages:
- ✅ "feat: Filterfunktion für Städte hinzugefügt"
- ✅ "fix: Kartenzentrierung korrigiert"
- ✅ "docs: README aktualisiert"
- ❌ "update"
- ❌ "fixes"

## 🔍 Monitoring und Analytics

### Vercel Analytics aktivieren

1. Gehen Sie zu Ihrem Projekt auf Vercel
2. Klicken Sie auf "Analytics"
3. Klicken Sie auf "Enable"
4. Kostenlos für bis zu 100.000 Requests/Monat

### Google Analytics hinzufügen (Optional)

1. Erstellen Sie eine Google Analytics Property
2. Fügen Sie den Tracking-Code in `app/layout.tsx` ein:

```tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## 🆘 Hilfe und Support

### Probleme beim Deployment?

1. **Build-Fehler**: Prüfen Sie die Logs auf Vercel
2. **404-Fehler**: Stellen Sie sicher, dass `app/page.tsx` existiert
3. **Styling-Probleme**: Prüfen Sie, ob Tailwind CSS korrekt konfiguriert ist

### Nützliche Links

- [Next.js Dokumentation](https://nextjs.org/docs)
- [Vercel Dokumentation](https://vercel.com/docs)
- [GitHub Dokumentation](https://docs.github.com)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

---

**Viel Erfolg! 🚀**



