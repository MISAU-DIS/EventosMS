import { NextResponse } from "next/server";
import { getOpenApiSpec } from "@/server/openapi-spec";
import { v1Headers } from "@/server/api-v1";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;
  const spec = getOpenApiSpec(baseUrl);
  return NextResponse.json(spec, { headers: v1Headers() });
}
