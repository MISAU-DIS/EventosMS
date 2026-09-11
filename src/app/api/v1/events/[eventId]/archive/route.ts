import { isValidAdminPassword } from "@/config/admin";
import { isAdminSessionValid, unauthorizedResponse } from "@/server/admin-session";
import { v1Error, v1Json } from "@/server/api-v1";
import { archiveEvent } from "@/server/events-store";

type RouteContext = { params: Promise<{ eventId: string }> };

export async function POST(request: Request, context: RouteContext) {
  if (!(await isAdminSessionValid())) return unauthorizedResponse();

  let password = "";
  try {
    const body = (await request.json()) as { password?: string };
    password = body.password ?? "";
  } catch {
    return v1Error("INVALID_PASSWORD", "Senha inválida.", 401);
  }

  if (!isValidAdminPassword(password)) {
    return v1Error("INVALID_PASSWORD", "Senha inválida.", 401);
  }

  const { eventId } = await context.params;
  const event = await archiveEvent(eventId);
  if (!event) return v1Error("EVENT_NOT_FOUND", "Evento não encontrado.", 404);

  return v1Json({ event, message: "Evento arquivado." });
}
