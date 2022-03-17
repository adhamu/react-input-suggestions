import React from 'react'

import { getElementText } from '../elementText'

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
