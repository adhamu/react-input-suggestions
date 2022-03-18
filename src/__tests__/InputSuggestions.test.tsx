import React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import InputSuggestions from '../InputSuggestions'
import * as elementText from '../elementText'

const suggestions = ['reddit', 'facebook', 'twitter'].map(word => (
  <a key={word} href={`https://${word}.com`}>
    {word}
  </a>
))

describe('InputSuggestions', () => {
  const mockGetElementText = jest.spyOn(elementText, 'getElementText')
  const mockWrapElementText = jest.spyOn(elementText, 'wrapElementText')

  beforeEach(jest.clearAllMocks)

  describe('renders correctly with default options', () => {
    beforeEach(() => {
      render(<InputSuggestions suggestions={suggestions} />)
    })

    it('has the correct type', () => {
      expect(screen.getByRole('searchbox')).toHaveAttribute('type', 'search')
    })

    it('sets spellCheck off', () => {
      expect(screen.getByRole('searchbox')).toHaveAttribute(
        'spellcheck',
        'false'
      )
    })

    it('sets autoCapitalize off', () => {
      expect(screen.getByRole('searchbox')).toHaveAttribute(
        'autoCapitalize',
        'off'
      )
    })

    it('sets autoComplete off', () => {
      expect(screen.getByRole('searchbox')).toHaveAttribute(
        'autoComplete',
        'off'
      )
    })

    it('sets the name attribute', () => {
      expect(screen.getByRole('searchbox')).toHaveAttribute('name', 'q')
    })

    it('sets the placeholder attribute', () => {
      expect(screen.getByRole('searchbox')).toHaveAttribute(
        'placeholder',
        'Search'
      )
    })

    it('does not set autoFocus', () => {
      expect(screen.getByRole('searchbox')).not.toHaveFocus()
    })

    it('does not show suggestions if no input has been entered', () => {
      expect(screen.queryByRole('list')).not.toBeInTheDocument()
    })

    it('does not wrap search suggestions', () => {
      userEvent.type(screen.getByRole('searchbox'), 't')

      expect(mockWrapElementText).not.toHaveBeenCalled()
    })
  })

  describe('renders correctly with custom options', () => {
    it('has the correct type', () => {
      render(<InputSuggestions suggestions={suggestions} type="text" />)

      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')
    })

    it('sets the name attribute', () => {
      render(<InputSuggestions suggestions={suggestions} name="search" />)

      expect(screen.getByRole('searchbox')).toHaveAttribute('name', 'search')
    })

    it('sets the placeholder attribute', () => {
      render(
        <InputSuggestions
          suggestions={suggestions}
          placeholder="Enter keywords"
        />
      )

      expect(screen.getByRole('searchbox')).toHaveAttribute(
        'placeholder',
        'Enter keywords'
      )
    })

    it('sets autoFocus', () => {
      render(<InputSuggestions suggestions={suggestions} autoFocus />)

      expect(screen.getByRole('searchbox')).toHaveFocus()
    })

    it('sets an ID', () => {
      const { container } = render(
        <InputSuggestions suggestions={suggestions} id="react-search" />
      )

      // eslint-disable-next-line testing-library/no-node-access
      expect(container.firstChild).toHaveAttribute('id', 'react-search')
    })

    it('sets a className', () => {
      const { container } = render(
        <InputSuggestions suggestions={suggestions} className="react-search" />
      )

      // eslint-disable-next-line testing-library/no-node-access
      expect(container.firstChild).toHaveClass('react-search')
    })

    it('calls wrapElementText when highlightKeywords provided', () => {
      render(<InputSuggestions suggestions={suggestions} highlightKeywords />)

      userEvent.type(screen.getByRole('searchbox'), 't')

      expect(mockWrapElementText).toHaveBeenCalledTimes(2)
    })
  })

  it('fires an onChange event if provided', () => {
    const mockOnChange = jest.fn()

    render(
      <InputSuggestions suggestions={suggestions} onChange={mockOnChange} />
    )

    expect(mockOnChange).not.toHaveBeenCalled()

    userEvent.type(screen.getByRole('searchbox'), 't')

    expect(mockOnChange).toHaveBeenCalled()
    expect(mockGetElementText).toHaveBeenCalled()
  })

  it('shows filtered search suggestions based on input entered', () => {
    render(<InputSuggestions suggestions={suggestions} />)

    expect(screen.queryByRole('list')).not.toBeInTheDocument()

    userEvent.type(screen.getByRole('searchbox'), 't')

    expect(screen.getByRole('list')).toBeInTheDocument()

    expect(screen.getByRole('link', { name: 'reddit' })).toHaveAttribute(
      'href',
      'https://reddit.com'
    )

    expect(screen.getByRole('link', { name: 'twitter' })).toHaveAttribute(
      'href',
      'https://twitter.com'
    )

    expect(
      screen.queryByRole('link', { name: 'facebook' })
    ).not.toBeInTheDocument()
  })
})
