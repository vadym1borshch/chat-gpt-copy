// src/app/api/auth/providers/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getProviders } from 'next-auth/react';

export async function GET(request: NextRequest) {
  console.log('API route called');
  const providers = await getProviders();
  return NextResponse.json(providers);
}
