/* eslint-disable import/prefer-default-export */
import type { ReactElement } from 'react'
import React, { Children, cloneElement } from 'react'

import reactStringReplace from 'react-string-replace'

export const elementText = {
  get: (node: React.ReactNode): string | undefined => {
    if (['string', 'number'].includes(typeof node)) {
      return node as string
    }

    if (node instanceof Array) {
      return [...new Set(node.map(elementText.get))].join(' ')
    }

    if (typeof node === 'object' && node) {
      return elementText.get((node as ReactElement).props.children)
    }

    return undefined
  },

  highlightKeyword: (content: string, keyword: string) =>
    reactStringReplace(content, keyword, (match, key) => (
      <mark key={key}>{match}</mark>
    )),

  cloneChildren: (children: ReactElement[], keyword: string): any =>
    Children.map(children, child =>
      child.props
        ? cloneElement(child, {
            children: elementText.highlightKeyword(
              elementText.cloneChildren(child.props.children, keyword),
              keyword
            ),
          })
        : child
    ),

  wrap: (
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
          ? elementText.highlightKeyword(children, keyword)
          : elementText.cloneChildren(children, keyword),
    })
  },
}
