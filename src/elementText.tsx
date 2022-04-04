import type { ReactElement } from 'react'
import React, { Children, cloneElement } from 'react'

import reactStringReplace from 'react-string-replace'

export const getElementText = (node: React.ReactNode): string | undefined => {
  if (['string', 'number'].includes(typeof node)) {
    return node as string
  }

  if (node instanceof Array) {
    return [...new Set(node.map(getElementText))].join(' ')
  }

  if (typeof node === 'object' && node) {
    return getElementText((node as ReactElement).props.children)
  }

  return undefined
}

const highlightKeyword = (content: string, keyword: string) =>
  reactStringReplace(content, keyword, (match, key) => (
    <mark key={key}>{match}</mark>
  ))

const cloneChildren = (children: ReactElement[], keyword: string): any =>
  Children.map(children, child =>
    child.props
      ? cloneElement(child, {
          children: highlightKeyword(
            cloneChildren(child.props.children, keyword),
            keyword
          ),
        })
      : child
  )

export const wrapElementText = (
  node: React.ReactNode,
  keyword: string
): ReactElement | React.ReactNode => {
  const n = node as React.ReactElement
  const {
    props: { children },
  } = n

  return React.cloneElement(n, {
    children:
      typeof children === 'string'
        ? highlightKeyword(children, keyword)
        : cloneChildren(children, keyword),
  })
}
