# 🌐 Öffentliche Werkstatt-Einträge

## ✅ Was wurde hinzugefügt?

Eine öffentliche `/eintragen` Route, wo JEDER Werkstätten ohne Login eintragen kann!

### **Neue Route:**
```
https://ihre-domain.com/eintragen
```

### **Features:**
✅ Kein Login erforderlich  
✅ Vollständiges Formular mit allen Feldern  
✅ Marken-Auswahl (10 Optionen)  
✅ Dienstleistungs-Auswahl (12 Optionen)  
✅ Koordinaten-Eingabe mit Anleitung  
✅ Status: "pending" (wartet auf Admin-Freigabe)  
✅ Success-Screen mit Auto-Redirect  
✅ Professionelles Design  

---

## 🔧 Supabase-Anpassung erforderlich!

Da öffentliche Einträge **keinen User** haben, müssen Sie die Datenbank anpassen:

### SQL ausführen (in Supabase → SQL Editor):

```sql
-- 1. user_id als NULLABLE machen (erlaubt NULL-Werte)
ALTER TABLE haendler 
ALTER COLUMN user_id DROP NOT NULL;

-- 2. Policy für öffentliche Einträge hinzufügen
CREATE POLICY "Anyone can insert public entries" 
ON haendler FOR INSERT 
WITH CHECK (user_id IS NULL);

-- 3. Policy für öffentliche Einträge anzeigen (für Admins)
CREATE POLICY "Public entries viewable by all" 
ON haendler FOR SELECT 
USING (user_id IS NULL OR status = 'approved');
```

**⚠️ WICHTIG:** Führen Sie diese SQL-Befehle aus, bevor Sie die `/eintragen` Route nutzen!

---

## 🎯 Flow: Öffentlicher Eintrag

```
1. Besucher geht zu /eintragen
   ↓
2. Füllt Formular aus (ohne Login!)
   ↓
3. Klickt "Werkstatt eintragen"
   ↓
4. Eintrag wird gespeichert (user_id = NULL, status = 'pending')
   ↓
5. Success-Screen: "Wartet auf Freigabe"
   ↓
6. Admin genehmigt später
   ↓
7. Status: 'approved' → Erscheint auf Karte
```

---

## 🔐 Sicherheit

### **Spam-Schutz:**

Alle öffentlichen Einträge haben:
- ✅ Status: "pending" (nicht sofort sichtbar)
- ✅ Admin-Genehmigung erforderlich
- ✅ Email-Validation im Formular
- ✅ Pflichtfelder für Qualität

### **Unterscheidung:**

| Merkmal | Öffentlicher Eintrag | Auth-Eintrag |
|---------|---------------------|--------------|
| Login nötig? | ❌ Nein | ✅ Ja |
| user_id | NULL | User-ID |
| Bearbeiten? | ❌ Nein | ✅ Ja |
| Dashboard? | ❌ Nein | ✅ Ja |
| Status | pending | pending |

---

## 📊 Beide Systeme parallel

Sie haben jetzt **2 Wege** zum Eintragen:

### **1️⃣ Öffentliches Formular** (`/eintragen`)
**Für:** Gelegentliche Einträge  
**Vorteil:** Schnell, kein Account nötig  
**Nachteil:** Keine spätere Bearbeitung  

### **2️⃣ Mit Login** (`/auth/register` → `/dashboard/add`)
**Für:** Händler mit mehreren Werkstätten  
**Vorteil:** Dashboard, Bearbeitung, mehrere Einträge  
**Nachteil:** Account erforderlich  

---

## 🎨 UI-Änderungen

### **Header-Button:**
Jetzt zeigt "Werkstatt eintragen" (grüner Button) zur öffentlichen Route

### **Login weiterhin verfügbar:**
Separater "Login"-Button für Händler mit Account

---

## 🧪 Testen

### **Lokal:**
```bash
npm run dev
# Öffnen Sie: http://localhost:3000/eintragen
```

### **Live:**
```
https://china-bike-repair-map.vercel.app/eintragen
```

### **Test-Flow:**
1. Formular ausfüllen
2. Marken & Services wählen
3. Koordinaten eingeben (z.B. 52.52, 13.405)
4. Absenden
5. Success-Screen sollte erscheinen
6. In Supabase prüfen: Table Editor → haendler

---

## 🔄 Admin-Workflow (später)

Für Admins (wird später implementiert):

```sql
-- Eintrag genehmigen
UPDATE haendler 
SET status = 'approved' 
WHERE id = 123;

-- Eintrag ablehnen
UPDATE haendler 
SET status = 'rejected' 
WHERE id = 123;

-- Alle pending Einträge sehen
SELECT * FROM haendler 
WHERE status = 'pending' 
ORDER BY created_at DESC;
```

---

## 📝 Nächste Erweiterungen

### **Admin-Panel** (empfohlen)
- `/admin` Route
- Einträge genehmigen/ablehnen
- Bulk-Actions
- Statistiken

### **Email-Notifications**
- Bei neuen Einträgen → Admin informieren
- Bei Genehmigung → Eintragenden informieren

### **reCAPTCHA** (Spam-Schutz)
- Google reCAPTCHA v3
- Verhindert Bot-Spam

### **Geocoding-API**
- Automatische Koordinaten aus Adresse
- Google Maps oder Nominatim

---

## ✅ Status

**Öffentliche Einträge:**
- ✅ Route erstellt (`/eintragen`)
- ✅ Formular implementiert
- ✅ Supabase-Integration
- ✅ Success-Screen
- ✅ Header-Button angepasst
- ⏳ Supabase-Policies anpassen (siehe oben)

**Bereit nach:** SQL-Anpassungen in Supabase

---

## 🆘 Troubleshooting

### "Row Level Security" Fehler beim Eintragen
**Lösung:** SQL-Policies ausführen (siehe oben)

### Eintrag wird nicht gespeichert
**Lösung:** 
1. Browser-Konsole öffnen (F12)
2. Fehler prüfen
3. Supabase-Connection testen

### Koordinaten-Hilfe
**Wo finden:**
1. [openstreetmap.org](https://www.openstreetmap.org)
2. Adresse suchen
3. Rechtsklick auf Standort
4. "Adresse anzeigen"
5. Koordinaten kopieren

---

**Viel Erfolg mit den öffentlichen Einträgen! 🚀**


