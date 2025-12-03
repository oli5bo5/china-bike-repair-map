import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Haendler } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUniqueMarken(haendler: Haendler[]): string[] {
  const markenSet = new Set<string>();
  haendler.forEach((h) => {
    h.marken.forEach((marke) => markenSet.add(marke));
  });
  return Array.from(markenSet).sort();
}

export function getUniqueDienstleistungen(haendler: Haendler[]): string[] {
  const dienstleistungenSet = new Set<string>();
  haendler.forEach((h) => {
    h.dienstleistungen.forEach((dl) => dienstleistungenSet.add(dl));
  });
  return Array.from(dienstleistungenSet).sort();
}

export function getUniqueStaedte(haendler: Haendler[]): string[] {
  const staedteSet = new Set<string>();
  haendler.forEach((h) => staedteSet.add(h.stadt));
  return Array.from(staedteSet).sort();
}



