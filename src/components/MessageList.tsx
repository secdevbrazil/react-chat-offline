import { useEffect, useRef } from "react"
import type { Message } from "../types/message"
import { MessageBubble } from "./MessageBubble"

type MessageListProps = {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  const listRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    list.scrollTop = list.scrollHeight
  }, [messages])

  return (
    <section ref={listRef} aria-label="Histórico" className="min-h-0 flex-1 overflow-y-auto py-2">
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-stone-500">Nenhuma mensagem ainda</p>
        </div>
      ) : (
        <div className="space-y-3 pb-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      )}
    </section>
  )
}
