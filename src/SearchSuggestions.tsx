import React from 'react'

import type { Props } from './types'

import { getElementText } from './getElementText'
import { Styled } from './styled'
import { useSuggestions } from './useSuggestions'

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
  } = useSuggestions()

  const filterSuggestions = (e: { target: { value: string } }) =>
    setResults(
      suggestions.filter(suggestion =>
        getElementText(suggestion)?.includes(e.target.value || '')
      )
    )

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
        results.length > 0 && (
          <ul ref={searchSuggestionsRef}>
            {results.map(suggestion => (
              <li
                key={getElementText(suggestion)}
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
