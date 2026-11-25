import { useState } from "react"
import type { Author, Message } from "../types/message"
import { MessageList } from "./MessageList"

const INITIAL_MESSAGES: Message[] = [
  {
    id: "sample-user-1",
    author: "user",
    text: "Olá!\nTudo bem por aí?",
  },
  {
    id: "sample-robot-1",
    author: "robot",
    text: "Tudo ótimo! Como posso ajudar hoje?",
  },
]

export function ChatScreen() {
  const [messages] = useState<Message[]>(INITIAL_MESSAGES)
  const [draft] = useState("")
  const [author] = useState<Author>("user")

  // O rascunho e o autor passam a aparecer no card nas próximas fases.
  void draft
  void author

  return (
    <main className="flex h-dvh min-h-dvh justify-center bg-amber-100 text-stone-900">
      <div className="flex h-full w-full max-w-2xl flex-col px-4">
        <header className="shrink-0 py-4">
          <h1 className="text-xl font-semibold">Chat</h1>
        </header>

        <MessageList messages={messages} />

        <div className="shrink-0 pb-4">
          <div className="min-h-16 rounded-2xl border border-stone-300 bg-white" />
        </div>
      </div>
    </main>
  )
}
