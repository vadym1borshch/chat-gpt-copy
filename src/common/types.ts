export interface IUser {
  id?: number | null
  password?: string | null
  email?: string | null
}

export interface IChat {
  id: string
  email: string
  title :string
  chats: [
    {
      id: string
      title: string
      messages: [{ id: string; message: string; prompt: string }]
    },
  ]
}
