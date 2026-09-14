const _raw = import.meta.env.VITE_API_BASE_URL;

export const API_BASE_URL: string = _raw ? _raw.replace(/\/+$/, "") : "";
