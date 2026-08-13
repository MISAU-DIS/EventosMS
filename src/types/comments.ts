export type EvaluationDayId = "dia1" | "dia2" | "dia3" | "geral";

export type EvaluationDay = {
  id: EvaluationDayId;
  label: string;
  description: string;
};

export const evaluationDays: EvaluationDay[] = [
  {
    id: "dia1",
    label: "1.º dia",
    description: "Avaliação do primeiro dia da reunião (09 Set 2026).",
  },
  {
    id: "dia2",
    label: "2.º dia",
    description: "Avaliação do segundo dia da reunião (10 Set 2026).",
  },
  {
    id: "dia3",
    label: "3.º dia",
    description: "Avaliação do terceiro dia da reunião (11 Set 2026).",
  },
  {
    id: "geral",
    label: "Avaliação geral",
    description: "Avaliação final do evento na conclusão da reunião.",
  },
];

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
