# 🚴 China Bike Repair Map

Eine interaktive Karte zur Suche von Händlern und Werkstätten, die chinesische Fahrräder und E-Bikes reparieren.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9-green)

## 📋 Inhaltsverzeichnis

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Projekt-Struktur](#projekt-struktur)
- [Daten hinzufügen](#daten-hinzufügen)
- [Deployment](#deployment)
- [Technologie-Stack](#technologie-stack)
- [Anpassungen](#anpassungen)
- [Beitragen](#beitragen)
- [Lizenz](#lizenz)

## ✨ Features

- 🗺️ **Interaktive Karte** mit OpenStreetMap und Leaflet.js
- 🔍 **Erweiterte Filterung** nach Stadt, Marke und Dienstleistung
- 📱 **Responsive Design** für Desktop und Mobile
- 🎯 **Marker-Clustering** für bessere Übersicht
- 📍 **Detailansicht** mit allen Händler-Informationen
- 🔄 **Echtzeit-Filterung** ohne Neuladen der Seite
- 🎨 **Modernes UI** mit Tailwind CSS
- ⚡ **Schnelle Performance** mit Next.js 14

## 🎯 Demo

Besuchen Sie die Live-Demo: [china-bike-repair-map.vercel.app](https://china-bike-repair-map.vercel.app)

## 🚀 Installation

### Voraussetzungen

- Node.js 18+ und npm/yarn
- Git

### Schritt-für-Schritt Anleitung

1. **Repository klonen**

```bash
git clone https://github.com/IHR-USERNAME/china-bike-repair-map.git
cd china-bike-repair-map
```

2. **Abhängigkeiten installieren**

```bash
npm install
# oder
yarn install
```

3. **Entwicklungsserver starten**

```bash
npm run dev
# oder
yarn dev
```

4. **Browser öffnen**

Öffnen Sie [http://localhost:3000](http://localhost:3000) in Ihrem Browser.

## 📁 Projekt-Struktur

```
china-bike-repair-map/
├── app/
│   ├── layout.tsx          # Haupt-Layout
│   ├── page.tsx            # Startseite
│   └── globals.css         # Globale Styles
├── components/
│   ├── Map.tsx             # Leaflet-Karte
│   ├── Filter.tsx          # Filter-Komponente
│   ├── HaendlerList.tsx    # Händler-Liste
│   ├── Header.tsx          # Header
│   └── Footer.tsx          # Footer
├── data/
│   └── haendler.json       # Händler-Daten
├── lib/
│   ├── types.ts            # TypeScript-Typen
│   ├── store.ts            # Zustand State Management
│   └── utils.ts            # Hilfsfunktionen
├── public/                 # Statische Dateien
├── package.json            # Abhängigkeiten
├── tsconfig.json           # TypeScript-Konfiguration
├── tailwind.config.ts      # Tailwind-Konfiguration
└── README.md               # Diese Datei
```

## 📝 Daten hinzufügen

### Händler manuell hinzufügen

Bearbeiten Sie die Datei `data/haendler.json`:

```json
{
  "id": 9,
  "name": "Ihr Händler Name",
  "adresse": "Straße 123, 12345 Stadt",
  "stadt": "Stadt",
  "plz": "12345",
  "telefon": "0123-456789",
  "email": "info@beispiel.de",
  "website": "https://www.beispiel.de",
  "marken": ["Trinx", "Merida", "Bafang"],
  "dienstleistungen": ["Allgemeine Reparatur", "E-Bike-Service"],
  "oeffnungszeiten": "Mo-Fr: 9-18 Uhr",
  "lat": 51.1657,
  "lng": 10.4515,
  "beschreibung": "Kurze Beschreibung des Händlers"
}
```

### Koordinaten ermitteln

1. Besuchen Sie [OpenStreetMap](https://www.openstreetmap.org/)
2. Suchen Sie die Adresse
3. Rechtsklick auf den Standort → "Adresse anzeigen"
4. Kopieren Sie die Koordinaten (lat, lng)

### Daten über Google Forms sammeln

1. Erstellen Sie ein Google Formular mit den benötigten Feldern
2. Nutzen Sie Google Apps Script, um Antworten in die JSON-Datei zu exportieren
3. Automatisieren Sie den Prozess mit GitHub Actions

## 🌐 Deployment

### Vercel (Empfohlen)

1. **Vercel Account erstellen**: [vercel.com](https://vercel.com)

2. **Repository verbinden**:
   - "New Project" klicken
   - GitHub-Repository auswählen
   - "Deploy" klicken

3. **Fertig!** Ihre Website ist unter `https://ihr-projekt.vercel.app` erreichbar.

### Alternative: Netlify

```bash
npm run build
# Build-Ordner (.next) zu Netlify hochladen
```

### Alternative: GitHub Pages

```bash
npm run build
npm run export
# out-Ordner zu GitHub Pages deployen
```

## 🛠️ Technologie-Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (React Framework)
- **Sprache**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Karte**: [Leaflet.js](https://leafletjs.com/) + [React Leaflet](https://react-leaflet.js.org/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## 🎨 Anpassungen

### Farben ändern

Bearbeiten Sie `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    500: '#0ea5e9', // Ihre Hauptfarbe
    600: '#0284c7',
    // ...
  },
}
```

### Logo hinzufügen

1. Logo in `public/logo.png` speichern
2. In `components/Header.tsx` einbinden:

```tsx
<Image src="/logo.png" alt="Logo" width={40} height={40} />
```

### Weitere Filteroptionen

Erweitern Sie `lib/types.ts` und `components/Filter.tsx` mit zusätzlichen Feldern.

## 🤝 Beitragen

Beiträge sind willkommen! So können Sie helfen:

1. **Fork** das Repository
2. **Branch** erstellen: `git checkout -b feature/neue-funktion`
3. **Commit** Ihre Änderungen: `git commit -m 'Neue Funktion hinzugefügt'`
4. **Push** zum Branch: `git push origin feature/neue-funktion`
5. **Pull Request** erstellen

### Händler melden

Wenn Sie einen Händler kennen, der hier aufgelistet werden sollte:

1. Öffnen Sie ein [Issue](https://github.com/IHR-USERNAME/china-bike-repair-map/issues)
2. Nutzen Sie die Vorlage "Neuer Händler"
3. Geben Sie alle relevanten Informationen an

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe [LICENSE](LICENSE) für Details.

## 🙏 Danksagungen

- Inspiriert von [niedersachsen-beratungsmap.vercel.app](https://niedersachsen-beratungsmap.vercel.app)
- Kartendaten von [OpenStreetMap](https://www.openstreetmap.org/)
- Icons von [Lucide](https://lucide.dev/)

## 📞 Kontakt

Bei Fragen oder Anregungen:

- **Email**: info@example.com
- **GitHub Issues**: [Issues erstellen](https://github.com/IHR-USERNAME/china-bike-repair-map/issues)

## 🗺️ Roadmap

- [ ] Nutzerbewertungen für Händler
- [ ] Mehrsprachigkeit (Englisch, Chinesisch)
- [ ] Mobile App (React Native)
- [ ] Admin-Panel für Händler-Verwaltung
- [ ] API für externe Integrationen
- [ ] Erweiterte Suchfunktionen (Umkreissuche)
- [ ] Öffnungszeiten-Anzeige (aktuell geöffnet/geschlossen)

---

**Viel Erfolg mit Ihrem Projekt! 🚴‍♂️**


