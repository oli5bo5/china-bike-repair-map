'use client';

import { Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm">
              © {new Date().getFullYear()} China Bike Repair Map. Alle Rechte vorbehalten.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Daten werden von der Community bereitgestellt. Keine Garantie für Vollständigkeit.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary-400 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm">GitHub</span>
            </a>
            <a
              href="mailto:info@example.com"
              className="flex items-center gap-2 hover:text-primary-400 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="text-sm">Kontakt</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

