import React from 'react';
import { MapPin, Phone, MessageSquare, AlertCircle, Heart } from 'lucide-react';
import { CLINIC_INFO, TRANSLATIONS, getWhatsappUrl } from '../data/content';
import { Language } from '../types';

interface FooterProps {
  language: Language;
  onBookClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onBookClick }) => {
  const t = TRANSLATIONS[language].footer;

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Clinic Brand & Summary */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500 text-white flex items-center justify-center font-bold">
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M10 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v6h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-6v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-6H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h6V4z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {CLINIC_INFO.doctorName}
                </h3>
                <p className="text-xs text-teal-400 font-medium">
                  {CLINIC_INFO.doctorNameHindi}
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {t.aboutClinic}
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Sector 77, Noida Community Healthcare</span>
              </p>
              <p className="text-slate-400">
                {CLINIC_INFO.closingTimeNote}
              </p>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="text-slate-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-slate-400 hover:text-white transition-colors">
                  Meet Dr. Rajan Jaiswal
                </a>
              </li>
              <li>
                <a href="#services" className="text-slate-400 hover:text-white transition-colors">
                  Consultation Offerings
                </a>
              </li>
              <li>
                <a href="#reviews" className="text-slate-400 hover:text-white transition-colors">
                  Patient Reviews (4.9★)
                </a>
              </li>
              <li>
                <a href="#location" className="text-slate-400 hover:text-white transition-colors">
                  Location & Map Directions
                </a>
              </li>
              <li>
                <a href="#faq" className="text-slate-400 hover:text-white transition-colors">
                  FAQ & Enquiries
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onBookClick}
                  className="text-teal-400 hover:text-teal-300 font-semibold cursor-pointer"
                >
                  Request Consultation Slot
                </button>
              </li>
            </ul>
          </div>

          {/* Clinic Contact */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {t.contactInfo}
            </h4>
            <div className="space-y-2.5 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-1" />
                <address className="not-italic">
                  {CLINIC_INFO.address.full}
                </address>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a
                  href={`tel:${CLINIC_INFO.phoneTel}`}
                  className="hover:text-white transition-colors font-medium text-slate-300"
                >
                  {CLINIC_INFO.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={getWhatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition-colors font-medium text-slate-300"
                >
                  WhatsApp: +91 98217 84204
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory & Emergency Disclaimers */}
        <div className="pt-8 pb-6 border-b border-slate-800/80 space-y-3 text-xs text-slate-400 leading-relaxed">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p>
              <strong className="text-slate-300">{t.disclaimerTitle}: </strong>
              {t.disclaimerText}
            </p>
          </div>
          <p className="pl-6 text-slate-400 text-[11px]">
            {t.privacyNote}
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>{t.copyright}</p>
          <p className="flex items-center gap-1 text-[11px] text-slate-400">
            <span>Dedicated to patient-first community healthcare</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
