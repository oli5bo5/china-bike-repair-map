-- =============================================
-- ADMIN SETUP FÜR CHINA BIKE REPAIR MAP
-- =============================================
-- Führen Sie dieses SQL in der Supabase SQL Console aus

-- 1. Admin Users Tabelle erstellen
-- =============================================
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- 2. RLS für admin_users aktivieren
-- =============================================
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Nur Admins können admin_users lesen
CREATE POLICY "Admins can view admin users"
ON admin_users FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM admin_users au
    WHERE au.user_id = auth.uid()
  )
);

-- 3. WICHTIG: Ersten Admin hinzufügen
-- =============================================
-- OPTION A: Nach Anmeldung - Ersetze 'YOUR-EMAIL@EXAMPLE.COM' mit deiner E-Mail
-- (Führe dies aus, NACHDEM du dich registriert hast)

-- INSERT INTO admin_users (user_id)
-- SELECT id FROM auth.users WHERE email = 'YOUR-EMAIL@EXAMPLE.COM';

-- OPTION B: Mit bekannter User-ID
-- INSERT INTO admin_users (user_id) VALUES ('your-user-uuid-here');

-- 4. Aktualisierte RLS Policies für workshops
-- =============================================

-- Zuerst alte Policies löschen (falls vorhanden)
DROP POLICY IF EXISTS "Public can view approved workshops" ON workshops;
DROP POLICY IF EXISTS "Public can insert workshops" ON workshops;
DROP POLICY IF EXISTS "Admins can update workshops" ON workshops;
DROP POLICY IF EXISTS "Admins can delete workshops" ON workshops;
DROP POLICY IF EXISTS "Allow public read access to approved workshops" ON workshops;

-- Public kann nur approved Werkstätten mit Koordinaten lesen
CREATE POLICY "Public can view approved workshops"
ON workshops FOR SELECT
USING (
  status = 'approved' 
  -- Entfernen Sie den Koordinaten-Check, wenn Sie auch Werkstätten ohne Coords zeigen wollen
  -- AND latitude IS NOT NULL 
  -- AND longitude IS NOT NULL
);

-- Jeder kann neue Werkstätten eintragen (mit pending Status)
CREATE POLICY "Public can insert workshops"
ON workshops FOR INSERT
WITH CHECK (true);

-- Nur Admins können Werkstätten aktualisieren
CREATE POLICY "Admins can update workshops"
ON workshops FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.user_id = auth.uid()
  )
);

-- Nur Admins können Werkstätten löschen
CREATE POLICY "Admins can delete workshops"
ON workshops FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.user_id = auth.uid()
  )
);

-- 5. Hilfsfunktion: Prüfen ob User Admin ist
-- =============================================
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Status-Spalte sicherstellen
-- =============================================
-- Falls die status Spalte noch nicht existiert
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'workshops' AND column_name = 'status'
  ) THEN
    ALTER TABLE workshops ADD COLUMN status TEXT DEFAULT 'pending';
  END IF;
END $$;

-- Index für Status-Abfragen
CREATE INDEX IF NOT EXISTS idx_workshops_status ON workshops(status);

-- =============================================
-- NACH DER AUSFÜHRUNG:
-- =============================================
-- 1. Registriere dich auf der Website (falls noch nicht geschehen)
-- 2. Hole deine User-ID aus auth.users:
--    SELECT id, email FROM auth.users;
-- 3. Füge dich als Admin hinzu:
--    INSERT INTO admin_users (user_id) VALUES ('deine-user-id');
-- 4. Teste den Admin-Bereich unter /admin
-- =============================================

