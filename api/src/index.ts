import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { config, documentsRoot, photosRoot } from "./config.js";
import { legacyRouter } from "./routes/legacy.js";
import { adminRouter } from "./routes/admin.js";
import { v1Router } from "./routes/v1.js";

const app = express();

const corsOrigin = config.corsOrigins?.length
  ? config.corsOrigins.includes("*")
    ? true
    : config.corsOrigins
  : true;

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-API-Version"],
  }),
);
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "eventos-ms-api" });
});

app.use("/documentos", express.static(path.resolve(documentsRoot()), { fallthrough: true }));
app.use("/fotografias", express.static(path.resolve(photosRoot()), { fallthrough: true }));

app.use("/api", legacyRouter);
app.use("/api/admin", adminRouter);
app.use("/api/v1", v1Router);

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(config.port, () => {
  console.log(`eventos-ms-api listening on :${config.port}`);
});
