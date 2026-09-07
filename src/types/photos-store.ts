export type StoredPhoto = {
  id: string;
  eventId: string;
  title: string;
  alt: string;
  fileName: string;
  order: number;
  uploadedAt: string;
};

export type PhotosStoreFile = {
  photos: StoredPhoto[];
};

export function toPublicPhoto(photo: StoredPhoto, baseUrl?: string) {
  const path = `/fotografias/${photo.fileName}`;
  return {
    id: photo.id,
    title: photo.title,
    alt: photo.alt,
    src: baseUrl ? `${baseUrl.replace(/\/$/, "")}${path}` : path,
    order: photo.order,
  };
}
