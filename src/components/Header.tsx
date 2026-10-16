import React, { useState } from 'react';
import { Phone, Menu, X, Globe, CalendarCheck, MessageSquare, Database } from 'lucide-react';
import { CLINIC_INFO, TRANSLATIONS, getWhatsappUrl } from '../data/content';
import { Language, ThemeId } from '../types';
import { ThemeSwitcher } from './ThemeSwitcher';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  currentTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
  onBookClick: () => void;
  onOpenPortal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  currentTheme,
  onThemeChange,
  onBookClick,
  onOpenPortal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[language].nav;

  const navLinks = [
    { href: '#home', label: t.home },
    { href: '#about', label: t.about },
    { href: '#services', label: t.services },
    { href: '#reviews', label: t.reviews },
    { href: '#location', label: t.location },
    { href: '#faq', label: t.faq },
    { href: '#contact', label: t.contact },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[var(--theme-nav-bg)] backdrop-blur-md border-b border-[var(--theme-border)] shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo with simple medical cross */}
          <a
            href="#home"
            className="group flex items-center gap-3.5 focus-visible:outline-2 focus-visible:outline-[var(--theme-accent)] rounded-lg p-1"
          >
            <div className="w-11 h-11 rounded-xl bg-[var(--theme-accent)] text-white flex items-center justify-center shadow-sm group-hover:opacity-90 transition-opacity">
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {/* Clean medical cross */}
                <path d="M10 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v6h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-6v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-6H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h6V4z" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-[var(--theme-text-main)] text-lg sm:text-xl tracking-tight flex items-baseline gap-2">
                <span>{CLINIC_INFO.doctorName}</span>
                <span className="text-xs font-semibold text-[var(--theme-accent)] tracking-normal hidden md:inline">
                  {CLINIC_INFO.doctorNameHindi}
                </span>
              </div>
              <p className="text-xs text-[var(--theme-text-muted)] font-medium">
                Sector 77, Noida · Listed Close 9 PM
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm font-medium text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)] py-1 transition-colors focus-visible:outline-2 focus-visible:outline-[var(--theme-accent)] rounded"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Theme Selector */}
            <ThemeSwitcher
              currentTheme={currentTheme}
              onThemeChange={onThemeChange}
              language={language}
              compact
            />

            {/* Language Switcher */}
            <div className="flex items-center bg-[var(--theme-bg-subtle)] p-1 rounded-lg border border-[var(--theme-border)] text-xs font-semibold">
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 rounded transition-colors ${
                  language === 'en'
                    ? 'bg-[var(--theme-bg-surface)] text-[var(--theme-text-main)] shadow-xs'
                    : 'text-[var(--theme-text-muted)] hover:text-[var(--theme-text-main)]'
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('hi')}
                className={`px-2 py-1 rounded transition-colors ${
                  language === 'hi'
                    ? 'bg-[var(--theme-bg-surface)] text-[var(--theme-text-main)] shadow-xs'
                    : 'text-[var(--theme-text-muted)] hover:text-[var(--theme-text-main)]'
                }`}
                aria-label="Switch to Hindi"
              >
                हिंदी
              </button>
            </div>

            {/* Quick Call Button */}
            <a
              href={`tel:${CLINIC_INFO.phoneTel}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-2 text-xs font-semibold text-[var(--theme-text-main)] bg-[var(--theme-bg-surface)] hover:bg-[var(--theme-bg-subtle)] rounded-lg transition-colors border border-[var(--theme-border)]"
              title="Call Clinic"
            >
              <Phone className="w-3.5 h-3.5 text-[var(--theme-accent)]" aria-hidden="true" />
              <span className="hidden xl:inline">{CLINIC_INFO.phoneDisplay}</span>
            </a>

            {/* Supabase Appointments Portal Button for Clinic Staff */}
            {onOpenPortal && (
              <button
                type="button"
                onClick={onOpenPortal}
                className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-300 dark:border-emerald-800 cursor-pointer"
                title="View Supabase Appointments Portal"
              >
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span>Portal</span>
              </button>
            )}

            {/* Book Appointment CTA */}
            <button
              type="button"
              onClick={onBookClick}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2 theme-primary-bg cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 opacity-90" aria-hidden="true" />
              <span>{t.bookAppointment}</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 sm:hidden">
            {/* Mobile Language switch */}
            <button
              type="button"
              onClick={() => onLanguageChange(language === 'en' ? 'hi' : 'en')}
              className="p-2 text-xs font-bold text-[var(--theme-text-main)] border border-[var(--theme-border)] rounded-lg flex items-center gap-1 bg-[var(--theme-bg-surface)]"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
              <span>{language === 'en' ? 'हिं' : 'EN'}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[var(--theme-text-main)] rounded-lg border border-[var(--theme-border)] hover:bg-[var(--theme-bg-subtle)] focus-visible:outline-2 focus-visible:outline-[var(--theme-accent)]"
              aria-label={t.menuToggle}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--theme-border)] bg-[var(--theme-bg-surface)] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Mobile Theme selector */}
          <div className="py-2 border-b border-[var(--theme-border)] flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--theme-text-muted)]">Theme</span>
            <ThemeSwitcher
              currentTheme={currentTheme}
              onThemeChange={onThemeChange}
              language={language}
              compact={false}
            />
          </div>

          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-3 py-2.5 text-base font-medium text-[var(--theme-text-main)] hover:bg-[var(--theme-bg-subtle)] rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[var(--theme-border)] flex flex-col gap-2.5">
            <a
              href={`tel:${CLINIC_INFO.phoneTel}`}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[var(--theme-text-main)] bg-[var(--theme-bg-subtle)] rounded-lg hover:opacity-90 transition-opacity"
            >
              <Phone className="w-4 h-4 text-[var(--theme-accent)]" />
              <span>{CLINIC_INFO.phoneDisplay}</span>
            </a>

            <a
              href={getWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-emerald-950 bg-emerald-100/90 border border-emerald-300 rounded-lg transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-700" />
              <span>WhatsApp: {CLINIC_INFO.phoneDisplay}</span>
            </a>

            {onOpenPortal && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPortal();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-lg transition-colors cursor-pointer"
              >
                <Database className="w-4 h-4 text-emerald-600" />
                <span>Supabase Appointments Portal</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg shadow-sm theme-primary-bg"
            >
              <CalendarCheck className="w-4 h-4 opacity-90" />
              <span>{t.bookAppointment}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
