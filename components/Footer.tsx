'use client';

import Link from 'next/link';
import { MapPin, Mail, Github, Wrench, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#800000] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold tracking-widest uppercase mb-2">
              China Bike Repair
            </h3>
            <div className="w-12 h-0.5 bg-white/50 mx-auto md:mx-0 my-3"></div>
            <p className="text-white/80 text-sm leading-relaxed">
              Das Verzeichnis für spezialisierte Werkstätten und Händler für chinesische Fahrräder und E-Bikes in Deutschland.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="font-bold uppercase tracking-wide mb-4 text-white">
              Schnelllinks
            </h4>
            <nav className="space-y-3">
              <Link 
                href="/" 
                className="flex items-center justify-center gap-2 text-[#F5F5DC] hover:text-white transition-colors text-sm"
              >
                <MapPin className="w-4 h-4" />
                Karte
              </Link>
              <Link 
                href="/eintragen" 
                className="flex items-center justify-center gap-2 text-[#F5F5DC] hover:text-white transition-colors text-sm"
              >
                <Wrench className="w-4 h-4" />
                Werkstatt eintragen
              </Link>
              <Link 
                href="/datenschutz" 
                className="flex items-center justify-center gap-2 text-[#F5F5DC] hover:text-white transition-colors text-sm"
              >
                Datenschutz
              </Link>
              <Link 
                href="/impressum" 
                className="flex items-center justify-center gap-2 text-[#F5F5DC] hover:text-white transition-colors text-sm"
              >
                Impressum
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <h4 className="font-bold uppercase tracking-wide mb-4 text-white">
              Kontakt
            </h4>
            <div className="space-y-3">
              <a 
                href="mailto:info@china-bike-repair.de"
                className="flex items-center justify-center md:justify-end gap-2 text-[#F5F5DC] hover:text-white transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                info@china-bike-repair.de
              </a>
              <a 
                href="https://github.com/oli5bo5/china-bike-repair-map"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-end gap-2 text-[#F5F5DC] hover:text-white transition-colors text-sm"
              >
                <Github className="w-4 h-4" />
                GitHub Repository
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p className="text-white/60">
              © {currentYear} China Bike Repair Map. Alle Rechte vorbehalten.
            </p>
            <p className="text-white/60 flex items-center gap-2">
              Made with <span className="text-[#A52A2A]">♥</span> in Germany
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
