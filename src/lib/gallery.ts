import { getSessionToken } from '@/lib/session-token';
import { API_BASE_URL } from '@/lib/api-base';

const BASE = `${API_BASE_URL}${import.meta.env.VITE_API_URL || '/api'}`;

export interface GalleryImage {
  id: number;
  url: string;
  title: string | null;
  createdAt: string;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {};
  const token = getSessionToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, { ...init, headers });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error || `Request failed (${res.status})`);
  }
  return res.json();
}

export async function listGallery(): Promise<GalleryImage[]> {
  const data = await request<GalleryImage[] | unknown>('/gallery');
  return Array.isArray(data) ? data : [];
}

export function uploadGalleryImages(files: File[], title: string): Promise<GalleryImage[]> {
  const form = new FormData();
  for (const file of files) form.append('images', file);
  if (title.trim()) form.append('title', title.trim());
  return request<GalleryImage[]>('/admin/gallery', { method: 'POST', body: form });
}

export async function deleteGalleryImage(id: number): Promise<void> {
  await request<{ ok: boolean }>(`/admin/gallery/${id}`, { method: 'DELETE' });
}