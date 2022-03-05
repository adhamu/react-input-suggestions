import React from 'react'

import type { Props, Suggestion } from './types'

import { Styled } from './styled'
import { useListKeyboardNav } from './useListKeyboardNav'

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
  const [results, setResults] = React.useState<Suggestion[]>(suggestions)

  const {
    inputSearchRef,
    searchSuggestionsRef,
    selectInitialResult,
    onResultsHover,
    onResultsKeyDown,
  } = useListKeyboardNav()

  const filterSuggestions = (e: { target: { value: string } }) =>
    setResults(
      suggestions.filter(suggestion =>
        suggestion.label.toLowerCase().includes(e.target.value || '')
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
                key={suggestion.label}
                onMouseOver={onResultsHover}
                onKeyDown={onResultsKeyDown}
              >
                <a href={suggestion.url}>{suggestion.label}</a>
              </li>
            ))}
          </ul>
        )}
    </Styled>
  )
}

export default SearchSuggestions
