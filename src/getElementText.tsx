import React from 'react'

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

export const wrapElementText = (
  node: React.ReactNode,
  str: string | undefined
) => {
  if (typeof node === 'object' && node) {
    const t = getElementText((node as React.ReactElement).props.children) || ''

    if (t?.includes(str || '')) {
      let b = (node as React.ReactElement).props.children
      b = (
        <span>
          <mark>{str}</mark>
          {t.replace(str || '', '')}
        </span>
      )
      console.log(b)

      return b
      // return t.replace(str || '', <mark>{str}</mark>)
    }
  }

  return undefined
}
