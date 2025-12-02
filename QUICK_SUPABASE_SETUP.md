# ⚡ Schnelles Supabase-Setup (10 Minuten)

## 🎯 Was Sie brauchen
- [ ] Einen Browser
- [ ] Eine Email-Adresse
- [ ] 10 Minuten Zeit

---

## 📝 SCHRITT 1: Supabase-Konto erstellen (2 Minuten)

### 1.1 Website öffnen
Öffnen Sie in einem neuen Tab: **https://supabase.com**

### 1.2 Registrieren
1. Klicken Sie auf **"Start your project"** (grüner Button)
2. Wählen Sie **"Continue with GitHub"** (empfohlen)
   - ODER: Email + Passwort
3. Autorisieren Sie Supabase wenn gefragt

✅ **Checkpoint**: Sie sind jetzt im Supabase-Dashboard

---

## 🏗️ SCHRITT 2: Neues Projekt erstellen (3 Minuten)

### 2.1 Projekt anlegen
1. Klicken Sie auf **"New Project"** (grüner Button oben rechts)

### 2.2 Details eingeben

**Organization:** 
- Wählen Sie Ihre persönliche Organization (oder erstellen Sie eine neue)

**Project Name:**
```
china-bike-repair-map
```

**Database Password:**
- Klicken Sie auf **"Generate a password"**
- ⚠️ **WICHTIG**: Kopieren Sie das Passwort und speichern Sie es sicher!
  (Sie werden es später brauchen)

**Region:**
```
Frankfurt (eu-central-1)
```
(Am nächsten zu Deutschland)

**Pricing Plan:**
```
Free (ausreichend für Start - 500 MB Datenbank, 50 MB Dateien)
```

### 2.3 Projekt erstellen
1. Klicken Sie auf **"Create new project"** (grüner Button unten)
2. ⏳ Warten Sie ca. 2 Minuten (Sie sehen einen Fortschrittsbalken)

✅ **Checkpoint**: "Project created successfully" wird angezeigt

---

## 🔑 SCHRITT 3: API-Keys kopieren (1 Minute)

### 3.1 Zu API-Einstellungen gehen
1. In Ihrem Projekt-Dashboard, links in der Sidebar:
2. Klicken Sie auf ⚙️ **"Settings"** (ganz unten)
3. Dann auf **"API"**

### 3.2 Keys kopieren

Sie sehen zwei wichtige Werte:

**📍 Project URL:**
```
https://abcdefghijklm.supabase.co
```
(Ihre URL wird anders sein - kopieren Sie IHRE!)

**🔑 anon public Key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
(Ein langer String - kopieren Sie den KOMPLETTEN Key!)

### 3.3 Keys speichern

**Option A: Direkt in Projekt einfügen (empfohlen)**

Erstellen Sie eine neue Datei im Projektroot:

**Dateiname:** `.env.local`

**Inhalt:**
```env
NEXT_PUBLIC_SUPABASE_URL=IHRE-URL-HIER
NEXT_PUBLIC_SUPABASE_ANON_KEY=IHR-KEY-HIER
```

**Ersetzen Sie** die Werte mit Ihren echten Credentials!

**Beispiel:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmciLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMzg1MTIwMCwiZXhwIjoxOTM5NDI3MjAwfQ.abc123...
```

**Option B: In Notizblock speichern**
- Speichern Sie beide Werte in einem Textdokument
- Sie brauchen sie später für Vercel

✅ **Checkpoint**: `.env.local` Datei existiert mit Ihren Credentials

---

## 🗄️ SCHRITT 4: Datenbank-Schema erstellen (2 Minuten)

### 4.1 SQL Editor öffnen
1. In der linken Sidebar, klicken Sie auf 🔨 **"SQL Editor"**
2. Klicken Sie auf **"New query"**

### 4.2 SQL-Code einfügen

Kopieren Sie KOMPLETT folgenden SQL-Code:

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

-- Indizes für Performance
CREATE INDEX idx_haendler_user_id ON haendler(user_id);
CREATE INDEX idx_haendler_status ON haendler(status);
CREATE INDEX idx_haendler_stadt ON haendler(stadt);

-- Row Level Security aktivieren
ALTER TABLE haendler ENABLE ROW LEVEL SECURITY;

-- Policies: Wer darf was sehen/machen
CREATE POLICY "Public can view approved handlers" 
ON haendler FOR SELECT 
USING (status = 'approved');

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

-- Auto-Update für updated_at
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

### 4.3 SQL ausführen
1. Fügen Sie den kompletten Code in das SQL-Editor-Feld ein
2. Klicken Sie auf **"Run"** (oder drücken Sie F5)
3. ⏳ Warten Sie 2-3 Sekunden

### 4.4 Erfolg prüfen
Sie sollten sehen:
```
✅ Success. No rows returned
```

✅ **Checkpoint**: Datenbank-Tabelle ist erstellt!

---

## 🔐 SCHRITT 5: Vercel Environment Variables setzen (2 Minuten)

### 5.1 Zu Vercel gehen
1. Öffnen Sie [vercel.com/dashboard](https://vercel.com/dashboard)
2. Klicken Sie auf Ihr Projekt **"china-bike-repair-map"**

### 5.2 Environment Variables hinzufügen
1. Klicken Sie auf **"Settings"** (Tab oben)
2. Klicken Sie links auf **"Environment Variables"**

### 5.3 Erste Variable hinzufügen
**Variable 1:**
```
Name:  NEXT_PUBLIC_SUPABASE_URL
Value: [Ihre Supabase URL]
```

Klicken Sie auf **"Add"**

**Variable 2:**
```
Name:  NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: [Ihr Supabase Anon Key]
```

Klicken Sie auf **"Add"**

### 5.4 Projekt neu deployen
1. Gehen Sie zurück zu **"Deployments"** (Tab oben)
2. Klicken Sie bei dem neuesten Deployment auf "..." (3 Punkte)
3. Klicken Sie auf **"Redeploy"**
4. Bestätigen Sie mit **"Redeploy"**
5. ⏳ Warten Sie ca. 1-2 Minuten

✅ **Checkpoint**: Neue Deployment ist "Ready" ✅

---

## 🧪 SCHRITT 6: Testen! (3 Minuten)

### 6.1 Lokal testen (empfohlen zuerst)

**Im Terminal:**
```bash
# Server neu starten (wichtig für .env.local)
npm run dev
```

**Im Browser:**
1. Öffnen Sie: http://localhost:3000/auth/register

2. **Registrieren Sie einen Test-Account:**
   - Firmenname: Test Werkstatt
   - Email: ihre-email@beispiel.de (echte Email!)
   - Passwort: test123456
   - Passwort bestätigen: test123456

3. Klicken Sie auf **"Registrieren"**

4. **Bestätigen Sie Ihre Email:**
   - Prüfen Sie Ihr Email-Postfach
   - Klicken Sie auf den Bestätigungslink von Supabase
   - ⚠️ Prüfen Sie auch Spam-Ordner!

5. **Loggen Sie sich ein:**
   - Gehen Sie zu: http://localhost:3000/auth/login
   - Email: ihre-email@beispiel.de
   - Passwort: test123456
   - Klicken Sie auf **"Anmelden"**

6. **Dashboard öffnet sich!** 🎉

### 6.2 Live-Version testen

Nach dem Vercel-Redeploy:

1. Öffnen Sie Ihre Live-URL: `https://china-bike-repair-map.vercel.app`
2. Gehen Sie zu `/auth/register`
3. Wiederholen Sie den Test von oben

---

## ✅ FERTIG! Sie haben es geschafft! 🎉

### Was funktioniert jetzt:

✅ User können sich registrieren  
✅ User können sich einloggen  
✅ User sehen ihr Dashboard  
✅ User können Werkstätten hinzufügen  
✅ Daten werden in Supabase gespeichert  
✅ Sichere Authentication  
✅ Row Level Security aktiv  

### Nächste Schritte:

1. **Testen Sie alle Funktionen:**
   - Werkstatt hinzufügen
   - Dashboard ansehen
   - Logout/Login

2. **Status auf "approved" setzen** (für Test):
   - Gehen Sie zu Supabase → Table Editor → haendler
   - Klicken Sie auf Ihre Werkstatt
   - Ändern Sie "status" von "pending" zu "approved"
   - Speichern Sie
   - Jetzt erscheint sie auf der öffentlichen Karte!

3. **Echte Händler hinzufügen:**
   - Registrieren Sie sich als Händler
   - Füllen Sie das Formular aus
   - Warten Sie auf Admin-Freigabe (oder setzen Sie Status manuell)

---

## 🆘 Probleme?

### "Invalid API key"
- Prüfen Sie `.env.local` auf Tippfehler
- Starten Sie den Dev-Server neu: `npm run dev`
- Prüfen Sie ob Variables auf Vercel richtig sind

### "Email not confirmed"
- Prüfen Sie Spam-Ordner
- Fordern Sie neue Bestätigung an
- Oder: In Supabase → Authentication → Users → Email bestätigen

### "Row Level Security" Fehler
- Prüfen Sie ob SQL korrekt ausgeführt wurde
- Gehen Sie zu Supabase → SQL Editor → Wiederholen Sie Schritt 4

### "User not found"
- Löschen Sie Browser-Cookies
- Registrieren Sie sich erneut

---

## 📞 Alles funktioniert?

**Gratulation! 🎉**

Sie haben jetzt eine voll funktionsfähige Händler-Plattform mit:
- ✅ Benutzer-Authentication
- ✅ Datenbank-Integration
- ✅ Händler-Management
- ✅ Admin-Genehmigung-System
- ✅ Sichere Daten

**Nächste Features:**
- Admin-Panel zum Genehmigen
- Email-Benachrichtigungen
- Profil-Bearbeitung
- Bilder-Upload

---

**Viel Erfolg mit Ihrer Plattform! 🚴‍♂️**

