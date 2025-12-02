'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Building, Plus, LogOut, Edit, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';
import Link from 'next/link';

interface UserHaendler {
  id: number;
  name: string;
  stadt: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [haendler, setHaendler] = useState<UserHaendler[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
    // Simuliere Händler-Daten (später aus Supabase laden)
    setHaendler([
      {
        id: 1,
        name: 'Meine Werkstatt GmbH',
        stadt: 'Berlin',
        status: 'approved',
        created_at: new Date().toISOString(),
      },
    ]);
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/auth/login');
        return;
      }
      
      setUser(user);
    } catch (error) {
      console.error('Error checking user:', error);
      router.push('/auth/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
            <CheckCircle className="w-4 h-4" />
            Freigegeben
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
            <Clock className="w-4 h-4" />
            In Prüfung
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
            <XCircle className="w-4 h-4" />
            Abgelehnt
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2a5aaa]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-[#2a5aaa] p-2 rounded-lg">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#2a5aaa]">Händler Dashboard</h1>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/" className="text-gray-600 hover:text-[#2a5aaa] text-sm">
                Zur Karte
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Abmelden
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-[#2a5aaa] to-[#3d6bc4] text-white rounded-2xl p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-2">Willkommen zurück!</h2>
          <p className="text-white/90 mb-4">
            Verwalten Sie Ihre Werkstätten und Händlereinträge
          </p>
          <Link
            href="/dashboard/add"
            className="inline-flex items-center gap-2 bg-white text-[#2a5aaa] px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Neuen Eintrag hinzufügen
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Gesamt</p>
                <p className="text-3xl font-bold text-[#2a5aaa]">{haendler.length}</p>
              </div>
              <div className="bg-[#e0edff] p-4 rounded-full">
                <Building className="w-8 h-8 text-[#2a5aaa]" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Freigegeben</p>
                <p className="text-3xl font-bold text-green-600">
                  {haendler.filter((h) => h.status === 'approved').length}
                </p>
              </div>
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">In Prüfung</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {haendler.filter((h) => h.status === 'pending').length}
                </p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-full">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Händler Liste */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#2a5aaa]">Meine Einträge</h2>
            <Link
              href="/dashboard/add"
              className="flex items-center gap-2 px-4 py-2 bg-[#2a5aaa] text-white rounded-lg hover:bg-[#1e4ba6] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Neu
            </Link>
          </div>

          {haendler.length === 0 ? (
            <div className="text-center py-12">
              <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg text-gray-600 mb-2">Noch keine Einträge</p>
              <p className="text-sm text-gray-500 mb-6">
                Fügen Sie Ihren ersten Werkstatt-Eintrag hinzu
              </p>
              <Link
                href="/dashboard/add"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2a5aaa] text-white rounded-lg hover:bg-[#1e4ba6] transition-colors"
              >
                <Plus className="w-5 h-5" />
                Ersten Eintrag hinzufügen
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {haendler.map((h) => (
                <div
                  key={h.id}
                  className="border-2 border-gray-200 rounded-lg p-4 hover:border-[#2a5aaa] transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-800">{h.name}</h3>
                        {getStatusBadge(h.status)}
                      </div>
                      <p className="text-sm text-gray-600">📍 {h.stadt}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Erstellt am {new Date(h.created_at).toLocaleDateString('de-DE')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-[#2a5aaa] hover:bg-[#e0edff] rounded-lg transition-colors">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


