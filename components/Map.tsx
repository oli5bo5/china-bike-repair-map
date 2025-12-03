'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Haendler } from '@/lib/types';
import { useMapStore } from '@/lib/store';

// Custom Red Marker Icon (SVG inline als data URL)
const redMarkerSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
  <path fill="#800000" stroke="#5C0000" stroke-width="1" d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24c0-6.6-5.4-12-12-12z"/>
  <circle fill="#FFFFFF" cx="12" cy="12" r="5"/>
</svg>
`;

const redMarkerIcon = L.divIcon({
  html: redMarkerSvg,
  className: 'custom-marker',
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [0, -36]
});

// Selected Marker (leicht größer)
const selectedMarkerSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="30" height="45">
  <path fill="#A52A2A" stroke="#800000" stroke-width="1.5" d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24c0-6.6-5.4-12-12-12z"/>
  <circle fill="#FFFFFF" cx="12" cy="12" r="5"/>
</svg>
`;

const selectedMarkerIcon = L.divIcon({
  html: selectedMarkerSvg,
  className: 'custom-marker selected',
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [0, -45]
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
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
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
      const isSelected = selectedHaendler?.id === h.id;
      const marker = L.marker([h.lat, h.lng], {
        icon: isSelected ? selectedMarkerIcon : redMarkerIcon
      })
        .addTo(mapRef.current!)
        .bindPopup(
          `
          <div style="font-family: 'Helvetica Neue', sans-serif; padding: 8px;">
            <h3 style="color: #800000; font-weight: 700; font-size: 16px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">
              ${h.name}
            </h3>
            <p style="font-size: 13px; color: #333; margin: 4px 0;">
              <strong style="color: #800000;">📍</strong> ${h.adresse}, ${h.plz} ${h.stadt}
            </p>
            <p style="font-size: 13px; color: #333; margin: 4px 0;">
              <strong style="color: #800000;">📞</strong> ${h.telefon}
            </p>
            ${h.website ? `
              <p style="font-size: 13px; margin: 4px 0;">
                <strong style="color: #800000;">🌐</strong> 
                <a href="${h.website}" target="_blank" style="color: #800000; text-decoration: none;">Website</a>
              </p>
            ` : ''}
            <p style="font-size: 12px; color: #666; margin: 8px 0 4px 0;">
              <strong style="color: #800000;">🔧</strong> ${h.marken.slice(0, 3).join(', ')}${h.marken.length > 3 ? '...' : ''}
            </p>
            <p style="font-size: 12px; color: #666; margin: 4px 0; background: #F5F5DC; padding: 6px; border-radius: 4px;">
              <strong style="color: #800000;">⏰</strong> ${h.oeffnungszeiten}
            </p>
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
  }, [haendler, selectedHaendler, setSelectedHaendler]);

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
    <div id="map" className="w-full h-full" />
  );
}
