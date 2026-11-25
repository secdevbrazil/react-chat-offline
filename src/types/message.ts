export type Author = "user" | "robot"

export type Message = {
  id: string
  author: Author
  text: string
}
