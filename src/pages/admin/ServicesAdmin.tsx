import { useState, type FormEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2 } from 'lucide-react';
import {
  getGetAdminSummaryQueryKey,
  getListServicesQueryKey,
  useCreateService,
  useDeleteService,
  useListServices,
  useUpdateService,
} from '@/lib/api-client-react';
import type { Service } from '@/lib/api-client-react';
import { AdminSection } from '@/components/AdminSection';
import { AdminInput, AdminTextarea } from '@/components/FormFields';
import { iconFor } from '@/components/ServiceIcon';
import { useI18n } from '@/lib/i18n';

export function ServicesAdmin() {
  const { t } = useI18n();
  const query = useListServices();
  const client = useQueryClient();
  const create = useCreateService();
  const update = useUpdateService();
  const remove = useDeleteService();
  const [editing, setEditing] = useState<Service | null>(null);
  const blank = { name: '', category: '', description: '', icon: 'sparkles', accent: '#0e7490', displayOrder: 1, isActive: true };
  const [form, setForm] = useState(blank);

  const save = (event: FormEvent) => {
    event.preventDefault();
    if (editing) {
      update.mutate({ id: editing.id, data: form }, {
        onSuccess: () => {
          setEditing(null);
          client.invalidateQueries({ queryKey: getListServicesQueryKey() });
          client.invalidateQueries({ queryKey: getGetAdminSummaryQueryKey() });
        },
      });
    } else {
      create.mutate({ data: form }, {
        onSuccess: () => {
          setForm(blank);
          client.invalidateQueries({ queryKey: getListServicesQueryKey() });
          client.invalidateQueries({ queryKey: getGetAdminSummaryQueryKey() });
        },
      });
    }
  };

  const startEdit = (service: Service) => {
    setEditing(service);
    setForm({
      name: service.name,
      category: service.category,
      description: service.description,
      icon: service.icon,
      accent: service.accent,
      displayOrder: service.displayOrder,
      isActive: service.isActive,
    });
  };

  return (
    <AdminSection
      title={t.admin.services}
      description={t.admin.servicesDesc}
      action={
        <button type="button" onClick={() => { setEditing(null); setForm(blank); }} className="flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-strong" data-testid="button-add-service">
          <Plus size={15} /> {t.admin.addService}
        </button>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {(query.data ?? []).map((service) => (
            <div key={service.id} className="flex items-center justify-between rounded-2xl border border-line bg-white p-5" data-testid={`row-service-${service.id}`}>
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-canvas text-brand">{iconFor(service.icon)}</div>
                <div>
                  <p className="font-bold text-ink">{service.name}</p>
                  <p className="text-xs text-soft">{service.category} · {service.isActive ? t.admin.active : t.admin.hidden}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => startEdit(service)} className="rounded-full px-3 py-2 text-xs font-bold text-brand transition hover:bg-canvas" data-testid={`button-edit-service-${service.id}`}>{t.admin.edit}</button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(t.admin.deleteConfirm)) {
                      remove.mutate({ id: service.id }, { onSuccess: () => { client.invalidateQueries({ queryKey: getListServicesQueryKey() }); client.invalidateQueries({ queryKey: getGetAdminSummaryQueryKey() }); } });
                    }
                  }}
                  className="rounded-full p-2 text-red-500 transition hover:bg-red-50"
                  data-testid={`button-delete-service-${service.id}`}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={save} className="h-fit rounded-2xl border border-line bg-white p-6">
          <p className="eyebrow mb-5 text-brand">{editing ? t.admin.editService : t.admin.newService}</p>
          <div className="space-y-4">
            <AdminInput label={t.admin.serviceName} value={form.name} onChange={(value) => setForm({ ...form, name: value })} testId="input-service-name" />
            <AdminInput label={t.admin.serviceCategory} value={form.category} onChange={(value) => setForm({ ...form, category: value })} testId="input-service-category" />
            <AdminTextarea label={t.admin.serviceDescription} value={form.description} onChange={(value) => setForm({ ...form, description: value })} testId="input-service-description" />
            <AdminInput label={t.admin.serviceIcon} value={form.icon} onChange={(value) => setForm({ ...form, icon: value })} testId="input-service-icon" />
            <div className="grid grid-cols-2 gap-4">
              <AdminInput label={t.admin.serviceAccent} value={form.accent} onChange={(value) => setForm({ ...form, accent: value })} testId="input-service-accent" />
              <AdminInput label={t.admin.serviceOrder} value={String(form.displayOrder)} onChange={(value) => setForm({ ...form, displayOrder: Number(value) || 1 })} testId="input-service-order" />
            </div>
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={form.isActive} onChange={(event) => setForm({ ...form, isActive: event.target.checked })} className="h-4 w-4 rounded border-line text-brand" data-testid="checkbox-service-active" />
              <span className="text-sm font-semibold text-soft">{t.admin.serviceActive}</span>
            </label>
            <button type="submit" className="w-full rounded-xl bg-brand py-3 text-sm font-bold text-white transition hover:bg-brand-strong" data-testid="button-save-service">{t.admin.save}</button>
          </div>
        </form>
      </div>
    </AdminSection>
  );
}