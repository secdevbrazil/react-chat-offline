import { useState } from "react"
import type { Author, Message } from "../types/message"
import { Composer } from "./Composer"
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
  const [draft, setDraft] = useState("")
  const [author, setAuthor] = useState<Author>("user")

  const handleToggleAuthor = () => {
    setAuthor((current) => (current === "user" ? "robot" : "user"))
  }

  return (
    <main className="flex h-dvh min-h-dvh justify-center bg-amber-100 text-stone-900">
      <div className="flex h-full w-full max-w-2xl flex-col px-4">
        <header className="shrink-0 py-4">
          <h1 className="text-xl font-semibold">Chat</h1>
        </header>

        <MessageList messages={messages} />

        <div className="shrink-0 pb-4">
          <Composer
            draft={draft}
            author={author}
            onDraftChange={setDraft}
            onToggleAuthor={handleToggleAuthor}
          />
        </div>
      </div>
    </main>
  )
}
