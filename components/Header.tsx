'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Wrench, MapPin, UserCircle, LogIn } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#800000] text-white shadow-lg">
      {/* Top Bar - Logo & Navigation */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Left Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors uppercase text-sm font-medium tracking-wide"
            >
              <MapPin className="w-4 h-4" />
              Karte
            </Link>
            <Link 
              href="/eintragen" 
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors uppercase text-sm font-medium tracking-wide"
            >
              <Wrench className="w-4 h-4" />
              Werkstatt eintragen
            </Link>
          </nav>

          {/* Center - Logo */}
          <div className="flex-1 lg:flex-none text-center">
            <Link href="/" className="inline-block">
              <h1 className="text-2xl lg:text-3xl font-bold tracking-widest uppercase">
                China Bike Repair
              </h1>
              <div className="w-16 h-0.5 bg-white/50 mx-auto my-2"></div>
              <p className="text-xs lg:text-sm font-normal tracking-wider text-white/80 uppercase">
                Fahrrad-Werkstätten in Deutschland
              </p>
            </Link>
          </div>

          {/* Right Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link 
              href="/auth/login" 
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors uppercase text-sm font-medium tracking-wide"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
            <Link 
              href="/admin" 
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors uppercase text-sm font-medium tracking-wide"
            >
              <UserCircle className="w-4 h-4" />
              Admin
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-white/10 rounded transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#5C0000] border-t border-white/20">
          <nav className="container mx-auto px-4 py-4 space-y-3">
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 py-2 text-white/90 hover:text-white transition-colors uppercase text-sm font-medium"
            >
              <MapPin className="w-5 h-5" />
              Karte
            </Link>
            <Link 
              href="/eintragen" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 py-2 text-white/90 hover:text-white transition-colors uppercase text-sm font-medium"
            >
              <Wrench className="w-5 h-5" />
              Werkstatt eintragen
            </Link>
            <Link 
              href="/auth/login" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 py-2 text-white/90 hover:text-white transition-colors uppercase text-sm font-medium"
            >
              <LogIn className="w-5 h-5" />
              Login
            </Link>
            <Link 
              href="/admin" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 py-2 text-white/90 hover:text-white transition-colors uppercase text-sm font-medium"
            >
              <UserCircle className="w-5 h-5" />
              Admin
            </Link>
          </nav>
        </div>
      )}

      {/* Decorative Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#A52A2A] to-transparent"></div>
    </header>
  );
}
