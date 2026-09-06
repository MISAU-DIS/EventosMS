import { promises as fs } from "fs";
import path from "path";
import { DEFAULT_EVENT_ID } from "@/config/api";
import { officialPhotos } from "@/data/photos";
import type { PhotosStoreFile, StoredPhoto } from "@/types/photos-store";
import { slugifyFileName } from "@/types/stored-documents";

const storePath = path.join(process.cwd(), "data/photos-store.json");
const photosRoot = path.join(process.cwd(), "public/fotografias");

async function writeStore(store: PhotosStoreFile) {
  await fs.mkdir(path.dirname(storePath), { recursive: true });
  await fs.writeFile(storePath, JSON.stringify(store, null, 2));
}

function seedPhotos(): StoredPhoto[] {
  const now = new Date().toISOString();
  return officialPhotos.map((photo, index) => {
    const fileName = photo.src.replace("/fotografias/", "");
    return {
      id: photo.id,
      eventId: DEFAULT_EVENT_ID,
      title: photo.title,
      alt: photo.alt,
      fileName,
      order: index + 1,
      uploadedAt: now,
    };
  });
}

async function ensureStore(): Promise<PhotosStoreFile> {
  try {
    const raw = await fs.readFile(storePath, "utf8");
    const parsed = JSON.parse(raw) as PhotosStoreFile;
    if (parsed.photos?.length) return parsed;
  } catch {
    // seed
  }

  const seed: PhotosStoreFile = { photos: seedPhotos() };
  await writeStore(seed);
  return seed;
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

  await fs.mkdir(photosRoot, { recursive: true });
  await fs.writeFile(path.join(photosRoot, fileName), input.fileBuffer);

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
    await fs.unlink(path.join(photosRoot, removed.fileName));
  } catch {
    // ficheiro pode já não existir
  }
  await writeStore(store);
  return true;
}

export async function savePhotosOrder(photos: StoredPhoto[]) {
  const store = await ensureStore();
  for (const photo of photos) {
    const existing = store.photos.find((p) => p.id === photo.id);
    if (existing) existing.order = photo.order;
  }
  await writeStore(store);
  return photos;
}
