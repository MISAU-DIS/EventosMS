import { promises as fs } from "fs";
import path from "path";
import { DEFAULT_EVENT_ID, dataPath } from "../config.js";
import type {
  CriteriaStoreFile,
  EvaluationCriterion,
  EvaluationSubmission,
  EvaluationsStoreFile,
  StoredEvent,
  EventsStoreFile,
} from "../types.js";

const SEED_CRITERIA: Omit<EvaluationCriterion, "eventId">[] = [
  { id: "viagem", label: "Viagem", group: "first_day_only", order: 1, active: true },
  { id: "alojamento", label: "Alojamento", group: "first_day_only", order: 2, active: true },
  { id: "protocolo", label: "Protocolo", group: "continuous", order: 3, active: true },
  { id: "alimentacao", label: "Alimentação", group: "continuous", order: 4, active: true },
  { id: "internet", label: "Internet", group: "continuous", order: 5, active: true },
  { id: "apresentacoes", label: "Apresentações", group: "continuous", order: 6, active: true },
  { id: "debates", label: "Debates", group: "continuous", order: 7, active: true },
];

function buildSeedEvent(): StoredEvent {
  const now = new Date().toISOString();
  return {
    id: DEFAULT_EVENT_ID,
    slug: DEFAULT_EVENT_ID,
    status: "active",
    edition: 2026,
    title: "LI Conselho Coordenador de Saúde",
    shortTitle: "LI CCS",
    description: "Reunião do Conselho Coordenador de Saúde — MISAU 2026",
    lema: "Por um Serviço Nacional de Saúde Universal, Equitativo, de Qualidade e Resiliente",
    slogan: "Saúde para Todos",
    location: "Maputo",
    province: "Maputo",
    country: "Moçambique",
    dateRange: "9–11 Setembro 2026",
    startDate: "2026-09-09",
    endDate: "2026-09-11",
    heroImage: "/fotografias/hero-evento.jpeg",
    createdAt: now,
    updatedAt: now,
  };
}

const criteriaPath = () => dataPath("evaluation-criteria-store.json");
const submissionsPath = () => dataPath("evaluations-store.json");
const eventsPath = () => dataPath("events-store.json");

async function writeCriteria(store: CriteriaStoreFile) {
  const file = criteriaPath();
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(store, null, 2));
}

async function writeSubmissions(store: EvaluationsStoreFile) {
  const file = submissionsPath();
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(store, null, 2));
}

async function writeEvents(store: EventsStoreFile) {
  const file = eventsPath();
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(store, null, 2));
}

export function criteriaForDay(criteria: EvaluationCriterion[], dayNumber: number) {
  return criteria
    .filter((c) => c.active)
    .filter(
      (c) => c.group === "continuous" || (c.group === "first_day_only" && dayNumber === 1),
    )
    .sort((a, b) => a.order - b.order);
}

async function ensureCriteria(): Promise<CriteriaStoreFile> {
  try {
    const raw = await fs.readFile(criteriaPath(), "utf8");
    const parsed = JSON.parse(raw) as CriteriaStoreFile;
    if (parsed.criteria?.length) return parsed;
  } catch {
    // seed
  }
  const seed: CriteriaStoreFile = {
    criteria: SEED_CRITERIA.map((c) => ({ ...c, eventId: DEFAULT_EVENT_ID })),
  };
  await writeCriteria(seed);
  return seed;
}

async function ensureSubmissions(): Promise<EvaluationsStoreFile> {
  try {
    const raw = await fs.readFile(submissionsPath(), "utf8");
    return JSON.parse(raw) as EvaluationsStoreFile;
  } catch {
    const empty: EvaluationsStoreFile = { submissions: [] };
    await writeSubmissions(empty);
    return empty;
  }
}

async function ensureEvents(): Promise<EventsStoreFile> {
  try {
    const raw = await fs.readFile(eventsPath(), "utf8");
    const parsed = JSON.parse(raw) as EventsStoreFile;
    if (parsed.events?.length) return parsed;
  } catch {
    // seed
  }
  const seed: EventsStoreFile = { events: [buildSeedEvent()] };
  await writeEvents(seed);
  return seed;
}

export async function listCriteria(eventId = DEFAULT_EVENT_ID) {
  const store = await ensureCriteria();
  return store.criteria.filter((c) => c.eventId === eventId).sort((a, b) => a.order - b.order);
}

export async function saveCriteria(criteria: EvaluationCriterion[]) {
  await writeCriteria({ criteria });
  return criteria;
}

export async function listSubmissions(eventId = DEFAULT_EVENT_ID) {
  const store = await ensureSubmissions();
  return store.submissions.filter((s) => s.eventId === eventId);
}

export async function hasSubmitted(
  dayNumber: number,
  fingerprint: string,
  eventId = DEFAULT_EVENT_ID,
) {
  const store = await ensureSubmissions();
  return store.submissions.some(
    (s) => s.eventId === eventId && s.dayNumber === dayNumber && s.fingerprint === fingerprint,
  );
}

export async function addSubmission(
  input: Omit<EvaluationSubmission, "id" | "submittedAt" | "eventId"> & { eventId?: string },
) {
  const store = await ensureSubmissions();
  const eventId = input.eventId ?? DEFAULT_EVENT_ID;

  if (await hasSubmitted(input.dayNumber, input.fingerprint, eventId)) {
    throw new Error("Já submeteu avaliação para este dia.");
  }

  const allCriteria = await listCriteria(eventId);
  const applicable = criteriaForDay(allCriteria, input.dayNumber);

  for (const c of applicable) {
    const score = input.scores[c.id];
    if (score === undefined || score < 0 || score > 5) {
      throw new Error(`Nota inválida para «${c.label}». Use 0–5.`);
    }
  }

  const record: EvaluationSubmission = {
    id: `eval-${Date.now()}`,
    eventId,
    dayNumber: input.dayNumber,
    fingerprint: input.fingerprint,
    scores: input.scores,
    comment: input.comment?.trim() || undefined,
    respondentName: input.respondentName?.trim() || undefined,
    role: input.role?.trim() || undefined,
    organization: input.organization?.trim() || undefined,
    submittedAt: new Date().toISOString(),
  };

  store.submissions.push(record);
  await writeSubmissions(store);
  return record;
}

export async function getEvaluationSummary(eventId = DEFAULT_EVENT_ID) {
  const criteria = await listCriteria(eventId);
  const submissions = await listSubmissions(eventId);
  return { criteria, submissions, total: submissions.length };
}

export async function listEvents(status?: "active" | "archived" | "draft" | "all") {
  const store = await ensureEvents();
  if (!status || status === "all") return store.events;
  return store.events.filter((event) => event.status === status);
}

export async function getEventById(eventId: string) {
  const store = await ensureEvents();
  return store.events.find((event) => event.id === eventId || event.slug === eventId) ?? null;
}

export async function getActiveEvent() {
  const store = await ensureEvents();
  return store.events.find((event) => event.status === "active") ?? store.events[0] ?? null;
}

export async function archiveEvent(eventId: string) {
  const store = await ensureEvents();
  const event = store.events.find((e) => e.id === eventId || e.slug === eventId);
  if (!event) return null;
  const now = new Date().toISOString();
  event.status = "archived";
  event.archivedAt = now;
  event.updatedAt = now;
  await writeEvents(store);
  return event;
}

export async function activateEvent(eventId: string) {
  const store = await ensureEvents();
  const target = store.events.find((e) => e.id === eventId || e.slug === eventId);
  if (!target) return null;
  const now = new Date().toISOString();
  for (const event of store.events) {
    if (event.id === target.id) {
      event.status = "active";
      event.archivedAt = undefined;
      event.updatedAt = now;
    } else if (event.status === "active") {
      event.status = "archived";
      event.archivedAt = now;
      event.updatedAt = now;
    }
  }
  await writeEvents(store);
  return target;
}
