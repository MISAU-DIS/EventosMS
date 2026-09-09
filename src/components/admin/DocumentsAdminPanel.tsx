"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, Eye, EyeOff, FileUp, RefreshCw, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import {
  documentSectionLabels,
  type DocumentSectionId,
} from "@/config/document-sections";
import type { OrphanDocumentFile, StoredDocumentRecord } from "@/types/stored-documents";

const sectionOptions: DocumentSectionId[] = ["dia1", "dia2", "dia3", "gerais"];

async function readApiError(response: Response): Promise<string> {
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const data = (await response.json()) as { error?: string };
    return data.error || `Erro ${response.status}.`;
  }
  if (response.status === 413) {
    return "Ficheiro demasiado grande (limite ~100 MB). Comprima o ficheiro ou contacte o suporte.";
  }
  if (response.status === 401) {
    return "Sessão expirada. Volte a iniciar sessão no painel admin.";
  }
  if (response.status >= 500) {
    return "Erro interno ao gravar o ficheiro. Se o ficheiro for grande (>10 MB), faça deploy da versão mais recente ou comprima o PPT/PDF e tente novamente.";
  }
  return `Erro do servidor (${response.status}). Tente novamente.`;
}

export default function DocumentsAdminPanel() {
  const [documents, setDocuments] = useState<StoredDocumentRecord[]>([]);
  const [orphans, setOrphans] = useState<OrphanDocumentFile[]>([]);
  const [broken, setBroken] = useState<StoredDocumentRecord[]>([]);
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
      const [docsRes, orphansRes] = await Promise.all([
        fetch("/api/admin/documents"),
        fetch("/api/admin/documents/orphans"),
      ]);
      if (!docsRes.ok) throw new Error("Falha ao carregar documentos.");
      const docsData = (await docsRes.json()) as { documents: StoredDocumentRecord[] };
      setDocuments(docsData.documents);

      if (orphansRes.ok) {
        const orphansData = (await orphansRes.json()) as {
          orphans: OrphanDocumentFile[];
          broken: StoredDocumentRecord[];
        };
        setOrphans(orphansData.orphans);
        setBroken(orphansData.broken);
      } else {
        setOrphans([]);
        setBroken([]);
      }
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
        throw new Error(await readApiError(response));
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

  const handleHide = async (doc: StoredDocumentRecord, hidden: boolean) => {
    const action = hidden ? "ocultar" : "mostrar";
    const result = await Swal.fire({
      icon: hidden ? "question" : "info",
      title: hidden ? "Ocultar do site?" : "Mostrar no site?",
      html: hidden
        ? `«<strong>${doc.title}</strong>» deixa de aparecer na listagem pública. O ficheiro <em>não é apagado</em> — pode restaurar depois.`
        : `«<strong>${doc.title}</strong>» volta a aparecer na plataforma.`,
      showCancelButton: true,
      confirmButtonText: hidden ? "Ocultar" : "Mostrar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: hidden ? "#d97706" : "#059669",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    setError(null);
    try {
      const response = await fetch(`/api/admin/documents/${doc.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hidden }),
      });
      if (!response.ok) throw new Error(await readApiError(response));

      await Swal.fire({
        icon: "success",
        title: hidden ? "Documento oculto" : "Documento visível",
        text: hidden
          ? "Já não aparece no site. Continua listado aqui no admin."
          : "O documento está novamente na plataforma.",
        confirmButtonColor: "#059669",
        timer: 2000,
        timerProgressBar: true,
      });

      await loadDocuments();
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: `Erro ao ${action}`,
        text: err instanceof Error ? err.message : "Tente novamente.",
        confirmButtonColor: "#059669",
      });
    }
  };

  const handleDelete = async (doc: StoredDocumentRecord) => {
    const dayLabel = documentSectionLabels[doc.sectionId];

    const result = await Swal.fire({
      icon: "warning",
      title: "Apagar permanentemente?",
      html: `Remove o ficheiro e o registo de <strong>«${doc.title}»</strong> (${dayLabel}).<br/><br/>
        <small>Prefere só tirar do site? Use <strong>Ocultar</strong> — é reversível.</small>`,
      showCancelButton: true,
      confirmButtonText: "Sim, apagar tudo",
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
      if (!response.ok) throw new Error("Não foi possível apagar.");

      await Swal.fire({
        icon: "success",
        title: "Documento apagado",
        text: "Ficheiro e registo removidos.",
        confirmButtonColor: "#059669",
        timer: 2000,
        timerProgressBar: true,
      });

      await loadDocuments();
    } catch (err) {
      const fallback = await Swal.fire({
        icon: "warning",
        title: "Não foi possível apagar",
        html: `${err instanceof Error ? err.message : "Erro desconhecido."}<br/><br/>
          Quer <strong>ocultar do site</strong> em vez disso? O ficheiro fica no servidor mas deixa de aparecer na listagem.`,
        showCancelButton: true,
        confirmButtonText: "Ocultar do site",
        cancelButtonText: "Fechar",
        confirmButtonColor: "#d97706",
      });
      if (fallback.isConfirmed) {
        await handleHide(doc, true);
      }
    }
  };

  const handleRegisterOrphan = async (orphan: OrphanDocumentFile) => {
    const result = await Swal.fire({
      icon: "question",
      title: "Registar ficheiro manual",
      html: `Ficheiro: <strong>${orphan.fileName}</strong><br/>Secção: ${documentSectionLabels[orphan.sectionId]}`,
      input: "text",
      inputLabel: "Título na plataforma",
      inputValue: orphan.fileName.replace(/\.[^.]+$/, "").replace(/-/g, " "),
      showCancelButton: true,
      confirmButtonText: "Registar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#059669",
    });

    if (!result.isConfirmed || typeof result.value !== "string" || !result.value.trim()) {
      return;
    }

    try {
      const response = await fetch("/api/admin/documents/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionId: orphan.sectionId,
          fileName: orphan.fileName,
          title: result.value.trim(),
        }),
      });
      if (!response.ok) throw new Error(await readApiError(response));
      await Swal.fire({
        icon: "success",
        title: "Documento registado",
        text: "Já pode gerir este ficheiro na lista principal.",
        timer: 2000,
        showConfirmButton: false,
      });
      await loadDocuments();
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Erro",
        text: err instanceof Error ? err.message : "Não foi possível registar.",
        confirmButtonColor: "#059669",
      });
    }
  };

  const handleIgnoreOrphan = async (orphan: OrphanDocumentFile) => {
    const result = await Swal.fire({
      icon: "info",
      title: "Ignorar na listagem?",
      html: `«<strong>${orphan.fileName}</strong>» deixa de aparecer nesta secção de manutenção. O ficheiro <em>não é apagado</em>.`,
      showCancelButton: true,
      confirmButtonText: "Ignorar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d97706",
    });
    if (!result.isConfirmed) return;

    try {
      const response = await fetch("/api/admin/documents/orphans/ignore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionId: orphan.sectionId,
          fileName: orphan.fileName,
        }),
      });
      if (!response.ok) throw new Error(await readApiError(response));
      await loadDocuments();
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Erro",
        text: err instanceof Error ? err.message : "Não foi possível ignorar.",
        confirmButtonColor: "#059669",
      });
    }
  };

  const handleDeleteOrphan = async (orphan: OrphanDocumentFile) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Apagar ficheiro do disco?",
      html: `Remove <strong>${orphan.fileName}</strong> (não está no registo).<br/><br/>
        <small>Se tiver dúvidas, use <strong>Ignorar</strong> — só tira da listagem.</small>`,
      showCancelButton: true,
      confirmButtonText: "Apagar ficheiro",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
    });
    if (!result.isConfirmed) return;

    try {
      const response = await fetch(
        `/api/admin/documents/orphans?sectionId=${encodeURIComponent(orphan.sectionId)}&fileName=${encodeURIComponent(orphan.fileName)}`,
        { method: "DELETE" },
      );
      if (!response.ok) throw new Error(await readApiError(response));
      await loadDocuments();
    } catch (err) {
      const fallback = await Swal.fire({
        icon: "warning",
        title: "Não foi possível apagar",
        html: `${err instanceof Error ? err.message : "Erro desconhecido."}<br/><br/>
          Quer <strong>ignorar na listagem</strong> para não ver mais este ficheiro aqui?`,
        showCancelButton: true,
        confirmButtonText: "Ignorar na listagem",
        cancelButtonText: "Fechar",
        confirmButtonColor: "#d97706",
      });
      if (fallback.isConfirmed) {
        await handleIgnoreOrphan(orphan);
      }
    }
  };

  const handleDeleteBroken = async (doc: StoredDocumentRecord) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Remover registo fantasma?",
      html: `«${doc.title}» — o ficheiro já não existe no disco.`,
      showCancelButton: true,
      confirmButtonText: "Remover registo",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
    });
    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`/api/admin/documents/broken/${doc.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(await readApiError(response));
      await loadDocuments();
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Erro",
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

      <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-900">
        <strong>Agenda e programa dinâmicos:</strong> o botão «Agenda e Programa — PDF» em
        Documentos gerais é gerado automaticamente a partir dos dados actuais do site — não
        aparece nesta lista. Ficheiros antigos de agenda/programa colocados manualmente em{" "}
        <code className="text-xs">public/documentos/gerais/</code> surgem abaixo como{" "}
        <em>ficheiros manuais</em> — registe ou apague.
      </div>

      {!loading && (orphans.length > 0 || broken.length > 0) && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-4">
          <h3 className="font-semibold text-amber-900">Manutenção — ficheiros extra no disco</h3>

          {orphans.length > 0 && (
            <div>
              <p className="text-sm text-amber-800 mb-2">
                Ficheiros no disco sem registo. Pode <strong>registar</strong>,{" "}
                <strong>ignorar</strong> (só tira da listagem) ou <strong>apagar</strong> do disco.
              </p>
              <ul className="space-y-2">
                {orphans.map((orphan) => (
                  <li
                    key={orphan.relativePath}
                    className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white rounded-lg p-3 border border-amber-100"
                  >
                    <div className="flex-1 min-w-0 text-sm">
                      <span className="font-medium">{documentSectionLabels[orphan.sectionId]}</span>
                      <span className="text-gray-500"> — </span>
                      <span className="break-all">{orphan.fileName}</span>
                      <span className="text-gray-400 text-xs ml-2">
                        ({Math.round(orphan.size / 1024)} KB)
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleRegisterOrphan(orphan)}
                        className="text-sm px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                      >
                        Registar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleIgnoreOrphan(orphan)}
                        className="text-sm px-3 py-1.5 rounded-lg border border-amber-300 text-amber-800 hover:bg-amber-100"
                      >
                        Ignorar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteOrphan(orphan)}
                        className="text-sm px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                      >
                        Apagar ficheiro
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {broken.length > 0 && (
            <div>
              <p className="text-sm text-amber-800 mb-2">
                Registos no portal cujo ficheiro já não existe (remova o registo fantasma):
              </p>
              <ul className="space-y-2">
                {broken.map((doc) => (
                  <li
                    key={doc.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white rounded-lg p-3 border border-amber-100"
                  >
                    <div className="flex-1 text-sm">
                      <strong>{doc.title}</strong>
                      <span className="text-gray-500"> — {doc.fileName}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteBroken(doc)}
                      className="text-sm px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 shrink-0"
                    >
                      Remover registo
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
            Documentos ({visibleDocuments.length})
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
                className={`p-6 flex flex-col lg:flex-row lg:items-center gap-4 ${doc.hidden ? "bg-gray-50" : ""}`}
              >
                <div className="flex-grow min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wide bg-emerald-50 text-emerald-700 px-2 py-1 rounded">
                      {documentSectionLabels[doc.sectionId]}
                    </span>
                    <span className="text-xs uppercase bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {doc.fileType}
                    </span>
                    {doc.hidden && (
                      <span className="text-xs font-semibold uppercase tracking-wide bg-amber-100 text-amber-800 px-2 py-1 rounded">
                        Oculto no site
                      </span>
                    )}
                  </div>
                  <h4 className="font-semibold text-gray-900 break-words">{doc.title}</h4>
                  {doc.description && (
                    <p className="text-sm text-gray-600 mt-1 break-words">
                      {doc.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-2">{doc.fileName}</p>
                </div>
                <div className="flex flex-wrap gap-2 shrink-0">
                  {!doc.hidden && (
                    <a
                      href={`/documentos/${doc.sectionId}/${doc.fileName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm"
                    >
                      <Download className="w-4 h-4" />
                      Ver
                    </a>
                  )}
                  {doc.hidden ? (
                    <button
                      type="button"
                      onClick={() => handleHide(doc, false)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-50 text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      Mostrar no site
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleHide(doc, true)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-200 text-amber-800 hover:bg-amber-50 text-sm"
                    >
                      <EyeOff className="w-4 h-4" />
                      Ocultar
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDelete(doc)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Apagar
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
