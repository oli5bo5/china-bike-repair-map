# 🤝 Beitragen zu China Bike Repair Map

Vielen Dank für Ihr Interesse, zu diesem Projekt beizutragen! Hier finden Sie Richtlinien, wie Sie helfen können.

## 📋 Wie kann ich beitragen?

### 1. Händler melden

Wenn Sie einen Händler oder eine Werkstatt kennen, die hier aufgelistet werden sollte:

1. Öffnen Sie ein [Issue](https://github.com/IHR-USERNAME/china-bike-repair-map/issues/new)
2. Verwenden Sie den Titel: "Neuer Händler: [Name]"
3. Geben Sie folgende Informationen an:
   - Name der Werkstatt/des Händlers
   - Vollständige Adresse
   - Telefonnummer
   - E-Mail-Adresse
   - Website (falls vorhanden)
   - Reparierte Marken
   - Angebotene Dienstleistungen
   - Öffnungszeiten
   - Kurze Beschreibung

### 2. Fehler melden

Wenn Sie einen Fehler gefunden haben:

1. Prüfen Sie, ob der Fehler bereits gemeldet wurde
2. Öffnen Sie ein neues Issue mit:
   - Beschreibung des Problems
   - Schritte zur Reproduktion
   - Erwartetes Verhalten
   - Screenshots (falls hilfreich)
   - Browser und Betriebssystem

### 3. Feature-Vorschläge

Haben Sie eine Idee für eine neue Funktion?

1. Öffnen Sie ein Issue mit dem Label "enhancement"
2. Beschreiben Sie:
   - Was soll die Funktion tun?
   - Warum ist sie nützlich?
   - Wie könnte sie implementiert werden?

### 4. Code beitragen

#### Vorbereitung

1. **Fork** das Repository
2. **Clone** Ihren Fork:
   ```bash
   git clone https://github.com/IHR-USERNAME/china-bike-repair-map.git
   cd china-bike-repair-map
   ```
3. **Installieren** Sie die Abhängigkeiten:
   ```bash
   npm install
   ```
4. **Branch erstellen**:
   ```bash
   git checkout -b feature/ihre-funktion
   ```

#### Entwicklung

1. Nehmen Sie Ihre Änderungen vor
2. Testen Sie Ihre Änderungen lokal:
   ```bash
   npm run dev
   ```
3. Prüfen Sie auf Lint-Fehler:
   ```bash
   npm run lint
   ```
4. Erstellen Sie einen Build:
   ```bash
   npm run build
   ```

#### Pull Request erstellen

1. **Commit** Ihre Änderungen:
   ```bash
   git add .
   git commit -m "feat: Beschreibung Ihrer Änderung"
   ```
2. **Push** zu Ihrem Fork:
   ```bash
   git push origin feature/ihre-funktion
   ```
3. Öffnen Sie einen **Pull Request** auf GitHub
4. Beschreiben Sie Ihre Änderungen ausführlich

## 📝 Coding-Richtlinien

### TypeScript

- Verwenden Sie TypeScript für alle neuen Dateien
- Definieren Sie Typen explizit
- Vermeiden Sie `any` wo möglich

### Komponenten

- Verwenden Sie funktionale Komponenten mit Hooks
- Benennen Sie Komponenten in PascalCase
- Exportieren Sie Komponenten als default

```tsx
// ✅ Gut
export default function MyComponent() {
  return <div>...</div>;
}

// ❌ Schlecht
export const myComponent = () => {
  return <div>...</div>;
}
```

### Styling

- Verwenden Sie Tailwind CSS Utility-Klassen
- Vermeiden Sie inline-styles
- Nutzen Sie die `cn()` Utility-Funktion für bedingte Klassen

```tsx
// ✅ Gut
<div className={cn("base-class", isActive && "active-class")}>

// ❌ Schlecht
<div style={{ color: 'red' }}>
```

### Commit-Messages

Verwenden Sie das [Conventional Commits](https://www.conventionalcommits.org/) Format:

- `feat:` Neue Funktion
- `fix:` Fehlerbehebung
- `docs:` Dokumentation
- `style:` Formatierung
- `refactor:` Code-Refactoring
- `test:` Tests
- `chore:` Wartung

Beispiele:
```
feat: Umkreissuche hinzugefügt
fix: Kartenzentrierung bei Filterung korrigiert
docs: README mit Installation erweitert
```

## 🧪 Tests

Aktuell gibt es noch keine automatisierten Tests. Beiträge in diesem Bereich sind sehr willkommen!

Geplant:
- Unit-Tests mit Jest
- Component-Tests mit React Testing Library
- E2E-Tests mit Playwright

## 📚 Dokumentation

- Dokumentieren Sie komplexe Funktionen mit JSDoc
- Aktualisieren Sie die README bei größeren Änderungen
- Fügen Sie Kommentare für nicht-offensichtlichen Code hinzu

```tsx
/**
 * Filtert Händler basierend auf den aktuellen Filtereinstellungen
 * @returns Array von gefilterten Händlern
 */
export function getFilteredHaendler(): Haendler[] {
  // ...
}
```

## 🔍 Code Review

Alle Pull Requests werden überprüft. Bitte haben Sie Geduld, wenn die Überprüfung etwas dauert.

Was wir prüfen:
- Code-Qualität und Lesbarkeit
- Einhaltung der Coding-Richtlinien
- Funktionalität
- Performance
- Barrierefreiheit

## 🎯 Prioritäten

Besonders willkommen sind Beiträge in folgenden Bereichen:

1. **Daten**: Neue Händler hinzufügen
2. **Barrierefreiheit**: WCAG-Konformität verbessern
3. **Performance**: Ladezeiten optimieren
4. **Mobile**: Mobile Erfahrung verbessern
5. **Tests**: Test-Coverage erhöhen
6. **Internationalisierung**: Mehrsprachigkeit

## 📞 Fragen?

Bei Fragen können Sie:
- Ein Issue öffnen
- Eine E-Mail senden: info@example.com
- In den Discussions diskutieren

## 🙏 Danke!

Vielen Dank für Ihre Unterstützung! Jeder Beitrag, egal wie klein, hilft das Projekt zu verbessern.

---

**Happy Coding! 🚴‍♂️**


