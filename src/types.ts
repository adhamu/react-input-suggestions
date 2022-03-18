import type React from 'react'

export type Props = {
  id?: string
  type?: 'search' | 'text'
  suggestions: React.ReactNode[]
  className?: string
  name?: string
  placeholder?: string
  autoFocus?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  withTheme?: boolean
  highlightKeywords?: boolean
}
