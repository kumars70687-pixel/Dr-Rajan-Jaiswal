import React from 'react';
import { HeartPulse, MessageCircle, MapPin, CalendarDays, CheckCircle2 } from 'lucide-react';
import { TRANSLATIONS } from '../data/content';
import { Language } from '../types';

interface TrustSectionProps {
  language: Language;
}

export const TrustSection: React.FC<TrustSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language].trust;

  const icons = [
    <HeartPulse className="w-5 h-5 text-[var(--theme-accent)]" key="heart" />,
    <MessageCircle className="w-5 h-5 text-[var(--theme-accent)]" key="message" />,
    <MapPin className="w-5 h-5 text-[var(--theme-accent)]" key="map" />,
    <CalendarDays className="w-5 h-5 text-[var(--theme-accent)]" key="calendar" />,
  ];

  return (
    <section className="py-16 bg-[var(--theme-bg-subtle)] border-b border-[var(--theme-border)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--theme-accent)] mb-2">
            Practice Values
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--theme-text-main)] tracking-tight">
            {t.sectionTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--theme-text-muted)]">
            {t.sectionSubtitle}
          </p>
        </div>

        {/* 4 Compact Principle Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.cards.map((card, idx) => (
            <div
              key={card.title}
              className="bg-[var(--theme-bg-surface)] rounded-xl p-6 border border-[var(--theme-border)] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[var(--theme-bg-accent-subtle)] border border-[var(--theme-border)] flex items-center justify-center mb-4">
                  {icons[idx]}
                </div>
                <h3 className="text-base font-bold text-[var(--theme-text-main)] mb-2">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] leading-relaxed">
                  {card.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--theme-border-subtle)] text-xs font-medium text-[var(--theme-accent)]">
                {card.tag}
              </div>
            </div>
          ))}
        </div>

        {/* Review Themes Box */}
        <div className="mt-12 bg-[var(--theme-bg-surface)] rounded-2xl border border-[var(--theme-border)] p-6 sm:p-8 shadow-xs transition-colors">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[var(--theme-border)]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--theme-accent)]">
                Patient Feedback Analysis
              </span>
              <h3 className="text-xl font-bold text-[var(--theme-text-main)] mt-0.5">
                {t.reviewThemesTitle}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] max-w-md">
              {t.reviewThemesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[var(--theme-accent)] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[var(--theme-text-main)]">{t.theme1}</h4>
                <p className="text-xs text-[var(--theme-text-muted)] mt-1 leading-relaxed">
                  {t.theme1Desc}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[var(--theme-accent)] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[var(--theme-text-main)]">{t.theme2}</h4>
                <p className="text-xs text-[var(--theme-text-muted)] mt-1 leading-relaxed">
                  {t.theme2Desc}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[var(--theme-accent)] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[var(--theme-text-main)]">{t.theme3}</h4>
                <p className="text-xs text-[var(--theme-text-muted)] mt-1 leading-relaxed">
                  {t.theme3Desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
