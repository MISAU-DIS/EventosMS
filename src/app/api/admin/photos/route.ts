import { NextResponse } from "next/server";
import { isAdminSessionValid, unauthorizedResponse } from "@/server/admin-session";
import { addPhoto, deletePhoto, listPhotos, updatePhoto } from "@/server/photos-store";

export async function GET() {
  if (!(await isAdminSessionValid())) return unauthorizedResponse();
  const photos = await listPhotos();
  return NextResponse.json({ photos });
}

export async function POST(request: Request) {
  if (!(await isAdminSessionValid())) return unauthorizedResponse();

  try {
    const form = await request.formData();
    const title = form.get("title");
    const alt = form.get("alt");
    const file = form.get("file");

    if (typeof title !== "string" || !title.trim() || !(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "Título e ficheiro são obrigatórios." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const photo = await addPhoto({
      title,
      alt: typeof alt === "string" ? alt : title,
      originalFileName: file.name,
      fileBuffer: buffer,
    });

    return NextResponse.json({ photo }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro ao carregar fotografia." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!(await isAdminSessionValid())) return unauthorizedResponse();

  const body = (await request.json()) as {
    id?: string;
    title?: string;
    alt?: string;
    order?: number;
  };

  if (!body.id) {
    return NextResponse.json({ error: "ID em falta." }, { status: 400 });
  }

  const photo = await updatePhoto(body.id, {
    title: body.title,
    alt: body.alt,
    order: body.order,
  });

  if (!photo) {
    return NextResponse.json({ error: "Fotografia não encontrada." }, { status: 404 });
  }

  return NextResponse.json({ photo });
}

export async function DELETE(request: Request) {
  if (!(await isAdminSessionValid())) return unauthorizedResponse();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID em falta." }, { status: 400 });
  }

  const deleted = await deletePhoto(id);
  if (!deleted) {
    return NextResponse.json({ error: "Fotografia não encontrada." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
