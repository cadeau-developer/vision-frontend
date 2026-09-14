import { type ReactNode } from 'react';

interface AdminSectionProps {
  title: string;
  description: string;
  action?: ReactNode;
  children: ReactNode;
}

export function AdminSection({ title, description, action, children }: AdminSectionProps) {
  return (
    <section>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-extrabold text-ink">{title}</h2>
          <p className="mt-1 text-sm text-soft">{description}</p>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}