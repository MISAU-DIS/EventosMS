export type EvaluationDayId = "dia3";

export type EvaluationDay = {
  id: EvaluationDayId;
  label: string;
  description: string;
};

export const evaluationDay: EvaluationDay = {
  id: "dia3",
  label: "3.º dia",
  description:
    "Avaliação na conclusão da reunião — último dia do evento (11 Set 2026).",
};

export type StoredComment = {
  id: number;
  name: string;
  role: string;
  organization: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
};

export type NewCommentInput = {
  name: string;
  role: string;
  organization: string;
  rating: number;
  comment: string;
};

export const COMMENTS_STORAGE_PREFIX = "ccs-2026-comments-";
