import type { Message } from "../types/message"

type MessageBubbleProps = {
  message: Message
}

function UserIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-3.5 3.6-6 8-6s8 2.5 8 6" />
    </svg>
  )
}

function RobotIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M12 3v3" />
      <rect x="4" y="6" width="16" height="13" rx="3" />
      <circle cx="9.5" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="12" r="1" fill="currentColor" stroke="none" />
      <path d="M9 16h6" />
    </svg>
  )
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
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-stone-900 shadow-xs ${
          isUser ? "bg-white" : "bg-violet-100"
        }`}
      >
        <p className="mb-1 text-xs font-semibold text-stone-600">{label}</p>
        <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{message.text}</p>
      </div>
    </div>
  )
}
