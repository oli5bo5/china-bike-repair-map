'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { 
  Search, 
  Filter,
  CheckCircle, 
  XCircle, 
  Clock,
  MapPin,
  Trash2,
  Edit,
  Eye,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import CoordinatesModal from './CoordinatesModal';

interface Workshop {
  id: number;
  name: string;
  address: string;
  city: string;
  plz: string;
  phone: string;
  email: string;
  website: string | null;
  brands: string[];
  services: string[];
  opening_hours: string;
  latitude: number | null;
  longitude: number | null;
  description: string;
  status: string;
  created_at: string;
}

export default function WorkshopsAdmin() {
  const searchParams = useSearchParams();
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all');
  const [coordsFilter, setCoordsFilter] = useState(searchParams.get('coords') || 'all');
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [showCoordsModal, setShowCoordsModal] = useState(false);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  useEffect(() => {
    fetchWorkshops();
  }, [statusFilter, coordsFilter]);

  const fetchWorkshops = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('workshops')
        .select('*')
        .order('created_at', { ascending: false });

      // Status Filter
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      // Koordinaten Filter
      if (coordsFilter === 'missing') {
        query = query.or('latitude.is.null,longitude.is.null');
      } else if (coordsFilter === 'present') {
        query = query.not('latitude', 'is', null).not('longitude', 'is', null);
      }

      const { data, error } = await query;

      if (error) throw error;
      setWorkshops(data || []);
    } catch (error) {
      console.error('Error fetching workshops:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      setActionLoading(id);
      const { error } = await supabase
        .from('workshops')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      // Update local state
      setWorkshops(prev => 
        prev.map(w => w.id === id ? { ...w, status: newStatus } : w)
      );
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Fehler beim Aktualisieren des Status');
    } finally {
      setActionLoading(null);
    }
  };

  const deleteWorkshop = async (id: number) => {
    if (!confirm('Möchten Sie diese Werkstatt wirklich löschen?')) return;

    try {
      setActionLoading(id);
      const { error } = await supabase
        .from('workshops')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Remove from local state
      setWorkshops(prev => prev.filter(w => w.id !== id));
    } catch (error) {
      console.error('Error deleting workshop:', error);
      alert('Fehler beim Löschen der Werkstatt');
    } finally {
      setActionLoading(null);
    }
  };

  const handleCoordinatesSaved = (lat: number, lng: number) => {
    if (selectedWorkshop) {
      setWorkshops(prev =>
        prev.map(w =>
          w.id === selectedWorkshop.id
            ? { ...w, latitude: lat, longitude: lng }
            : w
        )
      );
    }
    setShowCoordsModal(false);
    setSelectedWorkshop(null);
  };

  const filteredWorkshops = workshops.filter(w =>
    w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3" />
            Freigegeben
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            <Clock className="w-3 h-3" />
            Wartend
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <XCircle className="w-3 h-3" />
            Abgelehnt
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Werkstätten verwalten</h1>
        <p className="text-gray-500 mt-1">
          {filteredWorkshops.length} Werkstätten gefunden
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Suche nach Name, Stadt oder Adresse..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2a5aaa] focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2a5aaa] focus:border-transparent"
            >
              <option value="all">Alle Status</option>
              <option value="pending">Wartend</option>
              <option value="approved">Freigegeben</option>
              <option value="rejected">Abgelehnt</option>
            </select>
          </div>

          {/* Coordinates Filter */}
          <select
            value={coordsFilter}
            onChange={(e) => setCoordsFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2a5aaa] focus:border-transparent"
          >
            <option value="all">Alle Koordinaten</option>
            <option value="missing">Ohne Koordinaten</option>
            <option value="present">Mit Koordinaten</option>
          </select>

          {/* Refresh Button */}
          <button
            onClick={fetchWorkshops}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-[#2a5aaa] mx-auto mb-4" />
            <p className="text-gray-500">Lädt Werkstätten...</p>
          </div>
        ) : filteredWorkshops.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Keine Werkstätten gefunden
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Name / Adresse
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Koordinaten
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Erstellt
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">
                    Aktionen
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredWorkshops.map((workshop) => (
                  <tr key={workshop.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-semibold text-gray-800">{workshop.name}</p>
                        <p className="text-sm text-gray-500">
                          {workshop.address}, {workshop.plz} {workshop.city}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {workshop.email} • {workshop.phone}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {workshop.latitude && workshop.longitude ? (
                        <div className="flex items-center gap-1 text-sm text-green-600">
                          <MapPin className="w-4 h-4" />
                          <span>{workshop.latitude.toFixed(4)}, {workshop.longitude.toFixed(4)}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-orange-600 bg-orange-100 px-2 py-1 rounded">
                          Fehlt
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {getStatusBadge(workshop.status)}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {new Date(workshop.created_at).toLocaleDateString('de-DE')}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {/* Status Actions */}
                        {workshop.status !== 'approved' && (
                          <button
                            onClick={() => updateStatus(workshop.id, 'approved')}
                            disabled={actionLoading === workshop.id}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Freigeben"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                        )}
                        {workshop.status !== 'rejected' && (
                          <button
                            onClick={() => updateStatus(workshop.id, 'rejected')}
                            disabled={actionLoading === workshop.id}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Ablehnen"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        )}

                        {/* Coordinates */}
                        <button
                          onClick={() => {
                            setSelectedWorkshop(workshop);
                            setShowCoordsModal(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Koordinaten setzen"
                        >
                          <MapPin className="w-5 h-5" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => deleteWorkshop(workshop.id)}
                          disabled={actionLoading === workshop.id}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Löschen"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Coordinates Modal */}
      {showCoordsModal && selectedWorkshop && (
        <CoordinatesModal
          workshop={selectedWorkshop}
          onClose={() => {
            setShowCoordsModal(false);
            setSelectedWorkshop(null);
          }}
          onSave={handleCoordinatesSaved}
        />
      )}
    </div>
  );
}

