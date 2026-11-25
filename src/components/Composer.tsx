import { useEffect, useRef, type KeyboardEvent } from "react"
import type { Author } from "../types/message"
import { AuthorToggle } from "./AuthorToggle"

type ComposerProps = {
  draft: string
  author: Author
  onDraftChange: (value: string) => void
  onToggleAuthor: () => void
  onSend: () => void
}

export function Composer({
  draft,
  author,
  onDraftChange,
  onToggleAuthor,
  onSend,
}: ComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const canSend = draft.trim().length > 0
  const isRobot = author === "robot"

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = "auto"
    textarea.style.height = `${textarea.scrollHeight}px`
  }, [draft])

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) {
      return
    }

    event.preventDefault()
    if (canSend) {
      onSend()
    }
  }

  return (
    <div
      className={`flex items-end gap-2 rounded-2xl border-2 bg-white p-2.5 transition-colors ${
        isRobot ? "border-violet-500" : "border-stone-300"
      }`}
    >
      <AuthorToggle author={author} onToggle={onToggleAuthor} />

      <textarea
        ref={textareaRef}
        rows={1}
        value={draft}
        onChange={(event) => onDraftChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Escreva uma mensagem"
        aria-label="Mensagem"
        className="max-h-36 min-h-9 flex-1 resize-none overflow-y-auto border-0 bg-transparent px-1.5 py-1.5 text-sm leading-relaxed text-stone-900 placeholder:text-stone-400 focus:outline-none"
      />

      <button
        type="button"
        disabled={!canSend}
        onClick={onSend}
        className="shrink-0 rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-400"
      >
        Enviar
      </button>
    </div>
  )
}
