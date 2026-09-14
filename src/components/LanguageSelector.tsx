import { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useI18n, localeLabels, type Locale } from '@/lib/i18n';

const allLocales: Locale[] = ['en', 'fr', 'sw', 'rw'];

interface LanguageSelectorProps {
  variant?: 'light' | 'dark';
}

export function LanguageSelector({ variant = 'light' }: LanguageSelectorProps) {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const dark = variant === 'dark';

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition ${dark ? 'border-white/25 text-white/85 hover:border-white' : 'border-line bg-white text-soft hover:border-brand hover:text-brand'}`}
        data-testid="button-language"
      >
        <Globe size={14} />
        {localeLabels[locale]}
        <ChevronDown size={12} />
      </button>
      {open && (
        <div className={`absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-xl border shadow-xl backdrop-blur ${dark ? 'border-white/15 bg-[#101d2f]/95' : 'border-line bg-white'}`}>
          {allLocales.map((l) => (
            <button
              key={l}
              onClick={() => { setLocale(l); setOpen(false); }}
              className={`flex w-full items-center px-4 py-3 text-left text-xs font-semibold transition ${locale === l ? 'bg-brand text-white' : dark ? 'text-white/70 hover:bg-white/10 hover:text-white' : 'text-soft hover:bg-canvas hover:text-ink'}`}
              data-testid={`button-lang-${l}`}
            >
              {localeLabels[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}