import type { EvaluationCriterion, EvaluationSubmission } from "@/types/evaluations";

export function averageScores(scores: number[]): number | null {
  if (!scores.length) return null;
  const sum = scores.reduce((a, b) => a + b, 0);
  return Math.round((sum / scores.length) * 10) / 10;
}

export function submissionAverage(submission: EvaluationSubmission): number | null {
  return averageScores(Object.values(submission.scores));
}

export function criterionAverages(
  criteria: EvaluationCriterion[],
  submissions: EvaluationSubmission[],
  dayNumber?: number,
): { id: string; label: string; average: number | null; count: number }[] {
  const filtered = dayNumber
    ? submissions.filter((s) => s.dayNumber === dayNumber)
    : submissions;

  return criteria
    .filter((c) => c.active)
    .sort((a, b) => a.order - b.order)
    .map((criterion) => {
      const values = filtered
        .map((s) => s.scores[criterion.id])
        .filter((v): v is number => typeof v === "number");
      return {
        id: criterion.id,
        label: criterion.label,
        average: averageScores(values),
        count: values.length,
      };
    });
}

export function overallAverage(
  submissions: EvaluationSubmission[],
  dayNumber?: number,
): number | null {
  const filtered = dayNumber
    ? submissions.filter((s) => s.dayNumber === dayNumber)
    : submissions;
  const all = filtered.flatMap((s) => Object.values(s.scores));
  return averageScores(all);
}

export function submissionsByDay(submissions: EvaluationSubmission[]) {
  return [1, 2, 3].map((day) => ({
    day,
    count: submissions.filter((s) => s.dayNumber === day).length,
    average: overallAverage(submissions, day),
  }));
}

export function formatRating(value: number | null): string {
  if (value === null) return "—";
  return value.toFixed(1);
}

export function ratingColor(value: number | null): string {
  if (value === null) return "bg-gray-200";
  if (value >= 4.5) return "bg-emerald-500";
  if (value >= 3.5) return "bg-lime-500";
  if (value >= 2.5) return "bg-amber-500";
  if (value >= 1.5) return "bg-orange-500";
  return "bg-red-500";
}
