import { createClient } from '@supabase/supabase-js';

// Diese Werte müssen später durch echte Supabase-Credentials ersetzt werden
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Haendler {
  id: number;
  user_id: string;
  name: string;
  adresse: string;
  stadt: string;
  plz: string;
  telefon: string;
  email: string;
  website: string | null;
  marken: string[];
  dienstleistungen: string[];
  oeffnungszeiten: string;
  lat: number;
  lng: number;
  beschreibung: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

