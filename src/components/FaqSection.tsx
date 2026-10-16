import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { TRANSLATIONS } from '../data/content';
import { Language } from '../types';

interface FaqSectionProps {
  language: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language].faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-[var(--theme-bg-subtle)] border-b border-[var(--theme-border)] transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--theme-accent)] mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Common Queries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--theme-text-main)] tracking-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-base text-[var(--theme-text-muted)]">
            {t.subtitle}
          </p>
        </div>

        {/* Accessible Accordion Items */}
        <div className="space-y-3">
          {t.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const headingId = `faq-heading-${idx}`;
            const panelId = `faq-panel-${idx}`;

            return (
              <div
                key={idx}
                className="bg-[var(--theme-bg-surface)] rounded-2xl border border-[var(--theme-border)] shadow-xs overflow-hidden transition-colors"
              >
                <h3>
                  <button
                    type="button"
                    id={headingId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(idx)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 text-base font-bold text-[var(--theme-text-main)] hover:text-[var(--theme-accent)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--theme-accent)] cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 opacity-60 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[var(--theme-accent)] opacity-100' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headingId}
                    className="px-6 pb-6 pt-1 text-sm text-[var(--theme-text-muted)] leading-relaxed border-t border-[var(--theme-border-subtle)] animate-in fade-in duration-150"
                  >
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
