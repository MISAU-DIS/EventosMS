import { promises as fs } from "fs";
import path from "path";
import type {
  DocumentsStoreFile,
  StoredDocumentRecord,
} from "@/types/stored-documents";
import { inferFileType, slugifyFileName } from "@/types/stored-documents";
import type { DocumentSectionId } from "@/config/document-sections";

const storePath = path.join(process.cwd(), "data/documents-store.json");
const publicDocsRoot = path.join(process.cwd(), "public/documentos");

async function ensureStore(): Promise<DocumentsStoreFile> {
  try {
    const raw = await fs.readFile(storePath, "utf8");
    return JSON.parse(raw) as DocumentsStoreFile;
  } catch {
    const empty: DocumentsStoreFile = { documents: [] };
    await fs.mkdir(path.dirname(storePath), { recursive: true });
    await fs.writeFile(storePath, JSON.stringify(empty, null, 2));
    return empty;
  }
}

async function writeStore(store: DocumentsStoreFile) {
  await fs.mkdir(path.dirname(storePath), { recursive: true });
  await fs.writeFile(storePath, JSON.stringify(store, null, 2));
}

export async function listStoredDocuments() {
  const store = await ensureStore();
  return store.documents.sort((a, b) =>
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
  const sectionDir = path.join(publicDocsRoot, input.sectionId);

  await fs.mkdir(sectionDir, { recursive: true });
  await fs.writeFile(path.join(sectionDir, fileName), input.fileBuffer);

  const record: StoredDocumentRecord = {
    id,
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
