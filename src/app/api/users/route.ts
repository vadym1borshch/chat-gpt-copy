import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';

export interface IUser {
  id?: number | null
  password?: string | null
  email?: string | null
}

const db = new Database('users.db');

export async function GET(req: NextRequest) {
  try {
    const stmt = db.prepare('SELECT * FROM users');
    const users = stmt.all() as IUser[];
    return NextResponse.json(users);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
