import { getPublicBaseUrl, v1Error, v1Json, wantsAbsoluteUrls } from "@/server/api-v1";
import { listPhotos } from "@/server/photos-store";
import { getEventById } from "@/server/events-store";
import { toPublicPhoto } from "@/types/photos-store";

type RouteContext = { params: Promise<{ eventId: string }> };

export async function GET(request: Request, context: RouteContext) {
  const { eventId } = await context.params;
  const event = await getEventById(eventId);
  if (!event) {
    return v1Error("EVENT_NOT_FOUND", "Evento não encontrado.", 404);
  }

  const baseUrl = wantsAbsoluteUrls(request) ? getPublicBaseUrl(request) : undefined;
  const photos = await listPhotos(event.id);

  return v1Json({
    eventId: event.id,
    photos: photos.map((photo) => toPublicPhoto(photo, baseUrl)),
  });
}
