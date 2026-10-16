import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { CLINIC_INFO, getWhatsappUrl } from '../data/content';
import { Language } from '../types';

interface FloatingWhatsAppProps {
  language: Language;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ language }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const tooltipText =
    language === 'hi'
      ? 'डॉ राजन जायसवाल के क्लीनिक से व्हाट्सएप पर जुड़ें'
      : 'Connect with Dr. Rajan Jaiswal on WhatsApp';

  return (
    <aside aria-label="WhatsApp Instant Chat" className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Tooltip Preview Popup */}
      {showTooltip && (
        <div className="mb-2 bg-white text-slate-800 text-xs py-2 px-3.5 rounded-xl shadow-lg border border-slate-200 flex items-center gap-2 max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span className="font-medium">{tooltipText}</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={getWhatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 group"
        aria-label={`Open WhatsApp to message Dr. Rajan Jaiswal at +91 98217 84204`}
        title={`WhatsApp Dr. Rajan Jaiswal (${CLINIC_INFO.phoneDisplay})`}
      >
        <MessageSquare className="w-7 h-7 fill-white/20 group-hover:scale-110 transition-transform" />
      </a>
    </aside>
  );
};
