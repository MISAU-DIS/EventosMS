import { promises as fs } from "fs";
import path from "path";
import { eventAgenda } from "@/data/agenda";
import type { AgendaStoreFile } from "@/types/content-store";
import type { EventAgendaDay } from "@/types/event";

const storePath = path.join(process.cwd(), "data/agenda-store.json");

async function writeStore(store: AgendaStoreFile) {
  await fs.mkdir(path.dirname(storePath), { recursive: true });
  await fs.writeFile(storePath, JSON.stringify(store, null, 2));
}

async function ensureStore(): Promise<AgendaStoreFile> {
  try {
    const raw = await fs.readFile(storePath, "utf8");
    const parsed = JSON.parse(raw) as AgendaStoreFile;
    if (parsed.days?.length) return parsed;
  } catch {
    // seed below
  }

  const seed: AgendaStoreFile = { days: eventAgenda };
  await writeStore(seed);
  return seed;
}

export async function getAgendaDays(): Promise<EventAgendaDay[]> {
  const store = await ensureStore();
  return store.days;
}

export async function saveAgendaDays(days: EventAgendaDay[]): Promise<EventAgendaDay[]> {
  if (!Array.isArray(days) || days.length === 0) {
    throw new Error("Agenda inválida.");
  }

  const store: AgendaStoreFile = { days };
  await writeStore(store);
  return store.days;
}
