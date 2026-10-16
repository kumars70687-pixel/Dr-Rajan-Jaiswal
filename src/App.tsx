/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { EmergencyBanner } from './components/EmergencyBanner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustSection } from './components/TrustSection';
import { AboutDoctor } from './components/AboutDoctor';
import { ServicesSection } from './components/ServicesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { AppointmentSection } from './components/AppointmentSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { AppointmentsPortalModal } from './components/AppointmentsPortalModal';
import { Language, ThemeId } from './types';

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('dr_jaiswal_lang');
      return saved === 'hi' ? 'hi' : 'en';
    } catch {
      return 'en';
    }
  });

  const [theme, setTheme] = useState<ThemeId>(() => {
    try {
      const saved = localStorage.getItem('dr_jaiswal_theme') as ThemeId;
      if (saved && ['sage', 'sapphire', 'champagne', 'nocturne'].includes(saved)) {
        return saved;
      }
      return 'sage'; // Default Theme: Warm Serene Sage & Deep Forest
    } catch {
      return 'sage';
    }
  });

  const [portalOpen, setPortalOpen] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem('dr_jaiswal_lang', lang);
    } catch {
      // safe fallback
    }
  };

  const handleThemeChange = (newTheme: ThemeId) => {
    setTheme(newTheme);
    try {
      localStorage.setItem('dr_jaiswal_theme', newTheme);
    } catch {
      // safe fallback
    }
  };

  const scrollToAppointment = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
      // Focus patient name input for keyboard accessibility
      const input = document.getElementById('patientName');
      if (input) {
        setTimeout(() => input.focus(), 400);
      }
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'nocturne') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div
      data-theme={theme}
      className="min-h-screen flex flex-col bg-[var(--theme-bg-main)] text-[var(--theme-text-main)] transition-colors duration-200"
    >
      {/* 1. Emergency Banner */}
      <EmergencyBanner language={language} />

      {/* 2. Main Navigation Header with integrated Theme Switcher and Portal Button */}
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        currentTheme={theme}
        onThemeChange={handleThemeChange}
        onBookClick={scrollToAppointment}
        onOpenPortal={() => setPortalOpen(true)}
      />

      <main className="flex-1">
        {/* 3. Hero Section */}
        <Hero language={language} onBookClick={scrollToAppointment} />

        {/* 4. Trust Section (Principles & Patient Review Themes) */}
        <TrustSection language={language} />

        {/* 5. About the Doctor (Verified facts & editable placeholders) */}
        <AboutDoctor language={language} />

        {/* 6. Clinical Consultation Services */}
        <ServicesSection language={language} onBookClick={scrollToAppointment} />

        {/* 7. Patient Testimonials & Google Maps Review Excerpts */}
        <ReviewsSection language={language} />

        {/* 8. Location, Timings, & Interactive Map */}
        <LocationSection language={language} />

        {/* 9. Appointment Enquiry Form with Supabase Database Persistence */}
        <AppointmentSection
          language={language}
          onOpenPortal={() => setPortalOpen(true)}
        />

        {/* 10. Frequently Asked Questions */}
        <FaqSection language={language} />
      </main>

      {/* 11. Footer with Regulatory Disclaimers */}
      <Footer language={language} onBookClick={scrollToAppointment} />

      {/* 12. Floating WhatsApp Instant Action */}
      <FloatingWhatsApp language={language} />

      {/* 13. Floating Theme Selector Bar (Convenient quick switch on all devices) */}
      <aside
        aria-label="Theme selector controls"
        className="fixed bottom-6 left-6 z-40 hidden sm:block bg-[var(--theme-bg-surface)] p-1.5 rounded-2xl shadow-xl border border-[var(--theme-border)] backdrop-blur-md"
      >
        <ThemeSwitcher
          currentTheme={theme}
          onThemeChange={handleThemeChange}
          language={language}
        />
      </aside>

      {/* 14. Supabase Appointments Portal Modal */}
      <AppointmentsPortalModal
        isOpen={portalOpen}
        onClose={() => setPortalOpen(false)}
        language={language}
      />
    </div>
  );
}
