import React from 'react'

import { render } from '@testing-library/react'

import { getElementText, wrapElementText } from '../elementText'

describe('elementText', () => {
  describe('getElementText', () => {
    const Test = ({ children }: { children?: React.ReactNode }) => (
      <div>{children}</div>
    )

    it('handles strings', () => {
      expect(getElementText('This is a test')).toBe('This is a test')
    })

    it('handles numbers', () => {
      expect(getElementText(100)).toBe(100)
    })

    it('handles nested markup', () => {
      expect(
        getElementText(
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
            <li>Option 4</li>
          </ul>
        )
      ).toBe('Option 1 Option 2 Option 3 Option 4')
    })

    it('handles React elements', () => {
      expect(
        getElementText(
          <Test>
            <span>Level 1</span>
            <span>Level 2</span>
            <span>Level 3</span>
          </Test>
        )
      ).toBe('Level 1 Level 2 Level 3')
    })

    it('returns undefined if no text found', () => {
      expect(getElementText(<Test />)).toBeUndefined()
    })
  })

  describe('wrapElementText', () => {
    it('can handle strings', () => {
      const Result = () => <>{wrapElementText(<div>Level One</div>, 'one')}</>

      const { container } = render(<Result />)

      expect(container.innerHTML).toBe('<div>Level <mark>One</mark></div>')
    })

    it('can handle elements with children', () => {
      const Result = () => (
        <>
          {wrapElementText(
            <div>
              <ul>
                <li>
                  <a href="https://twitter.com">Twitter</a>
                </li>
                <li>
                  <a href="https://facebook.com">Facebook</a>
                </li>
                <li>
                  <a href="https://reddit.com">Reddit</a>
                </li>
              </ul>
            </div>,
            'twit'
          )}
        </>
      )

      const { container } = render(<Result />)

      expect(container.innerHTML).toBe(
        '<div><ul><li><a href="https://twitter.com"><mark>Twit</mark>ter</a></li><li><a href="https://facebook.com">Facebook</a></li><li><a href="https://reddit.com">Reddit</a></li></ul></div>'
      )
    })
  })
})
