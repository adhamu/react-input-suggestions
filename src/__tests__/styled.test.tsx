import { render } from '@testing-library/react'

import { Styled } from '../styled'

describe('Input Suggestion Styles', () => {
  it('has the correct styles without theme', () => {
    const { container } = render(<Styled>Hello world</Styled>)

    expect(container).toMatchInlineSnapshot(`
      .emotion-0 {
        position: relative;
      }

      .emotion-0 input {
        width: 100%;
      }

      .emotion-0 mark {
        display: inline;
        padding: 0;
      }

      .emotion-0 ul {
        position: absolute;
        top: 100%;
        width: 100%;
        box-sizing: border-box;
        list-style-type: none;
        overflow-y: auto;
      }

      .emotion-0 ul li>* {
        display: block;
        cursor: pointer;
        -webkit-text-decoration: none;
        text-decoration: none;
      }

      .emotion-0 ul li>*:focus {
        border: 0;
        box-shadow: 0;
        outline: 0;
      }

      <div>
        <div
          class="emotion-0"
        >
          Hello world
        </div>
      </div>
    `)
  })

  it('has the correct styles with theme', () => {
    const { container } = render(<Styled withTheme>Hello world</Styled>)

    expect(container).toMatchInlineSnapshot(`
      .emotion-0 {
        position: relative;
      }

      .emotion-0 input {
        width: 100%;
      }

      .emotion-0 mark {
        display: inline;
        padding: 0;
      }

      .emotion-0 ul {
        position: absolute;
        top: 100%;
        width: 100%;
        box-sizing: border-box;
        list-style-type: none;
        overflow-y: auto;
      }

      .emotion-0 ul li>* {
        display: block;
        cursor: pointer;
        -webkit-text-decoration: none;
        text-decoration: none;
      }

      .emotion-0 ul li>*:focus {
        border: 0;
        box-shadow: 0;
        outline: 0;
      }

      .emotion-0 input {
        font-size: 1rem;
        padding: 20px;
        border: 1px solid #dadada;
        background: #efefef;
        width: 100%;
        outline: 0;
      }

      .emotion-0 ul {
        padding: 0;
        margin-top: -3px;
        border: 1px solid #dadada;
        box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
        font-size: 1rem;
      }

      .emotion-0 ul li>* {
        padding: 1rem;
      }

      .emotion-0 ul li>*:focus {
        background: #efefef;
      }

      <div>
        <div
          class="emotion-0"
        >
          Hello world
        </div>
      </div>
    `)
  })
})
