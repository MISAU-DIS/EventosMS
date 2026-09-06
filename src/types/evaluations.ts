export type CriterionGroup = "first_day_only" | "continuous";

export type EvaluationCriterion = {
  id: string;
  eventId: string;
  label: string;
  group: CriterionGroup;
  order: number;
  active: boolean;
};

export type EvaluationSubmission = {
  id: string;
  eventId: string;
  dayNumber: number;
  fingerprint: string;
  scores: Record<string, number>;
  comment?: string;
  respondentName?: string;
  role?: string;
  organization?: string;
  submittedAt: string;
};

export type CriteriaStoreFile = {
  criteria: EvaluationCriterion[];
};

export type EvaluationsStoreFile = {
  submissions: EvaluationSubmission[];
};

export const EVALUATION_DAYS = [
  { number: 1, label: "Dia 1 — 09 Setembro" },
  { number: 2, label: "Dia 2 — 10 Setembro" },
  { number: 3, label: "Dia 3 — 11 Setembro" },
] as const;

export const FINGERPRINT_KEY = "ccs-eval-fingerprint";
