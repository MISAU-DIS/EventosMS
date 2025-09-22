import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const hashed = await bcrypt.hash(password, 10);

  const client = await clientPromise;
  const db = client.db('Eventos');

  await db.collection('users').insertOne({ username, password: hashed });

  return NextResponse.json({ success: true });
}
