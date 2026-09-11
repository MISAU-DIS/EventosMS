"use client";

type AdminEventBannerProps = {
  event: {
    title: string;
    shortTitle: string;
    status: string;
    dateRange: string;
    location: string;
  } | null;
  eventId: string;
  isFallback?: boolean;
};

export default function AdminEventBanner({
  event,
  eventId,
  isFallback = false,
}: AdminEventBannerProps) {
  if (!event) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Nenhum evento configurado. Os conteúdos serão associados a{" "}
        <code className="text-xs">{eventId}</code>.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
      <span className="font-semibold">
        {isFallback ? "Último evento" : "Evento actual"}:
      </span>{" "}
      {event.title} · {event.location} · {event.dateRange}
      <span className="ml-2 text-xs text-emerald-700">({eventId})</span>
    </div>
  );
}
