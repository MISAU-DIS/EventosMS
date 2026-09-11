import { NextResponse } from "next/server";
import { getAdminEventContext } from "@/server/active-event";
import {
  isAdminSessionValid,
  unauthorizedResponse,
} from "@/server/admin-session";

export async function GET() {
  if (!(await isAdminSessionValid())) return unauthorizedResponse();
  const context = await getAdminEventContext();
  return NextResponse.json(context);
}
