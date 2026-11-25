import type { Message } from "../types/message"
import { RobotIcon, UserIcon } from "./AuthorIcons"

type MessageBubbleProps = {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.author === "user"
  const label = isUser ? "Você" : "Robô"

  return (
    <div className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
          isUser
            ? "border-stone-200 bg-white text-stone-700"
            : "border-violet-200 bg-violet-100 text-violet-700"
        }`}
      >
        {isUser ? <UserIcon /> : <RobotIcon />}
      </div>

      <div
        className={`min-w-0 max-w-[80%] rounded-2xl px-4 py-2.5 text-stone-900 shadow-xs ${
          isUser ? "bg-white" : "bg-violet-100"
        }`}
      >
        <p className="mb-1 text-xs font-semibold text-stone-600">{label}</p>
        <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{message.text}</p>
      </div>
    </div>
  )
}
