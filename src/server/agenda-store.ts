import { promises as fs } from "fs";
import path from "path";
import { DEFAULT_EVENT_ID } from "@/config/api";
import { eventAgenda } from "@/data/agenda";
import { normalizeAgendaDays } from "@/lib/content-order";
import { resolveActiveEventId } from "@/server/active-event";
import type {
  AgendaStoreFile,
  LegacyAgendaStoreFile,
} from "@/types/content-store";
import type { EventAgendaDay } from "@/types/event";

const storePath = path.join(process.cwd(), "data/agenda-store.json");

async function writeStore(store: AgendaStoreFile) {
  await fs.mkdir(path.dirname(storePath), { recursive: true });
  await fs.writeFile(storePath, JSON.stringify(store, null, 2));
}

function isLegacyStore(value: unknown): value is LegacyAgendaStoreFile {
  return (
    typeof value === "object" &&
    value !== null &&
    "days" in value &&
    Array.isArray((value as LegacyAgendaStoreFile).days)
  );
}

function isMultiEventStore(value: unknown): value is AgendaStoreFile {
  return (
    typeof value === "object" &&
    value !== null &&
    "byEvent" in value &&
    typeof (value as AgendaStoreFile).byEvent === "object"
  );
}

async function migrateStore(parsed: unknown): Promise<AgendaStoreFile> {
  if (isMultiEventStore(parsed)) return parsed;

  if (isLegacyStore(parsed) && parsed.days.length > 0) {
    const migrated: AgendaStoreFile = {
      byEvent: { [DEFAULT_EVENT_ID]: parsed.days },
    };
    await writeStore(migrated);
    return migrated;
  }

  const seed: AgendaStoreFile = { byEvent: { [DEFAULT_EVENT_ID]: eventAgenda } };
  await writeStore(seed);
  return seed;
}

async function ensureStore(): Promise<AgendaStoreFile> {
  try {
    const raw = await fs.readFile(storePath, "utf8");
    return migrateStore(JSON.parse(raw) as unknown);
  } catch {
    const seed: AgendaStoreFile = { byEvent: { [DEFAULT_EVENT_ID]: eventAgenda } };
    await writeStore(seed);
    return seed;
  }
}

export async function getAgendaDays(eventId?: string): Promise<EventAgendaDay[]> {
  const id = eventId ?? (await resolveActiveEventId());
  const store = await ensureStore();
  const days = store.byEvent[id];
  if (days?.length) return normalizeAgendaDays(days);
  if (id === DEFAULT_EVENT_ID) return normalizeAgendaDays(eventAgenda);
  return [];
}

export async function saveAgendaDays(
  days: EventAgendaDay[],
  eventId?: string,
): Promise<EventAgendaDay[]> {
  if (!Array.isArray(days) || days.length === 0) {
    throw new Error("Agenda inválida.");
  }

  const id = eventId ?? (await resolveActiveEventId());
  const store = await ensureStore();
  store.byEvent[id] = normalizeAgendaDays(days);
  await writeStore(store);
  return store.byEvent[id];
}
