import { useEffect, useRef } from "react"

type ComposerProps = {
  draft: string
  onDraftChange: (value: string) => void
  onSend?: () => void
}

export function Composer({ draft, onDraftChange, onSend }: ComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const canSend = draft.trim().length > 0

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = "auto"
    textarea.style.height = `${textarea.scrollHeight}px`
  }, [draft])

  return (
    <div className="flex items-end gap-2 rounded-2xl border border-stone-300 bg-white p-2.5">
      <textarea
        ref={textareaRef}
        rows={1}
        value={draft}
        onChange={(event) => onDraftChange(event.target.value)}
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
