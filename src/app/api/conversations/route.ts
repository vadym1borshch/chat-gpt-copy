import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../prisma/client'
import OpenAI from 'openai'

const getFirstTwoWords = (str: string) => {
  const words = str.split(' ')
  return words.slice(0, 2).join(' ')
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const chatAnswer = async (prompt: string): Promise<string> => {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })
  return response.choices[0].message.content || ''
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('id')
  if (userId) {
    const userChat = await prisma.chat.findMany({
      where: { userId },
      include: {
        conversations: true,
      },
    })
    return NextResponse.json(userChat, { status: 200 })
  }
}

export async function POST(req: NextRequest) {
  const body: {
    userId: string
    prompt: string
  } = await req.json()

  try {
    let chat

    chat = await prisma.chat.create({
      data: {
        title: getFirstTwoWords(body.prompt) || 'newChat',
        userId: body.userId,
      },
    })

    if (body.prompt === 'newChat') {
      return NextResponse.json(
        {
          chat,
        },
        { status: 200 }
      )
    }

    const newConversation = await prisma.conversation.create({
      data: {
        chatId: chat.id,
        prompt: body.prompt,
        answer: await chatAnswer(body.prompt),
      },
    })

    return NextResponse.json(
      {
        chat,
        conversation: newConversation,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error handling chat:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  const body: { id: string; prompt: string; answer: string } = await req.json()

  const chat = await prisma.chat.findUnique({
    where: {
      id: body.id,
    },
  })
  const conv = await prisma.conversation.findMany({
    where: {
      chatId: chat?.id,
    },
  })

  const newConversation = await prisma.conversation.create({
    data: {
      chatId: body.id,
      prompt: body.prompt,
      answer: await chatAnswer(body.prompt),
    },
  })

  if (!conv.length) {
    const updatedChat = await prisma.chat.update({
      where: { id: body.id },
      data: { title: getFirstTwoWords(body.prompt) },
    })
    return NextResponse.json(
      {
        chat: updatedChat,
        conversation: newConversation,
      },
      { status: 200 }
    )
  } else {
    return NextResponse.json(
      {
        chat,
        conversation: newConversation,
      },
      { status: 200 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')

  if (id) {
    await prisma.conversation.deleteMany({
      where: { chatId: id },
    })
    await prisma.chat.delete({
      where: { id },
    })

    return NextResponse.json({ status: 200 })
  }

  return NextResponse.json({ status: 400 })
}
