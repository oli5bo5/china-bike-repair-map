'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { 
  MapPin, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

interface Stats {
  total: number;
  approved: number;
  pending: number;
  rejected: number;
  withoutCoords: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
    withoutCoords: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentWorkshops, setRecentWorkshops] = useState<any[]>([]);

  useEffect(() => {
    fetchStats();
    fetchRecentWorkshops();
  }, []);

  const fetchStats = async () => {
    try {
      // Alle Werkstätten zählen
      const { data: allData, error: allError } = await supabase
        .from('workshops')
        .select('id, status, latitude, longitude');

      if (allError) throw allError;

      const workshops = allData || [];
      
      setStats({
        total: workshops.length,
        approved: workshops.filter(w => w.status === 'approved').length,
        pending: workshops.filter(w => w.status === 'pending').length,
        rejected: workshops.filter(w => w.status === 'rejected').length,
        withoutCoords: workshops.filter(w => !w.latitude || !w.longitude).length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentWorkshops = async () => {
    try {
      const { data, error } = await supabase
        .from('workshops')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setRecentWorkshops(data || []);
    } catch (error) {
      console.error('Error fetching recent workshops:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3" />
            Freigegeben
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            <Clock className="w-3 h-3" />
            Wartend
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <XCircle className="w-3 h-3" />
            Abgelehnt
          </span>
        );
      default:
        return null;
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, href }: {
    title: string;
    value: number;
    icon: any;
    color: string;
    href?: string;
  }) => {
    const content = (
      <div className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${color} hover:shadow-lg transition-shadow`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">
              {loading ? '...' : value}
            </p>
          </div>
          <div className={`p-3 rounded-lg ${color.replace('border-', 'bg-').replace('-600', '-100')}`}>
            <Icon className={`w-6 h-6 ${color.replace('border-', 'text-')}`} />
          </div>
        </div>
      </div>
    );

    if (href) {
      return <Link href={href}>{content}</Link>;
    }
    return content;
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 mt-1">Übersicht über alle Werkstätten</p>
        </div>
        <button
          onClick={() => {
            setLoading(true);
            fetchStats();
            fetchRecentWorkshops();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Aktualisieren
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Gesamt"
          value={stats.total}
          icon={MapPin}
          color="border-blue-600"
          href="/admin/workshops"
        />
        <StatCard
          title="Freigegeben"
          value={stats.approved}
          icon={CheckCircle}
          color="border-green-600"
          href="/admin/workshops?status=approved"
        />
        <StatCard
          title="Wartend"
          value={stats.pending}
          icon={Clock}
          color="border-yellow-600"
          href="/admin/workshops?status=pending"
        />
        <StatCard
          title="Ohne Koordinaten"
          value={stats.withoutCoords}
          icon={AlertTriangle}
          color="border-orange-600"
          href="/admin/workshops?coords=missing"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pending Workshops Alert */}
        {stats.pending > 0 && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-yellow-800">
                  {stats.pending} Werkstätten warten auf Freigabe
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Neue Einträge müssen überprüft und freigegeben werden.
                </p>
                <Link
                  href="/admin/workshops?status=pending"
                  className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-yellow-700 hover:text-yellow-800"
                >
                  Jetzt prüfen
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Missing Coordinates Alert */}
        {stats.withoutCoords > 0 && (
          <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-orange-800">
                  {stats.withoutCoords} Werkstätten ohne Koordinaten
                </h3>
                <p className="text-sm text-orange-700 mt-1">
                  Diese Werkstätten werden nicht auf der Karte angezeigt.
                </p>
                <Link
                  href="/admin/workshops?coords=missing"
                  className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-orange-700 hover:text-orange-800"
                >
                  Koordinaten setzen
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recent Workshops */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">Letzte Einträge</h2>
          <Link
            href="/admin/workshops"
            className="text-sm text-[#2a5aaa] hover:underline font-medium"
          >
            Alle anzeigen →
          </Link>
        </div>
        <div className="divide-y">
          {recentWorkshops.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500">
              Noch keine Werkstätten vorhanden
            </div>
          ) : (
            recentWorkshops.map((workshop) => (
              <div key={workshop.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">{workshop.name}</h3>
                    <p className="text-sm text-gray-500">
                      {workshop.city} • {new Date(workshop.created_at).toLocaleDateString('de-DE')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {!workshop.latitude && (
                      <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
                        Keine Koordinaten
                      </span>
                    )}
                    {getStatusBadge(workshop.status)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

