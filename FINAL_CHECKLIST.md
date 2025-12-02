# ✅ Finale Checkliste vor dem Start

## 🎯 Vor dem ersten Start

### 1. Voraussetzungen prüfen

```bash
# Node.js Version prüfen (sollte 18+ sein)
node --version

# npm Version prüfen
npm --version

# Git Version prüfen
git --version
```

**Alle installiert?** ✅ Weiter zu Schritt 2!

### 2. Abhängigkeiten installieren

```bash
# Im Projektverzeichnis ausführen
npm install
```

**Erfolgreich?** ✅ Weiter zu Schritt 3!

### 3. Entwicklungsserver starten

```bash
npm run dev
```

**Server läuft?** ✅ Weiter zu Schritt 4!

### 4. Browser testen

Öffnen Sie [http://localhost:3000](http://localhost:3000)

**Checkliste:**
- [ ] Karte wird angezeigt
- [ ] Marker sind sichtbar
- [ ] Filter funktionieren
- [ ] Händler-Liste wird angezeigt
- [ ] Klick auf Marker funktioniert
- [ ] Klick auf Händler funktioniert

**Alles funktioniert?** ✅ Projekt ist einsatzbereit!

---

## 🎨 Vor der Anpassung

### 1. Eigene Händler-Daten

- [ ] `data/haendler.json` bearbeitet
- [ ] Koordinaten für alle Händler ermittelt
- [ ] Alle Pflichtfelder ausgefüllt
- [ ] JSON-Syntax korrekt

**Tipp**: Koordinaten auf [openstreetmap.org](https://www.openstreetmap.org) finden

### 2. Design anpassen

- [ ] Farben in `tailwind.config.ts` angepasst
- [ ] Titel in `app/layout.tsx` geändert
- [ ] Meta-Beschreibung aktualisiert
- [ ] Header-Text in `components/Header.tsx` angepasst
- [ ] Footer-Links in `components/Footer.tsx` aktualisiert

### 3. Kontaktdaten

- [ ] E-Mail-Adresse in Footer aktualisiert
- [ ] GitHub-Link aktualisiert
- [ ] Impressum hinzugefügt (falls nötig)
- [ ] Datenschutzerklärung hinzugefügt (falls nötig)

---

## 🌐 Vor dem Deployment

### 1. GitHub vorbereiten

- [ ] GitHub-Account erstellt
- [ ] Repository erstellt
- [ ] README.md angepasst
- [ ] GitHub-Username in Dokumentation ersetzt

### 2. Code hochladen

```bash
# Git initialisieren
git init

# Alle Dateien hinzufügen
git add .

# Commit erstellen
git commit -m "Initial commit: China Bike Repair Map"

# Remote hinzufügen (IHR-USERNAME ersetzen!)
git remote add origin https://github.com/IHR-USERNAME/china-bike-repair-map.git

# Branch umbenennen
git branch -M main

# Pushen
git push -u origin main
```

- [ ] Code erfolgreich auf GitHub
- [ ] Repository ist öffentlich (oder privat, je nach Wunsch)

### 3. Vercel vorbereiten

- [ ] Vercel-Account erstellt (mit GitHub verbunden)
- [ ] Repository importiert
- [ ] Build-Einstellungen geprüft
- [ ] Deployment gestartet

### 4. Nach dem Deployment

- [ ] Website ist erreichbar
- [ ] Alle Funktionen funktionieren
- [ ] Karte lädt korrekt
- [ ] Keine Fehler in der Browser-Konsole
- [ ] Mobile-Ansicht getestet

---

## 📝 Vor dem Go-Live

### 1. Inhalte prüfen

- [ ] Alle Händler-Daten korrekt
- [ ] Kontaktdaten aktuell
- [ ] Öffnungszeiten korrekt
- [ ] Beschreibungen aussagekräftig
- [ ] Keine Tippfehler

### 2. Rechtliches

- [ ] Impressum vorhanden (falls in Deutschland/EU)
- [ ] Datenschutzerklärung vorhanden
- [ ] DSGVO-konform (falls EU)
- [ ] Einwilligung der Händler eingeholt

### 3. SEO & Marketing

- [ ] Meta-Tags optimiert
- [ ] Favicon hinzugefügt
- [ ] Sitemap generiert (automatisch durch Next.js)
- [ ] robots.txt vorhanden (automatisch durch Next.js)
- [ ] Google Search Console eingerichtet (optional)

### 4. Analytics (optional)

- [ ] Google Analytics eingerichtet
- [ ] Vercel Analytics aktiviert
- [ ] Cookie-Banner hinzugefügt (falls nötig)

---

## 🧪 Testing-Checkliste

### Desktop-Browser

- [ ] Chrome (neueste Version)
- [ ] Firefox (neueste Version)
- [ ] Safari (neueste Version)
- [ ] Edge (neueste Version)

### Mobile-Browser

- [ ] Chrome Mobile
- [ ] Safari Mobile
- [ ] Firefox Mobile

### Bildschirmgrößen

- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

### Funktionen

- [ ] Karte lädt
- [ ] Marker werden angezeigt
- [ ] Popup öffnet sich
- [ ] Filter funktionieren
- [ ] Suche funktioniert
- [ ] Reset-Button funktioniert
- [ ] Händler-Auswahl funktioniert
- [ ] Links funktionieren (Tel, E-Mail, Website)

---

## 🚀 Launch-Checkliste

### Pre-Launch (1 Tag vorher)

- [ ] Alle Tests durchgeführt
- [ ] Alle Daten geprüft
- [ ] Backup erstellt
- [ ] Domain konfiguriert (falls Custom Domain)
- [ ] SSL-Zertifikat aktiv

### Launch-Tag

- [ ] Letzte Daten-Aktualisierung
- [ ] Finale Tests
- [ ] Deployment auf Production
- [ ] Website erreichbar
- [ ] Alle Funktionen testen

### Post-Launch (1 Woche nach)

- [ ] Feedback sammeln
- [ ] Fehler beheben
- [ ] Performance überwachen
- [ ] Analytics prüfen
- [ ] Community-Reaktionen beobachten

---

## 📊 Monitoring-Checkliste

### Täglich

- [ ] Website erreichbar?
- [ ] Keine Fehler in Logs?
- [ ] Performance OK?

### Wöchentlich

- [ ] Neue Händler hinzufügen
- [ ] Daten aktualisieren
- [ ] Feedback bearbeiten

### Monatlich

- [ ] Dependencies aktualisieren
- [ ] Security-Updates
- [ ] Performance-Optimierung
- [ ] Neue Features planen

---

## 🆘 Notfall-Checkliste

### Website ist down

1. [ ] Vercel-Status prüfen
2. [ ] Logs prüfen
3. [ ] Letztes Deployment rückgängig machen
4. [ ] Support kontaktieren

### Build schlägt fehl

1. [ ] Fehler-Logs lesen
2. [ ] Lokal testen (`npm run build`)
3. [ ] Dependencies prüfen
4. [ ] Letzten funktionierenden Commit wiederherstellen

### Daten-Fehler

1. [ ] JSON-Syntax prüfen
2. [ ] Backup wiederherstellen
3. [ ] Daten validieren
4. [ ] Neu deployen

---

## ✅ Finale Bestätigung

Bevor Sie live gehen, bestätigen Sie:

- [ ] Ich habe alle Checklisten durchgearbeitet
- [ ] Alle Tests sind erfolgreich
- [ ] Alle Daten sind korrekt
- [ ] Rechtliche Anforderungen erfüllt
- [ ] Backup erstellt
- [ ] Notfall-Plan vorhanden

**Alles erledigt?** 🎉

## 🚀 Bereit für den Launch!

---

**Viel Erfolg! 🚴‍♂️**


