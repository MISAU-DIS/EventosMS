import { randomUUID } from "node:crypto";
import { spawnSync } from "node:child_process";

/** Identificador da build — usado no PWA, cache offline e verificação de actualizações. */
export function getBuildRevision(): string {
  const fromEnv = process.env.BUILD_REVISION?.trim();
  if (fromEnv) return fromEnv;

  const result = spawnSync("git", ["rev-parse", "HEAD"], { encoding: "utf-8" });
  const hash = result.stdout?.trim();
  return hash || randomUUID();
}
