'use client';

import { Bike, MapPin, Phone, Menu } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo und Titel */}
          <div className="flex items-center gap-3">
            <div className="bg-primary-500 p-3 rounded-full">
              <Bike className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-500">
                China Bike Repair
              </h1>
              <p className="text-sm text-gray-600">
                Händler & Werkstätten finden
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-gray-700 hover:text-primary-500 font-medium transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Karte
            </Link>
            <Link 
              href="#kontakt" 
              className="flex items-center gap-2 text-gray-700 hover:text-primary-500 font-medium transition-colors"
            >
              <Phone className="w-4 h-4" />
              Kontakt
            </Link>
            <button className="btn-primary text-sm">
              Werkstatt eintragen
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-gray-700">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}

