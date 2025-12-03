export interface Haendler {
  id: number;
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
}

export interface FilterState {
  searchTerm: string;
  selectedMarke: string;
  selectedDienstleistung: string;
  selectedStadt: string;
}



