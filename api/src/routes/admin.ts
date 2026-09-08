import { Router } from "express";
import multer from "multer";
import {
  adminLoginJson,
  clearAdminSessionCookie,
  isAdminSessionValid,
  parseLoginPassword,
  requireAdmin,
  setAdminSessionCookie,
} from "../auth.js";
import { getAgendaDays, saveAgendaDays } from "../stores/agenda-store.js";
import { getProgramDays, saveProgramDays } from "../stores/program-store.js";
import {
  addStoredDocument,
  deleteStoredDocument,
  listStoredDocuments,
} from "../stores/documents-store.js";
import { addPhoto, deletePhoto, listPhotos, updatePhoto } from "../stores/photos-store.js";
import {
  getEvaluationSummary,
  saveCriteria,
} from "../stores/evaluations-events-store.js";
import type { DocumentSectionId, EvaluationCriterion } from "../types.js";

const validSections = new Set<DocumentSectionId>(["dia1", "dia2", "dia3", "gerais"]);
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 },
});

export const adminRouter = Router();

adminRouter.post("/login", (req, res) => {
  if (!parseLoginPassword(req.body)) {
    res.status(401).json({ error: "Senha inválida." });
    return;
  }
  setAdminSessionCookie(res);
  res.json(adminLoginJson(false));
});

adminRouter.post("/logout", (_req, res) => {
  clearAdminSessionCookie(res);
  res.json({ ok: true });
});

adminRouter.get("/session", (req, res) => {
  res.json({ authenticated: isAdminSessionValid(req) });
});

adminRouter.get("/documents", requireAdmin, async (_req, res) => {
  const documents = await listStoredDocuments();
  res.json({ documents });
});

adminRouter.post(
  "/documents",
  requireAdmin,
  upload.single("file"),
  async (req, res) => {
    try {
      const sectionId = req.body.sectionId;
      const title = req.body.title;
      const description = req.body.description;
      const file = req.file;

      if (
        typeof sectionId !== "string" ||
        !validSections.has(sectionId as DocumentSectionId) ||
        typeof title !== "string" ||
        !title.trim() ||
        !file ||
        file.size === 0
      ) {
        res.status(400).json({
          error: "Dados inválidos. Verifique dia, título e ficheiro.",
        });
        return;
      }

      const record = await addStoredDocument({
        sectionId: sectionId as DocumentSectionId,
        title,
        description: typeof description === "string" ? description : undefined,
        originalFileName: file.originalname,
        fileBuffer: file.buffer,
      });

      res.status(201).json({ document: record });
    } catch (error) {
      const code =
        error instanceof Error && "code" in error
          ? String((error as NodeJS.ErrnoException).code)
          : "";
      const message =
        code === "EACCES" || code === "EPERM"
          ? "Sem permissão para gravar ficheiros no servidor. Contacte o administrador do sistema."
          : "Não foi possível guardar o documento. Tente novamente.";
      console.error("[admin/documents POST]", error);
      res.status(500).json({ error: message });
    }
  },
);

adminRouter.delete("/documents/:id", requireAdmin, async (req, res) => {
  try {
    const deleted = await deleteStoredDocument(String(req.params.id));
    if (!deleted) {
      res.status(404).json({ error: "Documento não encontrado." });
      return;
    }
    res.json({ ok: true });
  } catch (error) {
    console.error("[admin/documents DELETE]", error);
    res.status(500).json({ error: "Não foi possível remover o documento." });
  }
});

adminRouter.get("/photos", requireAdmin, async (_req, res) => {
  const photos = await listPhotos();
  res.json({ photos });
});

adminRouter.post("/photos", requireAdmin, upload.single("file"), async (req, res) => {
  try {
    const title = req.body.title;
    const alt = req.body.alt;
    const file = req.file;

    if (typeof title !== "string" || !title.trim() || !file || file.size === 0) {
      res.status(400).json({ error: "Título e ficheiro são obrigatórios." });
      return;
    }

    const photo = await addPhoto({
      title,
      alt: typeof alt === "string" ? alt : title,
      originalFileName: file.originalname,
      fileBuffer: file.buffer,
    });

    res.status(201).json({ photo });
  } catch {
    res.status(500).json({ error: "Erro ao carregar fotografia." });
  }
});

adminRouter.patch("/photos", requireAdmin, async (req, res) => {
  const body = req.body as {
    id?: string;
    title?: string;
    alt?: string;
    order?: number;
  };

  if (!body.id) {
    res.status(400).json({ error: "ID em falta." });
    return;
  }

  const photo = await updatePhoto(body.id, {
    title: body.title,
    alt: body.alt,
    order: body.order,
  });

  if (!photo) {
    res.status(404).json({ error: "Fotografia não encontrada." });
    return;
  }

  res.json({ photo });
});

adminRouter.delete("/photos", requireAdmin, async (req, res) => {
  const id = req.query.id;
  if (typeof id !== "string" || !id) {
    res.status(400).json({ error: "ID em falta." });
    return;
  }

  const deleted = await deletePhoto(id);
  if (!deleted) {
    res.status(404).json({ error: "Fotografia não encontrada." });
    return;
  }

  res.json({ ok: true });
});

adminRouter.get("/agenda", requireAdmin, async (_req, res) => {
  const days = await getAgendaDays();
  res.json({ days });
});

adminRouter.put("/agenda", requireAdmin, async (req, res) => {
  try {
    const days = await saveAgendaDays(req.body?.days);
    res.json({ days });
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Agenda inválida.",
    });
  }
});

adminRouter.get("/program", requireAdmin, async (_req, res) => {
  const days = await getProgramDays();
  res.json({ days });
});

adminRouter.put("/program", requireAdmin, async (req, res) => {
  try {
    const days = await saveProgramDays(req.body?.days);
    res.json({ days });
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Programa inválido.",
    });
  }
});

adminRouter.get("/evaluations", requireAdmin, async (_req, res) => {
  const summary = await getEvaluationSummary();
  res.json(summary);
});

adminRouter.put("/evaluations", requireAdmin, async (req, res) => {
  const body = req.body as { criteria?: EvaluationCriterion[] };
  if (!body.criteria) {
    res.status(400).json({ error: "Campo criteria obrigatório." });
    return;
  }
  const criteria = await saveCriteria(body.criteria);
  res.json({ criteria });
});
