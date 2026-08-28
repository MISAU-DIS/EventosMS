export type EvaluationDayId = "dia3";

export type EvaluationDay = {
  id: EvaluationDayId;
  label: string;
  description: string;
};

export const evaluationDay: EvaluationDay = {
  id: "dia3",
  label: "Avaliação final",
  description:
    "Registe a sua avaliação na conclusão da reunião.",
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
