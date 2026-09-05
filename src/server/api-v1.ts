import { NextResponse } from "next/server";
import { API_VERSION } from "@/config/api";

export type ApiErrorBody = {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export function v1Headers(extra?: Record<string, string>): Record<string, string> {
  return {
    "X-API-Version": API_VERSION,
    "X-API-Deprecated": "false",
    ...extra,
  };
}

export function v1Json<T>(data: T, init?: { status?: number; headers?: Record<string, string> }) {
  return NextResponse.json(data, {
    status: init?.status ?? 200,
    headers: v1Headers(init?.headers),
  });
}

export function v1Error(
  code: string,
  message: string,
  status: number,
  details?: unknown,
) {
  const body: ApiErrorBody = { error: { code, message, details } };
  return NextResponse.json(body, { status, headers: v1Headers() });
}
