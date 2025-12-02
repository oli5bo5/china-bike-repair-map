'use client';

import { useMapStore } from '@/lib/store';
import { Haendler } from '@/lib/types';
import { MapPin, Phone, Mail, Globe, Clock, Wrench } from 'lucide-react';

interface HaendlerCardProps {
  haendler: Haendler;
  isSelected: boolean;
  onClick: () => void;
}

function HaendlerCard({ haendler, isSelected, onClick }: HaendlerCardProps) {
  return (
    <div
      onClick={onClick}
      className={`card cursor-pointer transition-all hover:scale-[1.02] ${
        isSelected ? 'ring-2 ring-primary-500 shadow-medium bg-primary-50' : ''
      }`}
    >
      <h3 className="text-lg font-bold text-gray-800 mb-2">{haendler.name}</h3>
      
      <div className="space-y-2 text-sm text-gray-600">
        {/* Adresse */}
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-600" />
          <span>{haendler.adresse}</span>
        </div>

        {/* Telefon */}
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 flex-shrink-0 text-primary-600" />
          <a href={`tel:${haendler.telefon}`} className="hover:text-primary-600">
            {haendler.telefon}
          </a>
        </div>

        {/* Email */}
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 flex-shrink-0 text-primary-600" />
          <a href={`mailto:${haendler.email}`} className="hover:text-primary-600 truncate">
            {haendler.email}
          </a>
        </div>

        {/* Website */}
        {haendler.website && (
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 flex-shrink-0 text-primary-600" />
            <a
              href={haendler.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-600 truncate"
            >
              Website besuchen
            </a>
          </div>
        )}

        {/* Öffnungszeiten */}
        <div className="flex items-start gap-2">
          <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-600" />
          <span>{haendler.oeffnungszeiten}</span>
        </div>

        {/* Beschreibung */}
        <p className="text-gray-700 mt-2 pt-2 border-t border-gray-200">
          {haendler.beschreibung}
        </p>

        {/* Marken */}
        <div className="mt-3">
          <p className="font-medium text-gray-700 mb-1">Reparierte Marken:</p>
          <div className="flex flex-wrap gap-1">
            {haendler.marken.map((marke) => (
              <span
                key={marke}
                className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium"
              >
                {marke}
              </span>
            ))}
          </div>
        </div>

        {/* Dienstleistungen */}
        <div className="mt-3">
          <p className="font-medium text-gray-700 mb-1 flex items-center gap-1">
            <Wrench className="w-4 h-4" />
            Dienstleistungen:
          </p>
          <div className="flex flex-wrap gap-1">
            {haendler.dienstleistungen.map((dl) => (
              <span
                key={dl}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
              >
                {dl}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HaendlerList() {
  const { getFilteredHaendler, selectedHaendler, setSelectedHaendler } = useMapStore();
  const filteredHaendler = getFilteredHaendler();

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary-600">
            Werkstätten
          </h2>
          <span className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-sm">
            {filteredHaendler.length}
          </span>
        </div>
      </div>

      {filteredHaendler.length === 0 ? (
        <div className="card text-center py-12">
          <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-xl font-semibold text-gray-700 mb-2">Keine Werkstätten gefunden</p>
          <p className="text-sm text-gray-500">Versuchen Sie, die Filter anzupassen</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredHaendler.map((haendler) => (
            <HaendlerCard
              key={haendler.id}
              haendler={haendler}
              isSelected={selectedHaendler?.id === haendler.id}
              onClick={() => setSelectedHaendler(haendler)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

