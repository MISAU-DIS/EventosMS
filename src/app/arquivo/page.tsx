"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Archive } from "lucide-react";
import type { StoredEvent } from "@/types/event-record";
import PageContainer from "@/components/layout/PageContainer";
import { PageHero } from "@/components/layout/PageContainer";

export default function ArquivoPage() {
  const [events, setEvents] = useState<StoredEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/events?status=archived")
      .then((r) => r.json())
      .then((d: { events: StoredEvent[] }) => setEvents(d.events ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-misau-50 via-white to-misau-50">
      <PageHero title="Arquivo de Eventos" description="Consulte reuniões anteriores do MISAU" />

      <PageContainer className="py-10">
        {loading ? (
          <p className="text-gray-600">A carregar...</p>
        ) : events.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center border border-misau-100">
            <Archive className="w-12 h-12 text-misau-gold mx-auto mb-4" />
            <p className="text-gray-600">Ainda não há eventos arquivados.</p>
            <Link href="/" className="inline-block mt-4 text-misau-medium font-semibold hover:underline">
              Ver evento actual
            </Link>
          </div>
        ) : (
          <ul className="space-y-4">
            {events.map((event) => (
              <li key={event.id}>
                <Link
                  href={`/eventos/${event.slug}`}
                  className="block bg-white rounded-xl p-6 border border-misau-100 hover:border-misau-gold/40 transition-colors"
                >
                  <h2 className="text-xl font-bold text-misau-medium">{event.title}</h2>
                  <p className="text-gray-600 mt-1">{event.location} — {event.dateRange}</p>
                  {event.archivedAt && (
                    <p className="text-xs text-gray-400 mt-2">
                      Arquivado em {new Date(event.archivedAt).toLocaleDateString("pt-PT")}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </PageContainer>
    </main>
  );
}
