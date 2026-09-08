import type { Response } from "express";
import { API_VERSION } from "./config.js";

export function v1Headers(extra?: Record<string, string>): Record<string, string> {
  return {
    "X-API-Version": API_VERSION,
    "X-API-Deprecated": "false",
    ...extra,
  };
}

export function v1Json<T>(
  res: Response,
  data: T,
  init?: { status?: number; headers?: Record<string, string> },
) {
  res
    .status(init?.status ?? 200)
    .set(v1Headers(init?.headers))
    .json(data);
}

export function v1Error(
  res: Response,
  code: string,
  message: string,
  status: number,
  details?: unknown,
) {
  res.status(status).set(v1Headers()).json({
    error: { code, message, details },
  });
}

export function getPublicBaseUrl(req: { protocol: string; get(name: string): string | undefined }): string {
  const fromEnv = process.env.PUBLIC_BASE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  const host = req.get("host");
  return host ? `${req.protocol}://${host}` : "";
}

export function wantsAbsoluteUrls(searchParams: URLSearchParams): boolean {
  return searchParams.get("absolute") === "true";
}
