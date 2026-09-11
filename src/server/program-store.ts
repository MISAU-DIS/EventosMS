import { promises as fs } from "fs";
import path from "path";
import { DEFAULT_EVENT_ID } from "@/config/api";
import { eventProgram } from "@/data/program";
import { normalizeProgramDays } from "@/lib/content-order";
import { resolveActiveEventId } from "@/server/active-event";
import type {
  LegacyProgramStoreFile,
  ProgramStoreFile,
} from "@/types/content-store";
import type { EventProgramDay } from "@/types/event";

const storePath = path.join(process.cwd(), "data/program-store.json");

async function writeStore(store: ProgramStoreFile) {
  await fs.mkdir(path.dirname(storePath), { recursive: true });
  await fs.writeFile(storePath, JSON.stringify(store, null, 2));
}

function isLegacyStore(value: unknown): value is LegacyProgramStoreFile {
  return (
    typeof value === "object" &&
    value !== null &&
    "days" in value &&
    Array.isArray((value as LegacyProgramStoreFile).days)
  );
}

function isMultiEventStore(value: unknown): value is ProgramStoreFile {
  return (
    typeof value === "object" &&
    value !== null &&
    "byEvent" in value &&
    typeof (value as ProgramStoreFile).byEvent === "object"
  );
}

async function migrateStore(parsed: unknown): Promise<ProgramStoreFile> {
  if (isMultiEventStore(parsed)) return parsed;

  if (isLegacyStore(parsed) && parsed.days.length > 0) {
    const migrated: ProgramStoreFile = {
      byEvent: { [DEFAULT_EVENT_ID]: parsed.days },
    };
    await writeStore(migrated);
    return migrated;
  }

  const seed: ProgramStoreFile = { byEvent: { [DEFAULT_EVENT_ID]: eventProgram } };
  await writeStore(seed);
  return seed;
}

async function ensureStore(): Promise<ProgramStoreFile> {
  try {
    const raw = await fs.readFile(storePath, "utf8");
    return migrateStore(JSON.parse(raw) as unknown);
  } catch {
    const seed: ProgramStoreFile = { byEvent: { [DEFAULT_EVENT_ID]: eventProgram } };
    await writeStore(seed);
    return seed;
  }
}

export async function getProgramDays(eventId?: string): Promise<EventProgramDay[]> {
  const id = eventId ?? (await resolveActiveEventId());
  const store = await ensureStore();
  const days = store.byEvent[id];
  if (days?.length) return normalizeProgramDays(days);
  if (id === DEFAULT_EVENT_ID) return normalizeProgramDays(eventProgram);
  return [];
}

export async function saveProgramDays(
  days: EventProgramDay[],
  eventId?: string,
): Promise<EventProgramDay[]> {
  if (!Array.isArray(days) || days.length === 0) {
    throw new Error("Programa inválido.");
  }

  const id = eventId ?? (await resolveActiveEventId());
  const store = await ensureStore();
  store.byEvent[id] = normalizeProgramDays(days);
  await writeStore(store);
  return store.byEvent[id];
}
