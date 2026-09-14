import { useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'wouter';
import { Check, MessageCircle } from 'lucide-react';
import { useListServices, useCreateServiceRequest } from '@/lib/api-client-react';
import { Field } from '@/components/FormFields';
import { LanguageSelector } from '@/components/LanguageSelector';
import { fallbackServices } from '@/data/services';
import { translateServices } from '@/data/services-rw';
import { WHATSAPP_LINK } from '@/data/contact';
import { useI18n } from '@/lib/i18n';

export function RequestPage() {
  const { t, locale } = useI18n();
  const servicesQuery = useListServices();
  const create = useCreateServiceRequest();
  const rawServices = servicesQuery.data?.filter((s) => s.isActive) ?? fallbackServices;
  const services = locale === 'rw' ? translateServices(rawServices) : rawServices;
  const [params] = useSearchParams();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ clientName: '', email: '', phone: '', service: params.get('service') ?? '', message: '' });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    create.mutate({ data: form }, { onSuccess: () => setSent(true) });
  };

  return (
    <div className="min-h-[100dvh] bg-canvas text-ink">
      <header className="sticky top-0 z-30 bg-gradient-to-r from-brand to-brand-strong text-white shadow-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
          <Link href="/" className="flex items-center gap-2.5 font-extrabold" data-testid="link-logo">
            <img src="/vision-logo.jpeg" alt="Vision Design logo" className="h-10 w-10 rounded-xl object-cover ring-2 ring-white/40" />
            <span className="hidden sm:inline">Vision Design</span>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSelector variant="dark" />
            <Link href="/" className="text-sm font-semibold text-white/85 transition hover:text-white" data-testid="link-back-home">{t.nav.backToSite}</Link>
          </div>
        </div>
      </header>
      <main className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[1fr_1.15fr] md:py-16">
        <div>
          <p className="eyebrow text-brand">{t.request.eyebrow}</p>
          <h1 className="mt-3 max-w-md text-3xl font-extrabold leading-tight md:text-5xl">{t.request.title}</h1>
          <p className="mt-4 max-w-md leading-7 text-soft">{t.request.text}</p>
          <div className="mt-8 rounded-2xl border border-line bg-white p-6">
            <p className="font-bold">{t.request.goodToKnow}</p>
            <p className="mt-2 text-sm leading-6 text-soft">{t.request.goodToKnowText}</p>
          </div>
        </div>
        <div className="rounded-2xl border border-line bg-white p-6 md:p-8">
          {sent ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white"><Check size={28} /></div>
              <p className="eyebrow mt-7 text-brand">{t.request.successTitle}</p>
              <p className="mt-4 max-w-sm text-sm leading-6 text-soft">{t.request.successText}</p>
              <Link href="/" className="mt-8 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-strong" data-testid="link-request-success-home">{t.request.successButton}</Link>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={t.request.nameLabel} value={form.clientName} onChange={(value) => setForm({ ...form, clientName: value })} placeholder={t.request.namePlaceholder} testId="input-client-name" required />
                <Field label={t.request.emailLabel} type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} placeholder={t.request.emailPlaceholder} testId="input-email" required />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={t.request.phoneLabel} value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} placeholder={t.request.phonePlaceholder} testId="input-phone" required />
                <label className="block">
                  <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-soft">{t.request.serviceLabel}</span>
                  <select value={form.service} onChange={(event) => setForm({ ...form, service: event.target.value })} className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none transition focus:border-brand" required data-testid="select-service">
                    <option value="">{t.request.servicePlaceholder}</option>
                    {services.map((service) => <option key={service.id} value={service.name}>{service.name}</option>)}
                  </select>
                </label>
              </div>
              <label className="block">
                <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-soft">{t.request.messageLabel}</span>
                <textarea value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} rows={5} className="w-full resize-none rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none transition placeholder:text-faint focus:border-brand" placeholder={t.request.messagePlaceholder} data-testid="input-message" />
              </label>
              <button type="submit" disabled={create.isPending} className="rounded-full bg-brand px-7 py-3.5 text-sm font-bold text-white transition hover:bg-brand-strong disabled:opacity-60" data-testid="button-submit-request">
                {create.isPending ? t.request.sending : t.request.submit}
              </button>
            </form>
          )}
        </div>
      </main>
      <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:shadow-xl" aria-label="WhatsApp" data-testid="float-whatsapp">
        <MessageCircle size={26} />
      </a>
    </div>
  );
}