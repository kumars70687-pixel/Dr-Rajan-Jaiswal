import React from 'react';
import { Star, MapPin, Calendar, Clock, MessageSquare, ShieldCheck } from 'lucide-react';
import { CLINIC_INFO, TRANSLATIONS, getWhatsappUrl } from '../data/content';
import { Language } from '../types';

interface HeroProps {
  language: Language;
  onBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onBookClick }) => {
  const t = TRANSLATIONS[language].hero;

  return (
    <section id="home" className="relative overflow-hidden bg-[var(--theme-bg-main)] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[var(--theme-border)] transition-colors">
      {/* Dynamic ambient background tint based on active theme */}
      <div
        className="absolute top-0 right-0 -z-10 w-[32rem] h-[32rem] rounded-full blur-3xl pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: 'var(--theme-hero-tint-1)' }}
      />
      <div
        className="absolute bottom-0 left-0 -z-10 w-[30rem] h-[30rem] rounded-full blur-3xl pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: 'var(--theme-hero-tint-2)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Context line with clean typographic format */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide uppercase">
              <span className="text-[var(--theme-accent)]">Dr. Rajan Jaiswal</span>
              <span aria-hidden="true" className="opacity-40">·</span>
              <span className="text-[var(--theme-text-main)] font-medium">डॉ राजन जायसवाल</span>
              <span aria-hidden="true" className="opacity-40">·</span>
              <a
                href="#location"
                className="inline-flex items-center gap-1 text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[var(--theme-accent)]" aria-hidden="true" />
                <span>Sector 77, Noida</span>
              </a>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--theme-text-main)] tracking-tight leading-[1.15]">
              {t.headline}
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-[var(--theme-text-muted)] leading-relaxed max-w-2xl font-normal">
              {t.subtext}
            </p>

            {/* Google Maps Listing Trust Marker */}
            <div className="bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-xl p-4 max-w-xl shadow-xs transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-500" aria-label="Rating: 4.9 stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-[var(--theme-text-main)] text-base">{t.ratingText}</span>
                  <span className="text-xs text-[var(--theme-text-muted)]">({t.reviewsCountText})</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-[var(--theme-text-muted)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--theme-accent)] shrink-0" />
                  <span>Google Maps listing info</span>
                </div>
              </div>
              <p className="text-xs text-[var(--theme-text-muted)] mt-2 border-t border-[var(--theme-border-subtle)] pt-2 flex items-center justify-between">
                <span>{t.mapsListingNote}</span>
                <span className="font-medium text-[var(--theme-text-main)] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[var(--theme-text-muted)]" />
                  {t.closingBadge}
                </span>
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onBookClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold rounded-xl shadow-md transition-all theme-primary-bg active:scale-[0.99] cursor-pointer"
              >
                <Calendar className="w-5 h-5 opacity-90" aria-hidden="true" />
                <span>{t.bookBtn}</span>
              </button>

              <a
                href={getWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-xl transition-all shadow-xs"
              >
                <MessageSquare className="w-5 h-5 text-emerald-700" aria-hidden="true" />
                <span>{t.whatsappBtn}</span>
              </a>

              <a
                href={CLINIC_INFO.mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-3.5 text-sm font-semibold text-[var(--theme-text-main)] hover:text-[var(--theme-accent)] hover:bg-[var(--theme-bg-subtle)] rounded-xl transition-colors border border-transparent hover:border-[var(--theme-border)]"
              >
                <MapPin className="w-4 h-4 text-[var(--theme-accent)]" aria-hidden="true" />
                <span>Shop 108, Elite Mart, Sector 77</span>
              </a>
            </div>

            {/* Hours guidance warning */}
            <p className="text-xs text-[var(--theme-text-muted)] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 opacity-70 shrink-0" />
              <span>{t.hoursWarning}</span>
            </p>
          </div>

          {/* Right Column: High Quality Realistic Medical Clinic Environment */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80"
                alt="A clean, modern medical consultation office and desk environment"
                className="w-full h-80 sm:h-96 object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold tracking-wider uppercase text-emerald-300">
                    Clinic Environment
                  </span>
                </div>
                <h2 className="text-lg font-bold leading-snug">
                  Elite Mart, Sector 77, Noida
                </h2>
                <p className="text-xs text-slate-200 mt-1">
                  Calm, sanitary, and attentive clinical space for personal patient consultations.
                </p>
              </div>
            </div>

            {/* Floating Info card: Listed Closing Time */}
            <div className="absolute -bottom-5 right-4 sm:-left-6 sm:right-auto bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] shadow-md rounded-xl p-3.5 flex items-center gap-3 max-w-xs transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[var(--theme-bg-accent-subtle)] border border-[var(--theme-border)] text-[var(--theme-accent)] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="font-semibold text-[var(--theme-text-main)]">Listed Close: 9:00 PM</p>
                <p className="text-[var(--theme-text-muted)]">Call to confirm daily doctor timings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
