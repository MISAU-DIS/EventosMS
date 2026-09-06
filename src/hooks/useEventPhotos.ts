"use client";

import { useEffect, useState } from "react";
import { officialPhotos } from "@/data/photos";

export type PublicPhoto = {
  id: string;
  title: string;
  alt: string;
  src: string;
  order: number;
};

export function useEventPhotos() {
  const fallback: PublicPhoto[] = officialPhotos.map((p, i) => ({
    id: p.id,
    title: p.title,
    alt: p.alt,
    src: p.src,
    order: i + 1,
  }));

  const [photos, setPhotos] = useState<PublicPhoto[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/photos")
      .then((r) => r.json())
      .then((d: { photos: PublicPhoto[] }) => {
        if (d.photos?.length) setPhotos(d.photos);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { photos, loading };
}
