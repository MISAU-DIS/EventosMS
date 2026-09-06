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

export function toPublicPhoto(photo: StoredPhoto) {
  return {
    id: photo.id,
    title: photo.title,
    alt: photo.alt,
    src: `/fotografias/${photo.fileName}`,
    order: photo.order,
  };
}
