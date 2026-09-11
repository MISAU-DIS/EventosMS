import { NextResponse } from "next/server";
import { resolveActiveEventId } from "@/server/active-event";
import { listPhotos } from "@/server/photos-store";
import { toPublicPhoto } from "@/types/photos-store";

export async function GET() {
  const eventId = await resolveActiveEventId();
  const photos = eventId ? await listPhotos(eventId) : [];
  return NextResponse.json({
    eventId,
    hasActiveEvent: Boolean(eventId),
    photos: photos.map((photo) => toPublicPhoto(photo)),
  });
}
