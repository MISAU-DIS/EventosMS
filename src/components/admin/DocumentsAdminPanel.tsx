"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, FileUp, RefreshCw, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import {
  documentSectionLabels,
  type DocumentSectionId,
} from "@/config/document-sections";
import type { StoredDocumentRecord } from "@/types/stored-documents";

const sectionOptions: DocumentSectionId[] = ["dia1", "dia2", "dia3", "gerais"];

export default function DocumentsAdminPanel() {
  const [documents, setDocuments] = useState<StoredDocumentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState<DocumentSectionId | "all">("all");
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    sectionId: "dia1" as DocumentSectionId,
    title: "",
    description: "",
    file: null as File | null,
  });

  const loadDocuments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/documents");
      if (!response.ok) throw new Error("Falha ao carregar documentos.");
      const data = (await response.json()) as { documents: StoredDocumentRecord[] };
      setDocuments(data.documents);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.file) {
      await Swal.fire({
        icon: "warning",
        title: "Ficheiro em falta",
        text: "Seleccione um ficheiro para publicar.",
        confirmButtonColor: "#059669",
      });
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const body = new FormData();
      body.append("sectionId", form.sectionId);
      body.append("title", form.title);
      body.append("description", form.description);
      body.append("file", form.file);

      const response = await fetch("/api/admin/documents", {
        method: "POST",
        body,
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error || "Upload falhou.");
      }

      setForm({ sectionId: "dia1", title: "", description: "", file: null });
      if (fileInputRef.current) fileInputRef.current.value = "";

      await Swal.fire({
        icon: "success",
        title: "Documento publicado",
        text: "O documento já está disponível na plataforma.",
        confirmButtonColor: "#059669",
        timer: 2200,
        timerProgressBar: true,
      });

      await loadDocuments();
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Não foi possível publicar",
        text: err instanceof Error ? err.message : "Erro no upload.",
        confirmButtonColor: "#059669",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (doc: StoredDocumentRecord) => {
    const dayLabel = documentSectionLabels[doc.sectionId];

    const result = await Swal.fire({
      icon: "warning",
      title: "Remover documento?",
      html: `Tem certeza que deseja remover o documento <strong>«${doc.title}»</strong> do <strong>${dayLabel}</strong>?`,
      showCancelButton: true,
      confirmButtonText: "Sim, remover",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    setError(null);
    try {
      const response = await fetch(`/api/admin/documents/${doc.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Não foi possível remover.");

      await Swal.fire({
        icon: "success",
        title: "Documento removido",
        text: "O ficheiro foi apagado da plataforma.",
        confirmButtonColor: "#059669",
        timer: 2000,
        timerProgressBar: true,
      });

      await loadDocuments();
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Erro ao remover",
        text: err instanceof Error ? err.message : "Tente novamente.",
        confirmButtonColor: "#059669",
      });
    }
  };

  const visibleDocuments =
    filter === "all"
      ? documents
      : documents.filter((doc) => doc.sectionId === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestão de Documentos</h2>
          <p className="text-gray-600 text-sm mt-1">
            Publicar e remover documentos por dia da reunião.
          </p>
        </div>
        <button
          type="button"
          onClick={loadDocuments}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          <RefreshCw className="w-4 h-4" />
          Actualizar lista
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FileUp className="w-5 h-5 text-emerald-600" />
          Adicionar documento
        </h3>
        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dia / secção <span className="text-red-500">*</span>
            </label>
            <select
              value={form.sectionId}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  sectionId: e.target.value as DocumentSectionId,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            >
              {sectionOptions.map((id) => (
                <option key={id} value={id}>
                  {documentSectionLabels[id]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ficheiro <span className="text-red-500">*</span>
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.ppt,.pptx,.doc,.docx,.xls,.xlsx,.txt"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  file: e.target.files?.[0] ?? null,
                }))
              }
              className="w-full text-sm"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Nome do documento na plataforma"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição (opcional)
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none"
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={uploading}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white px-5 py-2.5 rounded-lg font-medium"
            >
              {uploading ? "A enviar…" : "Publicar documento"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 className="text-lg font-semibold text-gray-900">
            Documentos publicados ({visibleDocuments.length})
          </h3>
          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as DocumentSectionId | "all")
            }
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">Todos os dias</option>
            {sectionOptions.map((id) => (
              <option key={id} value={id}>
                {documentSectionLabels[id]}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="p-6 text-gray-500">A carregar…</p>
        ) : visibleDocuments.length === 0 ? (
          <p className="p-6 text-gray-500 italic">Nenhum documento nesta secção.</p>
        ) : (
          <div className="divide-y divide-gray-200">
            {visibleDocuments.map((doc) => (
              <div
                key={doc.id}
                className="p-6 flex flex-col lg:flex-row lg:items-center gap-4"
              >
                <div className="flex-grow min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wide bg-emerald-50 text-emerald-700 px-2 py-1 rounded">
                      {documentSectionLabels[doc.sectionId]}
                    </span>
                    <span className="text-xs uppercase bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {doc.fileType}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 break-words">{doc.title}</h4>
                  {doc.description && (
                    <p className="text-sm text-gray-600 mt-1 break-words">
                      {doc.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-2">{doc.fileName}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <a
                    href={`/documentos/${doc.sectionId}/${doc.fileName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Ver
                  </a>
                  <button
                    type="button"
                    onClick={() => handleDelete(doc)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
