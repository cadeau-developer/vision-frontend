const _raw = import.meta.env.VITE_API_BASE_URL;

export const API_BASE_URL: string = _raw ? _raw.replace(/\/+$/, "") : "";

export function resolveAssetUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  return `${API_BASE_URL}${url}`;
}
