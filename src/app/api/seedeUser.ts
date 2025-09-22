// app/api/seedUser.ts (temporário)
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST() {
  const client = await clientPromise;
  const db = client.db(); // pega o banco do MONGODB_URI
  const users = db.collection('users');

  const hashedPassword = await bcrypt.hash('admin123', 10);

  await users.insertOne({
    username: 'admin',
    password: hashedPassword,
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
