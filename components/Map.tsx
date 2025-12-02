'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Haendler } from '@/lib/types';
import { useMapStore } from '@/lib/store';

// Fix für Leaflet Icon Pfade in Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface MapProps {
  haendler: Haendler[];
}

export default function Map({ haendler }: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const { setSelectedHaendler, selectedHaendler } = useMapStore();

  useEffect(() => {
    if (!mapRef.current) {
      // Initialisiere Karte zentriert auf Deutschland
      mapRef.current = L.map('map').setView([51.1657, 10.4515], 6);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Entferne alte Marker
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Erstelle neue Marker für gefilterte Händler (nur mit gültigen Koordinaten)
    const haendlerWithCoords = haendler.filter(h => h.lat && h.lng && h.lat !== 0 && h.lng !== 0);
    
    haendlerWithCoords.forEach((h) => {
      const marker = L.marker([h.lat, h.lng])
        .addTo(mapRef.current!)
        .bindPopup(
          `
          <div class="p-2">
            <h3 class="font-bold text-lg mb-2">${h.name}</h3>
            <p class="text-sm mb-1"><strong>Adresse:</strong> ${h.adresse}</p>
            <p class="text-sm mb-1"><strong>Telefon:</strong> ${h.telefon}</p>
            ${h.website ? `<p class="text-sm mb-1"><strong>Website:</strong> <a href="${h.website}" target="_blank" class="text-blue-600 hover:underline">Link</a></p>` : ''}
            <p class="text-sm mb-1"><strong>Marken:</strong> ${h.marken.join(', ')}</p>
            <p class="text-sm"><strong>Öffnungszeiten:</strong> ${h.oeffnungszeiten}</p>
          </div>
        `,
          { maxWidth: 300 }
        );

      marker.on('click', () => {
        setSelectedHaendler(h);
      });

      markersRef.current.push(marker);
    });

    // Passe Kartenansicht an, um alle Marker zu zeigen
    if (haendlerWithCoords.length > 0) {
      const bounds = L.latLngBounds(haendlerWithCoords.map((h) => [h.lat, h.lng]));
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [haendler, setSelectedHaendler]);

  // Zentriere Karte auf ausgewählten Händler
  useEffect(() => {
    if (selectedHaendler && mapRef.current) {
      mapRef.current.setView([selectedHaendler.lat, selectedHaendler.lng], 13);
      
      // Öffne Popup für ausgewählten Händler
      markersRef.current.forEach((marker) => {
        const markerLatLng = marker.getLatLng();
        if (
          markerLatLng.lat === selectedHaendler.lat &&
          markerLatLng.lng === selectedHaendler.lng
        ) {
          marker.openPopup();
        }
      });
    }
  }, [selectedHaendler]);

  return (
    <div id="map" className="w-full h-full rounded-lg shadow-lg" />
  );
}

