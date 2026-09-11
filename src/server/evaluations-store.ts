import { promises as fs } from "fs";
import path from "path";
import { DEFAULT_EVENT_ID } from "@/config/api";
import { resolveActiveEventId } from "@/server/active-event";
import type {
  CriteriaStoreFile,
  CriterionGroup,
  EvaluationCriterion,
  EvaluationSubmission,
  EvaluationsStoreFile,
} from "@/types/evaluations";

const criteriaPath = path.join(process.cwd(), "data/evaluation-criteria-store.json");
const submissionsPath = path.join(process.cwd(), "data/evaluations-store.json");

const SEED_CRITERIA: Omit<EvaluationCriterion, "eventId">[] = [
  { id: "viagem", label: "Viagem", group: "first_day_only", order: 1, active: true },
  { id: "alojamento", label: "Alojamento", group: "first_day_only", order: 2, active: true },
  { id: "protocolo", label: "Protocolo", group: "continuous", order: 3, active: true },
  { id: "alimentacao", label: "Alimentação", group: "continuous", order: 4, active: true },
  { id: "internet", label: "Internet", group: "continuous", order: 5, active: true },
  { id: "apresentacoes", label: "Apresentações", group: "continuous", order: 6, active: true },
  { id: "debates", label: "Debates", group: "continuous", order: 7, active: true },
];

async function writeCriteria(store: CriteriaStoreFile) {
  await fs.mkdir(path.dirname(criteriaPath), { recursive: true });
  await fs.writeFile(criteriaPath, JSON.stringify(store, null, 2));
}

async function writeSubmissions(store: EvaluationsStoreFile) {
  await fs.mkdir(path.dirname(submissionsPath), { recursive: true });
  await fs.writeFile(submissionsPath, JSON.stringify(store, null, 2));
}

async function ensureCriteria(): Promise<CriteriaStoreFile> {
  try {
    const raw = await fs.readFile(criteriaPath, "utf8");
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
    const raw = await fs.readFile(submissionsPath, "utf8");
    return JSON.parse(raw) as EvaluationsStoreFile;
  } catch {
    const empty: EvaluationsStoreFile = { submissions: [] };
    await writeSubmissions(empty);
    return empty;
  }
}

export function criteriaForDay(criteria: EvaluationCriterion[], dayNumber: number) {
  return criteria
    .filter((c) => c.active)
    .filter(
      (c) => c.group === "continuous" || (c.group === "first_day_only" && dayNumber === 1),
    )
    .sort((a, b) => a.order - b.order);
}

export async function listCriteria(eventId = DEFAULT_EVENT_ID) {
  const store = await ensureCriteria();
  return store.criteria.filter((c) => c.eventId === eventId).sort((a, b) => a.order - b.order);
}

export async function saveCriteria(
  criteria: EvaluationCriterion[],
  eventId?: string,
) {
  const id = eventId ?? (await resolveActiveEventId());
  const store = await ensureCriteria();
  const others = store.criteria.filter((c) => c.eventId !== id);
  const normalized = criteria.map((c) => ({ ...c, eventId: id }));
  const merged = [...others, ...normalized];
  await writeCriteria({ criteria: merged });
  return normalized;
}

export async function listSubmissions(eventId = DEFAULT_EVENT_ID) {
  const store = await ensureSubmissions();
  return store.submissions.filter((s) => s.eventId === eventId);
}

export async function hasSubmitted(dayNumber: number, fingerprint: string, eventId = DEFAULT_EVENT_ID) {
  const store = await ensureSubmissions();
  return store.submissions.some(
    (s) => s.eventId === eventId && s.dayNumber === dayNumber && s.fingerprint === fingerprint,
  );
}

export async function addSubmission(input: Omit<EvaluationSubmission, "id" | "submittedAt" | "eventId"> & { eventId?: string }) {
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

export type { CriterionGroup };
