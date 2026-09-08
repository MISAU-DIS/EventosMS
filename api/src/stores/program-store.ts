import { promises as fs } from "fs";
import path from "path";
import { dataPath } from "../config.js";
import type { ProgramStoreFile } from "../types.js";

const storePath = () => dataPath("program-store.json");

async function writeStore(store: ProgramStoreFile) {
  const file = storePath();
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(store, null, 2));
}

async function ensureStore(): Promise<ProgramStoreFile> {
  try {
    const raw = await fs.readFile(storePath(), "utf8");
    return JSON.parse(raw) as ProgramStoreFile;
  } catch {
    return { days: [] };
  }
}

export async function getProgramDays() {
  const store = await ensureStore();
  return store.days ?? [];
}

export async function saveProgramDays(days: unknown[]) {
  if (!Array.isArray(days) || days.length === 0) {
    throw new Error("Programa inválido.");
  }
  const store: ProgramStoreFile = { days };
  await writeStore(store);
  return store.days;
}
