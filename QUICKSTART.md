# 🚀 Schnellstart-Anleitung

Diese Anleitung hilft Ihnen, das Projekt in wenigen Minuten zum Laufen zu bringen.

## ⚡ In 3 Schritten zur laufenden Website

### Schritt 1: Projekt installieren

```bash
# Terminal öffnen und ins Projektverzeichnis wechseln
cd china-bike-repair-map

# Abhängigkeiten installieren
npm install
```

### Schritt 2: Entwicklungsserver starten

```bash
npm run dev
```

### Schritt 3: Browser öffnen

Öffnen Sie [http://localhost:3000](http://localhost:3000)

**Fertig!** 🎉 Die Website läuft jetzt lokal.

## 📤 Projekt auf GitHub hochladen

### 1. GitHub Repository erstellen

1. Gehen Sie zu [github.com/new](https://github.com/new)
2. Repository Name: `china-bike-repair-map`
3. Klicken Sie auf "Create repository"

### 2. Code hochladen

```bash
# Im Projektverzeichnis ausführen
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/IHR-USERNAME/china-bike-repair-map.git
git branch -M main
git push -u origin main
```

**Ersetzen Sie `IHR-USERNAME`** mit Ihrem GitHub-Benutzernamen!

## 🌐 Website online stellen (Vercel)

### 1. Vercel Account erstellen

Gehen Sie zu [vercel.com](https://vercel.com) und melden Sie sich mit GitHub an.

### 2. Projekt deployen

1. Klicken Sie auf "Add New..." → "Project"
2. Wählen Sie Ihr Repository `china-bike-repair-map`
3. Klicken Sie auf "Deploy"
4. Warten Sie 1-2 Minuten

**Fertig!** Ihre Website ist jetzt unter `https://china-bike-repair-map.vercel.app` erreichbar.

## 🎨 Erste Anpassungen

### Händler hinzufügen

Bearbeiten Sie `data/haendler.json` und fügen Sie einen neuen Eintrag hinzu:

```json
{
  "id": 9,
  "name": "Ihr Händler",
  "adresse": "Straße 1, 12345 Stadt",
  "stadt": "Stadt",
  "plz": "12345",
  "telefon": "0123-456789",
  "email": "info@beispiel.de",
  "website": "https://www.beispiel.de",
  "marken": ["Trinx", "Merida"],
  "dienstleistungen": ["Allgemeine Reparatur"],
  "oeffnungszeiten": "Mo-Fr: 9-18 Uhr",
  "lat": 51.1657,
  "lng": 10.4515,
  "beschreibung": "Beschreibung"
}
```

**Koordinaten finden:**
1. Gehen Sie zu [openstreetmap.org](https://www.openstreetmap.org)
2. Suchen Sie die Adresse
3. Rechtsklick → "Adresse anzeigen"
4. Kopieren Sie lat und lng

### Farben ändern

Bearbeiten Sie `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    500: '#0ea5e9', // Ihre Farbe hier
    600: '#0284c7',
  },
}
```

### Titel ändern

Bearbeiten Sie `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Ihr Titel hier',
  description: 'Ihre Beschreibung hier',
};
```

## 📁 Wichtige Dateien

```
china-bike-repair-map/
├── data/
│   └── haendler.json          ← Händler-Daten hier
├── components/
│   ├── Map.tsx                ← Karte
│   ├── Filter.tsx             ← Filter
│   └── HaendlerList.tsx       ← Liste
├── app/
│   ├── page.tsx               ← Hauptseite
│   ├── layout.tsx             ← Layout & Meta-Tags
│   └── globals.css            ← Globale Styles
└── tailwind.config.ts         ← Farben & Design
```

## 🔄 Änderungen veröffentlichen

Nach jeder Änderung:

```bash
# Änderungen speichern
git add .
git commit -m "Beschreibung der Änderung"
git push

# Vercel deployed automatisch!
```

## 🆘 Häufige Probleme

### "npm install" schlägt fehl

```bash
# Node.js Version prüfen (sollte 18+ sein)
node --version

# Node.js neu installieren von nodejs.org
```

### Port 3000 ist bereits belegt

```bash
# Anderen Port verwenden
npm run dev -- -p 3001
```

### Karte wird nicht angezeigt

1. Browser-Cache leeren (Strg + Shift + R)
2. Browser-Konsole öffnen (F12) und Fehler prüfen
3. Leaflet CSS wird geladen? Prüfen Sie `components/Map.tsx`

### Git-Fehler beim Push

```bash
# Authentifizierung fehlgeschlagen?
# Verwenden Sie ein Personal Access Token
# Erstellen unter: https://github.com/settings/tokens
```

## 📚 Weitere Dokumentation

- **Ausführliche Anleitung**: Siehe [README.md](README.md)
- **GitHub Setup**: Siehe [GITHUB_SETUP.md](GITHUB_SETUP.md)
- **Beitragen**: Siehe [CONTRIBUTING.md](CONTRIBUTING.md)

## 💡 Tipps

### Entwicklung

- Änderungen werden automatisch im Browser aktualisiert (Hot Reload)
- Browser-Konsole (F12) zeigt Fehler an
- VS Code Extensions empfohlen:
  - ESLint
  - Tailwind CSS IntelliSense
  - Prettier

### Performance

- Bilder optimieren mit Next.js Image-Komponente
- Lazy Loading für große Listen
- Marker-Clustering bei vielen Händlern

### SEO

- Meta-Tags in `app/layout.tsx` anpassen
- Sitemap automatisch generiert
- robots.txt wird automatisch erstellt

## 🎯 Nächste Schritte

1. ✅ Projekt lokal zum Laufen bringen
2. ✅ Auf GitHub hochladen
3. ✅ Auf Vercel deployen
4. 📝 Eigene Händler-Daten hinzufügen
5. 🎨 Design anpassen
6. 📢 Website teilen!

## 📞 Hilfe benötigt?

- **GitHub Issues**: [Issues erstellen](https://github.com/IHR-USERNAME/china-bike-repair-map/issues)
- **E-Mail**: info@example.com

---

**Viel Erfolg! 🚴‍♂️**

