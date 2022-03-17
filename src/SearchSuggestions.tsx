import React from 'react'

import type { Props } from './types'

import { getElementText, wrapElementText } from './elementText'
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
  const inputSearchRef = React.useRef<HTMLInputElement>(null)
  const searchSuggestionsRef = React.useRef<HTMLUListElement>(null)

  const { selectInitialResult, onResultsHover, onResultsKeyDown } =
    useSuggestions(inputSearchRef, searchSuggestionsRef)

  const filterSuggestions = (e: { target: { value: string } }) =>
    setResults(
      suggestions.filter(suggestion =>
        getElementText(suggestion)
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase() || '')
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
                {wrapElementText(suggestion, inputSearchRef.current?.value)}
              </li>
            ))}
          </ul>
        )}
    </Styled>
  )
}

export default SearchSuggestions
