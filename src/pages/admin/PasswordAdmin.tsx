import { useState, type FormEvent } from 'react';
import { getSessionToken } from '@/lib/session-token';
import { API_BASE_URL } from '@/lib/api-base';
import { AdminSection } from '@/components/AdminSection';
import { useI18n } from '@/lib/i18n';

const MIN_LENGTH = 8;

export function PasswordAdmin() {
  const { t } = useI18n();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setDone(false);
    if (next !== confirm) {
      setError(t.admin.passwordMismatch);
      return;
    }
    if (next.length < MIN_LENGTH) {
      setError(t.admin.passwordTooShort);
      return;
    }
    setBusy(true);
    try {
      const token = getSessionToken();
      const res = await fetch(`${API_BASE_URL}/api/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      });
      if (res.status === 204) {
        setDone(true);
        setCurrent('');
        setNext('');
        setConfirm('');
      } else if (res.status === 400) {
        setError(t.admin.passwordWrongCurrent);
      } else {
        setError(t.admin.passwordFailed);
      }
    } catch {
      setError(t.admin.passwordFailed);
    } finally {
      setBusy(false);
    }
  };

  const inputClass = 'w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand';

  return (
    <AdminSection title={t.admin.password} description={t.admin.passwordDesc}>
      <form onSubmit={submit} className="max-w-md rounded-2xl border border-line bg-white p-6">
        <div className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-xs font-bold text-soft">{t.admin.currentPassword}</span>
            <input type="password" value={current} onChange={(event) => setCurrent(event.target.value)} className={inputClass} required autoComplete="current-password" data-testid="input-admin-current-password" />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-bold text-soft">{t.admin.newPassword}</span>
            <input type="password" value={next} onChange={(event) => setNext(event.target.value)} className={inputClass} required minLength={MIN_LENGTH} autoComplete="new-password" data-testid="input-admin-new-password" />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-bold text-soft">{t.admin.confirmPassword}</span>
            <input type="password" value={confirm} onChange={(event) => setConfirm(event.target.value)} className={inputClass} required minLength={MIN_LENGTH} autoComplete="new-password" data-testid="input-admin-confirm-password" />
          </label>
          {error && <p className="text-sm font-semibold text-red-500" data-testid="password-error">{error}</p>}
          {done && <p className="text-sm font-semibold text-emerald-600" data-testid="password-success">{t.admin.passwordUpdated}</p>}
          <button type="submit" disabled={busy} className="w-full rounded-xl bg-brand py-3 text-sm font-bold text-white transition hover:bg-brand-strong disabled:opacity-60" data-testid="button-change-password">
            {busy ? t.admin.updating : t.admin.updatePassword}
          </button>
        </div>
      </form>
    </AdminSection>
  );
}