-- Workshops Tabelle erstellen (vereinfachtes Schema)
CREATE TABLE IF NOT EXISTS workshops (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Grunddaten
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  plz TEXT NOT NULL,
  
  -- Kontakt
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  website TEXT,
  
  -- Details
  brands TEXT[] NOT NULL,
  services TEXT[] NOT NULL,
  opening_hours TEXT NOT NULL,
  description TEXT NOT NULL,
  
  -- Standort (optional - wird später via Geocoding gesetzt)
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  
  -- Status & Meta
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Indizes für Performance
CREATE INDEX IF NOT EXISTS idx_workshops_user_id ON workshops(user_id);
CREATE INDEX IF NOT EXISTS idx_workshops_status ON workshops(status);
CREATE INDEX IF NOT EXISTS idx_workshops_city ON workshops(city);
CREATE INDEX IF NOT EXISTS idx_workshops_latitude_longitude ON workshops(latitude, longitude);

-- Row Level Security (RLS) aktivieren
ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;

-- Policy: Jeder kann genehmigte Workshops sehen
CREATE POLICY "Public can view approved workshops" 
ON workshops FOR SELECT 
USING (status = 'approved');

-- Policy: Öffentliche Einträge (ohne Login)
CREATE POLICY "Anyone can insert public workshops" 
ON workshops FOR INSERT 
WITH CHECK (user_id IS NULL);

-- Policy: User können nur ihre eigenen Workshops sehen
CREATE POLICY "Users can view own workshops" 
ON workshops FOR SELECT 
USING (auth.uid() = user_id);

-- Policy: User können nur ihre eigenen Workshops einfügen
CREATE POLICY "Users can insert own workshops" 
ON workshops FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Policy: User können nur ihre eigenen Workshops bearbeiten
CREATE POLICY "Users can update own workshops" 
ON workshops FOR UPDATE 
USING (auth.uid() = user_id);

-- Policy: User können nur ihre eigenen Workshops löschen
CREATE POLICY "Users can delete own workshops" 
ON workshops FOR DELETE 
USING (auth.uid() = user_id);

-- Funktion für automatisches Update von updated_at
CREATE OR REPLACE FUNCTION update_workshops_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger für updated_at
DROP TRIGGER IF EXISTS update_workshops_updated_at ON workshops;
CREATE TRIGGER update_workshops_updated_at 
BEFORE UPDATE ON workshops 
FOR EACH ROW 
EXECUTE PROCEDURE update_workshops_updated_at();

-- Kommentar
COMMENT ON TABLE workshops IS 'Werkstätten für China-Fahrräder und E-Bikes';
COMMENT ON COLUMN workshops.latitude IS 'Wird automatisch via Geocoding API gesetzt oder vom Admin nachgetragen';
COMMENT ON COLUMN workshops.longitude IS 'Wird automatisch via Geocoding API gesetzt oder vom Admin nachgetragen';

