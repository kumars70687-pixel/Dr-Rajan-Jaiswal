import React, { useState, useEffect } from 'react';
import {
  Database,
  X,
  RefreshCw,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  Search,
  Copy,
  ExternalLink,
  Code2,
  AlertTriangle,
} from 'lucide-react';
import {
  AppointmentRecord,
  fetchAppointmentsFromSupabase,
  updateAppointmentStatusInSupabase,
  SUPABASE_PROJECT_ID,
  SUPABASE_APPOINTMENTS_SCHEMA_SQL,
} from '../lib/supabase';
import { Language } from '../types';

interface AppointmentsPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const AppointmentsPortalModal: React.FC<AppointmentsPortalModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTableMissing, setIsTableMissing] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadAppointments = async () => {
    setLoading(true);
    setError(null);
    setIsTableMissing(false);
    const result = await fetchAppointmentsFromSupabase();
    setLoading(false);
    if (result.success && result.data) {
      setAppointments(result.data);
    } else {
      setError(result.error || 'Failed to connect to Supabase');
      if (result.isTableMissing) {
        setIsTableMissing(true);
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadAppointments();
    }
  }, [isOpen]);

  const handleStatusChange = async (id: string, newStatus: AppointmentRecord['status']) => {
    setUpdatingId(id);
    const success = await updateAppointmentStatusInSupabase(id, newStatus);
    setUpdatingId(null);
    if (success) {
      setAppointments((prev) =>
        prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
      );
    }
  };

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(SUPABASE_APPOINTMENTS_SCHEMA_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  if (!isOpen) return null;

  const filtered = appointments.filter((apt) => {
    const matchesSearch =
      apt.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.phone.includes(searchQuery) ||
      (apt.reason && apt.reason.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = filterStatus === 'all' || apt.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="portal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-[var(--theme-bg-surface)] text-[var(--theme-text-main)] rounded-2xl max-w-5xl w-full p-5 sm:p-8 shadow-2xl border border-[var(--theme-border)] relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--theme-border)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-600 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 id="portal-title" className="text-lg sm:text-xl font-bold">
                {language === 'hi'
                  ? 'सुपाबेस अपॉइंटमेंट डेटाबेस पोर्टल'
                  : 'Supabase Appointments Portal'}
              </h2>
              <div className="flex items-center gap-2 text-xs text-[var(--theme-text-muted)] mt-0.5">
                <span>Project ID: <strong className="font-mono text-emerald-600">{SUPABASE_PROJECT_ID}</strong></span>
                <span aria-hidden="true">·</span>
                <a
                  href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--theme-accent)] underline inline-flex items-center gap-0.5"
                >
                  <span>Supabase Dashboard</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadAppointments}
              disabled={loading}
              className="p-2 text-[var(--theme-text-muted)] hover:text-[var(--theme-text-main)] rounded-lg hover:bg-[var(--theme-bg-subtle)] border border-[var(--theme-border)] transition-colors cursor-pointer"
              title="Refresh database"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[var(--theme-text-muted)] hover:text-[var(--theme-text-main)] rounded-lg hover:bg-[var(--theme-bg-subtle)] transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {/* Table missing banner if user hasn't created the table in SQL Editor */}
          {isTableMissing && (
            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl space-y-3 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold">Database Table Setup Required in Supabase</h4>
                  <p className="mt-1 leading-relaxed">
                    Connected to Supabase project <code className="font-mono bg-amber-100 dark:bg-amber-900/50 px-1.5 py-0.5 rounded">{SUPABASE_PROJECT_ID}</code>! To store appointments, the <code className="font-mono font-semibold">appointments</code> table needs to be created in your Supabase SQL Editor.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={copySqlToClipboard}
                  className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedSql ? 'SQL Script Copied!' : 'Copy Schema SQL Script'}</span>
                </button>

                <a
                  href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql/new`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 text-amber-950 dark:text-amber-200 font-semibold rounded-lg text-xs flex items-center gap-1.5 hover:bg-amber-50 cursor-pointer"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Open Supabase SQL Editor</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}

          {error && !isTableMissing && (
            <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300">
              <p className="font-semibold">Supabase Connection Notice:</p>
              <p className="mt-0.5 font-mono">{error}</p>
            </div>
          )}

          {/* Controls: Search & Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[var(--theme-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patient name, phone number, or reason..."
                className="w-full pl-9 pr-3 py-2 bg-[var(--theme-bg-subtle)] border border-[var(--theme-border)] rounded-xl text-xs sm:text-sm text-[var(--theme-text-main)] focus:outline-hidden focus:ring-2 focus:ring-[var(--theme-accent)]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[var(--theme-text-muted)]">Status:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-[var(--theme-bg-subtle)] border border-[var(--theme-border)] rounded-xl text-xs text-[var(--theme-text-main)] focus:outline-hidden"
              >
                <option value="all">All ({appointments.length})</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Appointments Table / List */}
          {loading && appointments.length === 0 ? (
            <div className="py-12 text-center text-xs sm:text-sm text-[var(--theme-text-muted)]">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-600" />
              <p>Connecting to Supabase and retrieving records...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center border-2 border-dashed border-[var(--theme-border)] rounded-2xl p-6">
              <Database className="w-8 h-8 text-[var(--theme-text-muted)] opacity-40 mx-auto mb-2" />
              <p className="text-sm font-semibold text-[var(--theme-text-main)]">
                {appointments.length === 0
                  ? 'No appointments found in Supabase yet.'
                  : 'No appointments match the search filters.'}
              </p>
              <p className="text-xs text-[var(--theme-text-muted)] mt-1 max-w-sm mx-auto">
                Appointments submitted via the website booking form will automatically be stored here and accessible anytime.
              </p>
            </div>
          ) : (
            <div className="border border-[var(--theme-border)] rounded-xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[var(--theme-bg-subtle)] text-[var(--theme-text-muted)] uppercase tracking-wider font-semibold border-b border-[var(--theme-border)]">
                    <tr>
                      <th className="py-3 px-4">Patient Name</th>
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4">Requested Slot</th>
                      <th className="py-3 px-4">Reason</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--theme-border-subtle)]">
                    {filtered.map((apt) => {
                      const cleanPhone = apt.phone.replace(/[\s\-()]/g, '');
                      const waPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone.replace(/^0/, '')}`;
                      const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
                        `Hello ${apt.patient_name}, regarding your appointment request for ${apt.preferred_date} (${apt.preferred_time}) with Dr. Rajan Jaiswal's clinic...`
                      )}`;

                      return (
                        <tr
                          key={apt.id}
                          className="hover:bg-[var(--theme-bg-subtle)] transition-colors"
                        >
                          <td className="py-3 px-4 font-semibold text-[var(--theme-text-main)]">
                            <div>{apt.patient_name}</div>
                            <span className="text-[10px] text-[var(--theme-text-muted)] font-mono">
                              ID: {apt.id.slice(0, 8)}...
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1.5 font-medium text-[var(--theme-text-main)]">
                              <Phone className="w-3 h-3 text-emerald-600" />
                              <a
                                href={`tel:${apt.phone}`}
                                className="hover:underline"
                              >
                                {apt.phone}
                              </a>
                            </div>
                            <span className="text-[10px] text-[var(--theme-text-muted)] capitalize">
                              Via {apt.contact_method}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            <div className="font-medium text-[var(--theme-text-main)]">
                              {apt.preferred_date}
                            </div>
                            <div className="text-[10px] text-[var(--theme-text-muted)] flex items-center gap-1">
                              <Clock className="w-2.5 h-2.5" />
                              <span className="capitalize">{apt.preferred_time}</span>
                            </div>
                          </td>

                          <td className="py-3 px-4 max-w-xs text-[var(--theme-text-muted)]">
                            <span className="line-clamp-2">{apt.reason || '—'}</span>
                          </td>

                          <td className="py-3 px-4">
                            <select
                              value={apt.status}
                              disabled={updatingId === apt.id}
                              onChange={(e) =>
                                handleStatusChange(
                                  apt.id,
                                  e.target.value as AppointmentRecord['status']
                                )
                              }
                              className={`px-2 py-1 rounded text-[11px] font-semibold border cursor-pointer ${
                                apt.status === 'confirmed'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300'
                                  : apt.status === 'completed'
                                  ? 'bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-950/40 dark:text-blue-300'
                                  : apt.status === 'cancelled'
                                  ? 'bg-red-50 text-red-800 border-red-300 dark:bg-red-950/40 dark:text-red-300'
                                  : 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300'
                              }`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>

                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1.5">
                              <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg transition-colors"
                                title="Reply on WhatsApp"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </a>
                              <a
                                href={`tel:${apt.phone}`}
                                className="p-1.5 bg-[var(--theme-bg-subtle)] hover:opacity-80 text-[var(--theme-text-main)] rounded-lg transition-colors border border-[var(--theme-border)]"
                                title="Call patient"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-[var(--theme-border)] flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--theme-text-muted)]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Direct live connection with Supabase database</span>
          </div>

          <button
            type="button"
            onClick={copySqlToClipboard}
            className="text-[var(--theme-accent)] hover:underline inline-flex items-center gap-1 font-medium cursor-pointer"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>{copiedSql ? 'Schema Copied!' : 'View / Copy SQL Table Schema'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
