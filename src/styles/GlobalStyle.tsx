import React from 'react';
import { Global, css } from '@emotion/react';
import { theme } from './theme';

const GlobalStyle = () => (
  <Global
    styles={css`
      * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
      }

      html,
      body {
        width: 100vw;
        height: 100vh;
        margin: 0;
        font-family: 'Pretendard';
        background-color: ${theme.colors.gray00};
        max-width: 360px;
        margin: 0 auto;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      ol,
      ul,
      li {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      button {
        cursor: pointer;
        border: none;
        background: transparent;
        padding: 0;
        margin: 0;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
      }

      input,
      textarea {
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        border-radius: 4px;
        padding: 8px;
      }

      input:focus,
      textarea:focus {
        outline: none;
      }
    `}
  />
);

export default GlobalStyle;
