import type { DocumentSectionId } from "@/config/document-sections";

export type DashboardActivityType = "evaluation" | "document" | "photo" | "event";

export type DashboardActivity = {
  id: string;
  type: DashboardActivityType;
  description: string;
  user?: string;
  at: string;
};

export type DashboardOverview = {
  event: {
    id: string;
    title: string;
    shortTitle: string;
    status: string;
    dateRange: string;
    location: string;
    edition: number;
    isFallback: boolean;
  } | null;
  stats: {
    eventDays: number;
    agendaThemes: number;
    programSessions: number;
    documents: number;
    photos: number;
    evaluations: number;
    evaluationsWithComments: number;
    uniqueRespondents: number;
    avgRating: number | null;
  };
  documentSections: { id: DocumentSectionId; label: string; count: number }[];
  agendaDays: { id: string; label: string; themeCount: number }[];
  programDays: { id: string; label: string; sessionCount: number }[];
  evaluationsByDay: { day: number; count: number }[];
  recentActivity: DashboardActivity[];
};
