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
            <div className="bg-[#2a5aaa] p-3 rounded-full shadow-md">
              <Bike className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#2a5aaa]">
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
              className="flex items-center gap-2 text-gray-700 hover:text-[#2a5aaa] font-medium transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Karte
            </Link>
            <Link 
              href="#kontakt" 
              className="flex items-center gap-2 text-gray-700 hover:text-[#2a5aaa] font-medium transition-colors"
            >
              <Phone className="w-4 h-4" />
              Kontakt
            </Link>
            <Link 
              href="/auth/login"
              className="px-4 py-2 text-gray-700 border-2 border-gray-300 rounded-lg hover:border-[#2a5aaa] hover:text-[#2a5aaa] font-semibold transition-all"
            >
              Login
            </Link>
            <Link 
              href="/auth/register"
              className="btn-primary text-sm"
            >
              Werkstatt eintragen
            </Link>
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

