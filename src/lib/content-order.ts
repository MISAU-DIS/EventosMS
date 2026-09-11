import type { EventAgendaDay, EventProgramDay } from "@/types/event";

export function sortByOrder<T extends { order: number }>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => a.order - b.order);
}

export function renumberOrders<T extends { order: number }>(items: readonly T[]): T[] {
  return sortByOrder(items).map((item, index) => ({ ...item, order: index + 1 }));
}

/** Move item to posição newOrder (1-based); desloca os restantes e renumera 1..n. */
export function applyOrderAt<T extends { order: number }>(
  items: readonly T[],
  itemIndex: number,
  newOrder: number,
): T[] {
  if (items.length === 0 || itemIndex < 0 || itemIndex >= items.length) {
    return renumberOrders(items);
  }

  const target = Math.max(1, Math.min(Math.round(newOrder) || 1, items.length));
  const list = items.map((item) => ({ ...item }));
  const [moving] = list.splice(itemIndex, 1);
  list.splice(target - 1, 0, moving);

  return list.map((item, index) => ({ ...item, order: index + 1 }));
}

export function normalizeAgendaDays(days: EventAgendaDay[]): EventAgendaDay[] {
  return days.map((day) => ({
    ...day,
    themes: renumberOrders(day.themes),
  }));
}

export function normalizeProgramDays(days: EventProgramDay[]): EventProgramDay[] {
  return days.map((day) => ({
    ...day,
    sessions: renumberOrders(day.sessions),
  }));
}
