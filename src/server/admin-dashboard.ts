import { documentSectionLabels, type DocumentSectionId } from "@/config/document-sections";
import type { DashboardActivity, DashboardOverview } from "@/types/admin-dashboard";
import { resolveActiveEventId } from "@/server/active-event";
import { getAgendaDays } from "@/server/agenda-store";
import { listStoredDocuments } from "@/server/documents-store";
import { listSubmissions } from "@/server/evaluations-store";
import { getDashboardEvent } from "@/server/events-store";
import { listPhotos } from "@/server/photos-store";
import { getProgramDays } from "@/server/program-store";

function averageScore(scores: Record<string, number>): number | null {
  const values = Object.values(scores);
  if (!values.length) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export async function getAdminDashboardOverview(): Promise<DashboardOverview> {
  const eventRecord = await getDashboardEvent();
  const eventId = eventRecord?.id;

  const scopedEventId = eventId ?? (await resolveActiveEventId());

  const [agendaDays, programDays, documents, photos, submissions] = await Promise.all([
    getAgendaDays(scopedEventId),
    getProgramDays(scopedEventId),
    listStoredDocuments(scopedEventId),
    listPhotos(scopedEventId),
    listSubmissions(scopedEventId),
  ]);

  const allScores = submissions.flatMap((s) => Object.values(s.scores));
  const avgRating =
    allScores.length > 0
      ? Math.round((allScores.reduce((a, b) => a + b, 0) / allScores.length) * 10) / 10
      : null;

  const sectionIds: DocumentSectionId[] = ["dia1", "dia2", "dia3", "gerais"];
  const documentSections = sectionIds.map((id) => ({
    id,
    label: documentSectionLabels[id],
    count: documents.filter((doc) => doc.sectionId === id).length,
  }));

  const evaluationsByDay = [1, 2, 3].map((day) => ({
    day,
    count: submissions.filter((s) => s.dayNumber === day).length,
  }));

  const activities: DashboardActivity[] = [];

  for (const submission of submissions) {
    const avg = averageScore(submission.scores);
    activities.push({
      id: submission.id,
      type: "evaluation",
      description: submission.comment
        ? "Nova avaliação com comentário"
        : "Nova avaliação submetida",
      user: submission.respondentName || submission.organization || "Participante",
      at: submission.submittedAt,
    });
    if (avg !== null) {
      activities[activities.length - 1].description += ` (média ${avg.toFixed(1)}/5)`;
    }
  }

  for (const doc of documents) {
    activities.push({
      id: doc.id,
      type: "document",
      description: `Documento «${doc.title}» (${documentSectionLabels[doc.sectionId]})`,
      at: doc.createdAt,
    });
  }

  for (const photo of photos) {
    activities.push({
      id: photo.id,
      type: "photo",
      description: `Fotografia «${photo.title}» publicada`,
      at: photo.uploadedAt,
    });
  }

  if (eventRecord) {
    activities.push({
      id: `event-${eventRecord.id}`,
      type: "event",
      description: "Evento actualizado",
      user: "Admin",
      at: eventRecord.updatedAt,
    });
  }

  activities.sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());

  const activeExists = eventRecord?.status === "active";

  return {
    event: eventRecord
      ? {
          id: eventRecord.id,
          title: eventRecord.title,
          shortTitle: eventRecord.shortTitle,
          status: eventRecord.status,
          dateRange: eventRecord.dateRange,
          location: eventRecord.location,
          edition: eventRecord.edition,
          isFallback: !activeExists,
        }
      : null,
    stats: {
      eventDays: agendaDays.length,
      agendaThemes: agendaDays.reduce((sum, day) => sum + day.themes.length, 0),
      programSessions: programDays.reduce((sum, day) => sum + day.sessions.length, 0),
      documents: documents.length,
      photos: photos.length,
      evaluations: submissions.length,
      evaluationsWithComments: submissions.filter((s) => s.comment?.trim()).length,
      uniqueRespondents: new Set(submissions.map((s) => s.fingerprint)).size,
      avgRating,
    },
    documentSections,
    agendaDays: agendaDays.map((day) => ({
      id: day.id,
      label: day.label,
      themeCount: day.themes.length,
    })),
    programDays: programDays.map((day) => ({
      id: day.id,
      label: day.label,
      sessionCount: day.sessions.length,
    })),
    evaluationsByDay,
    recentActivity: activities.slice(0, 12),
  };
}
