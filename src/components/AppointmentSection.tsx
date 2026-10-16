import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Copy,
  ExternalLink,
  X,
  ShieldCheck,
  Database,
  Loader2,
  AlertTriangle,
} from 'lucide-react';
import { CLINIC_INFO, TRANSLATIONS } from '../data/content';
import { AppointmentFormData, Language } from '../types';
import {
  saveAppointmentToSupabase,
  AppointmentRecord,
  SUPABASE_PROJECT_ID,
  SUPABASE_APPOINTMENTS_SCHEMA_SQL,
} from '../lib/supabase';

interface AppointmentSectionProps {
  language: Language;
  onOpenPortal?: () => void;
}

export const AppointmentSection: React.FC<AppointmentSectionProps> = ({
  language,
  onOpenPortal,
}) => {
  const t = TRANSLATIONS[language].appointment;

  const [formData, setFormData] = useState<AppointmentFormData>({
    patientName: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    reason: '',
    contactMethod: 'whatsapp',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [supabaseRecord, setSupabaseRecord] = useState<AppointmentRecord | null>(null);
  const [supabaseError, setSupabaseError] = useState<string | null>(null);
  const [isTableMissing, setIsTableMissing] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  // Calculate minimum selectable date (today's date)
  const todayStr = new Date().toISOString().split('T')[0];

  const validate = (): boolean => {
    const errs: { [key: string]: string } = {};

    if (!formData.patientName.trim()) {
      errs.patientName = t.validation.nameRequired;
    }

    // Clean phone number (strip whitespace, hyphens, and leading +91 or 0)
    const rawPhone = formData.phone.replace(/[\s\-()]/g, '');
    const cleanPhone = rawPhone.replace(/^(\+91|91|0)/, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errs.phone = t.validation.phoneInvalid;
    }

    if (!formData.preferredDate) {
      errs.date = t.validation.dateRequired;
    }

    if (!formData.preferredTime) {
      errs.time = t.validation.timeRequired;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSupabaseError(null);
    setIsTableMissing(false);
    setSupabaseRecord(null);

    // Save to Supabase database
    const result = await saveAppointmentToSupabase(formData);
    setIsSubmitting(false);

    let referenceIdText = '';
    if (result.success && result.record) {
      setSupabaseRecord(result.record);
      referenceIdText = `• Reference ID: #${result.record.id.slice(0, 8).toUpperCase()}`;
    } else {
      setSupabaseError(result.error || 'Failed to save to database');
      if (result.isTableMissing) {
        setIsTableMissing(true);
      }
    }

    const timeLabel =
      t.form.timeOptions.find((o) => o.value === formData.preferredTime)?.label ||
      formData.preferredTime;

    const contactLabel =
      formData.contactMethod === 'whatsapp'
        ? 'WhatsApp'
        : 'Phone Call';

    // Construct polite, formatted message
    const msg = [
      `Hello Dr. Rajan Jaiswal's Clinic,`,
      `I would like to enquire about an appointment:`,
      referenceIdText || null,
      `• Patient Name: ${formData.patientName.trim()}`,
      `• Contact Number: ${formData.phone.trim()}`,
      `• Preferred Date: ${formData.preferredDate}`,
      `• Preferred Time: ${timeLabel}`,
      `• Preferred Contact: ${contactLabel}`,
      formData.reason.trim() ? `• Reason for visit: ${formData.reason.trim()}` : null,
      `Please let me know your available consultation timings. Thank you!`,
    ]
      .filter(Boolean)
      .join('\n');

    setGeneratedMessage(msg);
    setModalOpen(true);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const copySqlScript = () => {
    navigator.clipboard.writeText(SUPABASE_APPOINTMENTS_SCHEMA_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  const handleOpenWhatsapp = () => {
    const url = `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(
      generatedMessage
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-20 bg-[var(--theme-bg-main)] border-b border-[var(--theme-border)] transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--theme-accent)] mb-2">
            <Calendar className="w-4 h-4" />
            <span>Consultation Enquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--theme-text-main)] tracking-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-base text-[var(--theme-text-muted)]">
            {t.subtitle}
          </p>

          {/* Database Connected Badge */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-medium text-emerald-800 dark:text-emerald-300">
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              <span>Connected to Supabase Database (Project: {SUPABASE_PROJECT_ID})</span>
            </div>

            {onOpenPortal && (
              <button
                type="button"
                onClick={onOpenPortal}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-[var(--theme-accent)] hover:underline cursor-pointer"
              >
                <span>View Appointments Portal</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Clear Non-Confirmed Booking & Non-Emergency Warning */}
        <div className="mb-8 p-4 bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-xl space-y-2 text-xs sm:text-sm text-[var(--theme-text-muted)] transition-colors">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[var(--theme-accent)] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-[var(--theme-text-main)]">{t.warning}</strong>
            </p>
          </div>
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 bg-amber-50/80 dark:bg-amber-950/30 px-3 py-2 rounded-lg border border-amber-200/80 dark:border-amber-800/60">
            <AlertCircle className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
            <p className="font-semibold">{t.form.emergencyAlert} (Call 112)</p>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-[var(--theme-bg-surface)] rounded-2xl border border-[var(--theme-border)] p-6 sm:p-10 shadow-sm transition-colors">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Row 1: Name and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="patientName"
                  className="block text-xs font-bold uppercase tracking-wider text-[var(--theme-text-main)] mb-1.5"
                >
                  {t.form.nameLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="patientName"
                  value={formData.patientName}
                  onChange={(e) => {
                    setFormData({ ...formData, patientName: e.target.value });
                    if (errors.patientName) setErrors({ ...errors, patientName: '' });
                  }}
                  placeholder={t.form.namePlaceholder}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-[var(--theme-text-main)] bg-[var(--theme-bg-surface)] transition-colors focus:ring-2 focus:ring-[var(--theme-accent)] focus:outline-hidden ${
                    errors.patientName
                      ? 'border-red-400 bg-red-50/30'
                      : 'border-[var(--theme-border)] hover:border-[var(--theme-accent)]'
                  }`}
                  aria-invalid={!!errors.patientName}
                  aria-describedby={errors.patientName ? 'patientName-error' : undefined}
                />
                {errors.patientName && (
                  <p id="patientName-error" className="mt-1.5 text-xs text-red-600 font-medium">
                    {errors.patientName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-bold uppercase tracking-wider text-[var(--theme-text-main)] mb-1.5"
                >
                  {t.form.phoneLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  placeholder={t.form.phonePlaceholder}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-[var(--theme-text-main)] bg-[var(--theme-bg-surface)] transition-colors focus:ring-2 focus:ring-[var(--theme-accent)] focus:outline-hidden ${
                    errors.phone
                      ? 'border-red-400 bg-red-50/30'
                      : 'border-[var(--theme-border)] hover:border-[var(--theme-accent)]'
                  }`}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : 'phone-help'}
                />
                <p id="phone-help" className="mt-1 text-[11px] text-[var(--theme-text-muted)]">
                  {t.form.phoneHelp}
                </p>
                {errors.phone && (
                  <p id="phone-error" className="mt-1 text-xs text-red-600 font-medium">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Preferred Date and Preferred Time Window */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="preferredDate"
                  className="block text-xs font-bold uppercase tracking-wider text-[var(--theme-text-main)] mb-1.5"
                >
                  {t.form.dateLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  min={todayStr}
                  value={formData.preferredDate}
                  onChange={(e) => {
                    setFormData({ ...formData, preferredDate: e.target.value });
                    if (errors.date) setErrors({ ...errors, date: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-[var(--theme-text-main)] bg-[var(--theme-bg-surface)] transition-colors focus:ring-2 focus:ring-[var(--theme-accent)] focus:outline-hidden ${
                    errors.date
                      ? 'border-red-400 bg-red-50/30'
                      : 'border-[var(--theme-border)] hover:border-[var(--theme-accent)]'
                  }`}
                  aria-invalid={!!errors.date}
                  aria-describedby={errors.date ? 'date-error' : undefined}
                />
                {errors.date && (
                  <p id="date-error" className="mt-1.5 text-xs text-red-600 font-medium">
                    {errors.date}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="preferredTime"
                  className="block text-xs font-bold uppercase tracking-wider text-[var(--theme-text-main)] mb-1.5"
                >
                  {t.form.timeLabel} <span className="text-red-500">*</span>
                </label>
                <select
                  id="preferredTime"
                  value={formData.preferredTime}
                  onChange={(e) => {
                    setFormData({ ...formData, preferredTime: e.target.value });
                    if (errors.time) setErrors({ ...errors, time: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-[var(--theme-text-main)] bg-[var(--theme-bg-surface)] transition-colors focus:ring-2 focus:ring-[var(--theme-accent)] focus:outline-hidden ${
                    errors.time
                      ? 'border-red-400 bg-red-50/30'
                      : 'border-[var(--theme-border)] hover:border-[var(--theme-accent)]'
                  }`}
                  aria-invalid={!!errors.time}
                  aria-describedby={errors.time ? 'time-error' : undefined}
                >
                  <option value="">{t.form.timePlaceholder}</option>
                  {t.form.timeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <p id="time-error" className="mt-1.5 text-xs text-red-600 font-medium">
                    {errors.time}
                  </p>
                )}
              </div>
            </div>

            {/* Row 3: Reason for visit (optional) */}
            <div>
              <label
                htmlFor="reason"
                className="block text-xs font-bold uppercase tracking-wider text-[var(--theme-text-main)] mb-1.5"
              >
                {t.form.reasonLabel}
              </label>
              <textarea
                id="reason"
                rows={2}
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder={t.form.reasonPlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-[var(--theme-border)] hover:border-[var(--theme-accent)] text-sm text-[var(--theme-text-main)] bg-[var(--theme-bg-surface)] transition-colors focus:ring-2 focus:ring-[var(--theme-accent)] focus:outline-hidden resize-none"
              />
              <p className="mt-1 text-[11px] text-[var(--theme-text-muted)]">
                Please do not include sensitive diagnostic or confidential medical records in this form.
              </p>
            </div>

            {/* Row 4: Preferred Contact Method */}
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-[var(--theme-text-main)] mb-2">
                {t.form.contactMethodLabel}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    formData.contactMethod === 'whatsapp'
                      ? 'border-[var(--theme-accent)] bg-[var(--theme-bg-accent-subtle)] text-[var(--theme-text-main)] font-semibold'
                      : 'border-[var(--theme-border)] hover:border-[var(--theme-border-subtle)] text-[var(--theme-text-muted)]'
                  }`}
                >
                  <input
                    type="radio"
                    name="contactMethod"
                    value="whatsapp"
                    checked={formData.contactMethod === 'whatsapp'}
                    onChange={() => setFormData({ ...formData, contactMethod: 'whatsapp' })}
                    className="accent-teal-600"
                  />
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs sm:text-sm">{t.form.whatsappOption}</span>
                </label>

                <label
                  className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    formData.contactMethod === 'phone'
                      ? 'border-[var(--theme-accent)] bg-[var(--theme-bg-accent-subtle)] text-[var(--theme-text-main)] font-semibold'
                      : 'border-[var(--theme-border)] hover:border-[var(--theme-border-subtle)] text-[var(--theme-text-muted)]'
                  }`}
                >
                  <input
                    type="radio"
                    name="contactMethod"
                    value="phone"
                    checked={formData.contactMethod === 'phone'}
                    onChange={() => setFormData({ ...formData, contactMethod: 'phone' })}
                    className="accent-teal-600"
                  />
                  <Clock className="w-4 h-4 text-[var(--theme-text-muted)]" />
                  <span className="text-xs sm:text-sm">{t.form.phoneOption}</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 text-base font-bold theme-primary-bg rounded-xl shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Saving to Supabase Database...</span>
                  </>
                ) : (
                  <>
                    <Database className="w-5 h-5 opacity-90" />
                    <span>{t.form.submitBtn}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation & WhatsApp Review Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="bg-[var(--theme-bg-surface)] text-[var(--theme-text-main)] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[var(--theme-border)] relative max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-[var(--theme-text-muted)] hover:text-[var(--theme-text-main)] rounded-lg hover:bg-[var(--theme-bg-subtle)] cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Supabase Status Confirmation Header */}
            {supabaseRecord ? (
              <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                    Saved to Supabase Database!
                  </p>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-300 font-mono">
                    Reference ID: #{supabaseRecord.id.slice(0, 8).toUpperCase()}
                  </p>
                </div>
              </div>
            ) : isTableMissing ? (
              <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-xs space-y-2 text-amber-900 dark:text-amber-200">
                <div className="flex items-center gap-2 font-bold">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Supabase Table Not Yet Created</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Your enquiry is ready to send via WhatsApp below. To also persist future bookings directly in Supabase, create the table in your Supabase SQL Editor.
                </p>
                <button
                  type="button"
                  onClick={copySqlScript}
                  className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-[11px] font-semibold cursor-pointer"
                >
                  {copiedSql ? 'Schema Copied!' : 'Copy SQL Table Schema'}
                </button>
              </div>
            ) : supabaseError ? (
              <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-800 dark:text-amber-200">
                <p className="font-semibold">Database Connection Note:</p>
                <p className="text-[11px] font-mono mt-0.5">{supabaseError}</p>
              </div>
            ) : null}

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--theme-bg-accent-subtle)] border border-[var(--theme-border)] text-[var(--theme-accent)] flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 id="modal-title" className="text-lg font-bold text-[var(--theme-text-main)]">
                  {t.modal.title}
                </h3>
                <p className="text-xs text-[var(--theme-text-muted)]">
                  Doctor: {CLINIC_INFO.doctorName} ({CLINIC_INFO.phoneDisplay})
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] mb-4 leading-relaxed">
              {t.modal.body}
            </p>

            {/* Formatted Message Preview */}
            <div className="bg-[var(--theme-bg-subtle)] border border-[var(--theme-border)] rounded-xl p-4 text-xs font-mono text-[var(--theme-text-main)] whitespace-pre-wrap leading-relaxed select-all">
              {generatedMessage}
            </div>

            <p className="text-[11px] text-[var(--theme-text-muted)] mt-2 mb-6">
              {t.modal.disclaimer}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleOpenWhatsapp}
                className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{t.modal.openWhatsappBtn}</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="py-3 px-4 bg-[var(--theme-bg-subtle)] hover:opacity-90 text-[var(--theme-text-main)] font-semibold rounded-xl text-sm flex items-center justify-center gap-2 border border-[var(--theme-border)] transition-opacity cursor-pointer"
              >
                <Copy className="w-4 h-4" />
                <span>{copied ? t.modal.copiedSuccess : t.modal.copyBtn}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
