import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import api from '@/services/api'
import { IUser } from '@/common/types'
import { v4 } from 'uuid'

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Перевірка чи користувач вже існує
  const users = await api.get("/users") ;
  const user = users.data.find((u: IUser) => u.email === email);
  if (user) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  // Хешування пароля
  const hashedPassword = await hash(password, 10);

  // Створення нового користувача
 const newUser = api.post("/users", {id: v4(), email: email, password: hashedPassword});

  return NextResponse.json(newUser);
}
