'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Building, MapPin, Phone, Mail, Globe, Clock, Wrench, Save, Loader2 } from 'lucide-react';

const markenOptions = [
  'Trinx', 'Merida', 'Giant', 'Bafang', 'Bosch', 'Shimano Steps',
  'Tongsheng', 'Ananda', 'Sava', 'Twitter'
];

const dienstleistungenOptions = [
  'Allgemeine Reparatur',
  'E-Bike-Software-Update',
  'Motorreparatur',
  'Akku-Reparatur',
  'Akku-Diagnose',
  'E-Bike-Inspektion',
  'Display-Reparatur',
  'Bremsen-Service',
  'Schaltung einstellen',
  'Reifenwechsel',
  'Ersatzteile-Verkauf',
  'Garantie-Service',
];

export default function AddHaendlerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    adresse: '',
    stadt: '',
    plz: '',
    telefon: '',
    email: '',
    website: '',
    oeffnungszeiten: '',
    beschreibung: '',
    marken: [] as string[],
    dienstleistungen: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validierung
    if (formData.marken.length === 0) {
      setError('Bitte wählen Sie mindestens eine Marke aus');
      setLoading(false);
      return;
    }

    if (formData.dienstleistungen.length === 0) {
      setError('Bitte wählen Sie mindestens eine Dienstleistung aus');
      setLoading(false);
      return;
    }

    try {
      // Werkstatt in Supabase speichern
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setError('Sie müssen eingeloggt sein');
        setLoading(false);
        return;
      }

      const { data, error: insertError } = await supabase
        .from('workshops')
        .insert([{
          name: formData.name,
          address: formData.adresse,
          city: formData.stadt,
          plz: formData.plz,
          phone: formData.telefon,
          email: formData.email,
          website: formData.website || null,
          brands: formData.marken,
          services: formData.dienstleistungen,
          opening_hours: formData.oeffnungszeiten,
          latitude: null, // Wird später gesetzt
          longitude: null, // Wird später gesetzt
          description: formData.beschreibung,
          status: 'pending',
          user_id: user.id,
        }])
        .select();

      if (insertError) throw insertError;
      
      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Fehler beim Speichern. Bitte versuchen Sie es erneut.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMarke = (marke: string) => {
    setFormData((prev) => ({
      ...prev,
      marken: prev.marken.includes(marke)
        ? prev.marken.filter((m) => m !== marke)
        : [...prev.marken, marke],
    }));
  };

  const toggleDienstleistung = (dl: string) => {
    setFormData((prev) => ({
      ...prev,
      dienstleistungen: prev.dienstleistungen.includes(dl)
        ? prev.dienstleistungen.filter((d) => d !== dl)
        : [...prev.dienstleistungen, dl],
    }));
  };


  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-[#2a5aaa] hover:text-[#1e4ba6] font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Zurück zum Dashboard
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="card">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#2a5aaa] mb-2">
              Neuen Eintrag hinzufügen
            </h1>
            <p className="text-gray-600">
              Füllen Sie das Formular aus, um Ihre Werkstatt einzutragen
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Grunddaten */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Building className="w-5 h-5 text-[#2a5aaa]" />
                Grunddaten
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Firmenname *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2a5aaa] focus:border-[#2a5aaa]"
                    placeholder="z.B. Fahrradwerkstatt Müller"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Adresse *
                  </label>
                  <input
                    type="text"
                    value={formData.adresse}
                    onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2a5aaa] focus:border-[#2a5aaa]"
                    placeholder="z.B. Musterstraße 123"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    PLZ *
                  </label>
                  <input
                    type="text"
                    value={formData.plz}
                    onChange={(e) => setFormData({ ...formData, plz: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2a5aaa] focus:border-[#2a5aaa]"
                    placeholder="12345"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Stadt *
                  </label>
                  <input
                    type="text"
                    value={formData.stadt}
                    onChange={(e) => setFormData({ ...formData, stadt: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2a5aaa] focus:border-[#2a5aaa]"
                    placeholder="Berlin"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Kontaktdaten */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#2a5aaa]" />
                Kontaktdaten
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    value={formData.telefon}
                    onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2a5aaa] focus:border-[#2a5aaa]"
                    placeholder="030-12345678"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    E-Mail *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2a5aaa] focus:border-[#2a5aaa]"
                    placeholder="info@beispiel.de"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Website (optional)
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2a5aaa] focus:border-[#2a5aaa]"
                    placeholder="https://www.beispiel.de"
                  />
                </div>
              </div>
            </section>

            {/* Öffnungszeiten & Beschreibung */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#2a5aaa]" />
                Weitere Informationen
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Öffnungszeiten *
                  </label>
                  <input
                    type="text"
                    value={formData.oeffnungszeiten}
                    onChange={(e) => setFormData({ ...formData, oeffnungszeiten: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2a5aaa] focus:border-[#2a5aaa]"
                    placeholder="Mo-Fr: 9-18 Uhr, Sa: 10-14 Uhr"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Beschreibung *
                  </label>
                  <textarea
                    value={formData.beschreibung}
                    onChange={(e) => setFormData({ ...formData, beschreibung: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2a5aaa] focus:border-[#2a5aaa] h-32 resize-none"
                    placeholder="Beschreiben Sie Ihre Werkstatt und Ihre Spezialgebiete..."
                    required
                  />
                </div>
              </div>
            </section>

            {/* Marken */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#2a5aaa]" />
                Reparierte Marken * (mindestens eine)
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {markenOptions.map((marke) => (
                  <label
                    key={marke}
                    className={`flex items-center gap-2 px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.marken.includes(marke)
                        ? 'border-[#2a5aaa] bg-[#e0edff]'
                        : 'border-gray-200 hover:border-[#2a5aaa]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.marken.includes(marke)}
                      onChange={() => toggleMarke(marke)}
                      className="w-4 h-4 text-[#2a5aaa] rounded"
                    />
                    <span className="text-sm font-medium">{marke}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Dienstleistungen */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#2a5aaa]" />
                Dienstleistungen * (mindestens eine)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dienstleistungenOptions.map((dl) => (
                  <label
                    key={dl}
                    className={`flex items-center gap-2 px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.dienstleistungen.includes(dl)
                        ? 'border-[#2a5aaa] bg-[#e0edff]'
                        : 'border-gray-200 hover:border-[#2a5aaa]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.dienstleistungen.includes(dl)}
                      onChange={() => toggleDienstleistung(dl)}
                      className="w-4 h-4 text-[#2a5aaa] rounded"
                    />
                    <span className="text-sm font-medium">{dl}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Info: Standort wird automatisch ermittelt */}
            <section>
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-green-900 mb-1">Standort auf der Karte</h3>
                    <p className="text-sm text-green-800">
                      Der genaue Standort wird automatisch anhand Ihrer Adresse ermittelt. 
                      Sie können keine Koordinaten manuell eingeben.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Error/Success Messages */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3 rounded-lg">
                ✅ Eintrag erfolgreich gespeichert! Sie werden weitergeleitet...
              </div>
            )}

            {/* Submit Button */}
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#2a5aaa] text-white py-4 rounded-lg font-semibold hover:bg-[#1e4ba6] transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Wird gespeichert...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Eintrag speichern
                  </>
                )}
              </button>
              <Link
                href="/dashboard"
                className="px-6 py-4 text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Abbrechen
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}


