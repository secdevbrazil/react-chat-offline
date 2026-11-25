import { useState } from "react"
import type { Author, Message } from "../types/message"
import { Composer } from "./Composer"
import { MessageList } from "./MessageList"

export function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([])
  const [draft, setDraft] = useState("")
  const [author, setAuthor] = useState<Author>("user")

  const handleToggleAuthor = () => {
    setAuthor((current) => (current === "user" ? "robot" : "user"))
  }

  const handleSend = () => {
    if (draft.trim().length === 0) return

    const newMessage: Message = {
      id: crypto.randomUUID(),
      author,
      text: draft,
    }

    setMessages((current) => [...current, newMessage])
    setDraft("")
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
            onSend={handleSend}
          />
        </div>
      </div>
    </main>
  )
}
