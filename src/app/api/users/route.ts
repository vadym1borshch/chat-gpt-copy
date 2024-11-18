import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../prisma/client'

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email') // Отримуємо параметр email з URL
  if (email) {
    const user = await prisma.user.findUnique({
      where: { email },
    })
    if (!user) {
      return NextResponse.json({ error: 'user dont exist' }, { status: 404 })
    }
    return NextResponse.json(user, { status: 200 })
  }
}

export async function POST(req: NextRequest) {
  const body: { email: string; password: string } = await req.json()

  const u = await prisma.user.findUnique({
    where: { email: body.email },
  })
  if (u) {
    return NextResponse.json({ error: 'already exist' }, { status: 201 })
  }

  const user = await prisma.user.create({
    data: {
      email: body.email,
      name: 'test',
    },
  })
  return NextResponse.json(user, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const body: { name: string; password: string; id: string } = await req.json()
  const user = await prisma.user.update({
    where: { id: body.id },
    data: {
      name: body.name,
    },
  })

  return NextResponse.json(user, { status: 201 })
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (id) {
    await prisma.user.delete({
      where: { id },
    })
    return NextResponse.json({ status: 200 })
  }

  return NextResponse.json({ error: 'userNotFound' }, { status: 404 })
}
