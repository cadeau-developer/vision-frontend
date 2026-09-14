import { useState, type FormEvent } from 'react';
import { Link, useLocation } from 'wouter';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useI18n } from '@/lib/i18n';
import { LanguageSelector } from '@/components/LanguageSelector';

export function AuthPage() {
  const { t } = useI18n();
  const { login } = useAuth();
  const [, navigate] = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch {
      setError(t.auth.error);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-[100dvh] place-items-center bg-gradient-to-b from-[#d7eef4] to-canvas px-5 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-extrabold text-ink" data-testid="link-auth-logo">
            <img src="/vision-logo.jpeg" alt="Vision Design logo" className="h-9 w-9 rounded-lg object-cover" />
            <span>Vision Design</span>
          </Link>
          <LanguageSelector variant="light" />
        </div>
        <div className="rounded-2xl border border-line bg-white p-8 shadow-sm">
          <p className="eyebrow text-brand">{t.auth.eyebrow}</p>
          <h1 className="mt-2 text-2xl font-extrabold text-ink">{t.auth.title}</h1>
          <p className="mt-2 text-sm text-soft">{t.auth.text}</p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-semibold text-ink">{t.auth.emailLabel}</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm outline-none transition focus:border-brand"
                data-testid="input-email"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-semibold text-ink">{t.auth.passwordLabel}</label>
              <div className="relative">
                <input
                  id="password"
                  type={show ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-line bg-canvas px-4 py-3 pr-10 text-sm outline-none transition focus:border-brand"
                  data-testid="input-password"
                />
                <button
                  type="button"
                  onClick={() => setShow((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-faint transition hover:text-ink"
                  aria-label={show ? 'Hide password' : 'Show password'}
                >
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600" data-testid="auth-error">{error}</p>
            )}
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-xl bg-brand px-4 py-3 text-sm font-bold text-white transition hover:bg-brand-strong disabled:opacity-60"
              data-testid="button-sign-in"
            >
              {busy ? t.auth.signingIn : t.auth.signInBtn}
            </button>
          </form>
        </div>
        <p className="mt-5 text-center text-sm text-faint">
          {t.auth.backTo} <Link href="/" className="font-semibold text-brand hover:text-brand-strong">{t.auth.backLabel}</Link>
        </p>
      </div>
    </div>
  );
}