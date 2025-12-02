'use client';

import { Bike } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <Bike className="w-10 h-10" />
          <div>
            <h1 className="text-3xl font-bold">China Bike Repair Map</h1>
            <p className="text-primary-100 text-sm mt-1">
              Finden Sie Händler und Werkstätten für chinesische Fahrräder und E-Bikes
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

