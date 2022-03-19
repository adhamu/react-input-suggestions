import React from 'react'

import { screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

import { useSuggestions } from '../useSuggestions'

describe('useSuggestions', () => {
  let input: HTMLInputElement
  let list: HTMLUListElement
  let inputRef: React.RefObject<HTMLInputElement>
  let listRef: React.RefObject<HTMLUListElement>
  let target: HTMLElement
  const results = [
    <a key="1" href="https://twitter.com">
      Twitter
    </a>,
    <a key="2" href="https://facebook.com">
      Facebook
    </a>,
    <a key="3" href="https://reddit.com">
      Reddit
    </a>,
  ]

  beforeEach(() => {
    target = document.createElement('div')
    document.body.appendChild(target)

    input = document.createElement('input')
    input.type = 'search'
    target.appendChild(input)

    list = document.createElement('ul')
    target.appendChild(list)
    ;[
      { label: 'Reddit', url: 'https://reddit.com' },
      { label: 'Facebook', url: 'https://facebook.com' },
      { label: 'Twitter', url: 'https://twitter.com' },
    ].forEach(link => {
      const item = document.createElement('li')
      const anchor = document.createElement('a')

      anchor.setAttribute('href', link.url)
      anchor.appendChild(document.createTextNode(link.label))

      item.appendChild(anchor)
      list.appendChild(item)
    })

    inputRef = { current: input } as React.RefObject<HTMLInputElement>
    listRef = { current: list } as React.RefObject<HTMLUListElement>
  })

  afterEach(() => {
    target.removeChild(input)
    target.removeChild(list)
  })

  it('sets the tab index for each list item', () => {
    renderHook(() => useSuggestions(inputRef, listRef, results))

    screen.getAllByRole('link').forEach(linkItem => {
      expect(linkItem).toHaveAttribute('tabIndex', '0')
    })
  })

  it('selects the first initial result', () => {
    const { result } = renderHook(() =>
      useSuggestions(inputRef, listRef, results)
    )

    result.current.selectInitialResult({
      currentTarget: { value: ' ' },
      key: 'ArrowDown',
      preventDefault: jest.fn(),
    } as unknown as React.KeyboardEvent<HTMLInputElement>)

    expect(screen.getByRole('link', { name: 'Reddit' })).toHaveFocus()
  })

  it('selects the last initial result', () => {
    const { result } = renderHook(() =>
      useSuggestions(inputRef, listRef, results)
    )

    result.current.selectInitialResult({
      currentTarget: { value: ' ' },
      key: 'ArrowUp',
      preventDefault: jest.fn(),
    } as unknown as React.KeyboardEvent<HTMLInputElement>)

    expect(screen.getByRole('link', { name: 'Twitter' })).toHaveFocus()
  })

  it('sets focus on the hovered element', () => {
    const { result } = renderHook(() =>
      useSuggestions(inputRef, listRef, results)
    )

    result.current.onResultsHover({
      currentTarget: {
        firstChild: screen.getByRole('link', { name: 'Facebook' }),
      },
    } as unknown as React.MouseEvent<HTMLLIElement, MouseEvent>)

    expect(screen.getByRole('link', { name: 'Facebook' })).toHaveFocus()

    result.current.onResultsHover({
      currentTarget: {
        firstChild: screen.getByRole('link', { name: 'Twitter' }),
      },
    } as unknown as React.MouseEvent<HTMLLIElement, MouseEvent>)

    expect(screen.getByRole('link', { name: 'Twitter' })).toHaveFocus()
  })

  it('navigates through search suggestions', () => {
    const { result } = renderHook(() =>
      useSuggestions(inputRef, listRef, results)
    )
    const triggerEvent = (next: string, previous: string, key: string) =>
      ({
        currentTarget: {
          value: 'r',
          nextSibling: {
            firstChild: screen.getByRole('link', { name: next }),
            focus: jest.fn(),
          },
          previousSibling: {
            firstChild: screen.getByRole('link', { name: previous }),
            focus: jest.fn(),
          },
        },
        key,
        preventDefault: jest.fn(),
      } as unknown as React.KeyboardEvent<HTMLLIElement>)

    result.current.onResultsKeyDown(
      triggerEvent('Facebook', 'Reddit', 'ArrowDown')
    )

    expect(screen.getByRole('link', { name: 'Facebook' })).toHaveFocus()

    result.current.onResultsKeyDown(triggerEvent('Twitter', 'Facebook', 'Tab'))

    expect(screen.getByRole('link', { name: 'Twitter' })).toHaveFocus()

    result.current.onResultsKeyDown(
      triggerEvent('Twitter', 'Facebook', 'ArrowUp')
    )

    expect(screen.getByRole('link', { name: 'Facebook' })).toHaveFocus()
  })

  it('navigates to first result if nextSibling unavailable', () => {
    const { result } = renderHook(() =>
      useSuggestions(inputRef, listRef, results)
    )

    result.current.onResultsKeyDown({
      currentTarget: {
        value: 'r',
      },
      key: 'ArrowDown',
      preventDefault: jest.fn(),
    } as unknown as React.KeyboardEvent<HTMLLIElement>)

    expect(screen.getByRole('link', { name: 'Reddit' })).toHaveFocus()
  })

  it('navigates to last result if previousSibling unavailable', () => {
    const { result } = renderHook(() =>
      useSuggestions(inputRef, listRef, results)
    )

    result.current.onResultsKeyDown({
      currentTarget: {
        value: 'r',
      },
      key: 'ArrowUp',
      preventDefault: jest.fn(),
    } as unknown as React.KeyboardEvent<HTMLLIElement>)

    expect(screen.getByRole('link', { name: 'Twitter' })).toHaveFocus()
  })

  it('sets focus back to input element if arrow keys or tab not pressed', () => {
    const { result } = renderHook(() =>
      useSuggestions(inputRef, listRef, results)
    )

    result.current.onResultsKeyDown({
      currentTarget: {
        value: 'r',
      },
      key: 'e',
      preventDefault: jest.fn(),
    } as unknown as React.KeyboardEvent<HTMLLIElement>)

    expect(screen.getByRole('searchbox')).toHaveFocus()
  })

  it('sets showSuggestions to true if results exist and input not empty', () => {
    if (inputRef.current) {
      inputRef.current.value = 'r'
    }

    const { result } = renderHook(() =>
      useSuggestions(inputRef, listRef, results)
    )

    expect(result.current.showSuggestions).toBeTruthy()
  })
})
