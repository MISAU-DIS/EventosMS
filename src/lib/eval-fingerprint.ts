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

export function markDaySubmitted(dayNumber: number) {
  const days = getSubmittedDays();
  if (!days.includes(dayNumber)) {
    days.push(dayNumber);
    localStorage.setItem("ccs-eval-submitted-days", JSON.stringify(days));
  }
}
