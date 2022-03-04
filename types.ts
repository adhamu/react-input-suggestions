export type Props = {
  suggestions: Suggestion[]
  className?: string
  name?: string
  placeholder?: string
  autoFocus?: boolean
}

export type Suggestion = {
  label: string
  url: string
}
