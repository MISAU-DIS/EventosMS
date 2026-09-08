import type { Request, Response, NextFunction } from "express";
import { config, isValidAdminPassword } from "./config.js";

export function isAdminSessionValid(req: Request): boolean {
  const authorization = req.headers.authorization;
  if (authorization?.startsWith("Bearer ")) {
    const token = authorization.slice(7).trim();
    if (token === config.sessionToken) return true;
  }
  return req.cookies?.[config.cookieName] === config.sessionToken;
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!isAdminSessionValid(req)) {
    res.status(401).json({ error: "Não autorizado." });
    return;
  }
  next();
}

export function setAdminSessionCookie(res: Response) {
  res.cookie(config.cookieName, config.sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: config.cookieSecure,
    path: "/",
    maxAge: config.cookieMaxAgeMs,
  });
}

export function clearAdminSessionCookie(res: Response) {
  res.clearCookie(config.cookieName, { path: "/" });
}

export function adminLoginJson(includeToken: boolean) {
  return {
    ok: true,
    ...(includeToken
      ? {
          token: config.sessionToken,
          expiresIn: Math.floor(config.cookieMaxAgeMs / 1000),
        }
      : {}),
  };
}

export function parseLoginPassword(body: unknown): string | null {
  if (!body || typeof body !== "object") return null;
  const password = (body as { password?: unknown }).password;
  if (typeof password !== "string" || !isValidAdminPassword(password)) return null;
  return password;
}
