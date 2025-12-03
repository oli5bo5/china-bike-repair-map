# 🔐 Vercel Environment Variables einrichten

## ⚡ Schnellstart (5 Minuten)

Ihre Supabase-Credentials müssen in Vercel eingetragen werden!

---

## 📋 Was Sie brauchen:

Ihre Supabase-Werte:
```
NEXT_PUBLIC_SUPABASE_URL=https://dosjwlqxolxjemcwlubb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[Ihr Key aus Supabase]
```

**Wo finden?**
1. Gehen Sie zu [supabase.com/dashboard](https://supabase.com/dashboard)
2. Öffnen Sie Ihr Projekt
3. Settings (⚙️) → API
4. Kopieren Sie:
   - **Project URL**
   - **anon public** key

---

## 🚀 Schritt-für-Schritt in Vercel

### **Schritt 1: Zu Environment Variables**

Öffnen Sie direkt:
```
https://vercel.com/oli5bo5s-projects/china-bike-repair-map/settings/environment-variables
```

**Oder manuell:**
1. Gehen Sie zu [vercel.com/dashboard](https://vercel.com/dashboard)
2. Klicken Sie auf Ihr Projekt **"china-bike-repair-map"**
3. Klicken Sie oben auf **"Settings"**
4. Klicken Sie links auf **"Environment Variables"**

---

### **Schritt 2: Erste Variable hinzufügen**

1. Klicken Sie auf **"Add New"** (oben rechts)

2. **Geben Sie ein:**
   ```
   Key:   NEXT_PUBLIC_SUPABASE_URL
   Value: https://dosjwlqxolxjemcwlubb.supabase.co
   ```

3. **Environments auswählen:**
   - ✅ Production
   - ✅ Preview
   - ✅ Development

4. Klicken Sie **"Save"**

---

### **Schritt 3: Zweite Variable hinzufügen**

1. Klicken Sie wieder auf **"Add New"**

2. **Geben Sie ein:**
   ```
   Key:   NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: [Ihr langer Key aus Supabase]
   ```

3. **Environments auswählen:**
   - ✅ Production
   - ✅ Preview
   - ✅ Development

4. Klicken Sie **"Save"**

---

### **Schritt 4: Redeploy triggern**

**Option A: Über Vercel UI**
1. Gehen Sie zum **"Deployments"** Tab
2. Klicken Sie beim neuesten Deployment auf **"..."** (3 Punkte)
3. Klicken Sie **"Redeploy"**
4. Bestätigen Sie mit **"Redeploy"**
5. ⏳ Warten Sie 1-2 Minuten

**Option B: Via Git Push**
```bash
cd china-bike-repair-map
git commit --allow-empty -m "Trigger redeploy with environment variables"
git push
```

---

## ✅ Nach dem Deployment (2 Minuten warten)

### **Testen Sie:**

```
https://china-bike-repair-map.vercel.app/eintragen
```

**Das Formular sollte jetzt funktionieren!**

---

## 🧪 Schnelltest

1. **Öffnen Sie:** Ihre Live-URL `/eintragen`
2. **Füllen Sie das Formular aus:**
   - Name: Test Werkstatt
   - Adresse: Teststraße 1
   - Stadt: Berlin
   - PLZ: 12345
   - Telefon: 030-123456
   - Email: test@test.de
   - Marken: [x] Trinx
   - Services: [x] Allgemeine Reparatur
3. **Klicken Sie:** "Werkstatt eintragen"
4. **Erwarten Sie:** Success-Screen ✅

---

## 🔍 Fehlersuche

### **"Invalid API key" Fehler**

**Prüfen Sie:**
1. Keys richtig kopiert? (kein Leerzeichen am Anfang/Ende)
2. Beide Variables gesetzt?
3. Alle 3 Environments ausgewählt?
4. Redeploy durchgeführt?

**Lösung:**
```
Vercel → Settings → Environment Variables → Bearbeiten → Neu speichern
```

### **404 auf /eintragen**

**Prüfen Sie:**
1. Ist das Deployment "Ready"? (grüner Status)
2. Cache-Problem? → Ctrl+Shift+R im Browser
3. Vercel-URL korrekt?

**Lösung:**
```
Warten Sie noch 1-2 Minuten auf Deployment
Oder: Browser-Cache leeren
```

### **"Row Level Security" Fehler beim Speichern**

**Prüfen Sie:**
1. SQL-Schema in Supabase ausgeführt?
2. Policies korrekt erstellt?

**Lösung:**
```sql
-- In Supabase SQL Editor:
-- Siehe supabase/workshops-schema.sql
```

---

## 📊 Checkliste

- [ ] Supabase Project URL kopiert
- [ ] Supabase Anon Key kopiert
- [ ] In Vercel Environment Variables eingefügt
- [ ] Beide Variables gespeichert
- [ ] Redeploy getriggert
- [ ] 2 Minuten gewartet
- [ ] /eintragen Route getestet
- [ ] Formular ausgefüllt & abgeschickt
- [ ] Success-Screen gesehen ✅

---

## 🎯 Wenn alles funktioniert:

### **In Supabase prüfen:**
1. Gehen Sie zu Supabase → Table Editor
2. Öffnen Sie Tabelle **"workshops"**
3. Sie sollten Ihren Test-Eintrag sehen!
4. Status: "pending"

### **Status genehmigen (als Test):**
1. Klicken Sie auf den Eintrag
2. Ändern Sie "status" von "pending" zu "approved"
3. Speichern Sie
4. Gehen Sie zur Hauptseite
5. **Die Werkstatt erscheint auf der Karte!** 🎉

---

## 🔑 Ihre Credentials

**Projekt-ID:** dosjwlqxolxjemcwlubb  
**Project URL:** https://dosjwlqxolxjemcwlubb.supabase.co  
**Anon Key:** [Aus Supabase Dashboard kopieren]

---

## 📞 Support

**Environment Variables richtig gesetzt?**
→ Test: `node scripts/test-auth.js`

**Deployment noch nicht fertig?**
→ Vercel → Deployments → Status prüfen

**Alles klappt?**
→ 🎉 Gratulation! Teilen Sie die URL!

---

**Nach dem Setzen der Variables ist Ihre Website voll funktionsfähig! 🚀**


