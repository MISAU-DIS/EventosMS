import { promises as fs } from "fs";
import path from "path";
import { DEFAULT_EVENT_ID, dataPath, documentsRoot } from "../config.js";
import type { DocumentsStoreFile, DocumentSectionId, StoredDocumentRecord } from "../types.js";
import { inferFileType, slugifyFileName } from "../types.js";

const storePath = () => dataPath("documents-store.json");

async function writeStore(store: DocumentsStoreFile) {
  const file = storePath();
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(store, null, 2));
}

async function migrateStore(store: DocumentsStoreFile): Promise<DocumentsStoreFile> {
  let changed = false;
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
    const raw = await fs.readFile(storePath(), "utf8");
    const parsed = JSON.parse(raw) as DocumentsStoreFile;
    if (parsed.documents) return migrateStore(parsed);
  } catch {
    const empty: DocumentsStoreFile = { documents: [] };
    await writeStore(empty);
    return empty;
  }
  const empty: DocumentsStoreFile = { documents: [] };
  await writeStore(empty);
  return empty;
}

export async function listStoredDocuments(eventId?: string) {
  const store = await ensureStore();
  const filtered = eventId
    ? store.documents.filter(
        (doc) =>
          doc.eventId === eventId ||
          (!doc.eventId && eventId === DEFAULT_EVENT_ID),
      )
    : store.documents;
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
}) {
  const store = await ensureStore();
  const ext = path.extname(input.originalFileName) || "";
  const base = slugifyFileName(path.basename(input.originalFileName, ext)) || "documento";
  const id = `${base}-${Date.now()}`;
  const fileName = `${id}${ext.toLowerCase()}`;
  const sectionDir = path.join(documentsRoot(), input.sectionId);

  await fs.mkdir(sectionDir, { recursive: true });
  const absolutePath = path.join(sectionDir, fileName);
  await fs.writeFile(absolutePath, input.fileBuffer);
  await fs.access(absolutePath);

  const record: StoredDocumentRecord = {
    id,
    eventId: DEFAULT_EVENT_ID,
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
  const filePath = path.join(documentsRoot(), removed.sectionId, removed.fileName);

  try {
    await fs.unlink(filePath);
  } catch {
    // ignore
  }

  await writeStore(store);
  return true;
}
