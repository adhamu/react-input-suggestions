export type Props = {
  id?: string
  suggestions: Suggestion[]
  className?: string
  name?: string
  placeholder?: string
  autoFocus?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  withTheme?: boolean
}

export type Suggestion = {
  label: string
  url: string
}
