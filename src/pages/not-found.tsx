import { Link } from 'wouter';
import { useI18n } from '@/lib/i18n';

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className="grid min-h-[100dvh] place-items-center bg-canvas px-5 text-center text-ink">
      <div className="max-w-sm">
        <p className="text-6xl font-extrabold text-brand">404</p>
        <h1 className="mt-4 text-2xl font-extrabold">{t.notFound.title}</h1>
        <p className="mt-3 text-sm leading-6 text-soft">{t.notFound.description}</p>
        <Link href="/" className="mt-8 inline-block rounded-full bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-strong" data-testid="link-not-found-home">
          {t.notFound.button}
        </Link>
      </div>
    </div>
  );
}