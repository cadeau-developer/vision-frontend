import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Images, Loader2, Plus, Trash2, Upload } from 'lucide-react';
import { deleteGalleryImage, listGallery, uploadGalleryImages, type GalleryImage } from '@/lib/gallery';
import { AdminSection } from '@/components/AdminSection';
import { useI18n } from '@/lib/i18n';
import { resolveAssetUrl } from '@/lib/api-base';

export function GalleryAdmin() {
  const { t } = useI18n();
  const [images, setImages] = useState<GalleryImage[] | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setImages(await listGallery());
    } catch {
      setImages([]);
    }
  };

  const refresh = () => {
    load();
  };

  useState(() => {
    load();
  });

  if (images === null) {
    load();
  }

  const pickFiles = (event: ChangeEvent<HTMLInputElement>) => {
    setError('');
    setFiles(Array.from(event.target.files ?? []).slice(0, 20));
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (files.length === 0) return;
    setUploading(true);
    setError('');
    try {
      await uploadGalleryImages(files, title);
      setFiles([]);
      setTitle('');
      const input = document.getElementById('input-gallery-files') as HTMLInputElement | null;
      if (input) input.value = '';
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : t.admin.uploadFailed);
    } finally {
      setUploading(false);
    }
  };

  const remove = async (id: number) => {
    if (!window.confirm(t.admin.deleteImageConfirm)) return;
    try {
      await deleteGalleryImage(id);
      setImages((current) => (current ?? []).filter((item) => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : t.admin.deleteFailed);
    }
  };

  return (
    <AdminSection title={t.admin.gallery} description={t.admin.galleryDesc}>
      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {(images ?? []).map((item) => (
            <figure
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-line"
              data-testid={`card-gallery-${item.id}`}
            >
              <div className="aspect-square overflow-hidden bg-canvas">
                <img src={resolveAssetUrl(item.url)} alt={item.title ?? ''} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
              </div>
              <figcaption className="flex items-center justify-between gap-2 px-4 py-3">
                <span className="truncate text-sm font-semibold text-ink">{item.title || '—'}</span>
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  className="shrink-0 rounded-full p-2 text-red-500 transition hover:bg-red-50"
                  data-testid={`button-delete-gallery-${item.id}`}
                >
                  <Trash2 size={15} />
                </button>
              </figcaption>
            </figure>
          ))}
          {images !== null && images.length === 0 && (
            <div className="col-span-full grid place-items-center rounded-2xl border-2 border-dashed border-line bg-canvas/60 px-6 py-16 text-center">
              <div className="space-y-3">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand shadow-sm">
                  <Images size={26} />
                </div>
                <p className="text-sm font-semibold text-soft">{t.admin.noImages}</p>
              </div>
            </div>
          )}
          {error && <p className="col-span-full text-sm font-semibold text-red-500" data-testid="text-gallery-error">{error}</p>}
        </div>

        <form onSubmit={submit} className="h-fit rounded-2xl border border-line bg-white p-6">
          <p className="eyebrow mb-5 text-brand">{t.admin.uploadImage}</p>
          <div className="space-y-4">
            <label
              className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line bg-canvas/60 px-4 py-8 text-center transition hover:border-brand"
              data-testid="gallery-dropzone"
            >
              <Upload size={22} className="text-brand" />
              <span className="text-sm font-semibold text-ink">{t.admin.chooseImages}</span>
              <span className="text-xs text-soft">{t.admin.imagesHint}</span>
              <input
                id="input-gallery-files"
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp,image/avif"
                multiple
                onChange={pickFiles}
                className="hidden"
                data-testid="input-gallery-files"
              />
            </label>

            {files.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {files.map((file) => (
                  <img key={`${file.name}-${file.size}`} src={URL.createObjectURL(file)} alt={file.name} className="aspect-square w-full rounded-lg object-cover ring-1 ring-line" />
                ))}
              </div>
            )}

            <AdminImageInput label={t.admin.imageTitle} value={title} onChange={setTitle} testId="input-gallery-title" />

            <button
              type="submit"
              disabled={files.length === 0 || uploading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-bold text-white transition hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-50"
              data-testid="button-upload-gallery"
            >
              {uploading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
              {uploading ? t.admin.uploading : `${t.admin.uploadImage}${files.length > 0 ? ` (${files.length})` : ''}`}
            </button>
          </div>
        </form>
      </div>
    </AdminSection>
  );
}

function AdminImageInput({ label, value, onChange, testId }: { label: string; value: string; onChange: (value: string) => void; testId: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold text-soft">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        maxLength={120}
        className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink outline-none transition placeholder:text-soft/70 focus:border-brand"
        data-testid={testId}
      />
    </label>
  );
}