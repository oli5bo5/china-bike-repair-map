'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, LogIn, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        setMessage('Login erfolgreich! Sie werden weitergeleitet...');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message || 'Login fehlgeschlagen. Bitte überprüfen Sie Ihre Daten.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2a5aaa] via-[#3d6bc4] to-[#1e4ba6] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <LogIn className="w-10 h-10 text-[#2a5aaa]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Händler Login
          </h1>
          <p className="text-white/80">
            Melden Sie sich an, um Ihr Unternehmen zu verwalten
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                E-Mail-Adresse
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2a5aaa] focus:border-[#2a5aaa] transition-all"
                  placeholder="ihre-email@beispiel.de"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Passwort
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2a5aaa] focus:border-[#2a5aaa] transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Success Message */}
            {message && (
              <div className="bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2a5aaa] text-white py-3 rounded-lg font-semibold hover:bg-[#1e4ba6] transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Anmeldung läuft...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Anmelden
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-500">oder</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Noch kein Konto?{' '}
              <Link
                href="/auth/register"
                className="text-[#2a5aaa] font-semibold hover:underline"
              >
                Jetzt registrieren
              </Link>
            </p>
          </div>

          {/* Forgot Password */}
          <div className="text-center mt-4">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-gray-500 hover:text-[#2a5aaa]"
            >
              Passwort vergessen?
            </Link>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-white/80 hover:text-white text-sm transition-colors"
          >
            ← Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}

