import { promises as fs } from "fs";
import path from "path";
import { dataPath } from "../config.js";
import type { AgendaStoreFile } from "../types.js";

const storePath = () => dataPath("agenda-store.json");

async function writeStore(store: AgendaStoreFile) {
  const file = storePath();
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(store, null, 2));
}

async function ensureStore(): Promise<AgendaStoreFile> {
  try {
    const raw = await fs.readFile(storePath(), "utf8");
    return JSON.parse(raw) as AgendaStoreFile;
  } catch {
    return { days: [] };
  }
}

export async function getAgendaDays() {
  const store = await ensureStore();
  return store.days ?? [];
}

export async function saveAgendaDays(days: unknown[]) {
  if (!Array.isArray(days) || days.length === 0) {
    throw new Error("Agenda inválida.");
  }
  const store: AgendaStoreFile = { days };
  await writeStore(store);
  return store.days;
}
