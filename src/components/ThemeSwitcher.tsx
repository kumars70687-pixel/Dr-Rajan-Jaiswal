import React from 'react';
import { Palette, Check } from 'lucide-react';
import { THEME_OPTIONS } from '../data/content';
import { Language, ThemeId } from '../types';

interface ThemeSwitcherProps {
  currentTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
  language: Language;
  compact?: boolean;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  currentTheme,
  onThemeChange,
  language,
  compact = false,
}) => {
  return (
    <div
      role="radiogroup"
      aria-label="Theme selector"
      className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 shadow-xs"
    >
      {!compact && (
        <span className="hidden xl:inline-flex items-center gap-1 pl-2 pr-1 text-xs font-semibold text-slate-500">
          <Palette className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'थीम:' : 'Theme:'}</span>
        </span>
      )}

      {THEME_OPTIONS.map((theme) => {
        const isSelected = currentTheme === theme.id;
        const displayName = language === 'hi' ? theme.nameHindi : theme.name;

        return (
          <button
            key={theme.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onThemeChange(theme.id)}
            title={displayName}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-teal-600 ${
              isSelected
                ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/50'
            }`}
          >
            <span
              className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0 flex items-center justify-center"
              style={{ backgroundColor: theme.colorHex }}
            >
              {isSelected && <Check className="w-2 h-2 text-white stroke-[3]" />}
            </span>
            <span className={compact ? 'hidden md:inline' : 'inline'}>{displayName}</span>
          </button>
        );
      })}
    </div>
  );
};
