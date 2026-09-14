import { useEffect, useState } from 'react';
import { useListServices } from '@/lib/api-client-react';
import { ArrowRight, Clock, Images, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'wouter';
import { PublicHeader } from './PublicHeader';
import { iconFor } from '@/components/ServiceIcon';
import { fallbackServices } from '@/data/services';
import { translateServices } from '@/data/services-rw';
import { listGallery, type GalleryImage } from '@/lib/gallery';
import {
  COMPANY_ADDRESS,
  COMPANY_EMAIL,
  MAPS_LINK,
  PHONE_PRIMARY,
  PHONE_SECONDARY,
  TEL_PRIMARY,
  TEL_SECONDARY,
  WHATSAPP_LINK,
} from '@/data/contact';
import { useI18n } from '@/lib/i18n';

const whatsappProps = {
  href: WHATSAPP_LINK,
  target: '_blank',
  rel: 'noreferrer',
};

export function Home() {
  const { t, locale } = useI18n();
  const servicesQuery = useListServices();
  const rawServices = (servicesQuery.data?.filter((s) => s.isActive) ?? fallbackServices).sort((a, b) => a.displayOrder - b.displayOrder);
  const services = locale === 'rw' ? translateServices(rawServices) : rawServices;

  return (
    <div className="min-h-[100dvh] bg-canvas text-ink">
      <PublicHeader />
      <main>
        <div className="relative overflow-hidden bg-gradient-to-br from-[#083f4e] via-brand-strong to-brand">
          <div className="pointer-events-none absolute -right-24 -top-28 h-[28rem] w-[28rem] rounded-full bg-[#37cdd6]/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-36 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <section className="relative mx-auto max-w-6xl px-5 pb-16 pt-16 md:pt-24">
            <div className="md:flex md:items-end md:justify-between md:gap-12">
              <div className="max-w-2xl">
                <p className="eyebrow text-[#a5e8f5]" data-testid="text-hero-eyebrow">{t.hero.eyebrow}</p>
                <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] text-white md:text-6xl">{t.hero.title}</h1>
                <div className="mt-6 h-1 w-16 rounded-full bg-[#37cdd6]" />
                <p className="mt-6 text-lg leading-8 text-white/80">{t.hero.text}</p>
              </div>
              <div className="mt-10 flex flex-wrap gap-3 md:mt-0">
                <Link href="/request" className="rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand transition hover:bg-[#dff1f5]" data-testid="link-hero-request">
                  {t.hero.cta}
                </Link>
                <a href="#services" className="rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20" data-testid="link-hero-services">
                  {t.hero.secondary}
                </a>
              </div>
            </div>
            <p className="mt-14 flex flex-wrap gap-x-8 gap-y-2 text-sm font-semibold text-white/65">
              <span>{t.facts.years}</span>
              <span>{t.facts.brands}</span>
              <span>{t.facts.since}</span>
            </p>
          </section>
        </div>

        <section id="services" className="relative overflow-hidden border-y border-line bg-gradient-to-br from-[#d8eef4] via-[#eef7f9] to-[#f4fbff]">
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#37cdd6]/10 blur-3xl" />
          <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-20">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="eyebrow text-brand">{t.services.eyebrow}</p>
                <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">{t.services.title}</h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-soft md:text-right">{t.services.text}</p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <Link key={service.id} href={`/request?service=${encodeURIComponent(service.name)}`} className="group flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-line transition hover:shadow-md hover:ring-brand" data-testid={`card-service-${service.id}`}>
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl text-white" style={{ backgroundColor: service.accent }}>{iconFor(service.icon)}</span>
                    <span className="text-sm font-bold text-faint">0{index + 1}</span>
                  </div>
                  <p className="mt-5 text-xs font-bold uppercase tracking-wide text-faint">{service.category}</p>
                  <h3 className="mt-1 text-lg font-bold">{service.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-soft">{service.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand transition-all group-hover:gap-3" data-testid={`link-request-service-${service.id}`}>
                    {t.services.request} <ArrowRight size={15} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <GallerySection />

        <section id="about" className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="eyebrow text-brand">{t.about.eyebrow}</p>
              <h2 className="mt-3 max-w-md text-3xl font-extrabold md:text-4xl">{t.about.title}</h2>
              <p className="mt-5 max-w-md leading-7 text-soft">{t.about.text}</p>
              <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand transition hover:text-brand-strong" data-testid="link-studio-request">
                {t.about.cta} <ArrowRight size={16} />
              </a>
            </div>
            <ol className="space-y-3">
              {[t.about.steps.listen, t.about.steps.design, t.about.steps.deliver].map(([title, text], index) => (
                <li key={title} className="flex gap-5 rounded-2xl border border-line bg-white p-6">
                  <span className="text-2xl font-extrabold text-brand">0{index + 1}</span>
                  <div>
                    <h3 className="font-bold">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-soft">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-ink">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-14 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-white md:text-3xl">{t.cta.title}</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-white/70">{t.cta.text}</p>
            </div>
            <Link href="/request" className="inline-flex w-fit items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-strong" data-testid="link-cta-request">
              {t.cta.button} <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        <section id="contact" className="bg-gradient-to-br from-brand to-brand-strong text-white">
          <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="eyebrow text-white/80">{t.contact.eyebrow}</p>
                <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">{t.contact.title}</h2>
              </div>
              <a {...whatsappProps} className="inline-flex w-fit items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1fbe5a]" data-testid="link-whatsapp">
                <MessageCircle size={18} /> {t.contact.whatsapp}
              </a>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/80">{t.contact.text}</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/20">
                <Phone size={22} />
                <p className="mt-3 text-xs font-bold uppercase tracking-wide text-white/70">{t.contact.phoneLabel}</p>
                <a href={TEL_PRIMARY} className="mt-1 block font-bold transition hover:text-white/80" data-testid="link-phone">{PHONE_PRIMARY}</a>
                <span className="text-xs text-white/60">{t.contact.mobileLabel}</span>
                <a href={TEL_SECONDARY} className="block text-sm font-bold transition hover:text-white/80">{PHONE_SECONDARY}</a>
              </div>
              <div className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/20">
                <Mail size={22} />
                <p className="mt-3 text-xs font-bold uppercase tracking-wide text-white/70">{t.contact.emailLabel}</p>
                <a href={`mailto:${COMPANY_EMAIL}`} className="mt-1 block break-all font-bold transition hover:text-white/80" data-testid="link-email">{COMPANY_EMAIL}</a>
              </div>
              <div className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/20">
                <MapPin size={22} />
                <p className="mt-3 text-xs font-bold uppercase tracking-wide text-white/70">{t.contact.locationLabel}</p>
                <p className="mt-1 text-sm font-bold leading-6">{COMPANY_ADDRESS}</p>
                <a href={MAPS_LINK} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm font-semibold text-white/85 underline-offset-2 transition hover:text-white hover:underline" data-testid="link-maps">{t.contact.maps}</a>
              </div>
              <div className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/20">
                <Clock size={22} />
                <p className="mt-3 text-xs font-bold uppercase tracking-wide text-white/70">{t.contact.hoursLabel}</p>
                <p className="mt-1 font-bold">{t.contact.hours}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/70">{t.contact.whatsappHint}</p>
          </div>
        </section>
      </main>

      <footer className="bg-ink text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[1.3fr_1fr_1.2fr]">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5 font-extrabold">
              <img src="/vision-logo.jpeg" alt="Vision Design logo" className="h-9 w-9 rounded-lg object-cover" />
              <span>Vision Design</span>
            </Link>
            <p className="mt-3 text-sm leading-6 text-white/60">{t.footer.about}</p>
          </div>
          <div className="text-sm text-white/70">
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-white/40">{t.nav.services}</p>
            <ul className="space-y-2">
              <li><a href="#services" className="transition hover:text-white">{t.nav.services}</a></li>
              <li><a href="#gallery" className="transition hover:text-white">{t.nav.gallery}</a></li>
              <li><a href="#about" className="transition hover:text-white">{t.nav.about}</a></li>
              <li><a href="#contact" className="transition hover:text-white">{t.nav.contact}</a></li>
              <li><Link href="/request" className="transition hover:text-white">{t.nav.startProject}</Link></li>
            </ul>
          </div>
          <div className="text-sm text-white/70">
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-white/40">{t.contact.title}</p>
            <a href={`mailto:${COMPANY_EMAIL}`} className="block break-all transition hover:text-white">{COMPANY_EMAIL}</a>
            <a href={TEL_PRIMARY} className="mt-2 block transition hover:text-white">{PHONE_PRIMARY}</a>
            <a href={TEL_SECONDARY} className="mt-1 block transition hover:text-white">{PHONE_SECONDARY}</a>
            <a {...whatsappProps} className="mt-3 inline-flex items-center gap-2 font-semibold text-[#2fd67a] transition hover:text-white" data-testid="footer-whatsapp">
              <MessageCircle size={16} /> {t.contact.whatsapp}
            </a>
            <p className="mt-3 leading-6 text-white/50">{COMPANY_ADDRESS}</p>
          </div>
        </div>
        <div className="border-t border-white/10">
          <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-white/40">© {new Date().getFullYear()} {t.footer.rights}</p>
        </div>
      </footer>

      <a {...whatsappProps} className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:shadow-xl" aria-label="WhatsApp" data-testid="float-whatsapp">
        <MessageCircle size={26} />
      </a>
    </div>
  );
}

function GallerySection() {
  const { t } = useI18n();
  const [images, setImages] = useState<GalleryImage[] | null>(null);

  useEffect(() => {
    listGallery()
      .then(setImages)
      .catch(() => setImages([]));
  }, []);

  return (
    <section id="gallery" className="mx-auto max-w-6xl px-5 py-16 md:py-20">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="eyebrow text-brand">{t.gallery.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">{t.gallery.title}</h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-soft md:text-right">{t.gallery.text}</p>
      </div>
      {images === null ? (
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="aspect-square animate-pulse rounded-2xl bg-canvas ring-1 ring-line" data-testid="gallery-skeleton" />
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="mt-10 grid place-items-center rounded-2xl border-2 border-dashed border-line bg-canvas/60 px-6 py-16 text-center">
          <div className="space-y-3">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand shadow-sm">
              <Images size={26} />
            </div>
            <p className="text-sm font-semibold text-soft">{t.gallery.empty}</p>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {images.map((image) => (
            <figure key={image.id} className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-line" data-testid={`card-public-gallery-${image.id}`}>
              <div className="aspect-square overflow-hidden bg-canvas">
                <img src={image.url} alt={image.title ?? t.gallery.title} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
              </div>
              {image.title && <figcaption className="truncate px-4 py-3 text-sm font-semibold text-ink">{image.title}</figcaption>}
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}