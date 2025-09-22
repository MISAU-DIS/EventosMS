import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const client = await clientPromise;
  const db = client.db('Eventos');

  const user = await db.collection('users').findOne({ username });

  if (!user) {
    return NextResponse.json({ success: false, message: 'Usuário não encontrado' }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return NextResponse.json({ success: false, message: 'Senha inválida' }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set('auth', 'true', { httpOnly: true });
  return res;
}





















// // app/api/login/route.ts
// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   const { username, password } = await req.json();

//   // validação simples
//   if (username === 'admin' && password === 'admin123') {
//     // criar um cookie de sessão
//     const response = NextResponse.json({ success: true });
//     response.cookies.set('auth', 'true', { httpOnly: true });
//     return response;
//   }

//   return NextResponse.json({ success: false, message: 'Credenciais inválidas' }, { status: 401 });
// }
