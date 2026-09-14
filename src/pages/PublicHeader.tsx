import { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X } from 'lucide-react';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useI18n } from '@/lib/i18n';

export function PublicHeader() {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  const links = [
    { href: '#services', label: t.nav.services, testId: 'link-services' },
    { href: '#gallery', label: t.nav.gallery, testId: 'link-gallery' },
    { href: '#about', label: t.nav.about, testId: 'link-about' },
    { href: '#contact', label: t.nav.contact, testId: 'link-contact' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-brand to-brand-strong text-white shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
        <Link href="/" className="flex items-center gap-2.5 font-extrabold" data-testid="link-logo">
          <img src="/vision-logo.jpeg" alt="Vision Design logo" className="h-10 w-10 rounded-xl object-cover ring-2 ring-white/40" />
          <span className="hidden sm:inline">Vision Design</span>
        </Link>
        <nav className="flex items-center gap-6" aria-label="Main navigation">
          <div className="hidden items-center gap-6 md:flex">
            {links.map(({ href, label, testId }) => (
              <a key={href} href={href} className="text-sm font-semibold text-white/85 transition hover:text-white" data-testid={testId}>{label}</a>
            ))}
          </div>
          <Link href="/request" className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-brand transition hover:bg-canvas" data-testid="link-header-request">
            {t.nav.startProject}
          </Link>
          <div className="ml-10 hidden md:block">
            <LanguageSelector variant="dark" />
          </div>
          <div className="flex items-center gap-3 md:hidden">
            <button onClick={() => setOpen((value) => !value)} className="rounded-lg border border-white/25 p-2 text-white" aria-label="Open menu" data-testid="button-mobile-menu">
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </div>
      {open && (
        <div className="border-t border-white/15 bg-brand-strong/95 px-5 py-4 backdrop-blur md:hidden">
          <div className="flex flex-col gap-3">
            {links.map(({ href, label, testId }) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="font-semibold text-white" data-testid={`link-mobile-${testId.replace('link-', '')}`}>{label}</a>
            ))}
            <Link href="/request" className="rounded-lg bg-white px-4 py-3 text-center font-bold text-brand" data-testid="link-mobile-request">{t.nav.startProject}</Link>
            <div className="mt-1">
              <LanguageSelector variant="dark" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}