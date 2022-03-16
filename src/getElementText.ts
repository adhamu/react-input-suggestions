import type React from 'react'

export const getElementText = (node: React.ReactNode): string | undefined => {
  if (['string', 'number'].includes(typeof node)) {
    return node as string
  }

  if (node instanceof Array) {
    return [...new Set(node.map(getElementText))].join(' ')
  }

  if (typeof node === 'object' && node) {
    return getElementText((node as React.ReactElement).props.children)
  }

  return undefined
}
