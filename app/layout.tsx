import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'China Bike Repair Map - Händler & Werkstätten finden',
  description: 'Finden Sie Händler und Werkstätten, die chinesische Fahrräder und E-Bikes reparieren. Interaktive Karte mit Filterfunktion.',
  keywords: 'Fahrrad, E-Bike, Reparatur, China, Werkstatt, Händler, Trinx, Merida, Bafang',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

