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
    <div className="flex flex-col min-h-screen bg-secondary-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 text-white py-16 shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Finden Sie Ihre Fahrrad-Werkstatt
          </h1>
          <p className="text-xl text-primary-50 mb-6 max-w-2xl mx-auto">
            Händler und Werkstätten für chinesische Fahrräder und E-Bikes in Deutschland
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 flex items-center gap-2">
              <span className="text-3xl font-bold">{filteredHaendler.length}</span>
              <span className="text-primary-100">Werkstätten</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 flex items-center gap-2">
              <span className="text-3xl font-bold">8</span>
              <span className="text-primary-100">Städte</span>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
          {/* Linke Sidebar: Filter */}
          <div className="lg:col-span-3">
            <div className="fade-in">
              <Filter />
            </div>
          </div>

          {/* Mitte: Karte */}
          <div className="lg:col-span-5 h-[600px]">
            <div className="fade-in h-full">
              {isClient && <Map haendler={filteredHaendler} />}
            </div>
          </div>

          {/* Rechte Sidebar: Händler-Liste */}
          <div className="lg:col-span-4 max-h-[600px] overflow-y-auto">
            <div className="fade-in">
              <HaendlerList />
            </div>
          </div>
        </div>

        {/* Mobile Layout Info */}
        <div className="lg:hidden mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg fade-in">
          <p className="text-sm text-primary-800">
            💡 <strong>Tipp:</strong> Für die beste Erfahrung nutzen Sie bitte einen Desktop-Browser oder drehen Sie Ihr Gerät ins Querformat.
          </p>
        </div>

        {/* Features Section */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card text-center fade-in">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary-600 mb-2">Interaktive Karte</h3>
            <p className="text-gray-600 text-sm">
              Finden Sie Werkstätten in Ihrer Nähe auf der interaktiven Karte
            </p>
          </div>
          
          <div className="card text-center fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary-600 mb-2">Smart Filter</h3>
            <p className="text-gray-600 text-sm">
              Filtern Sie nach Stadt, Marke und angebotenen Dienstleistungen
            </p>
          </div>
          
          <div className="card text-center fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary-600 mb-2">Schnell & Einfach</h3>
            <p className="text-gray-600 text-sm">
              Kontaktdaten und Öffnungszeiten auf einen Blick
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

