import type { FormEvent } from 'react';

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  testId: string;
  required?: boolean;
}

export function Field({ label, value, onChange, placeholder, type = 'text', testId, required = false }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-soft">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none transition placeholder:text-faint focus:border-brand"
        data-testid={testId}
      />
    </label>
  );
}

interface AdminInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  testId: string;
}

export function AdminInput({ label, value, onChange, testId }: AdminInputProps) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold text-soft">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand"
        required
        data-testid={testId}
      />
    </label>
  );
}

interface AdminTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  testId: string;
}

export function AdminTextarea({ label, value, onChange, testId }: AdminTextareaProps) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold text-soft">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-[80px] w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand"
        required
        data-testid={testId}
      />
    </label>
  );
}