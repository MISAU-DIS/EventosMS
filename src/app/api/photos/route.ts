import { NextResponse } from "next/server";
import { listPhotos } from "@/server/photos-store";
import { toPublicPhoto } from "@/types/photos-store";

export async function GET() {
  const photos = await listPhotos();
  return NextResponse.json({ photos: photos.map((photo) => toPublicPhoto(photo)) });
}
