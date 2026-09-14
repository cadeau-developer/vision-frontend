import { useState } from 'react';
import { Link } from 'wouter';
import { KeyRound, LayoutDashboard, Images, Sparkles, Send } from 'lucide-react';
import { Overview } from './Overview';
import { ServicesAdmin } from './ServicesAdmin';
import { RequestsAdmin } from './RequestsAdmin';
import { GalleryAdmin } from './GalleryAdmin';
import { PasswordAdmin } from './PasswordAdmin';
import { useI18n } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';

export type AdminTab = 'overview' | 'services' | 'requests' | 'gallery' | 'password';

export function Admin() {
  const { t } = useI18n();
  const { session, logout } = useAuth();
  const [tab, setTab] = useState<AdminTab>('overview');

  const tabs = [
    { key: 'overview' as const, label: t.admin.overview, icon: LayoutDashboard },
    { key: 'services' as const, label: t.admin.services, icon: Sparkles },
    { key: 'requests' as const, label: t.admin.requests, icon: Send },
    { key: 'gallery' as const, label: t.admin.gallery, icon: Images },
    { key: 'password' as const, label: t.admin.password, icon: KeyRound },
  ];

  return (
    <div className="min-h-[100dvh] bg-canvas">
      <header className="border-b-2 border-brand-strong bg-gradient-to-r from-brand to-brand-strong text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <Link href="/" className="flex items-center gap-2 font-extrabold text-white" data-testid="link-admin-logo">
            <img src="/vision-logo.jpeg" alt="Vision Design logo" className="h-9 w-9 rounded-lg object-cover ring-2 ring-white/40" />
            <span>Vision Design</span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="max-w-[220px] truncate text-white/80">{session?.email}</span>
            <Link href="/" className="hidden font-semibold text-white/85 transition hover:text-white sm:block" data-testid="link-admin-view-site">{t.nav.viewSite}</Link>
            <button onClick={() => logout()} className="rounded-lg bg-white px-4 py-2 font-semibold text-brand transition hover:bg-canvas" data-testid="button-sign-out">{t.nav.signOut}</button>
          </div>
        </div>
      </header>
      <nav className="mx-auto max-w-6xl px-5">
        <div className="flex gap-1 overflow-x-auto pt-5">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-t-md border-b-2 px-4 py-2.5 text-sm font-semibold transition ${tab === key ? 'border-brand text-brand' : 'border-transparent text-soft hover:text-ink'}`}
              data-testid={`tab-admin-${key}`}
            >
              <Icon size={16} />{label}
            </button>
          ))}
        </div>
      </nav>
      <main className="mx-auto max-w-6xl px-5 py-6 pb-16">
        {tab === 'overview' && <Overview setTab={setTab} />}
        {tab === 'services' && <ServicesAdmin />}
        {tab === 'requests' && <RequestsAdmin />}
        {tab === 'gallery' && <GalleryAdmin />}
        {tab === 'password' && <PasswordAdmin />}
      </main>
    </div>
  );
}