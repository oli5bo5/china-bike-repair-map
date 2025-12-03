'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useMapStore } from '@/lib/store';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Filter from '@/components/Filter';
import HaendlerList from '@/components/HaendlerList';
import { supabase } from '@/lib/supabase';
import { Haendler } from '@/lib/types';
import { MapPin, Wrench, Search, Zap } from 'lucide-react';

// Dynamischer Import der Map-Komponente (client-side only)
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#F5F5DC]">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[#1e3a5f] font-medium uppercase tracking-wide text-sm">Karte wird geladen...</p>
      </div>
    </div>
  ),
});

// Typ für Supabase Workshop-Daten
interface WorkshopDB {
  id: number;
  name: string;
  address: string;
  city: string;
  plz: string;
  phone: string;
  email: string;
  website: string | null;
  brands: string[];
  services: string[];
  opening_hours: string;
  latitude: number | null;
  longitude: number | null;
  description: string;
  status: string;
}

// Konvertiert Supabase-Daten ins Frontend-Format
function convertToHaendler(workshop: WorkshopDB): Haendler {
  return {
    id: workshop.id,
    name: workshop.name,
    adresse: workshop.address,
    stadt: workshop.city,
    plz: workshop.plz || '',
    telefon: workshop.phone,
    email: workshop.email,
    website: workshop.website,
    marken: workshop.brands || [],
    dienstleistungen: workshop.services || [],
    oeffnungszeiten: workshop.opening_hours || '',
    lat: workshop.latitude || 0,
    lng: workshop.longitude || 0,
    beschreibung: workshop.description || '',
  };
}

export default function Home() {
  const { setHaendler, getFilteredHaendler } = useMapStore();
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [cityCount, setCityCount] = useState(0);

  useEffect(() => {
    setIsClient(true);
    loadWorkshops();

    // Realtime Subscription für automatische Updates
    const channel = supabase
      .channel('workshops-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'workshops'
        },
        (payload) => {
          console.log('Workshop changed:', payload.eventType);
          loadWorkshops();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadWorkshops = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('workshops')
        .select('*')
        .eq('status', 'approved');

      if (fetchError) {
        console.error('Supabase Error:', fetchError);
        setError('Fehler beim Laden der Werkstätten');
        return;
      }

      if (data && data.length > 0) {
        const haendlerData: Haendler[] = data.map(convertToHaendler);
        setHaendler(haendlerData);
        setTotalCount(haendlerData.length);
        const uniqueCities = new Set(haendlerData.map(h => h.stadt));
        setCityCount(uniqueCities.size);
      } else {
        setHaendler([]);
        setTotalCount(0);
        setCityCount(0);
      }
    } catch (err) {
      console.error('Error loading workshops:', err);
      setError('Fehler beim Laden der Daten');
    } finally {
      setLoading(false);
    }
  };

  const filteredHaendler = isClient ? getFilteredHaendler() : [];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      {/* Hero Section - 1000px Breite */}
      <section className="relative bg-[#F5F5DC] py-16 lg:py-20 overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-4 text-center relative z-10">
          {/* Main Title - BLAU statt ROT */}
          <h1 className="text-4xl lg:text-5xl font-bold text-[#1e3a5f] mb-4 uppercase tracking-wide">
            Finden Sie Ihre Werkstatt
          </h1>
          <div className="w-16 h-0.5 bg-[#800000] mx-auto my-4"></div>
          <p className="text-lg text-[#333] max-w-2xl mx-auto mb-8">
            Spezialisierte Händler und Werkstätten für chinesische Fahrräder und E-Bikes in ganz Deutschland
          </p>

          {/* Statistics */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <div className="bg-white px-8 py-4 shadow-md border-l-4 border-[#800000]">
              <span className="text-4xl font-bold text-[#1e3a5f]">
                {loading ? '...' : totalCount}
              </span>
              <span className="block text-sm uppercase tracking-wide text-[#333] mt-1">Werkstätten</span>
            </div>
            <div className="bg-white px-8 py-4 shadow-md border-l-4 border-[#800000]">
              <span className="text-4xl font-bold text-[#1e3a5f]">
                {loading ? '...' : cityCount}
              </span>
              <span className="block text-sm uppercase tracking-wide text-[#333] mt-1">Städte</span>
            </div>
          </div>

          {/* CTA Button */}
          <a 
            href="#map-section" 
            className="inline-block bg-[#800000] text-white px-8 py-3 font-semibold uppercase tracking-wider hover:bg-[#A52A2A] transition-all shadow-md hover:shadow-lg"
          >
            Zur Karte
          </a>
        </div>
      </section>

      {/* Feature Section - BLAU statt ROT */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="feature-box">
              <div className="text-[#1e3a5f] mb-4">
                <MapPin className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-3 uppercase">Interaktive Karte</h3>
              <p className="text-[#666]">
                Finden Sie Werkstätten in Ihrer Nähe auf unserer interaktiven Deutschlandkarte
              </p>
            </div>

            {/* Feature 2 */}
            <div className="feature-box" style={{ animationDelay: '0.1s' }}>
              <div className="text-[#1e3a5f] mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-3 uppercase">Smart Filter</h3>
              <p className="text-[#666]">
                Filtern Sie nach Stadt, Marke und angebotenen Dienstleistungen
              </p>
            </div>

            {/* Feature 3 */}
            <div className="feature-box" style={{ animationDelay: '0.2s' }}>
              <div className="text-[#1e3a5f] mb-4">
                <Zap className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-3 uppercase">Schnell & Einfach</h3>
              <p className="text-[#666]">
                Kontaktdaten und Öffnungszeiten auf einen Blick verfügbar
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Map & List */}
      <main id="map-section" className="flex-1 bg-[#F5F5DC] py-12">
        <div className="container mx-auto px-4">
          {/* Section Title - BLAU */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#1e3a5f] uppercase tracking-wide">Werkstätten-Verzeichnis</h2>
            <div className="w-16 h-0.5 bg-[#800000] mx-auto my-4"></div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-white border-l-4 border-[#800000] p-4 shadow-md">
              <p className="font-semibold text-[#1e3a5f]">⚠️ {error}</p>
              <button 
                onClick={loadWorkshops}
                className="mt-2 text-sm text-[#800000] underline hover:no-underline"
              >
                Erneut versuchen
              </button>
            </div>
          )}

          {/* No Workshops Info */}
          {!loading && !error && totalCount === 0 && (
            <div className="mb-6 bg-white border-l-4 border-[#800000] p-4 shadow-md">
              <p className="font-semibold text-[#1e3a5f]">📋 Noch keine Werkstätten vorhanden</p>
              <p className="text-sm text-[#666] mt-1">
                Neue Einträge müssen von einem Administrator freigegeben werden.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
            {/* Left Sidebar: Filter */}
            <div className="lg:col-span-3">
              <div className="fade-in">
                <Filter />
              </div>
            </div>

            {/* Center: Map */}
            <div className="lg:col-span-5 h-[600px]">
              <div className="fade-in h-full bg-white shadow-md border-t-4 border-[#800000] overflow-hidden">
                {loading ? (
                  <div className="w-full h-full flex items-center justify-center bg-[#F5F5DC]">
                    <div className="text-center">
                      <div className="w-12 h-12 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-[#1e3a5f] font-medium uppercase tracking-wide text-sm">Lädt...</p>
                    </div>
                  </div>
                ) : (
                  isClient && <Map haendler={filteredHaendler} />
                )}
              </div>
            </div>

            {/* Right Sidebar: Workshop List */}
            <div className="lg:col-span-4 max-h-[600px] overflow-y-auto">
              <div className="fade-in">
                {loading ? (
                  <div className="card p-8 text-center bg-white">
                    <div className="w-8 h-8 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-[#666]">Lädt...</p>
                  </div>
                ) : (
                  <HaendlerList />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* "Sie betreiben eine Werkstatt?" Section - UNTER der Karte */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4 uppercase tracking-wide">
            Sie betreiben eine Werkstatt?
          </h2>
          <div className="w-16 h-0.5 bg-[#800000] mx-auto my-4"></div>
          <p className="text-lg text-[#666] mb-8">
            Tragen Sie Ihre Werkstatt kostenlos in unser Verzeichnis ein und erreichen Sie neue Kunden
          </p>
          <a 
            href="/eintragen" 
            className="inline-flex items-center gap-2 bg-[#800000] text-white px-8 py-3 font-semibold uppercase tracking-wider hover:bg-[#A52A2A] transition-all shadow-md hover:shadow-lg"
          >
            <Wrench className="w-5 h-5" />
            Jetzt eintragen
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
