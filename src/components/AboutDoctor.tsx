import React, { useState } from 'react';
import { UserCheck, ShieldAlert, Award, FileText, CheckCircle, Info, UploadCloud, Stethoscope } from 'lucide-react';
import { CLINIC_INFO, TRANSLATIONS } from '../data/content';
import { Language } from '../types';

interface AboutDoctorProps {
  language: Language;
}

export const AboutDoctor: React.FC<AboutDoctorProps> = ({ language }) => {
  const t = TRANSLATIONS[language].about;
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(null);

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomPhotoUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="about" className="py-20 bg-[var(--theme-bg-main)] border-b border-[var(--theme-border)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--theme-accent)] mb-2">
            <UserCheck className="w-4 h-4" />
            <span>Physician Profile</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--theme-text-main)] tracking-tight">
            {t.title}{' '}
            <span className="text-[var(--theme-accent)] font-semibold block sm:inline sm:ml-2">
              ({t.hindiName})
            </span>
          </h2>
          <p className="mt-3 text-sm font-semibold text-[var(--theme-text-muted)]">
            {t.role}
          </p>
          <p className="mt-4 text-base sm:text-lg text-[var(--theme-text-muted)] leading-relaxed">
            {t.leadPara}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Doctor Photo Placeholder Area */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl border-2 border-dashed border-[var(--theme-border)] bg-[var(--theme-bg-surface)] overflow-hidden text-center p-8 flex flex-col items-center justify-center min-h-[380px] shadow-xs transition-colors">
              {customPhotoUrl ? (
                <div className="relative w-full h-80 rounded-xl overflow-hidden">
                  <img
                    src={customPhotoUrl}
                    alt="Dr. Rajan Jaiswal uploaded portrait"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setCustomPhotoUrl(null)}
                    className="absolute top-2 right-2 bg-slate-900/80 text-white text-xs px-2.5 py-1 rounded-md backdrop-blur-xs hover:bg-slate-900 cursor-pointer"
                  >
                    Reset to Default Placeholder
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-24 h-24 rounded-full bg-[var(--theme-bg-accent-subtle)] text-[var(--theme-accent)] flex items-center justify-center mb-4 shadow-inner">
                    <Stethoscope className="w-12 h-12 stroke-[1.75]" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--theme-text-main)]">
                    {CLINIC_INFO.doctorName}
                  </h3>
                  <p className="text-xs font-semibold text-[var(--theme-accent)] mt-0.5">
                    {CLINIC_INFO.doctorNameHindi}
                  </p>
                  <p className="text-xs text-[var(--theme-text-muted)] mt-2 max-w-xs leading-relaxed">
                    {t.placeholderHelp}
                  </p>

                  <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--theme-bg-subtle)] text-[var(--theme-text-muted)] text-xs font-medium">
                    <Info className="w-3.5 h-3.5" />
                    <span>{t.placeholderBadge}</span>
                  </div>

                  {/* Editable photo upload helper for clinic administrator */}
                  <div className="mt-6 pt-4 border-t border-[var(--theme-border-subtle)] w-full">
                    <label
                      htmlFor="doctor-photo-upload"
                      className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--theme-accent)] bg-[var(--theme-bg-accent-subtle)] hover:opacity-90 border border-[var(--theme-border)] rounded-lg px-3 py-2 transition-opacity"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>Clinic Admin: Preview Official Photo</span>
                    </label>
                    <input
                      id="doctor-photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleSimulatedUpload}
                      className="sr-only"
                    />
                    <p className="text-[11px] text-[var(--theme-text-muted)] mt-1">
                      No stock photo is falsely presented as Dr. Rajan Jaiswal.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Philosophy callout */}
            <div className="bg-[var(--theme-bg-surface)] rounded-xl p-5 border border-[var(--theme-border)] shadow-xs">
              <h4 className="text-sm font-bold text-[var(--theme-text-main)] flex items-center gap-2">
                <Award className="w-4 h-4 text-[var(--theme-accent)]" />
                <span>{t.philosophyTitle}</span>
              </h4>
              <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] mt-2 leading-relaxed">
                {t.philosophyText}
              </p>
            </div>
          </div>

          {/* Profile & Records Ledger */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[var(--theme-bg-surface)] rounded-2xl border border-[var(--theme-border)] p-6 sm:p-8 shadow-xs transition-colors">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--theme-border)]">
                <div>
                  <h3 className="text-lg font-bold text-[var(--theme-text-main)]">
                    {t.verifiedSectionTitle}
                  </h3>
                  <p className="text-xs text-[var(--theme-text-muted)] mt-1">
                    {t.verifiedNotice}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800 shrink-0">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Verified Data Policy</span>
                </div>
              </div>

              {/* Verified & Placeholder Fields List */}
              <div className="divide-y divide-[var(--theme-border-subtle)] mt-2">
                {t.profileItems.map((item, idx) => {
                  const isVerified = item.status === 'verified';
                  return (
                    <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="sm:w-1/3">
                        <span className="text-xs font-bold text-[var(--theme-text-main)]">
                          {item.label}
                        </span>
                        <div className="mt-0.5">
                          {isVerified ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                              <CheckCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                              <span>Verified info</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                              <ShieldAlert className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                              <span>Editable placeholder</span>
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="sm:w-2/3">
                        <p className={`text-xs sm:text-sm ${isVerified ? 'text-[var(--theme-text-main)] font-medium' : 'text-amber-900/90 dark:text-amber-200 italic bg-amber-50/70 dark:bg-amber-950/30 p-2 rounded border border-amber-200/60 dark:border-amber-800/50'}`}>
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Clinic Administrator Note */}
              <div className="mt-6 pt-4 border-t border-[var(--theme-border)] flex items-start gap-2.5 text-xs text-[var(--theme-text-muted)] bg-[var(--theme-bg-subtle)] p-3.5 rounded-xl">
                <FileText className="w-4 h-4 opacity-70 shrink-0 mt-0.5" />
                <p>
                  To maintain strict regulatory compliance, degrees (e.g. MBBS/MD) and state medical council registration numbers are left as clear placeholders until official documentation is uploaded by Dr. Rajan Jaiswal&apos;s clinic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
