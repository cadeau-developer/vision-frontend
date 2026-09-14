import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Eye, X } from 'lucide-react';
import {
  getListServiceRequestsQueryKey,
  useListServiceRequests,
  useUpdateServiceRequest,
} from '@/lib/api-client-react';
import type { ServiceRequest, ServiceRequestStatus } from '@/lib/api-client-react';
import { AdminSection } from '@/components/AdminSection';
import { useI18n } from '@/lib/i18n';

export function RequestsAdmin() {
  const { t } = useI18n();
  const query = useListServiceRequests();
  const client = useQueryClient();
  const update = useUpdateServiceRequest();
  const [selected, setSelected] = useState<ServiceRequest | null>(null);
  const statuses: ServiceRequestStatus[] = ['new', 'contacted', 'in_progress', 'completed', 'archived'];

  return (
    <AdminSection title={t.admin.requests} description={t.admin.requestsDesc}>
      <div className="overflow-x-auto rounded-2xl border border-line bg-white">
        <table className="w-full min-w-[760px] text-left">
          <thead className="border-b border-line text-xs uppercase tracking-wide text-faint">
            <tr>
              <th className="px-5 py-4">{t.admin.client}</th>
              <th className="px-5 py-4">{t.admin.service}</th>
              <th className="px-5 py-4">{t.admin.received}</th>
              <th className="px-5 py-4">{t.admin.status}</th>
              <th className="px-5 py-4">{t.admin.view}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {(query.data ?? []).map((request) => (
              <tr key={request.id} className="text-sm" data-testid={`row-request-${request.id}`}>
                <td className="px-5 py-5">
                  <p className="font-bold text-ink">{request.clientName}</p>
                  <p className="text-xs text-faint">{request.email}</p>
                </td>
                <td className="px-5 py-5 text-soft">{request.service}</td>
                <td className="px-5 py-5 text-soft">{new Date(request.createdAt).toLocaleDateString()}</td>
                <td className="px-5 py-5">
                  <select
                    value={request.status}
                    onChange={(event) => update.mutate(
                      { id: request.id, data: { status: event.target.value as ServiceRequestStatus } },
                      { onSuccess: () => client.invalidateQueries({ queryKey: getListServiceRequestsQueryKey() }) },
                    )}
                    className="rounded-full border border-line bg-canvas px-3 py-2 text-xs font-bold capitalize text-brand outline-none transition focus:border-brand"
                    data-testid={`select-request-status-${request.id}`}
                  >
                    {statuses.map((status) => <option value={status} key={status}>{status.replace('_', ' ')}</option>)}
                  </select>
                </td>
                <td className="px-5 py-5">
                  <button type="button" onClick={() => setSelected(request)} className="rounded-full p-2 text-brand transition hover:bg-canvas" data-testid={`button-view-request-${request.id}`}><Eye size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!query.isLoading && !(query.data?.length) && (
          <div className="p-12 text-center text-sm text-faint" data-testid="empty-requests">{t.admin.noRequests}</div>
        )}
      </div>
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl" onClick={(event) => event.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-ink">{t.admin.requestDetails}</h3>
              <button type="button" onClick={() => setSelected(null)} className="rounded-full p-2 text-soft transition hover:bg-canvas"><X size={18} /></button>
            </div>
            <div className="space-y-4 text-sm">
              <div><p className="font-bold text-soft">{t.admin.client}</p><p className="mt-1 text-ink">{selected.clientName}</p></div>
              <div><p className="font-bold text-soft">{t.admin.email}</p><p className="mt-1 text-ink">{selected.email}</p></div>
              <div><p className="font-bold text-soft">{t.admin.service}</p><p className="mt-1 text-ink">{selected.service}</p></div>
              <div><p className="font-bold text-soft">{t.admin.message}</p><p className="mt-1 leading-6 text-ink">{selected.message || '—'}</p></div>
              <div><p className="font-bold text-soft">{t.admin.received}</p><p className="mt-1 text-ink">{new Date(selected.createdAt).toLocaleString()}</p></div>
            </div>
          </div>
        </div>
      )}
    </AdminSection>
  );
}