import React from 'react';
import { Global, css } from '@emotion/react';

const GlobalStyle = () => (
  <Global
    styles={css`
      * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
      }

      html {
        width: 100%;
        height: 100%;
        max-width: 480px;
        min-height: 100%;
        margin: 0 auto;
        box-shadow: 0px 0px 64px 0px rgba(30, 41, 59, 0.1);
      }

      body {
        width: 100%;
        height: 100%;
        max-width: 480px;
        font-family: 'Pretendard';
        white-space: pre-line;
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

      @font-face {
        font-family: 'Pretendard';
        src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff')
          format('woff');
      }
    `}
  />
);

export default GlobalStyle;
