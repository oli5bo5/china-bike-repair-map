# 🔐 Supabase Setup-Anleitung

Diese Anleitung zeigt Ihnen, wie Sie Supabase für Authentication und Datenbank einrichten.

## 📋 Schritt 1: Supabase-Projekt erstellen

1. Gehen Sie zu [supabase.com](https://supabase.com)
2. Klicken Sie auf "Start your project"
3. Melden Sie sich mit GitHub an (empfohlen)
4. Klicken Sie auf "New Project"
5. Wählen Sie eine Organization
6. Füllen Sie die Projekt-Details aus:
   - **Name**: china-bike-repair-map
   - **Database Password**: (sicheres Passwort generieren und speichern!)
   - **Region**: Frankfurt (eu-central-1) für Deutschland
   - **Pricing Plan**: Free (ausreichend für Start)
7. Klicken Sie auf "Create new project"
8. Warten Sie ca. 2 Minuten bis das Projekt bereit ist

## 🔑 Schritt 2: API-Keys kopieren

1. Gehen Sie in Ihrem Supabase-Dashboard zu **Settings** → **API**
2. Kopieren Sie folgende Werte:
   - **Project URL** (z.B. `https://abcdefghijklm.supabase.co`)
   - **anon public** Key (lange Zeichenkette)

3. Erstellen Sie eine `.env.local` Datei im Projektroot:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**⚠️ WICHTIG**: Fügen Sie `.env.local` zur `.gitignore` hinzu (bereits done)!

## 🗄️ Schritt 3: Datenbank-Schema erstellen

1. Gehen Sie zu **SQL Editor** im Supabase-Dashboard
2. Klicken Sie auf "New query"
3. Fügen Sie folgendes SQL ein:

```sql
-- Händler Tabelle erstellen
CREATE TABLE haendler (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  adresse TEXT NOT NULL,
  stadt TEXT NOT NULL,
  plz TEXT NOT NULL,
  telefon TEXT NOT NULL,
  email TEXT NOT NULL,
  website TEXT,
  marken TEXT[] NOT NULL,
  dienstleistungen TEXT[] NOT NULL,
  oeffnungszeiten TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  beschreibung TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index für schnellere Abfragen
CREATE INDEX idx_haendler_user_id ON haendler(user_id);
CREATE INDEX idx_haendler_status ON haendler(status);
CREATE INDEX idx_haendler_stadt ON haendler(stadt);

-- Row Level Security (RLS) aktivieren
ALTER TABLE haendler ENABLE ROW LEVEL SECURITY;

-- Policy: Jeder kann genehmigte Händler sehen
CREATE POLICY "Approved handlers are viewable by everyone" 
ON haendler FOR SELECT 
USING (status = 'approved');

-- Policy: User können nur ihre eigenen Händler sehen/bearbeiten
CREATE POLICY "Users can view own handlers" 
ON haendler FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own handlers" 
ON haendler FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own handlers" 
ON haendler FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own handlers" 
ON haendler FOR DELETE 
USING (auth.uid() = user_id);

-- Funktion für automatisches Update von updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_haendler_updated_at 
BEFORE UPDATE ON haendler 
FOR EACH ROW 
EXECUTE PROCEDURE update_updated_at_column();
```

4. Klicken Sie auf "Run" (oder F5)
5. Prüfen Sie, ob "Success" angezeigt wird

## 📧 Schritt 4: Email-Authentication konfigurieren

1. Gehen Sie zu **Authentication** → **Providers**
2. **Email** sollte bereits aktiviert sein
3. Konfigurieren Sie Email-Templates (optional):
   - Gehen Sie zu **Authentication** → **Email Templates**
   - Passen Sie die Templates nach Bedarf an

## 🚀 Schritt 5: Testdaten einfügen (Optional)

Um Ihre bestehenden Händler in die Datenbank zu importieren:

1. Gehen Sie zu **SQL Editor**
2. Führen Sie folgendes SQL aus (ersetzen Sie `user_id` mit einer echten User-ID):

```sql
-- Beispiel-Händler einfügen (Status 'approved' für sofortige Sichtbarkeit)
INSERT INTO haendler (
  user_id, name, adresse, stadt, plz, telefon, email, website,
  marken, dienstleistungen, oeffnungszeiten, lat, lng, beschreibung, status
) VALUES (
  'IHRE-USER-ID-HIER',
  'Fahrradwerkstatt Müller',
  'Musterstraße 1',
  'Berlin',
  '12345',
  '030-12345678',
  'info@mueller.de',
  'https://www.mueller.de',
  ARRAY['Trinx', 'Merida', 'Bafang'],
  ARRAY['Allgemeine Reparatur', 'E-Bike-Service'],
  'Mo-Fr: 9-18 Uhr',
  52.52,
  13.405,
  'Spezialisiert auf chinesische E-Bikes',
  'approved'
);
```

## ✅ Schritt 6: Integration testen

1. Starten Sie Ihren Dev-Server:
```bash
npm run dev
```

2. Gehen Sie zu http://localhost:3000/auth/register
3. Registrieren Sie einen Test-Account
4. Bestätigen Sie die Email (Check Postfach)
5. Loggen Sie sich ein unter /auth/login
6. Sie sollten zum Dashboard weitergeleitet werden

## 🔒 Schritt 7: Vercel Environment Variables

Wenn Sie auf Vercel deployen:

1. Gehen Sie zu Ihrem Projekt auf vercel.com
2. Klicken Sie auf **Settings** → **Environment Variables**
3. Fügen Sie hinzu:
   - `NEXT_PUBLIC_SUPABASE_URL` = Ihre Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Ihr Anon Key
4. Klicken Sie auf **Save**
5. Redeploy Ihr Projekt

## 📊 Schritt 8: Daten aus JSON migrieren

Um Ihre bestehenden Händler aus `data/haendler.json` zu migrieren:

```javascript
// Migration-Script (später ausführen)
import { supabase } from './lib/supabase';
import haendlerData from './data/haendler.json';

async function migrateData() {
  for (const haendler of haendlerData) {
    const { error } = await supabase
      .from('haendler')
      .insert({
        ...haendler,
        user_id: 'ADMIN-USER-ID', // Ersetzen mit Admin-User
        status: 'approved',
      });
    
    if (error) console.error('Error:', error);
    else console.log('Migrated:', haendler.name);
  }
}
```

## 🎯 Features nach Setup

Nach erfolgreichem Setup funktionieren:

✅ User-Registrierung  
✅ Login/Logout  
✅ Händler hinzufügen (muss von Admin genehmigt werden)  
✅ Eigene Händler bearbeiten/löschen  
✅ Status-Tracking (pending/approved/rejected)  
✅ Sichere Datenbank mit Row Level Security  

## 🆘 Troubleshooting

### Problem: "Invalid API key"
**Lösung**: Prüfen Sie, ob `.env.local` korrekt ist und Server neu starten

### Problem: "Row Level Security" Fehler
**Lösung**: Stellen Sie sicher, dass die RLS-Policies korrekt erstellt wurden

### Problem: Email-Bestätigung nicht erhalten
**Lösung**: 
- Prüfen Sie Spam-Ordner
- Gehen Sie zu **Authentication** → **Email Templates** und testen Sie

### Problem: "User not authenticated"
**Lösung**: Cookies müssen aktiviert sein, prüfen Sie Browser-Einstellungen

## 📚 Weitere Ressourcen

- [Supabase Dokumentation](https://supabase.com/docs)
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Next.js with Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

---

**Viel Erfolg mit Ihrem Login-System! 🚀**


