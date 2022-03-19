import React from 'react'

const ARROW_KEY_DOWN = 'ArrowDown'
const ARROW_KEY_UP = 'ArrowUp'
const ENTER = 'Enter'
const TAB = 'Tab'

enum SiblingType {
  NEXT = 'nextSibling',
  PREVIOUS = 'previousSibling',
}

enum ResultType {
  FIRST = 'first',
  LAST = 'last',
}

export const useSuggestions = (
  inputSearchRef: React.RefObject<HTMLInputElement>,
  searchSuggestionsRef: React.RefObject<HTMLUListElement>,
  results: React.ReactNode[]
) => {
  const [showSuggestions, setShowSuggestions] = React.useState(false)

  const handleClickOutside = (e: MouseEvent) => {
    if (
      showSuggestions &&
      !searchSuggestionsRef.current?.contains(e.target as Node)
    ) {
      setShowSuggestions(false)
    }
  }

  React.useEffect(() => {
    setShowSuggestions(
      Boolean(
        inputSearchRef &&
          inputSearchRef.current &&
          inputSearchRef.current.value.length > 0 &&
          results.length > 0
      )
    )
  }, [results])

  React.useEffect(() => {
    searchSuggestionsRef.current?.querySelectorAll('li')?.forEach(el => {
      // eslint-disable-next-line no-param-reassign
      ;(el.firstChild as HTMLElement).tabIndex = 0
    })

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [searchSuggestionsRef.current])

  const selectElement = (type: ResultType) => {
    ;(
      searchSuggestionsRef.current?.querySelector(`li:${type}-of-type`)
        ?.firstChild as HTMLInputElement
    )?.focus()
  }

  const hasFocus = () =>
    searchSuggestionsRef.current?.querySelector('li > *:focus')

  const selectInitialResult = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.currentTarget.value &&
      !hasFocus() &&
      [ARROW_KEY_DOWN, ARROW_KEY_UP].includes(e.key)
    ) {
      e.preventDefault()

      if (e.key === ARROW_KEY_DOWN) {
        selectElement(ResultType.FIRST)
      }

      if (e.key === ARROW_KEY_UP) {
        selectElement(ResultType.LAST)
      }
    }
  }

  const onResultsHover = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    ;(e?.currentTarget?.firstChild as HTMLInputElement)?.focus()
  }

  const selectSiblingType = (
    e: React.KeyboardEvent<HTMLLIElement>,
    type: SiblingType
  ) => {
    e.preventDefault()

    const resultType = e.currentTarget?.[type]?.firstChild as HTMLInputElement

    if (resultType) {
      resultType.focus()
    } else if (type === SiblingType.NEXT) {
      selectElement(ResultType.FIRST)
    } else {
      selectElement(ResultType.LAST)
    }
  }

  const selectResult = (
    e: React.KeyboardEvent<HTMLLIElement>,
    type: SiblingType
  ) => {
    selectSiblingType(e, type)
  }

  const onResultsKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if ([ARROW_KEY_DOWN, TAB].includes(e.key)) {
      selectResult(e, SiblingType.NEXT)
    } else if (e.key === ARROW_KEY_UP) {
      selectResult(e, SiblingType.PREVIOUS)
    } else if (e.key !== ENTER) {
      inputSearchRef.current?.focus()
    }
  }

  const onInputFocus = (e: { currentTarget: { value: string } }) => {
    if (
      document.activeElement === inputSearchRef.current &&
      e.currentTarget.value !== ''
    ) {
      setShowSuggestions(true)
    }
  }

  return {
    selectInitialResult,
    onResultsHover,
    onResultsKeyDown,
    showSuggestions,
    setShowSuggestions,
    onInputFocus,
  }
}
