import styled from '@emotion/styled'

export const Styled = styled.div<{ withTheme?: boolean }>`
  position: relative;

  input {
    width: 100%;
  }

  mark {
    display: inline;
    padding: 0;
  }

  ul {
    position: absolute;
    top: 100%;
    width: 100%;
    box-sizing: border-box;
    list-style-type: none;
    overflow-y: auto;

    li > * {
      display: block;
      cursor: pointer;
      text-decoration: none;

      &:focus {
        border: 0;
        box-shadow: 0;
        outline: 0;
      }
    }
  }

  ${({ withTheme }) =>
    withTheme &&
    `input {
      font-size: 1rem;
      padding: 20px;
      border: 1px solid #dadada;
      background: #efefef;
      width: 100%;
      outline: 0;
    }

    ul {
      padding: 0;
      margin-top: -3px;
      border: 1px solid #dadada;
      box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
      font-size: 1rem;

      li > * {
        padding: 1rem;

        &:focus {
          background: #efefef;
        }
      }
    }
  `}
`
