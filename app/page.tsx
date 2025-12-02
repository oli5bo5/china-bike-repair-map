'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useMapStore } from '@/lib/store';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Filter from '@/components/Filter';
import HaendlerList from '@/components/HaendlerList';
import haendlerData from '@/data/haendler.json';

// Dynamischer Import der Map-Komponente (client-side only)
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Karte wird geladen...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  const { setHaendler, getFilteredHaendler } = useMapStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setHaendler(haendlerData);
  }, [setHaendler]);

  const filteredHaendler = isClient ? getFilteredHaendler() : [];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          {/* Linke Sidebar: Filter */}
          <div className="lg:col-span-3 overflow-y-auto">
            <Filter />
          </div>

          {/* Mitte: Karte */}
          <div className="lg:col-span-5 h-full">
            {isClient && <Map haendler={filteredHaendler} />}
          </div>

          {/* Rechte Sidebar: Händler-Liste */}
          <div className="lg:col-span-4 overflow-y-auto">
            <HaendlerList />
          </div>
        </div>

        {/* Mobile Layout Info */}
        <div className="lg:hidden mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 <strong>Tipp:</strong> Für die beste Erfahrung nutzen Sie bitte einen Desktop-Browser oder drehen Sie Ihr Gerät ins Querformat.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

