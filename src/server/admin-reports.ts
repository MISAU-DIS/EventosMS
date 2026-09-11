import { documentSectionLabels, type DocumentSectionId } from "@/config/document-sections";
import { rowsToCsv } from "@/lib/csv-export";
import { getAdminEventContext } from "@/server/active-event";
import { getAdminDashboardOverview } from "@/server/admin-dashboard";
import { getAgendaDays } from "@/server/agenda-store";
import { listStoredDocuments } from "@/server/documents-store";
import { getEvaluationSummary } from "@/server/evaluations-store";
import { listPhotos } from "@/server/photos-store";
import { getProgramDays } from "@/server/program-store";

export type AdminReportType =
  | "summary"
  | "evaluations"
  | "documents"
  | "photos"
  | "agenda"
  | "program";

export async function buildAdminReport(type: AdminReportType) {
  const ctx = await getAdminEventContext();
  const eventId = ctx.eventId;

  switch (type) {
    case "summary":
      return {
        ...ctx,
        data: await getAdminDashboardOverview(),
      };

    case "evaluations": {
      const { criteria, submissions } = await getEvaluationSummary(eventId);
      return {
        ...ctx,
        criteria,
        submissions,
        total: submissions.length,
      };
    }

    case "documents": {
      const documents = await listStoredDocuments(eventId, { includeHidden: true });
      return {
        ...ctx,
        documents,
        total: documents.length,
      };
    }

    case "photos": {
      const photos = await listPhotos(eventId);
      return { ...ctx, photos, total: photos.length };
    }

    case "agenda": {
      const days = await getAgendaDays(eventId);
      return { ...ctx, days, total: days.reduce((n, d) => n + d.themes.length, 0) };
    }

    case "program": {
      const days = await getProgramDays(eventId);
      return { ...ctx, days, total: days.reduce((n, d) => n + d.sessions.length, 0) };
    }

    default:
      throw new Error("Tipo de relatório inválido.");
  }
}

export async function buildAdminReportCsv(type: AdminReportType): Promise<string> {
  const report = await buildAdminReport(type);
  const eventLabel = report.event?.title ?? report.eventId;

  switch (type) {
    case "evaluations": {
      const { criteria, submissions } = report as Awaited<
        ReturnType<typeof buildAdminReport>
      > & {
        criteria: { id: string; label: string }[];
        submissions: {
          submittedAt: string;
          dayNumber: number;
          respondentName?: string;
          organization?: string;
          role?: string;
          comment?: string;
          scores: Record<string, number>;
        }[];
      };
      const headers = [
        "Evento",
        "Data",
        "Dia",
        "Nome",
        "Organização",
        "Função",
        "Comentário",
        ...criteria.map((c) => c.label),
      ];
      const rows = submissions.map((s) => [
        eventLabel,
        s.submittedAt,
        s.dayNumber,
        s.respondentName ?? "",
        s.organization ?? "",
        s.role ?? "",
        s.comment ?? "",
        ...criteria.map((c) => s.scores[c.id] ?? ""),
      ]);
      return rowsToCsv(headers, rows);
    }

    case "documents": {
      const { documents } = report as { documents: {
        title: string;
        sectionId: DocumentSectionId;
        fileName: string;
        fileType: string;
        hidden?: boolean;
        createdAt: string;
      }[] };
      return rowsToCsv(
        ["Evento", "Secção", "Título", "Ficheiro", "Tipo", "Oculto", "Criado"],
        documents.map((d) => [
          eventLabel,
          documentSectionLabels[d.sectionId],
          d.title,
          d.fileName,
          d.fileType,
          d.hidden ? "sim" : "não",
          d.createdAt,
        ]),
      );
    }

    case "photos": {
      const { photos } = report as { photos: {
        title: string;
        fileName: string;
        order: number;
        uploadedAt: string;
      }[] };
      return rowsToCsv(
        ["Evento", "Ordem", "Título", "Ficheiro", "Carregado"],
        photos.map((p) => [eventLabel, p.order, p.title, p.fileName, p.uploadedAt]),
      );
    }

    case "agenda": {
      const { days } = report as { days: {
        label: string;
        date: string;
        themes: { order: number; title: string; responsible: string }[];
      }[] };
      const rows: (string | number)[][] = [];
      for (const day of days) {
        for (const theme of day.themes) {
          rows.push([eventLabel, day.label, day.date, theme.order, theme.title, theme.responsible]);
        }
      }
      return rowsToCsv(["Evento", "Dia", "Data", "Ordem", "Tema", "Responsável"], rows);
    }

    case "program": {
      const { days } = report as { days: {
        label: string;
        date: string;
        sessions: {
          order: number;
          time: string;
          title: string;
          type: string;
          speaker: string;
        }[];
      }[] };
      const rows: (string | number)[][] = [];
      for (const day of days) {
        for (const session of day.sessions) {
          rows.push([
            eventLabel,
            day.label,
            day.date,
            session.order,
            session.time,
            session.title,
            session.type,
            session.speaker,
          ]);
        }
      }
      return rowsToCsv(
        ["Evento", "Dia", "Data", "Ordem", "Hora", "Título", "Tipo", "Orador"],
        rows,
      );
    }

    case "summary": {
      const { data } = report as { data: Awaited<ReturnType<typeof getAdminDashboardOverview>> };
      return rowsToCsv(
        ["Métrica", "Valor"],
        [
          ["Evento", eventLabel],
          ["Avaliações", data.stats.evaluations],
          ["Avaliação média", data.stats.avgRating ?? "—"],
          ["Documentos", data.stats.documents],
          ["Fotografias", data.stats.photos],
          ["Temas agenda", data.stats.agendaThemes],
          ["Sessões programa", data.stats.programSessions],
          ["Respondentes únicos", data.stats.uniqueRespondents],
        ],
      );
    }

    default:
      return "";
  }
}
