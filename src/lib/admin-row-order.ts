import type { FocusEvent, RefObject } from "react";

/** Reordenar só quando o foco sai da linha inteira (não entre campos). */
export function handleRowOrderBlur(
  event: FocusEvent<HTMLDivElement>,
  index: number,
  currentOrder: number,
  totalItems: number,
  onApply: (index: number, order: number) => void,
) {
  const next = event.relatedTarget as Node | null;
  if (next && event.currentTarget.contains(next)) return;

  const target = Math.max(1, Math.min(Math.round(currentOrder) || 1, totalItems));
  if (target === index + 1) return;

  onApply(index, target);
}

export function scrollToRowIndex(
  rowRefs: RefObject<(HTMLDivElement | null)[]>,
  index: number,
) {
  requestAnimationFrame(() => {
    rowRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}
