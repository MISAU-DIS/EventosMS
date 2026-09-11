#!/usr/bin/env node
/**
 * Garante que todos os dados locais estão vinculados ao evento li-ccs-2026.
 * Migra agenda/programa para formato byEvent e preenche eventId em falta.
 */
import { promises as fs, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(process.argv[2] ?? path.join(__dirname, ".."));
const DATA =
  path.basename(ROOT) === "data"
    ? ROOT
    : existsSync(path.join(ROOT, "front", "data"))
      ? path.join(ROOT, "front", "data")
      : path.join(ROOT, "data");
const EVENT_ID = "li-ccs-2026";

async function readJson(file) {
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    return null;
  }
}

async function writeJson(file, data) {
  await fs.writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
}

async function ensureDocuments() {
  const file = path.join(DATA, "documents-store.json");
  const store = (await readJson(file)) ?? { documents: [], ignoredOrphanPaths: [] };
  let changed = 0;
  for (const doc of store.documents ?? []) {
    if (!doc.eventId) {
      doc.eventId = EVENT_ID;
      changed++;
    }
  }
  if (!store.ignoredOrphanPaths) store.ignoredOrphanPaths = [];
  if (changed) await writeJson(file, store);
  return { total: store.documents?.length ?? 0, linked: store.documents?.length ?? 0, changed };
}

async function ensurePhotos() {
  const file = path.join(DATA, "photos-store.json");
  const store = (await readJson(file)) ?? { photos: [] };
  let changed = 0;
  for (const photo of store.photos ?? []) {
    if (!photo.eventId) {
      photo.eventId = EVENT_ID;
      changed++;
    }
  }
  if (changed) await writeJson(file, store);
  const linked = (store.photos ?? []).filter((p) => p.eventId === EVENT_ID).length;
  return { total: store.photos?.length ?? 0, linked, changed };
}

async function ensureAgenda() {
  const file = path.join(DATA, "agenda-store.json");
  const raw = await readJson(file);
  if (raw?.byEvent?.[EVENT_ID]?.length) {
    return {
      format: "byEvent",
      days: raw.byEvent[EVENT_ID].length,
      themes: raw.byEvent[EVENT_ID].reduce((n, d) => n + (d.themes?.length ?? 0), 0),
      migrated: false,
    };
  }
  const days = raw?.days ?? [];
  const migrated = { byEvent: { [EVENT_ID]: days } };
  await writeJson(file, migrated);
  return {
    format: "byEvent",
    days: days.length,
    themes: days.reduce((n, d) => n + (d.themes?.length ?? 0), 0),
    migrated: true,
  };
}

async function ensureProgram() {
  const file = path.join(DATA, "program-store.json");
  const raw = await readJson(file);
  if (raw?.byEvent?.[EVENT_ID]?.length) {
    return {
      format: "byEvent",
      days: raw.byEvent[EVENT_ID].length,
      sessions: raw.byEvent[EVENT_ID].reduce((n, d) => n + (d.sessions?.length ?? 0), 0),
      migrated: false,
    };
  }
  const days = raw?.days ?? [];
  const migrated = { byEvent: { [EVENT_ID]: days } };
  await writeJson(file, migrated);
  return {
    format: "byEvent",
    days: days.length,
    sessions: days.reduce((n, d) => n + (d.sessions?.length ?? 0), 0),
    migrated: true,
  };
}

async function ensureEvaluations() {
  const critFile = path.join(DATA, "evaluation-criteria-store.json");
  const subFile = path.join(DATA, "evaluations-store.json");
  const crit = (await readJson(critFile)) ?? { criteria: [] };
  const subs = (await readJson(subFile)) ?? { submissions: [] };
  let critChanged = 0;
  let subChanged = 0;
  for (const c of crit.criteria ?? []) {
    if (!c.eventId) {
      c.eventId = EVENT_ID;
      critChanged++;
    }
  }
  for (const s of subs.submissions ?? []) {
    if (!s.eventId) {
      s.eventId = EVENT_ID;
      subChanged++;
    }
  }
  if (critChanged) await writeJson(critFile, crit);
  if (subChanged) await writeJson(subFile, subs);
  return {
    criteria: (crit.criteria ?? []).filter((c) => c.eventId === EVENT_ID).length,
    submissions: (subs.submissions ?? []).filter((s) => s.eventId === EVENT_ID).length,
    critChanged,
    subChanged,
  };
}

async function ensureEvents() {
  const file = path.join(DATA, "events-store.json");
  const store = (await readJson(file)) ?? { events: [] };
  const active = (store.events ?? []).find((e) => e.status === "active");
  return {
    total: store.events?.length ?? 0,
    activeId: active?.id ?? null,
    activeTitle: active?.title ?? null,
  };
}

const report = {
  eventId: EVENT_ID,
  events: await ensureEvents(),
  documents: await ensureDocuments(),
  photos: await ensurePhotos(),
  agenda: await ensureAgenda(),
  program: await ensureProgram(),
  evaluations: await ensureEvaluations(),
};

console.log(JSON.stringify(report, null, 2));

const ok =
  report.events.activeId === EVENT_ID &&
  report.documents.linked === report.documents.total &&
  report.photos.linked === report.photos.total &&
  report.agenda.format === "byEvent" &&
  report.program.format === "byEvent";

process.exit(ok ? 0 : 1);
