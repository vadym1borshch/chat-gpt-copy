import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import sql from 'better-sqlite3'
const db = sql('users.db')

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Перевірка чи користувач вже існує
  const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  // Хешування пароля
  const hashedPassword = await hash(password, 10);

  // Створення нового користувача
  const stmt = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
  const info = stmt.run(email, hashedPassword);

  return NextResponse.json({ id: info.lastInsertRowid, email });
}
