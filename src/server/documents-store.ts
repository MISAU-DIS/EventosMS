import { promises as fs } from "fs";
import path from "path";
import { DEFAULT_EVENT_ID } from "@/config/api";
import { resolveActiveEventId } from "@/server/active-event";
import type {
  DocumentsStoreFile,
  OrphanDocumentFile,
  StoredDocumentRecord,
} from "@/types/stored-documents";
import { inferFileType, slugifyFileName } from "@/types/stored-documents";
import type { DocumentSectionId } from "@/config/document-sections";

const storePath = path.join(process.cwd(), "data/documents-store.json");
const publicDocsRoot = path.join(process.cwd(), "public/documentos");

const VALID_SECTIONS = new Set<DocumentSectionId>(["dia1", "dia2", "dia3", "gerais"]);

export function isValidDocumentSection(value: string): value is DocumentSectionId {
  return VALID_SECTIONS.has(value as DocumentSectionId);
}

async function writeStore(store: DocumentsStoreFile) {
  await fs.mkdir(path.dirname(storePath), { recursive: true });
  await fs.writeFile(storePath, JSON.stringify(store, null, 2));
}

/** Migração não-destrutiva: adiciona eventId aos registos antigos sem apagar ficheiros. */
async function migrateStore(store: DocumentsStoreFile): Promise<DocumentsStoreFile> {
  let changed = false;
  if (!store.ignoredOrphanPaths) {
    store.ignoredOrphanPaths = [];
    changed = true;
  }
  for (const doc of store.documents) {
    if (!doc.eventId) {
      doc.eventId = DEFAULT_EVENT_ID;
      changed = true;
    }
  }
  if (changed) await writeStore(store);
  return store;
}

async function ensureStore(): Promise<DocumentsStoreFile> {
  try {
    const raw = await fs.readFile(storePath, "utf8");
    const parsed = JSON.parse(raw) as DocumentsStoreFile;
    if (parsed.documents) return migrateStore(parsed);
  } catch {
    const empty: DocumentsStoreFile = { documents: [], ignoredOrphanPaths: [] };
    await writeStore(empty);
    return empty;
  }

  const empty: DocumentsStoreFile = { documents: [], ignoredOrphanPaths: [] };
  await writeStore(empty);
  return empty;
}

/** Registo por secção/ficheiro (para bloquear URLs de documentos ocultos). */
export async function findStoredDocumentByFile(
  sectionId: DocumentSectionId,
  fileName: string,
) {
  const store = await ensureStore();
  return (
    store.documents.find(
      (doc) => doc.sectionId === sectionId && doc.fileName === fileName,
    ) ?? null
  );
}

export async function listStoredDocuments(
  eventId?: string,
  options?: { includeHidden?: boolean },
) {
  const store = await ensureStore();
  let filtered = eventId
    ? store.documents.filter(
        (doc) => doc.eventId === eventId || (!doc.eventId && eventId === DEFAULT_EVENT_ID),
      )
    : store.documents;

  if (!options?.includeHidden) {
    filtered = filtered.filter((doc) => !doc.hidden);
  }

  return filtered.sort((a, b) =>
    a.title.localeCompare(b.title, "pt", { sensitivity: "base" }),
  );
}

export async function addStoredDocument(input: {
  sectionId: DocumentSectionId;
  title: string;
  description?: string;
  originalFileName: string;
  fileBuffer: Buffer;
  eventId?: string;
}) {
  const eventId = input.eventId ?? (await resolveActiveEventId());
  const store = await ensureStore();
  const ext = path.extname(input.originalFileName) || "";
  const base = slugifyFileName(path.basename(input.originalFileName, ext)) || "documento";
  const id = `${base}-${Date.now()}`;
  const fileName = `${id}${ext.toLowerCase()}`;
  const sectionDir = path.join(publicDocsRoot, input.sectionId);

  await fs.mkdir(sectionDir, { recursive: true });
  const absolutePath = path.join(sectionDir, fileName);
  await fs.writeFile(absolutePath, input.fileBuffer);
  await fs.access(absolutePath);

  const record: StoredDocumentRecord = {
    id,
    eventId,
    sectionId: input.sectionId,
    title: input.title.trim(),
    description: input.description?.trim() || undefined,
    fileName,
    fileType: inferFileType(fileName),
    createdAt: new Date().toISOString(),
  };

  store.documents.push(record);
  await writeStore(store);
  return record;
}

export async function deleteStoredDocument(id: string) {
  const store = await ensureStore();
  const index = store.documents.findIndex((doc) => doc.id === id);
  if (index === -1) return false;

  const [removed] = store.documents.splice(index, 1);
  const filePath = path.join(publicDocsRoot, removed.sectionId, removed.fileName);

  try {
    await fs.unlink(filePath);
  } catch {
    // ficheiro já removido manualmente
  }

  await writeStore(store);
  return true;
}

/** Ocultar ou voltar a mostrar no site (não apaga o ficheiro). */
export async function setDocumentHidden(id: string, hidden: boolean) {
  const store = await ensureStore();
  const doc = store.documents.find((item) => item.id === id);
  if (!doc) return null;

  doc.hidden = hidden;
  doc.hiddenAt = hidden ? new Date().toISOString() : undefined;
  if (!hidden) delete doc.hiddenAt;

  await writeStore(store);
  return doc;
}

/** Ficheiros em public/documentos/ sem entrada no JSON (ex.: cópia manual). */
export async function listOrphanDocumentFiles(): Promise<OrphanDocumentFile[]> {
  const store = await ensureStore();
  const ignored = new Set(store.ignoredOrphanPaths ?? []);
  const orphans: OrphanDocumentFile[] = [];

  const registered = new Set(
    store.documents.map((doc) => `${doc.sectionId}/${doc.fileName}`),
  );

  for (const sectionId of VALID_SECTIONS) {
    const sectionDir = path.join(publicDocsRoot, sectionId);
    let entries: string[] = [];
    try {
      entries = await fs.readdir(sectionDir);
    } catch {
      continue;
    }

    for (const fileName of entries) {
      const relativePath = `${sectionId}/${fileName}`;
      if (registered.has(relativePath) || ignored.has(relativePath)) continue;

      const filePath = path.join(sectionDir, fileName);
      const stat = await fs.stat(filePath);
      if (!stat.isFile()) continue;

      orphans.push({
        sectionId,
        fileName,
        relativePath,
        size: stat.size,
        modifiedAt: stat.mtime.toISOString(),
      });
    }
  }

  return orphans.sort((a, b) =>
    a.fileName.localeCompare(b.fileName, "pt", { sensitivity: "base" }),
  );
}

/** Registos no JSON cujo ficheiro já não existe no disco. */
export async function listBrokenDocuments(): Promise<StoredDocumentRecord[]> {
  const store = await ensureStore();
  const broken: StoredDocumentRecord[] = [];

  for (const doc of store.documents) {
    const filePath = path.join(publicDocsRoot, doc.sectionId, doc.fileName);
    try {
      await fs.access(filePath);
    } catch {
      broken.push(doc);
    }
  }

  return broken;
}

/** Registar ficheiro existente no disco (upload manual anterior). */
export async function registerOrphanDocument(input: {
  sectionId: DocumentSectionId;
  fileName: string;
  title: string;
  description?: string;
  eventId?: string;
}) {
  const eventId = input.eventId ?? (await resolveActiveEventId());
  if (!isValidDocumentSection(input.sectionId)) {
    throw new Error("Secção inválida.");
  }

  if (input.fileName.includes("/") || input.fileName.includes("..")) {
    throw new Error("Nome de ficheiro inválido.");
  }

  const filePath = path.join(publicDocsRoot, input.sectionId, input.fileName);
  await fs.access(filePath);

  const store = await ensureStore();
  if (
    store.documents.some(
      (doc) => doc.sectionId === input.sectionId && doc.fileName === input.fileName,
    )
  ) {
    throw new Error("Documento já registado.");
  }

  const ext = path.extname(input.fileName);
  const base = slugifyFileName(path.basename(input.fileName, ext)) || "documento";
  const id = `${base}-imported-${Date.now()}`;

  const record: StoredDocumentRecord = {
    id,
    eventId,
    sectionId: input.sectionId,
    title: input.title.trim(),
    description: input.description?.trim() || undefined,
    fileName: input.fileName,
    fileType: inferFileType(input.fileName),
    createdAt: new Date().toISOString(),
  };

  store.documents.push(record);
  await writeStore(store);
  return record;
}

/** Apagar ficheiro órfão (só disco, sem registo JSON). */
export async function deleteOrphanDocumentFile(
  sectionId: DocumentSectionId,
  fileName: string,
) {
  if (!isValidDocumentSection(sectionId) || fileName.includes("/") || fileName.includes("..")) {
    throw new Error("Parâmetros inválidos.");
  }

  const store = await ensureStore();
  if (
    store.documents.some(
      (doc) => doc.sectionId === sectionId && doc.fileName === fileName,
    )
  ) {
    throw new Error("Documento registado — use Remover na lista principal.");
  }

  await fs.unlink(path.join(publicDocsRoot, sectionId, fileName));
  return true;
}

/** Ignorar órfão na listagem de manutenção (não apaga o ficheiro). */
export async function ignoreOrphanDocumentFile(
  sectionId: DocumentSectionId,
  fileName: string,
) {
  if (!isValidDocumentSection(sectionId) || fileName.includes("/") || fileName.includes("..")) {
    throw new Error("Parâmetros inválidos.");
  }

  const store = await ensureStore();
  const relativePath = `${sectionId}/${fileName}`;
  if (
    store.documents.some(
      (doc) => doc.sectionId === sectionId && doc.fileName === fileName,
    )
  ) {
    throw new Error("Documento registado — use Ocultar do site.");
  }

  if (!store.ignoredOrphanPaths) store.ignoredOrphanPaths = [];
  if (!store.ignoredOrphanPaths.includes(relativePath)) {
    store.ignoredOrphanPaths.push(relativePath);
    await writeStore(store);
  }
  return true;
}

/** Remover registo JSON quando o ficheiro já não existe. */
export async function deleteBrokenDocumentRecord(id: string) {
  const store = await ensureStore();
  const index = store.documents.findIndex((doc) => doc.id === id);
  if (index === -1) return false;

  const doc = store.documents[index];
  const filePath = path.join(publicDocsRoot, doc.sectionId, doc.fileName);
  try {
    await fs.access(filePath);
    throw new Error("O ficheiro ainda existe — use Remover na lista principal.");
  } catch (error) {
    if (error instanceof Error && error.message.includes("lista principal")) {
      throw error;
    }
  }

  store.documents.splice(index, 1);
  await writeStore(store);
  return true;
}
