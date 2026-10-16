import React from 'react';
import { AlertCircle, PhoneCall } from 'lucide-react';
import { CLINIC_INFO, TRANSLATIONS } from '../data/content';
import { Language } from '../types';

interface EmergencyBannerProps {
  language: Language;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ language }) => {
  const t = TRANSLATIONS[language].emergencyBanner;

  return (
    <aside
      aria-label="Emergency Notice"
      className="bg-amber-50 border-b border-amber-200/80 px-4 py-2 text-xs text-amber-900 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" aria-hidden="true" />
          <p className="leading-tight">
            <span className="font-semibold text-amber-950">{t.urgent}</span>{' '}
            <span>{t.text}</span>
          </p>
        </div>
        <a
          href={`tel:${CLINIC_INFO.emergencyNumber}`}
          className="inline-flex items-center gap-1.5 font-medium text-amber-900 hover:text-amber-950 underline underline-offset-2 shrink-0 py-0.5 px-1 focus-visible:outline-2 focus-visible:outline-amber-600 rounded"
        >
          <PhoneCall className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Call 112 (Emergency)</span>
        </a>
      </div>
    </aside>
  );
};
