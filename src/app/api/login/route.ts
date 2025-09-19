// app/api/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // validação simples
  if (username === 'admin' && password === 'admin123') {
    // criar um cookie de sessão
    const response = NextResponse.json({ success: true });
    response.cookies.set('auth', 'true', { httpOnly: true });
    return response;
  }

  return NextResponse.json({ success: false, message: 'Credenciais inválidas' }, { status: 401 });
}
