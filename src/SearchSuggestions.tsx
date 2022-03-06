import React from 'react'

import type { Props } from './types'

import { Styled } from './styled'
import { useListKeyboardNav } from './useListKeyboardNav'

const getNodeText = (node: any): string | undefined => {
  if (!node) {
    return ''
  }
  if (['string', 'number'].includes(typeof node)) {
    return node
  }
  if (node instanceof Array) {
    return [...new Set(node.map(getNodeText))].join('')
  }
  if (typeof node === 'object' && node) {
    return getNodeText(node.props.children)
  }

  return undefined
}

const SearchSuggestions = ({
  suggestions,
  name = 'q',
  placeholder = 'Search',
  autoFocus = false,
  className = '',
  withTheme = false,
  id,
  onChange,
}: Props): JSX.Element => {
  const [results, setResults] = React.useState<React.ReactNode[]>(suggestions)

  const {
    inputSearchRef,
    searchSuggestionsRef,
    selectInitialResult,
    onResultsHover,
    onResultsKeyDown,
  } = useListKeyboardNav()

  console.log(suggestions)

  const filterSuggestions = (e: { target: { value: string } }) =>
    /* setResults(
    suggestions.filter(suggestion =>
        suggestion.label.toLowerCase().includes(e.target.value || '')
        )
        ) */
    {
      console.log(
        suggestions.filter(s => getNodeText(s)?.includes(e.target.value || ''))
      )
      setResults(
        suggestions.filter(s => getNodeText(s)?.includes(e.target.value || ''))
      )
    }

  return (
    <Styled id={id} className={className} withTheme={withTheme}>
      <input
        ref={inputSearchRef}
        type="search"
        name={name}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onChange={e => {
          if (onChange) {
            onChange(e)
          }
          filterSuggestions(e)
        }}
        onKeyDown={selectInitialResult}
        spellCheck={false}
        autoComplete="off"
        autoCapitalize="off"
      />
      {inputSearchRef.current &&
        inputSearchRef.current.value.length > 0 &&
        results && (
          <ul ref={searchSuggestionsRef}>
            {results.map(suggestion => (
              <li
                key={suggestion?.key}
                onMouseOver={onResultsHover}
                onKeyDown={onResultsKeyDown}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
    </Styled>
  )
}

export default SearchSuggestions
