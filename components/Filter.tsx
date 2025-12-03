'use client';

import { useEffect, useState } from 'react';
import { useMapStore } from '@/lib/store';
import { Search, MapPin, Bike, Wrench, RotateCcw } from 'lucide-react';

export default function Filter() {
  const { haendler, filters, setFilters } = useMapStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Extrahiere einzigartige Werte für die Filter
  const alleStaedte = isClient ? [...new Set(haendler.map(h => h.stadt))].sort() : [];
  const alleMarken = isClient ? [...new Set(haendler.flatMap(h => h.marken))].sort() : [];
  const alleDienstleistungen = isClient ? [...new Set(haendler.flatMap(h => h.dienstleistungen))].sort() : [];

  const resetFilters = () => {
    setFilters({
      searchTerm: '',
      selectedMarke: 'Alle',
      selectedDienstleistung: 'Alle',
      selectedStadt: 'Alle',
    });
  };

  const hasActiveFilters = 
    filters.searchTerm !== '' || 
    filters.selectedMarke !== 'Alle' || 
    filters.selectedDienstleistung !== 'Alle' || 
    filters.selectedStadt !== 'Alle';

  return (
    <div className="bg-white shadow-md border-t-4 border-[#1e3a5f] p-6 rounded-xl">
      {/* Title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-[#1e3a5f] rounded-xl flex items-center justify-center">
          <Search className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-[#1e3a5f] uppercase tracking-wide">Filter</h3>
          <p className="text-xs text-[#666]">Werkstätten durchsuchen</p>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1e3a5f]" />
          <input
            type="text"
            placeholder="Name, Stadt oder Adresse..."
            value={filters.searchTerm}
            onChange={(e) => setFilters({ searchTerm: e.target.value })}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Stadt Filter */}
      <div className="mb-4">
        <label className="flex items-center gap-2 text-sm font-semibold text-[#1e3a5f] mb-2 uppercase tracking-wide">
          <MapPin className="w-4 h-4" />
          Stadt
        </label>
        <select
          value={filters.selectedStadt}
          onChange={(e) => setFilters({ selectedStadt: e.target.value })}
          className="input-field"
        >
          <option value="Alle">Alle Städte</option>
          {alleStaedte.map((stadt) => (
            <option key={stadt} value={stadt}>
              {stadt}
            </option>
          ))}
        </select>
      </div>

      {/* Marke Filter */}
      <div className="mb-4">
        <label className="flex items-center gap-2 text-sm font-semibold text-[#1e3a5f] mb-2 uppercase tracking-wide">
          <Bike className="w-4 h-4" />
          Marke
        </label>
        <select
          value={filters.selectedMarke}
          onChange={(e) => setFilters({ selectedMarke: e.target.value })}
          className="input-field"
        >
          <option value="Alle">Alle Marken</option>
          {alleMarken.map((marke) => (
            <option key={marke} value={marke}>
              {marke}
            </option>
          ))}
        </select>
      </div>

      {/* Dienstleistung Filter */}
      <div className="mb-6">
        <label className="flex items-center gap-2 text-sm font-semibold text-[#1e3a5f] mb-2 uppercase tracking-wide">
          <Wrench className="w-4 h-4" />
          Dienstleistung
        </label>
        <select
          value={filters.selectedDienstleistung}
          onChange={(e) => setFilters({ selectedDienstleistung: e.target.value })}
          className="input-field"
        >
          <option value="Alle">Alle Dienstleistungen</option>
          {alleDienstleistungen.map((dl) => (
            <option key={dl} value={dl}>
              {dl}
            </option>
          ))}
        </select>
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <button
          onClick={resetFilters}
          className="w-full flex items-center justify-center gap-2 py-3 text-[#1e3a5f] border-2 border-[#1e3a5f] font-semibold uppercase tracking-wide text-sm hover:bg-[#1e3a5f] hover:text-white transition-all rounded-xl"
        >
          <RotateCcw className="w-4 h-4" />
          Filter zurücksetzen
        </button>
      )}
    </div>
  );
}
