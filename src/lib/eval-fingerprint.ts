"use client";

export function getEvaluationFingerprint(): string {
  if (typeof window === "undefined") return "";
  const key = "ccs-eval-fingerprint";
  let fp = localStorage.getItem(key);
  if (!fp) {
    fp = `fp-${crypto.randomUUID()}`;
    localStorage.setItem(key, fp);
  }
  return fp;
}

export function getSubmittedDays(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("ccs-eval-submitted-days");
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
}

type SavedDaySummary = {
  average: number;
  scores: Record<string, number>;
  submittedAt: string;
};

const SUMMARY_KEY = "ccs-eval-day-summaries";

export function markDaySubmitted(dayNumber: number, summary?: Omit<SavedDaySummary, "submittedAt">) {
  const days = getSubmittedDays();
  if (!days.includes(dayNumber)) {
    days.push(dayNumber);
    localStorage.setItem("ccs-eval-submitted-days", JSON.stringify(days));
  }
  if (summary) {
    try {
      const raw = localStorage.getItem(SUMMARY_KEY);
      const all = raw ? (JSON.parse(raw) as Record<string, SavedDaySummary>) : {};
      all[String(dayNumber)] = { ...summary, submittedAt: new Date().toISOString() };
      localStorage.setItem(SUMMARY_KEY, JSON.stringify(all));
    } catch {
      // ignore
    }
  }
}

export function getDaySubmissionSummary(dayNumber: number): SavedDaySummary | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SUMMARY_KEY);
    if (!raw) return null;
    return (JSON.parse(raw) as Record<string, SavedDaySummary>)[String(dayNumber)] ?? null;
  } catch {
    return null;
  }
}
