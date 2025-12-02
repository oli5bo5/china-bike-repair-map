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
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Filter</h2>

      {/* Suchfeld */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Suche nach Name, Stadt oder Adresse..."
          value={filters.searchTerm}
          onChange={(e) => setFilters({ searchTerm: e.target.value })}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Stadt-Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Stadt
        </label>
        <select
          value={filters.selectedStadt}
          onChange={(e) => setFilters({ selectedStadt: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Marke
        </label>
        <select
          value={filters.selectedMarke}
          onChange={(e) => setFilters({ selectedMarke: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dienstleistung
        </label>
        <select
          value={filters.selectedDienstleistung}
          onChange={(e) => setFilters({ selectedDienstleistung: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="Alle">Alle Dienstleistungen</option>
          {dienstleistungen.map((dl) => (
            <option key={dl} value={dl}>
              {dl}
            </option>
          ))}
        </select>
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
        className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
      >
        Filter zurücksetzen
      </button>
    </div>
  );
}

