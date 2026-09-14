import { useGetAdminSummary } from '@/lib/api-client-react';
import { useI18n } from '@/lib/i18n';
import type { AdminTab } from './Admin';

const fallback = { totalServices: 0, newRequests: 0, totalRequests: 0 };

export function Overview({ setTab }: { setTab: (tab: AdminTab) => void }) {
  const { t } = useI18n();
  const summary = useGetAdminSummary();
  const values = summary.data ?? fallback;

  const cards = [
    { label: t.admin.activeServices, value: values.totalServices, target: 'services' as const },
    { label: t.admin.newRequests, value: values.newRequests, target: 'requests' as const },
    { label: t.admin.allRequests, value: values.totalRequests, target: 'requests' as const },
  ];

  return (
    <div>
      <p className="text-lg font-bold text-ink">{t.admin.welcome}</p>
      <p className="text-sm text-soft">{t.admin.overviewText}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {cards.map(({ label, value, target }) => (
          <button key={label} onClick={() => setTab(target)} className="rounded-2xl border border-line bg-white p-6 text-left transition hover:border-brand" data-testid={`card-summary-${label}`}>
            <p className="text-sm font-semibold text-soft">{label}</p>
            <p className="mt-4 text-5xl font-extrabold text-ink">{value}</p>
            <p className="mt-3 text-xs font-bold uppercase tracking-wide text-brand">{t.admin.manage}</p>
          </button>
        ))}
      </div>
    </div>
  );
}