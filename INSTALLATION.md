# 💻 Installations-Anleitung

## 📋 Voraussetzungen

Bevor Sie beginnen, stellen Sie sicher, dass folgende Software installiert ist:

### Node.js & npm

**Windows:**
1. Besuchen Sie [nodejs.org](https://nodejs.org/)
2. Laden Sie die LTS-Version herunter (empfohlen: 18.x oder höher)
3. Führen Sie den Installer aus
4. Überprüfen Sie die Installation:
   ```bash
   node --version
   npm --version
   ```

**macOS:**
```bash
# Mit Homebrew
brew install node

# Oder von nodejs.org herunterladen
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# Fedora
sudo dnf install nodejs npm
```

### Git

**Windows:**
1. Besuchen Sie [git-scm.com](https://git-scm.com/)
2. Laden Sie Git herunter und installieren Sie es
3. Überprüfen Sie: `git --version`

**macOS:**
```bash
brew install git
```

**Linux:**
```bash
sudo apt install git  # Ubuntu/Debian
sudo dnf install git  # Fedora
```

## 🚀 Projekt installieren

### Option 1: Von GitHub klonen (empfohlen)

```bash
# Repository klonen
git clone https://github.com/IHR-USERNAME/china-bike-repair-map.git

# In das Verzeichnis wechseln
cd china-bike-repair-map

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

### Option 2: ZIP-Datei herunterladen

1. Laden Sie das Projekt als ZIP herunter
2. Entpacken Sie die Datei
3. Öffnen Sie ein Terminal im Projektordner
4. Führen Sie aus:
   ```bash
   npm install
   npm run dev
   ```

## 🔧 Installation Schritt für Schritt

### 1. Abhängigkeiten installieren

```bash
npm install
```

Dies installiert alle benötigten Pakete:
- Next.js (Framework)
- React (UI-Bibliothek)
- Leaflet (Karten)
- Zustand (State Management)
- Tailwind CSS (Styling)
- TypeScript (Type-Safety)
- und weitere...

**Dauer**: Ca. 1-2 Minuten (abhängig von Ihrer Internetverbindung)

### 2. Entwicklungsserver starten

```bash
npm run dev
```

Der Server startet auf [http://localhost:3000](http://localhost:3000)

**Ausgabe sollte sein:**
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- event compiled client and server successfully
```

### 3. Browser öffnen

Öffnen Sie Ihren Browser und navigieren Sie zu:
```
http://localhost:3000
```

**Sie sollten sehen:**
- Karte mit Händler-Markern
- Filter-Sidebar links
- Händler-Liste rechts

## 🛠️ Verfügbare Scripts

### Development

```bash
# Entwicklungsserver starten (mit Hot Reload)
npm run dev

# Auf anderem Port starten
npm run dev -- -p 3001
```

### Production

```bash
# Production Build erstellen
npm run build

# Production Server starten
npm start
```

### Code-Qualität

```bash
# Linting (Code-Überprüfung)
npm run lint

# Linting mit Auto-Fix
npm run lint -- --fix
```

## 🐛 Fehlerbehebung

### Problem: "npm install" schlägt fehl

**Lösung 1: Cache leeren**
```bash
npm cache clean --force
npm install
```

**Lösung 2: Node-Version prüfen**
```bash
node --version
# Sollte 18.x oder höher sein
```

**Lösung 3: node_modules löschen**
```bash
# Windows
rmdir /s /q node_modules
npm install

# macOS/Linux
rm -rf node_modules
npm install
```

### Problem: Port 3000 ist bereits belegt

**Lösung: Anderen Port verwenden**
```bash
npm run dev -- -p 3001
```

Oder den Prozess auf Port 3000 beenden:

**Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
```

### Problem: "Module not found" Fehler

**Lösung: Abhängigkeiten neu installieren**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problem: Karte wird nicht angezeigt

**Lösung 1: Browser-Cache leeren**
- Drücken Sie `Ctrl + Shift + R` (Windows/Linux)
- Drücken Sie `Cmd + Shift + R` (macOS)

**Lösung 2: Browser-Konsole prüfen**
- Öffnen Sie die Entwicklertools (F12)
- Prüfen Sie die Konsole auf Fehler
- Prüfen Sie die Netzwerk-Anfragen

**Lösung 3: Leaflet CSS prüfen**
- Stellen Sie sicher, dass `leaflet/dist/leaflet.css` importiert wird
- Prüfen Sie `components/Map.tsx`

### Problem: TypeScript-Fehler

**Lösung: TypeScript neu kompilieren**
```bash
# Löschen Sie .next Ordner
rm -rf .next

# Neu starten
npm run dev
```

### Problem: Styling funktioniert nicht

**Lösung: Tailwind CSS neu kompilieren**
```bash
# .next Ordner löschen
rm -rf .next

# Neu starten
npm run dev
```

## 🔍 Installation überprüfen

### Checkliste

- [ ] Node.js installiert (18+)
- [ ] npm installiert
- [ ] Git installiert
- [ ] Projekt geklont/heruntergeladen
- [ ] `npm install` erfolgreich
- [ ] `npm run dev` startet ohne Fehler
- [ ] Browser zeigt Website auf localhost:3000
- [ ] Karte wird angezeigt
- [ ] Filter funktionieren
- [ ] Händler-Liste wird angezeigt

### Test-Befehle

```bash
# Node.js Version
node --version
# Sollte: v18.x.x oder höher

# npm Version
npm --version
# Sollte: 9.x.x oder höher

# Git Version
git --version
# Sollte: 2.x.x oder höher

# Projekt-Abhängigkeiten prüfen
npm list --depth=0
# Sollte alle Pakete ohne Fehler zeigen
```

## 📦 Optionale Tools

### VS Code Extensions

Empfohlene Extensions für bessere Entwicklungserfahrung:

1. **ESLint** - Code-Linting
2. **Prettier** - Code-Formatierung
3. **Tailwind CSS IntelliSense** - Tailwind-Autovervollständigung
4. **TypeScript Vue Plugin (Volar)** - TypeScript-Support
5. **GitLens** - Git-Integration

Installation:
1. Öffnen Sie VS Code
2. Gehen Sie zu Extensions (Ctrl+Shift+X)
3. Suchen Sie nach den Extensions
4. Klicken Sie auf "Install"

### Prettier konfigurieren

Erstellen Sie `.prettierrc`:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

## 🌐 Browser-Kompatibilität

### Unterstützte Browser

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

### Nicht unterstützt

- ❌ Internet Explorer (alle Versionen)
- ❌ Sehr alte Browser-Versionen

## 💾 Disk Space

### Benötigter Speicherplatz

- **Projekt-Dateien**: ~50 MB
- **node_modules**: ~300-400 MB
- **Build-Ordner (.next)**: ~100-150 MB
- **Gesamt**: ~500-600 MB

## 🔄 Updates

### Projekt aktualisieren

```bash
# Git-Updates holen
git pull origin main

# Abhängigkeiten aktualisieren
npm install

# Entwicklungsserver neu starten
npm run dev
```

### Abhängigkeiten aktualisieren

```bash
# Veraltete Pakete anzeigen
npm outdated

# Alle Pakete aktualisieren (Vorsicht!)
npm update

# Einzelnes Paket aktualisieren
npm update next
```

## 📞 Hilfe benötigt?

### Dokumentation

- [README.md](README.md) - Haupt-Dokumentation
- [QUICKSTART.md](QUICKSTART.md) - Schnellstart
- [GITHUB_SETUP.md](GITHUB_SETUP.md) - GitHub & Deployment

### Support

- **GitHub Issues**: [Issues erstellen](https://github.com/IHR-USERNAME/china-bike-repair-map/issues)
- **E-Mail**: info@example.com

### Nützliche Links

- [Next.js Dokumentation](https://nextjs.org/docs)
- [React Dokumentation](https://react.dev)
- [Tailwind CSS Dokumentation](https://tailwindcss.com/docs)
- [Leaflet Dokumentation](https://leafletjs.com/reference.html)

---

**Viel Erfolg bei der Installation! 🚀**


