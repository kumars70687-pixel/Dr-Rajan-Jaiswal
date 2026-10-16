import React from 'react';
import { Star, MessageSquareQuote, ExternalLink, ShieldCheck } from 'lucide-react';
import { CLINIC_INFO, TRANSLATIONS } from '../data/content';
import { Language } from '../types';

interface ReviewsSectionProps {
  language: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language].reviews;

  return (
    <section id="reviews" className="py-20 bg-[var(--theme-bg-main)] border-b border-[var(--theme-border)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--theme-accent)] mb-2">
              Patient Testimonials
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--theme-text-main)] tracking-tight">
              {t.title}
            </h2>
            <p className="mt-3 text-base text-[var(--theme-text-muted)]">
              {t.subtitle}
            </p>
          </div>

          {/* Rating Summary Box */}
          <div className="bg-[var(--theme-bg-surface)] border border-[var(--theme-border)] rounded-2xl p-5 shadow-xs shrink-0 max-w-xs transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-extrabold text-[var(--theme-text-main)]">
                {t.averageScore}
              </span>
              <div>
                <div className="flex text-amber-400" aria-label="5 stars rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs font-semibold text-[var(--theme-text-main)] mt-0.5">
                  {t.totalReviews}
                </p>
              </div>
            </div>
            <p className="text-[11px] text-[var(--theme-text-muted)] mt-2 pt-2 border-t border-[var(--theme-border-subtle)] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--theme-accent)] shrink-0" />
              <span>{t.ratingNotice}</span>
            </p>
          </div>
        </div>

        {/* 3 Authentic Excerpt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-[var(--theme-bg-surface)] rounded-2xl p-7 border border-[var(--theme-border)] shadow-xs flex flex-col justify-between hover:shadow-md transition-all relative"
            >
              <div>
                <MessageSquareQuote className="w-8 h-8 text-[var(--theme-accent)] opacity-40 mb-4" />
                <div className="flex text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-sm sm:text-base text-[var(--theme-text-main)] font-medium leading-relaxed italic">
                  &ldquo;{card.quote}&rdquo;
                </blockquote>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--theme-border-subtle)] flex items-center justify-between text-xs">
                <span className="text-[var(--theme-text-muted)] font-medium">{card.reviewer}</span>
                <span className="font-semibold text-[var(--theme-accent)] bg-[var(--theme-bg-accent-subtle)] px-2 py-0.5 rounded border border-[var(--theme-border-subtle)]">
                  {card.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View on Google Maps Link Button */}
        <div className="mt-12 text-center">
          <a
            href={CLINIC_INFO.mapsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--theme-bg-surface)] hover:bg-[var(--theme-bg-subtle)] text-[var(--theme-text-main)] font-semibold text-sm border border-[var(--theme-border)] shadow-xs transition-all"
          >
            <span>{t.viewMapsBtn}</span>
            <ExternalLink className="w-4 h-4 opacity-60" />
          </a>
        </div>
      </div>
    </section>
  );
};
