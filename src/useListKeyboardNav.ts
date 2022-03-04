import React from 'react'

const ARROW_KEY_DOWN = 'ArrowDown'
const ARROW_KEY_UP = 'ArrowUp'
const ENTER = 'Enter'

enum SiblingType {
  NEXT = 'nextElementSibling',
  PREVIOUS = 'previousElementSibling',
}

enum ResultType {
  FIRST = 'first',
  LAST = 'last',
}

export const useListKeyboardNav = () => {
  const inputSearchRef = React.useRef<HTMLInputElement>(null)
  const searchSuggestionsRef = React.useRef<HTMLUListElement>(null)

  const selectElement = (type: ResultType) => {
    ;(
      searchSuggestionsRef.current?.querySelector(`li:${type}-of-type`)
        ?.firstChild as HTMLInputElement
    )?.focus()
  }

  const hasFocus = () =>
    searchSuggestionsRef.current?.querySelector('li a:focus')

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
    if (e.key === ARROW_KEY_DOWN) {
      selectResult(e, SiblingType.NEXT)
    } else if (e.key === ARROW_KEY_UP) {
      selectResult(e, SiblingType.PREVIOUS)
    } else if (e.key !== ENTER) {
      inputSearchRef.current?.focus()
    }
  }

  return {
    inputSearchRef,
    searchSuggestionsRef,
    selectInitialResult,
    onResultsHover,
    onResultsKeyDown,
  }
}
