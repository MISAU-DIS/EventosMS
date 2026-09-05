import { promises as fs } from "fs";
import path from "path";
import { eventProgram } from "@/data/program";
import type { ProgramStoreFile } from "@/types/content-store";
import type { EventProgramDay } from "@/types/event";

const storePath = path.join(process.cwd(), "data/program-store.json");

async function writeStore(store: ProgramStoreFile) {
  await fs.mkdir(path.dirname(storePath), { recursive: true });
  await fs.writeFile(storePath, JSON.stringify(store, null, 2));
}

async function ensureStore(): Promise<ProgramStoreFile> {
  try {
    const raw = await fs.readFile(storePath, "utf8");
    const parsed = JSON.parse(raw) as ProgramStoreFile;
    if (parsed.days?.length) return parsed;
  } catch {
    // seed below
  }

  const seed: ProgramStoreFile = { days: eventProgram };
  await writeStore(seed);
  return seed;
}

export async function getProgramDays(): Promise<EventProgramDay[]> {
  const store = await ensureStore();
  return store.days;
}

export async function saveProgramDays(days: EventProgramDay[]): Promise<EventProgramDay[]> {
  if (!Array.isArray(days) || days.length === 0) {
    throw new Error("Programa inválido.");
  }

  const store: ProgramStoreFile = { days };
  await writeStore(store);
  return store.days;
}
