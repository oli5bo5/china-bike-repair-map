import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
});

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
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}

