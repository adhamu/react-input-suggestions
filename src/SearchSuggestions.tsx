import * as React from 'react'

import type { Props, Suggestion } from './types'

import { useListKeyboardNav } from './useListKeyboardNav'

const cssClass = `search-suggestions-${btoa(
  'css-search-suggestions'
).replaceAll('=', '')}`

const baseStyles = `
  .${cssClass} {
    position: relative;
  }

  .${cssClass} ul {
    box-sizing: border-box;
    position: absolute;
    top: calc(100% - 1px);
    width: 100%;
    border-top: 0;
    font-size: 1rem;
    list-style-type: none;
    overflow-y: auto;
  }

  .${cssClass} ul li a {
    display: block;
    text-decoration: none;
  }

  .${cssClass} ul li a:focus {
    border: 0;
    boxShadow: 0;
    font-weight: bold;
    outline: 0;
  }
`

const SearchSuggestions = ({
  suggestions,
  name = 'q',
  placeholder = 'Search',
  autoFocus = false,
  className = '',
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
    <>
      <style dangerouslySetInnerHTML={{ __html: baseStyles }} />
      <div className={[cssClass, className].join(' ')}>
        <input
          ref={inputSearchRef}
          type="search"
          name={name}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onChange={filterSuggestions}
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
      </div>
    </>
  )
}

export default SearchSuggestions
