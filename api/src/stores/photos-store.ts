import { promises as fs } from "fs";
import path from "path";
import { DEFAULT_EVENT_ID, dataPath, photosRoot } from "../config.js";
import type { PhotosStoreFile, StoredPhoto } from "../types.js";
import { slugifyFileName } from "../types.js";

const storePath = () => dataPath("photos-store.json");

async function writeStore(store: PhotosStoreFile) {
  const file = storePath();
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(store, null, 2));
}

async function ensureStore(): Promise<PhotosStoreFile> {
  try {
    const raw = await fs.readFile(storePath(), "utf8");
    const parsed = JSON.parse(raw) as PhotosStoreFile;
    if (parsed.photos) return parsed;
  } catch {
    const empty: PhotosStoreFile = { photos: [] };
    await writeStore(empty);
    return empty;
  }
  const empty: PhotosStoreFile = { photos: [] };
  await writeStore(empty);
  return empty;
}

export async function listPhotos(eventId = DEFAULT_EVENT_ID): Promise<StoredPhoto[]> {
  const store = await ensureStore();
  return store.photos
    .filter((p) => p.eventId === eventId)
    .sort((a, b) => a.order - b.order);
}

export async function addPhoto(input: {
  title: string;
  alt: string;
  originalFileName: string;
  fileBuffer: Buffer;
  eventId?: string;
}) {
  const store = await ensureStore();
  const ext = path.extname(input.originalFileName) || ".jpg";
  const base = slugifyFileName(path.basename(input.originalFileName, ext)) || "foto";
  const id = `${base}-${Date.now()}`;
  const fileName = `${id}${ext.toLowerCase()}`;
  const maxOrder = store.photos.reduce((max, p) => Math.max(max, p.order), 0);

  await fs.mkdir(photosRoot(), { recursive: true });
  await fs.writeFile(path.join(photosRoot(), fileName), input.fileBuffer);

  const record: StoredPhoto = {
    id,
    eventId: input.eventId ?? DEFAULT_EVENT_ID,
    title: input.title.trim(),
    alt: input.alt.trim() || input.title.trim(),
    fileName,
    order: maxOrder + 1,
    uploadedAt: new Date().toISOString(),
  };

  store.photos.push(record);
  await writeStore(store);
  return record;
}

export async function updatePhoto(
  id: string,
  patch: Partial<Pick<StoredPhoto, "title" | "alt" | "order">>,
) {
  const store = await ensureStore();
  const photo = store.photos.find((p) => p.id === id);
  if (!photo) return null;
  if (patch.title !== undefined) photo.title = patch.title.trim();
  if (patch.alt !== undefined) photo.alt = patch.alt.trim();
  if (patch.order !== undefined) photo.order = patch.order;
  await writeStore(store);
  return photo;
}

export async function deletePhoto(id: string) {
  const store = await ensureStore();
  const index = store.photos.findIndex((p) => p.id === id);
  if (index === -1) return false;
  const [removed] = store.photos.splice(index, 1);
  try {
    await fs.unlink(path.join(photosRoot(), removed.fileName));
  } catch {
    // ignore
  }
  await writeStore(store);
  return true;
}
