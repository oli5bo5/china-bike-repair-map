import { create } from 'zustand';
import { Haendler, FilterState } from './types';

interface MapStore {
  haendler: Haendler[];
  filters: FilterState;
  selectedHaendler: Haendler | null;
  setHaendler: (haendler: Haendler[]) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  setSelectedHaendler: (haendler: Haendler | null) => void;
  getFilteredHaendler: () => Haendler[];
}

export const useMapStore = create<MapStore>((set, get) => ({
  haendler: [],
  filters: {
    searchTerm: '',
    selectedMarke: 'Alle',
    selectedDienstleistung: 'Alle',
    selectedStadt: 'Alle',
  },
  selectedHaendler: null,
  
  setHaendler: (haendler) => set({ haendler }),
  
  setFilters: (newFilters) => 
    set((state) => ({ 
      filters: { ...state.filters, ...newFilters } 
    })),
  
  setSelectedHaendler: (haendler) => set({ selectedHaendler: haendler }),
  
  getFilteredHaendler: () => {
    const { haendler, filters } = get();
    
    return haendler.filter((h) => {
      // Suchbegriff-Filter
      const matchesSearch = filters.searchTerm === '' || 
        h.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        h.stadt.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        h.adresse.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      // Marken-Filter
      const matchesMarke = filters.selectedMarke === 'Alle' || 
        h.marken.includes(filters.selectedMarke);
      
      // Dienstleistungs-Filter
      const matchesDienstleistung = filters.selectedDienstleistung === 'Alle' || 
        h.dienstleistungen.includes(filters.selectedDienstleistung);
      
      // Stadt-Filter
      const matchesStadt = filters.selectedStadt === 'Alle' || 
        h.stadt === filters.selectedStadt;
      
      return matchesSearch && matchesMarke && matchesDienstleistung && matchesStadt;
    });
  },
}));



