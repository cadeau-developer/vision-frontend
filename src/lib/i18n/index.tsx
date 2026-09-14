import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import en from './locales/en';
import fr from './locales/fr';
import sw from './locales/sw';
import rw from './locales/rw';

export type Locale = 'en' | 'fr' | 'sw' | 'rw';

const locales: Record<Locale, typeof en> = { en, fr, sw, rw };

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: typeof en;
}

const I18nContext = createContext<I18nContextValue>({
  locale: 'en',
  setLocale: () => {},
  t: en,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    try {
      return (localStorage.getItem('vd-locale') as Locale) || 'en';
    } catch {
      return 'en';
    }
  });

  const handleSetLocale = useCallback((l: Locale) => {
    setLocale(l);
    try { localStorage.setItem('vd-locale', l); } catch {}
  }, []);

  return (
    <I18nContext.Provider value={{ locale, setLocale: handleSetLocale, t: locales[locale] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  sw: 'Kiswahili',
  rw: 'Kinyarwanda',
};
