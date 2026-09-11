const rtf = new Intl.RelativeTimeFormat("pt-PT", { numeric: "auto" });

export function formatRelativeTimePt(isoDate: string): string {
  const then = new Date(isoDate).getTime();
  if (Number.isNaN(then)) return isoDate;

  const diffSec = Math.round((then - Date.now()) / 1000);
  const abs = Math.abs(diffSec);

  if (abs < 60) return rtf.format(diffSec, "second");
  if (abs < 3600) return rtf.format(Math.round(diffSec / 60), "minute");
  if (abs < 86400) return rtf.format(Math.round(diffSec / 3600), "hour");
  if (abs < 604800) return rtf.format(Math.round(diffSec / 86400), "day");

  return new Date(isoDate).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
