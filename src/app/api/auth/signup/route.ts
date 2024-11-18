import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import api from '@/services/api'
import { IUser } from '@/common/types'
import { v4 } from 'uuid'
import prisma from '../../../../../prisma/client'

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Перевірка чи користувач вже існує
  const users = await prisma.user.findMany();
  console.log(users);
  /*const user = users.find((u: IUser) => u.email === email);
  if (user) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }*/

  // Хешування пароля
  const hashedPassword = await hash(password, 10);

  // Створення нового користувача
 const newUser = api.post("/users", {id: v4(), email: email, password: hashedPassword});

  return NextResponse.json(newUser);
}
