'use client';

import { Github, Mail, MapPin, Phone, Bike } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary-500 text-white py-10 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Über uns */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Bike className="w-6 h-6" />
              <h3 className="text-xl font-bold">China Bike Repair</h3>
            </div>
            <p className="text-primary-100 text-sm">
              Finden Sie Händler und Werkstätten für chinesische Fahrräder und E-Bikes in Ihrer Nähe.
            </p>
          </div>

          {/* Schnelllinks */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Schnelllinks</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-primary-100 hover:text-white transition-colors flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Karte
                </Link>
              </li>
              <li>
                <Link href="#" className="text-primary-100 hover:text-white transition-colors">
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="#" className="text-primary-100 hover:text-white transition-colors">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="#" className="text-primary-100 hover:text-white transition-colors">
                  Impressum
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
            <ul className="space-y-3 text-sm text-primary-100">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@china-bike-repair.de" className="hover:text-white transition-colors">
                  info@china-bike-repair.de
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Github className="w-4 h-4" />
                <a 
                  href="https://github.com/oli5bo5/china-bike-repair-map" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-400 pt-6 text-center">
          <p className="text-sm text-primary-100">
            © {new Date().getFullYear()} China Bike Repair Map. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs text-primary-200 mt-2">
            Daten werden von der Community bereitgestellt. Keine Garantie für Vollständigkeit.
          </p>
        </div>
      </div>
    </footer>
  );
}

