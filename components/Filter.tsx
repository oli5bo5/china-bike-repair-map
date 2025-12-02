'use client';

import { useMapStore } from '@/lib/store';
import { getUniqueMarken, getUniqueDienstleistungen, getUniqueStaedte } from '@/lib/utils';
import { Search } from 'lucide-react';

export default function Filter() {
  const { haendler, filters, setFilters } = useMapStore();

  const marken = getUniqueMarken(haendler);
  const dienstleistungen = getUniqueDienstleistungen(haendler);
  const staedte = getUniqueStaedte(haendler);

  return (
    <div className="card space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary-600">Filter</h2>
        <div className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-semibold">
          Suche
        </div>
      </div>

      {/* Suchfeld */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Name, Stadt oder Adresse..."
          value={filters.searchTerm}
          onChange={(e) => setFilters({ searchTerm: e.target.value })}
          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
        />
      </div>

      <div className="border-t pt-4 space-y-4">
        {/* Stadt-Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            📍 Stadt
          </label>
          <select
            value={filters.selectedStadt}
            onChange={(e) => setFilters({ selectedStadt: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white font-medium"
          >
            <option value="Alle">Alle Städte</option>
            {staedte.map((stadt) => (
              <option key={stadt} value={stadt}>
                {stadt}
              </option>
            ))}
          </select>
        </div>

        {/* Marken-Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            🚲 Marke
          </label>
          <select
            value={filters.selectedMarke}
            onChange={(e) => setFilters({ selectedMarke: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white font-medium"
          >
            <option value="Alle">Alle Marken</option>
            {marken.map((marke) => (
              <option key={marke} value={marke}>
                {marke}
              </option>
            ))}
          </select>
        </div>

        {/* Dienstleistungs-Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            🔧 Dienstleistung
          </label>
          <select
            value={filters.selectedDienstleistung}
            onChange={(e) => setFilters({ selectedDienstleistung: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white font-medium"
          >
            <option value="Alle">Alle Dienstleistungen</option>
            {dienstleistungen.map((dl) => (
              <option key={dl} value={dl}>
                {dl}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() =>
          setFilters({
            searchTerm: '',
            selectedMarke: 'Alle',
            selectedDienstleistung: 'Alle',
            selectedStadt: 'Alle',
          })
        }
        className="w-full btn-secondary"
      >
        Filter zurücksetzen
      </button>
    </div>
  );
}

