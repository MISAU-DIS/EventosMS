"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { StoredEvent } from "@/types/event-record";
import PageContainer from "@/components/layout/PageContainer";

export default function EventoArquivadoPage() {
  const params = useParams();
  const slug = String(params.slug ?? "");
  const [event, setEvent] = useState<StoredEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/v1/events/${slug}`)
      .then((r) => r.json())
      .then((d: { event: StoredEvent }) => setEvent(d.event))
      .catch(() => setEvent(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">A carregar evento...</p>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-600">Evento não encontrado.</p>
        <Link href="/arquivo" className="text-misau-medium font-semibold hover:underline">← Arquivo</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-misau-50 via-white to-misau-50 pt-24">
      <PageContainer className="py-10 max-w-4xl">
        <p className="text-xs uppercase tracking-wider text-misau-gold font-semibold mb-2">Evento arquivado</p>
        <h1 className="text-3xl font-bold text-misau-medium">{event.title}</h1>
        <p className="text-lg text-gray-600 mt-2">{event.location} — {event.dateRange}</p>

        {event.heroImage && (
          <div className="relative aspect-video mt-8 rounded-xl overflow-hidden border border-misau-gold/30">
            <Image src={event.heroImage} alt={event.title} fill className="object-cover" />
          </div>
        )}

        <p className="mt-8 text-lg italic text-misau-dark">{event.lema}</p>
        <p className="mt-4 text-gray-700 leading-relaxed">{event.description}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href={`/agenda`} className="px-5 py-2.5 rounded-full bg-misau-gold text-white font-semibold text-sm">Agenda</Link>
          <Link href={`/programa`} className="px-5 py-2.5 rounded-full border-2 border-misau-gold text-misau-medium font-semibold text-sm">Programa</Link>
          <Link href={`/documentos`} className="px-5 py-2.5 rounded-full border-2 border-misau-gold text-misau-medium font-semibold text-sm">Documentos</Link>
          <Link href={`/fotografias`} className="px-5 py-2.5 rounded-full border-2 border-misau-gold text-misau-medium font-semibold text-sm">Fotografias</Link>
        </div>

        <Link href="/arquivo" className="inline-block mt-10 text-misau-medium hover:underline">← Voltar ao arquivo</Link>
      </PageContainer>
    </main>
  );
}
