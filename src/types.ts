import type { ChangeEvent, ReactNode } from 'react'

export type Props = {
  id?: string
  type?: 'search' | 'text'
  suggestions: ReactNode[]
  className?: string
  name?: string
  placeholder?: string
  autoFocus?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  withTheme?: boolean
  highlightKeywords?: boolean
}
