import { Router } from "express";
import { API_VERSION, DEFAULT_EVENT_ID } from "../config.js";
import { getAgendaDays } from "../stores/agenda-store.js";
import { getProgramDays } from "../stores/program-store.js";
import { listPhotos } from "../stores/photos-store.js";
import { listStoredDocuments } from "../stores/documents-store.js";
import {
  addSubmission,
  criteriaForDay,
  hasSubmitted,
  listCriteria,
} from "../stores/evaluations-events-store.js";
import { documentSectionMeta, toPublicDocument, toPublicPhoto } from "../types.js";

export const legacyRouter = Router();

legacyRouter.get("/health", (_req, res) => {
  res
    .set({
      "X-API-Version": API_VERSION,
      "X-Build-Revision": process.env.BUILD_REVISION || "local",
    })
    .json({
      ok: true,
      service: "eventos-ms-api",
      apiVersion: API_VERSION,
      buildRevision: process.env.BUILD_REVISION || "local",
    });
});

legacyRouter.get("/documents", async (_req, res) => {
  const records = await listStoredDocuments();
  const sections = documentSectionMeta.map((section) => ({
    ...section,
    documents: records
      .filter((record) => record.sectionId === section.id)
      .map((record) => toPublicDocument(record)),
  }));

  res
    .set({
      "X-API-Legacy": "true",
      "X-API-Version": API_VERSION,
      "X-API-Preferred": `/api/v1/events/${DEFAULT_EVENT_ID}/documents`,
    })
    .json({ sections });
});

legacyRouter.get("/photos", async (_req, res) => {
  const photos = await listPhotos();
  res.json({ photos: photos.map((photo) => toPublicPhoto(photo)) });
});

legacyRouter.get("/agenda", async (_req, res) => {
  const days = await getAgendaDays();
  res.json({ days });
});

legacyRouter.get("/program", async (_req, res) => {
  const days = await getProgramDays();
  res.json({ days });
});

legacyRouter.get("/evaluation-criteria", async (req, res) => {
  const day = Number(req.query.day ?? "1");
  const all = await listCriteria();
  const criteria = criteriaForDay(all, day);
  res.json({ dayNumber: day, criteria });
});

legacyRouter.get("/evaluations", async (req, res) => {
  const day = Number(req.query.day ?? "0");
  const fingerprint = String(req.query.fingerprint ?? "");
  if (!day || !fingerprint) {
    res.json({ submitted: false });
    return;
  }
  const submitted = await hasSubmitted(day, fingerprint);
  res.json({ submitted });
});

legacyRouter.post("/evaluations", async (req, res) => {
  try {
    const body = req.body as {
      dayNumber?: number;
      fingerprint?: string;
      scores?: Record<string, number>;
      comment?: string;
      respondentName?: string;
      role?: string;
      organization?: string;
    };

    if (!body.dayNumber || !body.fingerprint || !body.scores) {
      res.status(400).json({ error: "Dados incompletos." });
      return;
    }

    if (body.dayNumber < 1 || body.dayNumber > 3) {
      res.status(400).json({ error: "Dia inválido." });
      return;
    }

    if (await hasSubmitted(body.dayNumber, body.fingerprint)) {
      res.status(409).json({ error: "Já avaliou este dia." });
      return;
    }

    const record = await addSubmission({
      dayNumber: body.dayNumber,
      fingerprint: body.fingerprint,
      scores: body.scores,
      comment: body.comment,
      respondentName: body.respondentName,
      role: body.role,
      organization: body.organization,
    });

    res.status(201).json({ ok: true, submission: record });
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Erro ao submeter.",
    });
  }
});
