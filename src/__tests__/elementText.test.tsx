import { render } from '@testing-library/react'

import { elementText } from '../elementText'

describe('elementText', () => {
  describe('get', () => {
    const Test = ({ children }: { children?: React.ReactNode }) => (
      <div>{children}</div>
    )

    it('handles strings', () => {
      expect(elementText.get('This is a test')).toBe('This is a test')
    })

    it('handles numbers', () => {
      expect(elementText.get(100)).toBe(100)
    })

    it('handles nested markup', () => {
      expect(
        elementText.get(
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
        elementText.get(
          <Test>
            <span>Level 1</span>
            <span>Level 2</span>
            <span>Level 3</span>
          </Test>
        )
      ).toBe('Level 1 Level 2 Level 3')
    })

    it('returns undefined if no text found', () => {
      expect(elementText.get(<Test />)).toBeUndefined()
    })
  })

  describe('wrap', () => {
    it('can handle strings', () => {
      const Result = () => <>{elementText.wrap(<div>Level One</div>, 'one')}</>

      const { container } = render(<Result />)

      expect(container.innerHTML).toBe('<div>Level <mark>One</mark></div>')
    })

    it('can handle elements with children', () => {
      const Result = () => (
        <>
          {elementText.wrap(
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
