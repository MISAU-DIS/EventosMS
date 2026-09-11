"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ImagePlus, RefreshCw, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import AdminEventBanner from "@/components/admin/AdminEventBanner";
import { useAdminEventContext } from "@/hooks/useAdminEventContext";
import type { StoredPhoto } from "@/types/photos-store";

export default function PhotosAdminPanel() {
  const { context } = useAdminEventContext();
  const [photos, setPhotos] = useState<StoredPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({ title: "", alt: "", file: null as File | null });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/admin/photos");
      if (!r.ok) throw new Error();
      const d = (await r.json()) as { photos: StoredPhoto[] };
      setPhotos(d.photos);
    } catch {
      await Swal.fire({ icon: "error", title: "Erro ao carregar fotografias", confirmButtonColor: "#059669" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.file) return;
    setUploading(true);
    try {
      const body = new FormData();
      body.append("title", form.title);
      body.append("alt", form.alt || form.title);
      body.append("file", form.file);
      const r = await fetch("/api/admin/photos", { method: "POST", body });
      if (!r.ok) throw new Error();
      setForm({ title: "", alt: "", file: null });
      if (fileRef.current) fileRef.current.value = "";
      await Swal.fire({ icon: "success", title: "Fotografia publicada", timer: 2000, showConfirmButton: false });
      await load();
    } catch {
      await Swal.fire({ icon: "error", title: "Erro no upload", confirmButtonColor: "#059669" });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (photo: StoredPhoto) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Remover fotografia?",
      text: photo.title,
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Remover",
      cancelButtonText: "Cancelar",
    });
    if (!result.isConfirmed) return;
    const r = await fetch(`/api/admin/photos?id=${encodeURIComponent(photo.id)}`, { method: "DELETE" });
    if (r.ok) await load();
  };

  if (loading) return <p className="text-gray-600">A carregar fotografias...</p>;

  return (
    <div className="space-y-6">
      {context && (
        <AdminEventBanner
          event={context.event}
          eventId={context.eventId}
          isFallback={context.isFallback}
        />
      )}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Gestão de Fotografias</h2>
        <button type="button" onClick={load} className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg">
          <RefreshCw className="w-4 h-4" /> Actualizar
        </button>
      </div>

      <form onSubmit={handleUpload} className="bg-white rounded-xl border p-6 space-y-4">
        <h3 className="font-semibold flex items-center gap-2"><ImagePlus className="w-5 h-5" /> Nova fotografia</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input required placeholder="Título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="border rounded-lg px-3 py-2" />
          <input placeholder="Texto alternativo" value={form.alt} onChange={(e) => setForm({ ...form, alt: e.target.value })} className="border rounded-lg px-3 py-2" />
          <input ref={fileRef} required type="file" accept="image/*" onChange={(e) => setForm({ ...form, file: e.target.files?.[0] ?? null })} className="md:col-span-2" />
        </div>
        <button type="submit" disabled={uploading} className="bg-emerald-600 text-white px-4 py-2 rounded-lg disabled:opacity-60">
          {uploading ? "A carregar..." : "Publicar fotografia"}
        </button>
      </form>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="bg-white border rounded-xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/fotografias/${photo.fileName}`} alt={photo.alt} className="w-full h-40 object-cover" />
            <div className="p-3 flex justify-between items-start gap-2">
              <p className="text-sm font-medium">{photo.title}</p>
              <button type="button" onClick={() => handleDelete(photo)} className="text-red-600 p-1"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
