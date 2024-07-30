import { NextRequest, NextResponse } from 'next/server'
import api from '@/services/api'
import { IChat } from '@/common/types'
import { v4 } from 'uuid'

export async function POST(req: NextRequest) {
  const { email, title, message, id } = await req.json()

  const response = await api.get('conversations')
  const conversations = response.data

  if (conversations.length === 0) {
    const newConversation = {
      id: v4(),
      email,
      chats: [{ id, title, messages: [message] }],
    }

    const createdConversation = await api.post('conversations', newConversation)
    return NextResponse.json(createdConversation.data)
  } else {
    const currentUser = conversations.find(
      (conversation: IChat) => conversation.email === email
    )

    if (!currentUser) {
      const newUserConversation = {
        id: v4(),
        email,
        chats: [{ id, title, messages: [message] }],
      }

      const createdConversation = await api.post(
        'conversations',
        newUserConversation
      )
      return NextResponse.json(createdConversation.data)
    } else {
      const currentChat = currentUser.chats.find(
        (chat: IChat) => chat.id === id
      )

      if (!currentChat) {
        const updatedUser = {
          ...currentUser,
          chats: [...currentUser.chats, { id, title, messages: [message] }],
        }

        const updatedConversation = await api.put(
          `conversations/${currentUser.id}`,
          updatedUser
        )
        return NextResponse.json(updatedConversation.data)
      } else {
        const updatedMessages = [...currentChat.messages, message]

        const updatedChats = currentUser.chats.map((chat: IChat) => {
          if (chat.id === id) {
            return {
              ...chat,
              messages: updatedMessages,
            }
          }
          return chat
        })

        const updatedConversation = {
          ...currentUser,
          chats: updatedChats,
        }

        const updatedResponse = await api.put(
          `conversations/${currentUser.id}`,
          updatedConversation
        )
        return NextResponse.json(updatedResponse.data)
      }
    }
  }
}

export async function GET(req: NextRequest) {}
