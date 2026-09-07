import { NextResponse } from "next/server";
import { API_VERSION } from "@/config/api";
import { getBuildRevision } from "@/lib/build-revision";

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: "eventos-ms-front",
      apiVersion: API_VERSION,
      buildRevision: getBuildRevision(),
    },
    {
      headers: {
        "X-API-Version": API_VERSION,
        "X-Build-Revision": getBuildRevision(),
      },
    },
  );
}
