'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { X, MapPin, Loader2, Search } from 'lucide-react';

interface Workshop {
  id: number;
  name: string;
  address: string;
  city: string;
  plz: string;
  latitude: number | null;
  longitude: number | null;
}

interface CoordinatesModalProps {
  workshop: Workshop;
  onClose: () => void;
  onSave: (lat: number, lng: number) => void;
}

export default function CoordinatesModal({ workshop, onClose, onSave }: CoordinatesModalProps) {
  const [latitude, setLatitude] = useState(workshop.latitude?.toString() || '');
  const [longitude, setLongitude] = useState(workshop.longitude?.toString() || '');
  const [saving, setSaving] = useState(false);
  const [geocoding, setGeocoding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Automatisches Geocoding beim Öffnen, wenn keine Koordinaten vorhanden
  useEffect(() => {
    if (!workshop.latitude && !workshop.longitude) {
      handleGeocode();
    }
  }, []);

  const handleGeocode = async () => {
    try {
      setGeocoding(true);
      setError(null);

      const searchQuery = encodeURIComponent(
        `${workshop.address}, ${workshop.plz} ${workshop.city}, Germany`
      );

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}&limit=1`,
        {
          headers: {
            'User-Agent': 'ChinaBikeRepairMap/1.0 (info@china-bike-repair.de)'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Geocoding fehlgeschlagen');
      }

      const data = await response.json();

      if (data && data.length > 0) {
        setLatitude(data[0].lat);
        setLongitude(data[0].lon);
      } else {
        setError('Keine Koordinaten gefunden. Bitte manuell eingeben.');
      }
    } catch (err) {
      console.error('Geocoding error:', err);
      setError('Geocoding fehlgeschlagen. Bitte manuell eingeben.');
    } finally {
      setGeocoding(false);
    }
  };

  const handleSave = async () => {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      setError('Bitte geben Sie gültige Koordinaten ein');
      return;
    }

    // Validierung: Deutschland ca. 47°-55° N, 6°-15° E
    if (lat < 47 || lat > 55 || lng < 5 || lng > 16) {
      setError('Die Koordinaten liegen außerhalb Deutschlands');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const { error: updateError } = await supabase
        .from('workshops')
        .update({ latitude: lat, longitude: lng })
        .eq('id', workshop.id);

      if (updateError) throw updateError;

      onSave(lat, lng);
    } catch (err) {
      console.error('Save error:', err);
      setError('Fehler beim Speichern der Koordinaten');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Koordinaten setzen</h2>
              <p className="text-sm text-gray-500">{workshop.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-4">
          {/* Address Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              <strong>Adresse:</strong> {workshop.address}
            </p>
            <p className="text-sm text-gray-600">
              <strong>PLZ/Stadt:</strong> {workshop.plz} {workshop.city}
            </p>
          </div>

          {/* Geocode Button */}
          <button
            onClick={handleGeocode}
            disabled={geocoding}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
          >
            {geocoding ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Suche Koordinaten...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Automatisch suchen (Nominatim)
              </>
            )}
          </button>

          {/* Coordinate Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Latitude (Breitengrad)
              </label>
              <input
                type="number"
                step="0.000001"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="z.B. 52.5200"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2a5aaa] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Longitude (Längengrad)
              </label>
              <input
                type="number"
                step="0.000001"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="z.B. 13.4050"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2a5aaa] focus:border-transparent"
              />
            </div>
          </div>

          {/* Map Preview (Static) */}
          {latitude && longitude && !isNaN(parseFloat(latitude)) && !isNaN(parseFloat(longitude)) && (
            <div className="border rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="200"
                frameBorder="0"
                scrolling="no"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(longitude) - 0.01},${parseFloat(latitude) - 0.01},${parseFloat(longitude) + 0.01},${parseFloat(latitude) + 0.01}&layer=mapnik&marker=${latitude},${longitude}`}
              />
              <p className="text-xs text-gray-500 p-2 bg-gray-50">
                Vorschau: {parseFloat(latitude).toFixed(6)}, {parseFloat(longitude).toFixed(6)}
              </p>
            </div>
          )}

          {/* Helpful Links */}
          <div className="text-xs text-gray-500">
            <p>
              💡 <strong>Tipp:</strong> Koordinaten finden Sie auf{' '}
              <a 
                href={`https://www.google.com/maps/search/${encodeURIComponent(`${workshop.address}, ${workshop.plz} ${workshop.city}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google Maps
              </a>
              {' '}oder{' '}
              <a 
                href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(`${workshop.address}, ${workshop.plz} ${workshop.city}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                OpenStreetMap
              </a>
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Abbrechen
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !latitude || !longitude}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#2a5aaa] text-white rounded-lg hover:bg-[#1e4ba6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Speichert...
              </>
            ) : (
              'Speichern'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

