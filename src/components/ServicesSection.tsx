import React from 'react';
import { Stethoscope, Activity, ClipboardList, Pill, AlertTriangle, ArrowRight } from 'lucide-react';
import { TRANSLATIONS } from '../data/content';
import { Language } from '../types';

interface ServicesSectionProps {
  language: Language;
  onBookClick: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ language, onBookClick }) => {
  const t = TRANSLATIONS[language].services;

  const serviceIcons = [
    <Stethoscope className="w-6 h-6 text-[var(--theme-accent)]" key="steth" />,
    <Activity className="w-6 h-6 text-[var(--theme-accent)]" key="act" />,
    <ClipboardList className="w-6 h-6 text-[var(--theme-accent)]" key="clip" />,
    <Pill className="w-6 h-6 text-[var(--theme-accent)]" key="pill" />,
  ];

  return (
    <section id="services" className="py-20 bg-[var(--theme-bg-subtle)] border-b border-[var(--theme-border)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--theme-accent)] mb-2">
            Clinical Offerings
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--theme-text-main)] tracking-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-base text-[var(--theme-text-muted)]">
            {t.subtitle}
          </p>
        </div>

        {/* Responsible Scope Disclaimer */}
        <div className="mb-8 p-4 bg-[var(--theme-bg-accent-subtle)] border border-[var(--theme-border)] rounded-xl text-xs sm:text-sm text-[var(--theme-text-main)] flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-[var(--theme-accent)] text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
            i
          </div>
          <p>{t.disclaimer}</p>
        </div>

        {/* 4 Clean Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.items.map((item, idx) => (
            <div
              key={item.title}
              className="bg-[var(--theme-bg-surface)] rounded-2xl p-7 border border-[var(--theme-border)] shadow-xs hover:border-[var(--theme-accent)] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--theme-bg-accent-subtle)] border border-[var(--theme-border)] flex items-center justify-center">
                    {serviceIcons[idx]}
                  </div>
                  <span className="text-xs font-semibold text-[var(--theme-text-muted)] bg-[var(--theme-bg-subtle)] px-3 py-1 rounded-md border border-[var(--theme-border-subtle)]">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[var(--theme-text-main)] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--theme-text-muted)] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--theme-border-subtle)] flex items-center justify-between">
                <span className="text-xs text-[var(--theme-text-muted)]">Personalized consultation</span>
                <button
                  type="button"
                  onClick={onBookClick}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[var(--theme-accent)] hover:underline transition-all cursor-pointer"
                >
                  <span>Enquire Availability</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Notice Warning */}
        <div className="mt-10 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200/90 dark:border-amber-800/60 rounded-xl flex items-start gap-3 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
          <AlertTriangle className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
          <p>{t.noticeText}</p>
        </div>
      </div>
    </section>
  );
};
