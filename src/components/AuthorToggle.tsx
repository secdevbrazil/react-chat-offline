import type { Author } from "../types/message"
import { RobotIcon, UserIcon } from "./AuthorIcons"

type AuthorToggleProps = {
  author: Author
  onToggle: () => void
}

export function AuthorToggle({ author, onToggle }: AuthorToggleProps) {
  const isRobot = author === "robot"

  return (
    <button
      type="button"
      aria-pressed={isRobot}
      aria-label={isRobot ? "Enviar como robô" : "Enviar como usuário"}
      onClick={onToggle}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors ${
        isRobot
          ? "border-violet-200 bg-violet-100 text-violet-700 hover:bg-violet-200"
          : "border-stone-200 bg-stone-100 text-stone-700 hover:bg-stone-200"
      }`}
    >
      {isRobot ? <RobotIcon /> : <UserIcon />}
    </button>
  )
}
