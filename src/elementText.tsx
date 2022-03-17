import React from 'react'

import reactStringReplace from 'react-string-replace'

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
): React.ReactElement | React.ReactNode => {
  const {
    props: { children },
  } = node as React.ReactElement

  if (!Array.isArray(children) && typeof children !== 'string') {
    return wrapElementText(children, str)
  }

  if (Array.isArray(children)) {
    return children.map((e: React.ReactElement) => wrapElementText(e, str))
  }

  return React.cloneElement(node as React.ReactElement, {
    children: (
      <span>
        {reactStringReplace(children, str, (match, key) => (
          <mark key={key}>{match}</mark>
        ))}
      </span>
    ),
  })

  return node
}
