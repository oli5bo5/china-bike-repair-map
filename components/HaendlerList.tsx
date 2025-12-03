'use client';

import { useMapStore } from '@/lib/store';
import { Phone, Mail, Globe, Clock, MapPin, Wrench, ChevronRight } from 'lucide-react';

export default function HaendlerList() {
  const { getFilteredHaendler, setSelectedHaendler, selectedHaendler } = useMapStore();
  const filteredHaendler = getFilteredHaendler();

  if (filteredHaendler.length === 0) {
    return (
      <div className="bg-white shadow-md border-t-4 border-[#1e3a5f] p-8 text-center">
        <div className="w-16 h-16 bg-[#F5F5DC] rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-8 h-8 text-[#1e3a5f]" />
        </div>
        <h3 className="text-lg font-bold text-[#1e3a5f] mb-2 uppercase">Keine Ergebnisse</h3>
        <p className="text-[#666] text-sm">
          Keine Werkstätten gefunden. Bitte ändern Sie Ihre Filtereinstellungen.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-[#1e3a5f] text-white px-4 py-3 flex items-center justify-between">
        <h3 className="font-bold uppercase tracking-wide text-sm">
          {filteredHaendler.length} Werkstätten gefunden
        </h3>
        <Wrench className="w-5 h-5" />
      </div>

      {/* Workshop Cards */}
      {filteredHaendler.map((haendler) => (
        <div
          key={haendler.id}
          onClick={() => setSelectedHaendler(haendler)}
          className={`
            bg-white border-l-4 cursor-pointer transition-all shadow-sm
            ${selectedHaendler?.id === haendler.id 
              ? 'border-[#A52A2A] shadow-md translate-x-2' 
              : 'border-[#800000] hover:shadow-md hover:translate-x-1'
            }
          `}
        >
          <div className="p-4">
            {/* Name & Location */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-bold text-[#1e3a5f] text-lg uppercase tracking-wide">
                  {haendler.name}
                </h4>
                <p className="text-sm text-[#666] flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4" />
                  {haendler.stadt}
                </p>
              </div>
              <ChevronRight className={`w-5 h-5 text-[#1e3a5f] transition-transform ${
                selectedHaendler?.id === haendler.id ? 'rotate-90' : ''
              }`} />
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-3">
              <a 
                href={`tel:${haendler.telefon}`}
                className="flex items-center gap-2 text-sm text-[#333] hover:text-[#1e3a5f] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Phone className="w-4 h-4 text-[#1e3a5f]" />
                {haendler.telefon}
              </a>
              <a 
                href={`mailto:${haendler.email}`}
                className="flex items-center gap-2 text-sm text-[#333] hover:text-[#1e3a5f] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Mail className="w-4 h-4 text-[#1e3a5f]" />
                {haendler.email}
              </a>
              {haendler.website && (
                <a 
                  href={haendler.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#333] hover:text-[#1e3a5f] transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Globe className="w-4 h-4 text-[#1e3a5f]" />
                  Website besuchen
                </a>   
              )}
            </div>

            {/* Opening Hours */}
            {haendler.oeffnungszeiten && (
              <div className="flex items-start gap-2 text-sm text-[#666] mb-3 bg-[#F5F5DC] p-2 rounded">
                <Clock className="w-4 h-4 text-[#1e3a5f] flex-shrink-0 mt-0.5" />
                <span>{haendler.oeffnungszeiten}</span>
              </div>
            )}

            {/* Brands - Rot behalten als Akzent */}
            {haendler.marken.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {haendler.marken.slice(0, 4).map((marke) => (
                  <span
                    key={marke}
                    className="px-2 py-0.5 text-xs font-medium bg-[#800000] text-white"
                  >
                    {marke}
                  </span>
                ))}
                {haendler.marken.length > 4 && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-[#333] text-white">
                    +{haendler.marken.length - 4}
                  </span>
                )}
              </div>
            )}

            {/* Services - Blau für Text */}
            {haendler.dienstleistungen.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {haendler.dienstleistungen.slice(0, 3).map((dl) => (
                  <span
                    key={dl}
                    className="px-2 py-0.5 text-xs font-medium bg-[#F5F5DC] text-[#1e3a5f] border border-[#1e3a5f]/20"
                  >
                    {dl}
                  </span>
                ))}
                {haendler.dienstleistungen.length > 3 && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-[#F5F5DC] text-[#666]">
                    +{haendler.dienstleistungen.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
