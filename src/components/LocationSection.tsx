import React from 'react';
import { MapPin, Clock, Phone, MessageSquare, Navigation, ShieldCheck } from 'lucide-react';
import { CLINIC_INFO, TRANSLATIONS, getWhatsappUrl } from '../data/content';
import { Language } from '../types';

interface LocationSectionProps {
  language: Language;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language].location;

  return (
    <section id="location" className="py-20 bg-[var(--theme-bg-subtle)] border-b border-[var(--theme-border)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--theme-accent)] mb-2">
            Visit the Clinic
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--theme-text-main)] tracking-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-base text-[var(--theme-text-muted)]">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-2xl p-6 sm:p-7 space-y-6 shadow-xs transition-colors">
              {/* Full Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--theme-bg-accent-subtle)] text-[var(--theme-accent)] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--theme-text-main)] uppercase tracking-wide">
                    {t.addressTitle}
                  </h3>
                  <address className="not-italic text-sm sm:text-base text-[var(--theme-text-muted)] font-medium mt-1 leading-snug">
                    <p>{t.addressLine1}</p>
                    <p>{t.addressLine2}</p>
                    <p>{t.addressLine3}</p>
                  </address>
                  <p className="text-xs text-[var(--theme-text-muted)] opacity-80 mt-2">
                    {t.landmarks}
                  </p>
                </div>
              </div>

              {/* Consultation Timing Notice */}
              <div className="flex items-start gap-4 pt-4 border-t border-[var(--theme-border)]">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--theme-text-main)] uppercase tracking-wide">
                    {t.timingTitle}
                  </h3>
                  <p className="text-sm sm:text-base font-bold text-[var(--theme-text-main)] mt-0.5">
                    {t.timingMain}
                  </p>
                  <p className="text-xs text-[var(--theme-text-muted)] mt-1.5 leading-relaxed">
                    {t.timingNotice}
                  </p>
                </div>
              </div>

              {/* Contact Telephone & WhatsApp */}
              <div className="flex items-start gap-4 pt-4 border-t border-[var(--theme-border)]">
                <div className="w-10 h-10 rounded-xl bg-[var(--theme-bg-accent-subtle)] text-[var(--theme-accent)] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--theme-text-main)] uppercase tracking-wide">
                    {t.phoneTitle}
                  </h3>
                  <a
                    href={`tel:${CLINIC_INFO.phoneTel}`}
                    className="text-base sm:text-lg font-bold text-[var(--theme-text-main)] hover:text-[var(--theme-accent)] transition-colors inline-block mt-0.5"
                  >
                    {t.phoneText}
                  </a>
                  <p className="text-xs text-[var(--theme-text-muted)] mt-0.5">
                    {t.phoneSubtext}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={CLINIC_INFO.mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 theme-primary-bg font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-opacity text-center cursor-pointer"
                >
                  <Navigation className="w-4 h-4 opacity-90" />
                  <span>{t.getDirectionsBtn}</span>
                </a>

                <a
                  href={getWhatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t.whatsappEnquiryBtn}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Map Embed / Navigation Visualizer */}
          <div className="lg:col-span-7">
            <div className="bg-[var(--theme-bg-surface)] rounded-2xl border border-[var(--theme-border)] overflow-hidden shadow-sm flex flex-col transition-colors">
              <div className="relative w-full h-[380px] sm:h-[440px] bg-slate-200">
                <iframe
                  title="Google Maps Location for Dr. Rajan Jaiswal, Sector 77 Noida"
                  src="https://maps.google.com/maps?q=Shop+No.+108%2C+Elite+Mart%2C+Elite+Homes%2C+Sector+77%2C+Noida%2C+Uttar+Pradesh+201316&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              {/* Map footer helper */}
              <div className="p-4 bg-[var(--theme-bg-surface)] border-t border-[var(--theme-border)] flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--theme-text-muted)]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[var(--theme-accent)]" />
                  <span>Exact address: Shop No. 108, Elite Mart, Sector 77, Noida</span>
                </div>
                <a
                  href={CLINIC_INFO.mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[var(--theme-accent)] hover:underline inline-flex items-center gap-1"
                >
                  <span>Open directly in Google Maps App</span>
                  <Navigation className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
