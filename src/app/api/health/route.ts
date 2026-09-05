import { NextResponse } from "next/server";
import { API_VERSION } from "@/config/api";

export async function GET() {
  return NextResponse.json(
    { ok: true, service: "eventos-ms-api", apiVersion: API_VERSION },
    { headers: { "X-API-Version": API_VERSION } },
  );
}
